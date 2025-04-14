import {Command} from "commander";
import {SwitchBranchCommand} from "./command/commands/switch-branch";
import {CreateBranchCommand} from "./command/commands/create-branch";
import {DeleteBranchesCommand} from "./command/commands/delete-branch";
import {RenameBranchCommand} from "./command/commands/rename-branch";

const cli = new Command()
cli.version('1.0.0');

cli.addCommand(SwitchBranchCommand)
cli.addCommand(CreateBranchCommand)
cli.addCommand(DeleteBranchesCommand)
cli.addCommand(RenameBranchCommand)

cli.parse(process.argv);

process.on('SIGINT', () => {
    console.log("Exit")
});