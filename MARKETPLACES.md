# Marketplace distribution

The plugin wraps the existing `skills/e-prime/` directory. It adds no runtime,
hooks, MCP servers, credentials, or always-on rules. Installation makes the
skill discoverable; invocation controls activation. Use one installation route
per host to avoid duplicate skills.

## Distribution files

| Host | Files | Distribution |
| --- | --- | --- |
| Claude Code | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Repository marketplace containing one plugin |
| Cursor | `plugin.json` | Agent Plugins standard; one plugin at the repository root |
| Codex | `plugin.json`, `.agents/plugins/marketplace.json` | Agent Plugins standard and repository catalog |
| Pi / omp | `package.json`, `skills/e-prime/` | Existing npm package |

Cursor supports the shared Agent Plugins format for skills. A separate
`.cursor-plugin/marketplace.json` is unnecessary for this single-plugin
repository. Codex also supports the shared manifest, so no legacy
`.codex-plugin/plugin.json` copy is maintained.

Git-based plugin installations use the repository, not the npm tarball. npm
still ships only the six files listed in the README. Publishing to npm remains
manual and independent of marketplace registration or approval.

## Local verification

Run from the repository root:

```sh
npm run build
```

The existing CI and release jobs run this same build. It checks manifest
versions against `package.json`, publisher metadata, catalog names and root
sources, opt-in installation, and the npm package's contents and offline
installation. These checks do not replace provider validation or review.

### Claude Code

With a current Claude Code installation:

```sh
claude plugin validate . --strict
claude plugin validate .claude-plugin/plugin.json --strict
claude --plugin-dir .
```

In the interactive session, invoke `/e-prime:e-prime`. Check that it loads the
standing policy, preserves code and quoted literals, and honors the requested
activation scope. A manually copied skill uses `/e-prime` instead.

To test the marketplace installation path, register the checkout's absolute
path with `claude plugin marketplace add /absolute/path/to/e-prime`, then run
`claude plugin install e-prime@jwmarshall-e-prime`. These commands change local
Claude configuration. Use a disposable environment when testing packaging.

After the marketplace files reach GitHub, users can instead register
`jwmarshall/e-prime`, as shown in the README. Registration does not require an
official directory listing.

### Cursor

For a local plugin test, copy `plugin.json`, `README.md`, `LICENSE`, and the
complete `skills/` directory into `~/.cursor/plugins/local/e-prime/`, keeping
`plugin.json` at that directory's root. Do not overwrite an existing plugin
installation without reviewing it. Do not symlink to files outside Cursor's
local plugin directory.

Run **Developer: Reload Window**, open **Customize**, and verify that the plugin
exposes the `e-prime` skill. Invoke it from the skill picker and check activation
scope and protected literals. Enterprise policy may require **Allow Local
Plugin Imports**. The standalone `.cursor/skills/e-prime/` route remains an
alternative when local plugin imports are unavailable.

### Codex

Register the local catalog:

```sh
codex plugin marketplace add /absolute/path/to/e-prime
```

In a supported desktop client's Plugins Directory, select **E-Prime by
jwmarshall** and install `e-prime`. Registration alone does not install or
activate the skill. Verify that the installed plugin exposes the skill, then
invoke it and check activation scope and protected literals.

For a published Git repository, replace the local path with
`jwmarshall/e-prime`. Availability and interface details depend on the host
version; this catalog does not imply a listing in OpenAI's public directory.

## Publishing checklist

1. Keep `package.json`, `plugin.json`, and `.claude-plugin/plugin.json` versions
   aligned. Bump the version when releasing skill changes so plugin caches can
   detect an update. Catalogs inherit the plugin's metadata.
2. Run the build and host-specific checks above. Native schema validation does
   not prove model behavior; test the skill in each host before advertising
   host-level compatibility.
3. Commit and push the reviewed files to the public repository. Confirm CI
   passes. Do not include secrets, local configuration, or generated artifacts.
4. Submit separately to the directories you want:
   - **Claude:** follow the [publishing guide](https://code.claude.com/docs/en/plugins/publish)
     and use [Manage directory](https://claude.ai/directory/manage). Account,
     submission requirements, and review apply; the repository marketplace
     remains a separate distribution route.
   - **Cursor:** submit the public repository through
     [Publish a plugin](https://cursor.com/marketplace/publish). Directory
     visibility requires approval.
   - **OpenAI:** follow the [plugin submission guide](https://developers.openai.com/plugins/deploy/submission).
     Upload a ZIP with root `plugin.json` and `skills/` to the
     [Plugins portal](https://platform.openai.com/plugins); include `README.md`
     and `LICENSE` as well. Do not wrap these files in an extra parent folder.
     Publisher verification, automated checks, and review apply. Publish only
     after approval. Skill updates require a new ZIP.
5. Follow [the npm release checklist](CONTRIBUTING.md#manual-release-checklist)
   separately if publishing to npm. No workflow submits marketplace listings or
   publishes npm packages automatically.

No manifest guarantees directory acceptance or reserves a public listing name.
Cursor and Codex require host-level installation testing; repository checks
alone cannot certify their discovery or activation behavior.

Claude's directory checks may warn about a missing listing icon. This repository
does not supply branding artwork. Before submitting, provide an appropriate
square PNG or JPEG through the provider's supported listing flow; Claude's
validator recommends 512–2048 pixels per side and a file smaller than 2 MB.

## Provider references

- [Agent Plugins manifest schema](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json)
- [Claude plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude plugin reference](https://code.claude.com/docs/en/plugins-reference)
- [Cursor plugin reference](https://cursor.com/docs/reference/plugins)
- [OpenAI plugin packaging and catalogs](https://developers.openai.com/plugins/build/plugins)
