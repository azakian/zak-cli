import {Command} from "commander";
import {SwitchBranchCommand} from "./command/commands/switch-branch";
import {CreateBranchCommand} from "./command/commands/create-branch";
import {DeleteBranchesCommand} from "./command/commands/delete-branch";
import {RenameBranchCommand} from "./command/commands/rename-branch";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {version} = require("../package.json");

const cli = new Command()
cli.version(version);

cli.addCommand(SwitchBranchCommand)
cli.addCommand(CreateBranchCommand)
cli.addCommand(DeleteBranchesCommand)
cli.addCommand(RenameBranchCommand)

cli.parse(process.argv);

process.on('SIGINT', () => {
    console.log("Exit")
});