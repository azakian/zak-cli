import {Command} from "commander";
import {COMMANDS} from "./commands";
import {getSimpleGit} from "./simple-git";
import {checkbox} from "@inquirer/prompts";

export const DeleteBranchesCommand = new Command(COMMANDS.DB)
    .description('Delete git branches')
    .alias('delete-branch')
    .action(() => deleteBranches())

const PROTECTED_BRANCHES = ['main', 'master', 'dev', 'develop', 'staging', 'release'];

const deleteBranches = async (): Promise<void> => {
    const git = await getSimpleGit();
    const branches = await git.branchLocal();

    const availableBranches = branches.all.filter(branch => !PROTECTED_BRANCHES.includes(branch) && branch !== branches.current);

    if (availableBranches.length === 0) {
        console.error('❌ No branches to delete');
        return
    }

    const branchesToDelete = await selectBranch(availableBranches)
    if (!branchesToDelete || branchesToDelete.length === 0) {
        console.error('❌ No branch selected')
        return;
    }

    await git.deleteLocalBranches(branchesToDelete, false, () => console.log('✅ Branches deleted successfully!'))
}

const selectBranch = async (branchChoices: string[]): Promise<string[] | undefined> => {
    try {
        return await checkbox({
            message: '➡️ Select branches to delete',
            choices: branchChoices,
        })
    } catch (error) {
        return undefined;
    }

}