import {Command} from "commander";
import simpleGit from "simple-git";
import inquirer from "inquirer";

export const switchBranch = async () => {
    const git = simpleGit();
    const isRepo = await git.checkIsRepo();

    if (!isRepo) {
        console.error('Error: Not a git repository.');
        return;
    }

    const branches = await git.branchLocal();
    const { branch } = await inquirer.prompt([
        {
            type: 'list',
            name: 'branch',
            message: 'Select a branch:',
            choices: branches.all
        }
    ]);

    await git.checkout(branch);
    console.log(`Switched to branch: ${branch}`);
}

export const SwitchBranchCommand = new Command()
    .command('bs')
    .description('Switch Git branches interactively')
    .action(switchBranch);

