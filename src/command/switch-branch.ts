import {select} from "@inquirer/prompts";
import {Command, Option} from "commander";
import {COMMANDS} from "./commands";
import {getSimpleGit} from "./simple-git";

export const switchBranch = async () => {
    const git = await getSimpleGit()

    const branches = await git.branchLocal();
    const branch: SelectedBranch | undefined = await selectBranch(branches.all);

    if (!branch) {
        console.error('❌ No branch selected')
        return;
    }
    await git.checkout(branch);
    console.log(`✅ Switched to branch: ${branch} successfully`);
}

export const SwitchBranchCommand = new Command(COMMANDS.BS)
    .description('Switch Git branches interactively')
    .addOption(new Option('-l', 'Switch to the last branch'))
    .action((options) => {
        console.log(options)
        return switchBranch()
    });

type SelectedBranch = string;
const userExitPrompt = (error: unknown) => error instanceof Error && error.name === 'ExitPromptError';
const selectBranch = async (branchChoices: string[]): Promise<SelectedBranch | undefined> => {
    try {
        return await select({message: 'Select branch', choices: branchChoices, pageSize: 20});
    } catch (error) {
        return undefined;
    }
}

