export function composeRegexes(flags: string, ...regexes: RegExp[]) {
  return new RegExp(regexes.map((regex) => regex.source).join('|'), flags);
}
