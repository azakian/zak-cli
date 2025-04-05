export const COMMANDS = {
    BS: 'bs',
    CB: 'cb',
    DB: 'db',
} as const;


export type CliCommand = typeof COMMANDS[keyof typeof COMMANDS];

export const AVAILABLE_COMMANDS: CliCommand[] = Object.values(COMMANDS);
