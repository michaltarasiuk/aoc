# Advent of Code

[Advent of Code](https://adventofcode.com) solutions (2015–2025) in TypeScript, run with [Bun](https://bun.sh).

## Setup

```sh
mise install          # pinned Bun version from mise.toml
bun install
cp .env.example .env  # then paste your adventofcode.com session cookie
```

## Usage

```sh
bun year-25/day-01.ts
```

A solution exits silently when its answers are correct and throws `Part N failed` otherwise. `fetchInput` downloads the puzzle input on first run and caches it in `inputs/` (git-ignored: puzzle inputs must not be committed).

| Script              | Description                  |
| ------------------- | ---------------------------- |
| `bun run fmt`       | Format with oxfmt            |
| `bun run fmt:check` | Check formatting             |
| `bun run tsc:check` | Type-check with TypeScript 7 |

## Conventions

- One file per puzzle: `year-YY/day-DD.ts`, shared helpers in `lib.ts`.
- Each file starts with `const input = await fetchInput(import.meta)`, followed by types, `UPPER_SNAKE_CASE` static constants, then helper `function` declarations, then the solution.
- Regexes are named `<thing>Re`, and part 2 variants of a value get a `2` suffix.
- Answers are checked at the end with `assert.strictEqual(actual, expected, "Part N failed")`.
