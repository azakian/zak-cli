import simpleGit from "simple-git";
import {select} from "@inquirer/prompts";

export const switchBranch = async () => {
    const git = simpleGit();
    const isRepo = await git.checkIsRepo();

    if (!isRepo) {
        console.error('Error: Not a git repository.');
        return;
    }

    const branches = await git.branchLocal();
    const branch: SelectedBranch | undefined = await selectBranch(branches.all);

    if (!branch) {
        console.error('No branch selected')
        return;
    }
    await git.checkout(branch);
    console.log(`Switched to branch: ${branch}`);
}


type SelectedBranch = string;
const userExitPrompt = (error: unknown) => error instanceof Error && error.name === 'ExitPromptError';
const selectBranch = async (branchChoices: string[]): Promise<SelectedBranch | undefined> => {
    try {
        return await select({message: 'Select branch', choices: branchChoices, pageSize: 20});
    } catch (error) {
        return undefined;
    }
}

