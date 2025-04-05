import {Command} from "commander";
import {SwitchBranchCommand} from "./command/switch-branch.js";
import {CreateBranchCommand} from "./command/create-branch";
import {DeleteBranchesCommand} from "./command/delete-branch";

const cli = new Command()
cli.version('1.0.0');

cli.addCommand(SwitchBranchCommand)
cli.addCommand(CreateBranchCommand)
cli.addCommand(DeleteBranchesCommand)

cli.parse(process.argv);

process.on('SIGINT', () => {
    console.log("Exit")
});