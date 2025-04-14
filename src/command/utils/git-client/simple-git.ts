import simpleGit, {SimpleGit} from "simple-git";

export const getSimpleGit = async (): Promise<SimpleGit> => {
    const git = simpleGit();
    const isRepo = await git.checkIsRepo();

    if (!isRepo) {
        console.log("❌ This is not a git repository.");
        process.exit(0);
    }

    return git
}