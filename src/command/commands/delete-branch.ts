import {Command} from "commander";
import {COMMANDS} from "../commands";
import {getSimpleGit} from "../utils/git-client/simple-git";
import {checkbox} from "@inquirer/prompts";
import {BranchSummary, SimpleGit} from "simple-git";

export const DeleteBranchesCommand = new Command(COMMANDS.DB)
    .description('Delete git branches')
    .alias('delete-branch')
    .action(() => deleteBranches())

const PROTECTED_BRANCHES = ['main', 'master', 'dev', 'develop', 'staging', 'release'];

const deleteBranches = async (): Promise<void> => {
    const git: SimpleGit = await getSimpleGit();
    const branchSummary: BranchSummary = await git.branchLocal();

    const availableBranches: string[] = getAvailableBranches(branchSummary);

    if (availableBranches.length === 0) {
        console.error('❌ No branches to delete');
        return
    }

    const branchesToDelete: string[] | undefined = await selectBranch(availableBranches)
    if (!branchesToDelete || branchesToDelete.length === 0) {
        console.error('❌ No branch selected')
        return;
    }

    await git.deleteLocalBranches(branchesToDelete, true, () => console.log('✅ Branches deleted successfully!'))
}

const selectBranch = async (branchChoices: string[]): Promise<string[] | undefined> => {
    try {
        return await checkbox({
            message: '➡️ Select branches to delete',
            choices: branchChoices,
            pageSize: 20
        })
    } catch (error) {
        return undefined;
    }
}

const getAvailableBranches = (branchSummary: BranchSummary): string[] => {
    const ignoredBranches = branchSummary.all.filter(branch => PROTECTED_BRANCHES.includes(branch));

    if (ignoredBranches.length > 0) {
        console.info('🥷 The following branches are protected and cannot be deleted:', ignoredBranches.join(', '));
    }

    return branchSummary.all.filter(branch => !PROTECTED_BRANCHES.includes(branch) && branch !== branchSummary.current);
}