import {select} from "@inquirer/prompts";
import {Command, Option} from "commander";
import {COMMANDS} from "../commands";
import {getSimpleGit} from "../utils/git-client/simple-git";

export const switchBranch = async () => {
    const git = await getSimpleGit()

    const branches = await git.branchLocal();
    const branch: SelectedBranch | undefined = await selectBranch(branches.all);

    if (!branch) {
        console.error('❌ No branch selected')
        return;
    }
    await git.checkout(branch, () => console.log(`✅ Switched to branch: ${branch} successfully`));
}

export const SwitchBranchCommand = new Command(COMMANDS.BS)
    .description('Switch Git branches interactively')
    .alias('switch-branch')
    .addOption(new Option('-l', 'Switch to the last branch'))
    .action(() => switchBranch());

type SelectedBranch = string;
const selectBranch = async (branchChoices: string[]): Promise<SelectedBranch | undefined> => {
    try {
        return await select({message: 'Select branch', choices: branchChoices, pageSize: 20});
    } catch (error) {
        return undefined;
    }
}

