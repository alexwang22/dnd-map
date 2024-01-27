export function log(...args: any[]) {
  console.log(...args);
  return args.at(-1);
}
