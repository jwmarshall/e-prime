# E-Prime

`@jwmarshall/e-prime` supplies an adaptable communication skill for coding
agents. While active, it applies E-Prime grammar to original English prose,
keeps claims scoped to evidence, and preserves meaning and exact technical
literals. It does not restyle code, expand permissions, or guarantee correctness.

No runtime dependencies, executable code, install scripts, hooks, or automatic
activation. Users choose when and where to activate it.

## Install

After publishing this package to npm, choose your harness:

```sh
# Pi
pi install npm:@jwmarshall/e-prime

# omp
omp plugin install @jwmarshall/e-prime
```

Start a fresh session and invoke `/skill:e-prime`. Installation exposes the
skill; it does not force the agent to use it on every reply.

For Codex, Claude Code, Cursor, or another filesystem-based skill consumer:

```sh
npm install --save-dev @jwmarshall/e-prime
```

Reference `node_modules/@jwmarshall/e-prime/skills/e-prime/SKILL.md` from your
instructions, or copy the complete `skills/e-prime/` directory into the host's
skill location. Keep its references alongside it. Do not overwrite an existing
skill without reviewing it. Copied files need separate updates.

| Harness | Project destination | Invocation |
| --- | --- | --- |
| Codex | `.agents/skills/e-prime/` | `$e-prime` |
| Claude Code | `.claude/skills/e-prime/` | `/e-prime` |
| Cursor | `.cursor/skills/e-prime/` | Select `e-prime` from `/` |

This package has no `npx` command. Use the host's package manager or the portable
files, not an installer that rewrites your configuration.

## Activate on your terms

For one task, ask the agent to load the installed E-Prime skill for that task.
An unscoped direct invocation requests the current session, subject to context
retention.

For standing use, add this line yourself to a prompt or a harness-loaded
`AGENTS.md`, `CLAUDE.md`, or native rule file. Replace `<skill-path>` with the
actual installed `SKILL.md` path:

> Before responding, load `<skill-path>` and its required standing policy. Apply E-Prime to all original English communication across tasks unless I explicitly suspend it. Preserve exact literals and meaning.

A prompt instruction depends on session retention; a file instruction applies
only where the harness loads it. A directive to read the skill still depends
on agent adherence. Children need their own loaded or explicitly supplied
policy. No automatic propagation or durable mode state ships with this package.

Say "Suspend E-Prime for this reply", "Turn E-Prime off for the rest of this
session", or "Resume E-Prime". Remove your standing instruction for durable
opt-out; conversational suspension does not edit configuration.

See [installation and activation](skills/e-prime/references/harnesses.md) for
native instruction surfaces, imports, removal, and verification.

## Try the checkout or a local package

Before npm publication, Pi and omp accept this checkout directly:

```sh
pi install /absolute/path/to/e-prime-skill
omp plugin install /absolute/path/to/e-prime-skill
```

Those commands register the package in the selected harness's user environment.
For Pi project scope, add `--local`. Do not run both unless you want both hosts
to discover the skill. Neither command adds a standing activation instruction.

To build a distributable tarball without running lifecycle scripts:

```sh
npm pack --ignore-scripts
```

Install the resulting `jwmarshall-e-prime-0.1.0.tgz` into a consuming project
with `npm install --save-dev /absolute/path/to/jwmarshall-e-prime-0.1.0.tgz`,
then use its skill directory as described above.

Publishing requires permission to publish under `@jwmarshall`. From a reviewed
checkout, the maintainer can run `npm publish --access public`. Packaging this
repository does not publish it or establish registry-name availability.

## Package contents

- `skills/e-prime/SKILL.md`: canonical skill entry point.
- `skills/e-prime/references/standing-policy.md`: complete operational policy.
- `skills/e-prime/references/harnesses.md`: installation and activation guidance.
- `package.json`, this README, and the MIT license.

The source repository retains `references/research.md`,
`references/validation.md`, and `SKILL-no-procedure.md` for development history.
They do not ship in the npm package. The experimental variant preserves older
mode wording; do not install it as the current skill.

Model trials have shown identifier paraphrasing and omitted evidence limits
despite the policy. Skill discovery and structural checks do not prove reliable
compliance. Review consequential outputs.

## License

MIT. See [LICENSE](LICENSE).
