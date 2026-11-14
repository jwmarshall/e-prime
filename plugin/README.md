# E-Prime for coding agents

E-Prime helps an agent describe what happened, identify the evidence behind a
claim, and state what remains unknown. It avoids grammatical forms of *to be*
in original English prose while preserving meaning, code, identifiers,
diagnostics, quotations, and other exact technical details.

Use it for status updates, code reviews, incident reports, explanations, and
requested rewrites. For example, replace an unsupported “The service is down”
with “One request returned HTTP 503; we have not checked other endpoints.”
Only use that example's facts when your evidence supports them.

## Activate and control the skill

After adding the plugin through your host's plugin interface, start a fresh
session. In Claude Code, invoke **`/e-prime:e-prime`**. In another supported
host, select the `e-prime` skill or explicitly ask the agent to load it.
Installation alone does not activate the policy for every response.

For a bounded trial, ask: “Write a two-sentence status update in E-Prime for
this task only. Evidence: test_refresh_token passed; no integration tests ran.
Preserve the identifier test_refresh_token exactly.”

An unscoped invocation requests session-wide use, subject to context retention.
Say “Suspend E-Prime for this reply,” “Turn E-Prime off for the rest of this
session,” or “Resume E-Prime” to change scope. For standing activation and
host-specific paths, see the [activation guide](skills/e-prime/references/harnesses.md).

## Behavior and data handling

This folder contains Markdown instructions, plugin metadata, a license, and
listing artwork. It contains no executable scripts, hooks, MCP servers,
package installers, runtime dependencies, telemetry, credential readers, or
network service. The skill introduces no additional data destination or
storage; your host's model processing, tools, and retention settings still
apply. It does not grant additional permissions or authorize unrelated edits.

The [skill](skills/e-prime/SKILL.md) loads its bundled
[standing policy](skills/e-prime/references/standing-policy.md). Meaning,
safety, and exact user requirements take priority over style. Model output can
still omit evidence limits or change technical literals: review consequential
responses. Grammar checks do not prove accuracy, and installation checks do
not establish reliable model compliance or compatibility with every host.

## License and support

[MIT](LICENSE). Report problems or suggest improvements through the
[project issue tracker](https://github.com/jwmarshall/e-prime/issues).
