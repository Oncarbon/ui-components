export class AssertionError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export function assert(condition: boolean, msg?: string) {
  if (!condition) {
    throw new AssertionError(msg ?? "Assertion failed");
  }
}
