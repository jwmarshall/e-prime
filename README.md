# E-Prime for coding agents

[![CI](https://github.com/jwmarshall/e-prime/actions/workflows/ci.yml/badge.svg)](https://github.com/jwmarshall/e-prime/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Describe what happened. Say what supports it. Keep the exact technical details.**

`@jwmarshall/e-prime` gives coding agents a portable communication skill:
English without grammatical forms of *to be*, paired with evidence-scoped
claims and protection for code, identifiers, and quotations.

Use it for status updates, code reviews, incident reports, and technical
explanations—not to restyle your source code.

## What changes?

E-Prime avoids *be, am, is, are, was, were, been,* and *being* in original
English prose, including their contractions. This skill adds a meaning-first
rule: never invent evidence or alter an exact literal just to satisfy grammar.

Illustrative rewrites, assuming the stated evidence:

| Instead of | With E-Prime and scoped evidence |
| --- | --- |
| “The service is down.” | “One request returned HTTP 503; we have not checked other endpoints.” |
| “The fix is correct.” | “`test_refresh_token` passed; integration tests have not run.” |
| “The error is `Error: token is expired`.” | “The request returned `Error: token is expired`.” |

The goal: more accountable communication, not clever verb substitution.
Grammar alone cannot establish truth, safety, or better reasoning.

- **Portable:** Markdown skill files for Pi, omp, and filesystem-based skill hosts.
- **Opt-in:** task, session, or user-configured standing activation.
- **Literal-preserving:** code, commands, API names, diagnostics, and quotes stay exact.
- **No runtime dependencies:** no CLI, install hooks, telemetry, or model service.

## Quick start

### Pi or omp

Once the package is published to npm, choose your harness:

```sh
# Pi
pi install npm:@jwmarshall/e-prime

# omp
omp plugin install @jwmarshall/e-prime
```

Start a fresh session, then invoke:

```text
/skill:e-prime
```

Try a bounded request:

```text
Write a two-sentence status update in E-Prime.
Evidence: test_refresh_token passed; no integration tests ran.
Preserve the identifier test_refresh_token exactly.
```

Installation makes the skill discoverable; it does not activate it for every reply.
An unscoped invocation requests the current session, subject to context retention.

### Codex, Claude Code, Cursor, and other hosts

After npm publication:

```sh
npm install --save-dev @jwmarshall/e-prime
```

Copy the **complete** `node_modules/@jwmarshall/e-prime/skills/e-prime/`
directory into your host's project skill location:

| Host | Destination | Invocation |
| --- | --- | --- |
| Codex | `.agents/skills/e-prime/` | `$e-prime` |
| Claude Code | `.claude/skills/e-prime/` | `/e-prime` |
| Cursor | `.cursor/skills/e-prime/` | Select `e-prime` from `/` |

Keep the `references/` directory beside `SKILL.md`. Review existing files before
replacing them; copied skills need separate updates. Alternatively, point your
host's active instructions directly at the installed `SKILL.md`.

This package has no `npx` command and does not rewrite host configuration.
See [installation and activation](skills/e-prime/references/harnesses.md)
for host-specific scope, imports, removal, and verification.

### Try it before npm publication

```sh
git clone https://github.com/jwmarshall/e-prime.git
cd e-prime
```

Register the absolute checkout path with **one** host:

```sh
pi install /absolute/path/to/e-prime
# Or:
omp plugin install /absolute/path/to/e-prime
```

For Pi project scope, add `--local`. For other hosts, copy `skills/e-prime/`
from the checkout to the destination above. No npm package required.

## Choose when it applies

For a single task, ask the agent to load E-Prime **for this task only**.

For standing use, add the following to a prompt or a file your host loads
(`AGENTS.md`, `CLAUDE.md`, or its native rules). Replace `<skill-path>` with
the installed `SKILL.md` path:

> Before responding, load `<skill-path>` and its required standing policy. Apply E-Prime to all original English communication across tasks unless I explicitly suspend it. Preserve exact literals and meaning.

To change scope conversationally:

- “Suspend E-Prime for this reply.”
- “Turn E-Prime off for the rest of this session.”
- “Resume E-Prime.”

Remove the standing instruction for durable opt-out. Conversation controls do
not edit configuration. Context compaction can lose activation state, and
subagents need their own loaded or explicitly supplied policy.

## Scope and limitations

The skill changes original English communication, not permissions or existing
files. Meaning, safety, and exact requirements take priority over style.

Model trials have shown identifier paraphrasing and omitted evidence limits
despite the policy. Review consequential output. Package checks establish
file integrity and installability—not reliable model compliance or verified
support for every host.

For background, see the
[research and sources](https://github.com/jwmarshall/e-prime/blob/main/references/research.md)
and [validation record](https://github.com/jwmarshall/e-prime/blob/main/references/validation.md).
These development records include earlier skill revisions; they do not all
describe the current policy.

## Package contents

Only six files ship:

```text
package.json
README.md
LICENSE
skills/e-prime/SKILL.md
skills/e-prime/references/standing-policy.md
skills/e-prime/references/harnesses.md
```

Development research and the historical `references/SKILL-no-procedure.md`
variant stay in the source repository. Do not install the historical variant.

## Development and releases

Use Node.js 22+ and npm. No dependency installation or compilation required:

```sh
npm test       # Validate, pack, and install in an isolated temporary directory
npm run build  # Same checks, then write the tarball and SHA-256 checksum to dist/
```

CI checks Linux and Windows on Node.js 22 and 24. Version tags create a
**draft GitHub release** with the validated tarball and checksum. npm publication
remains a separate, manual maintainer action; workflows never publish to npm.

See [contribution and release instructions](https://github.com/jwmarshall/e-prime/blob/main/CONTRIBUTING.md)
for checks, versioning, and the manual publishing checklist.
Report reproducible problems or suggest improvements through
[GitHub issues](https://github.com/jwmarshall/e-prime/issues).

## License

[MIT](LICENSE).
