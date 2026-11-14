# Installation and activation

E-Prime supplies a portable Markdown skill, not an activation service.
No executable hooks, installer, runtime dependencies, telemetry, model routing,
or persistent mode store ship with the plugin.

## Installation routes

Use your host's plugin interface, or copy the complete skill directory into
one of the project locations below. For package-manager and repository
installation instructions, see the
[project installation guide](https://jwmarshall.github.io/e-prime/#install).

The npm distribution retains the installed path
`node_modules/@jwmarshall/e-prime/skills/e-prime/`. The source repository keeps
the same skill in its self-contained plugin folder. Start a new session after
installation, then use the invocation for your host.

| Harness | Project skill directory | Invocation |
| --- | --- | --- |
| Codex | `.agents/skills/e-prime/` | `$e-prime` |
| Claude Code | `.claude/skills/e-prime/` | `/e-prime` |
| Cursor | `.cursor/skills/e-prime/` | Select `e-prime` from `/` |
| Pi | `.pi/skills/e-prime/` | `/skill:e-prime` |
| omp | `.omp/skills/e-prime/` | `/skill:e-prime` |

Use one installation route per harness to avoid duplicate discovery. Preserve
existing files; compare an existing destination before replacing it. A copied
skill does not track upstream updates. Copy its references too: `SKILL.md`
requires `references/standing-policy.md`, resolved relative to its own directory.

## Choose activation scope

Installation makes the skill available, not always active. Invoke it for a task
or session, or add a standing instruction yourself. A broad skill description
does not force selection.

For standing use, place this line in your prompt or a harness-loaded instruction
file. Replace `<skill-path>` with the actual `e-prime/SKILL.md` path:

> Before responding, load `<skill-path>` and its required standing policy. Apply E-Prime to all original English communication across tasks unless I explicitly suspend it. Preserve exact literals and meaning.

Use a path the agent can resolve from that instruction source; an absolute path
avoids working-directory ambiguity but reduces portability. For a project npm
install, the path relative to the project root is
`node_modules/@jwmarshall/e-prime/skills/e-prime/SKILL.md`.

| Harness | User-controlled standing instruction |
| --- | --- |
| Codex | Applicable `AGENTS.md`; personal `$CODEX_HOME/AGENTS.md` (normally `~/.codex/AGENTS.md`) |
| Claude Code | Applicable `CLAUDE.md`; personal `~/.claude/CLAUDE.md` |
| Cursor | User Rules or project `.cursor/rules/e-prime.mdc` with `alwaysApply: true` |
| Pi | Applicable `AGENTS.md`; personal `<agent-dir>/AGENTS.md` (normally `~/.pi/agent/AGENTS.md`) |
| omp | `.omp/RULES.md` or the active agent directory's `RULES.md` |

Preserve unrelated instructions. Follow the host's precedence and reload rules;
more specific instructions, overrides, disabled rules, or untrusted projects can
change what loads. Do not add portable-skill frontmatter such as `alwaysApply`:
that setting belongs to Cursor's native rule file.

A directive to read a file still depends on the agent following it. For native
inclusion instead, Claude Code supports `@path` imports in `CLAUDE.md`, and omp
supports native imports in its rules. Import the complete standing policy,
which includes grammar and fidelity requirements; do not also inject a duplicate
copy. Keep imports resolvable on each machine. Consult the host's documentation
for trust prompts and path resolution.

## Suspend, resume, and remove

- "Suspend E-Prime for this reply."
- "Turn E-Prime off for the rest of this session."
- "Resume E-Prime."

An unscoped "off" suspends the rest of the session. Resume restores E-Prime
within the caller's activated scope. Conversational controls do not change
configuration. Compaction can lose them; new sessions require a new invocation
or a loaded standing instruction.

For durable opt-out, remove your activation line or import. To remove the
package too, use `pi remove npm:@jwmarshall/e-prime`,
`omp plugin uninstall @jwmarshall/e-prime`, or `npm uninstall @jwmarshall/e-prime`
for the corresponding installation route. Remove copied skill directories
separately, preserving unrelated files, then start a new session.

Children need their own loaded or explicitly supplied policy. Do not assume
parent context or suspension reaches subagents. Installation on one machine
also does not imply cloud coverage.

## Verify the actual host

Check discovery, then test invocation and standing activation separately:

1. Inspect the installed skill path and confirm that its policy can load.
2. With your standing instruction loaded, request a status update without
   mentioning E-Prime. Check grammar, exact identifiers, facts, and evidence limits.
3. Change tasks, suspend, and resume. Test new sessions and compaction separately.
4. Protect `Error: token is expired` exactly while checking surrounding prose.
5. Test delegated agents only when you explicitly pass or install the policy.

Discovery proves availability, not model obedience. Grammar checking does not
verify facts. Consult the source repository's development validation record for
sampled results and known fidelity failures.

## Host documentation

- [Pi packages](https://docs.pi.dev/latest/packages)
- [Pi skills](https://docs.pi.dev/latest/skills)
- [omp plugins](https://omp.sh/docs/plugins)
- [omp context files](https://omp.sh/docs/context-files)
- [Codex instructions](https://developers.openai.com/codex/agent-configuration/agents-md)
- [Codex skills](https://developers.openai.com/codex/skills)
- [Claude memory and imports](https://code.claude.com/docs/en/memory)
- [Claude skills](https://code.claude.com/docs/en/skills)
- [Cursor rules](https://cursor.com/docs/rules)
- [Cursor skills](https://cursor.com/docs/skills)
