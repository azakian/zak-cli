import {Command} from "commander";
import {SwitchBranchCommand} from "./command/switch-branch.js";
import {CreateBranchCommand} from "./command/create-branch";

const cli = new Command()
cli.version('1.0.0');

cli.addCommand(SwitchBranchCommand)
cli.addCommand(CreateBranchCommand)

cli.parse(process.argv);

process.on('SIGINT', () => {
    console.log("Exit")
});