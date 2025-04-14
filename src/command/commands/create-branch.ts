import {Command} from "commander";
import {COMMANDS} from "../commands";
import {getSimpleGit} from "../utils/git-client/simple-git";

export const CreateBranchCommand = new Command(COMMANDS.CB)
    .description('Create a new branch')
    .alias('create-branch')
    .argument('<branch>', 'Name of the new branch')
    .action((branch: string) => createBranch(branch))

const createBranch = async (branch: string) => {
    const git = await getSimpleGit();
    const localBranch = await git.branchLocal();
    await git.checkoutBranch(branch, localBranch.current, () => console.log("✅ Branch created successfully"));
}