import {Command} from "commander";
import {switchBranch} from "./command/switch-branch.js";

const cli = new Command()
cli.version('1.0.0');

cli.command('bs')
    .description('Switch Git branches interactively')
    .action(switchBranch)

cli.parse(process.argv);

process.on('SIGINT', () => {console.log("Exit")});