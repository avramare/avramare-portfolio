// Tiny bridge so desktop icons and the menu bar can drive the terminal
// without lifting all of the shell state out of the page component.

type Runner = (command: string) => void;

let runner: Runner | null = null;

export const registerRunner = (fn: Runner | null): void => {
  runner = fn;
};

export const runCommand = (command: string): void => {
  runner?.(command);
};
