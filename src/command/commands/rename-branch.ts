import {Command} from "commander";
import {COMMANDS} from "../commands";
import {getSimpleGit} from "../utils/git-client/simple-git";
import {BranchSummary, GitError, SimpleGit} from "simple-git";
import {PROTECTED_BRANCHES} from "../utils/git-client/git";

export const RenameBranchCommand = new Command(COMMANDS.RB)
    .description('Rename current git branch')
    .alias('rename-branch')
    .argument('<branchName>', 'wanted branch name')
    .action((wantedBranchName: string) => renameBranch(wantedBranchName))

const renameBranch = async (wantedBranchName: string): Promise<void> => {
    const git: SimpleGit = await getSimpleGit()
    const currentBranch: string = (await git.branchLocal()).current

    if (PROTECTED_BRANCHES.includes(currentBranch)) {
        console.error(`🥷 Current branch ${currentBranch} is protected and cannot be renamed`)
        return;
    }

    git.branch(['-m', wantedBranchName], (gitError: GitError | null, resultBranchSummary: BranchSummary) => {
        if (!!gitError) {
            console.error("❌ Error renaming branch : ", gitError.message);
            return;
        }

        console.info(`✅ Branch renamed successfully to : ${wantedBranchName}`);
    })
}