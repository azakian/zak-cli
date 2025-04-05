import simpleGit, {SimpleGit} from "simple-git";

export const getSimpleGit = async (): Promise<SimpleGit> => {
    const git = simpleGit();
    const isRepo = await git.checkIsRepo();

    if (!isRepo) {
        throw new Error("Error: Not a git repository.");
    }

    return git
}