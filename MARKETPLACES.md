# Marketplace distribution

The plugin wraps the canonical `plugin/skills/e-prime/` directory. It adds no runtime,
hooks, MCP servers, credentials, or always-on rules. Installation makes the
skill discoverable; invocation controls activation. Use one installation route
per host to avoid duplicate skills.

## Distribution files

| Host | Files | Distribution |
| --- | --- | --- |
| Claude Code | `plugin/.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Root marketplace points to `./plugin` |
| Cursor | `plugin/plugin.json`, `.cursor-plugin/marketplace.json` | Shared plugin format; root catalog selects `plugin/` |
| Codex | `plugin/plugin.json`, `.agents/plugins/marketplace.json` | Root catalog points to `./plugin` |
| Pi / omp | `package.json`, `plugin/skills/e-prime/` | Root-checkout installation; staged npm package retains `skills/e-prime/` |

Cursor supports the shared Agent Plugins format for skills. Its root marketplace
catalog selects the nested plugin folder and supplies listing metadata for
Cursor's folder-based component discovery. Codex uses the shared manifest and
its own root catalog; no legacy `.codex-plugin/plugin.json` copy is maintained.

Git-based plugin installations use the repository, not the npm tarball. npm
still ships only the six files listed in the README. Publishing to npm remains
manual and independent of marketplace registration or approval.

## Local verification

Run from the repository root:

```sh
npm run build
```

The existing CI and release jobs run this same build. It checks manifest
versions against `package.json`, publisher metadata, catalog names and
`./plugin` sources, opt-in installation, and the npm package's contents and offline
installation. These checks do not replace provider validation or review.

### Claude Code

With a current Claude Code installation:

```sh
claude plugin validate . --strict
claude plugin validate ./plugin --strict
claude plugin validate plugin/.claude-plugin/plugin.json --strict
claude --plugin-dir ./plugin
```

The root validation checks the marketplace; the other two validation commands
check the isolated plugin and its native manifest.

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

For a local plugin test, copy the **contents** of `plugin/` into
`~/.cursor/plugins/local/e-prime/`, keeping `plugin.json` at that directory's
root, not inside another `plugin/` folder. Do not overwrite an existing plugin
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

1. Keep `package.json`, `plugin/plugin.json`,
   `plugin/.claude-plugin/plugin.json`, and the Cursor catalog entry's version
   aligned. The source prepares `0.1.1`; no npm publication follows from this
   migration. Preserve the existing `0.1.0` tag and artifact. Bump the version
   when releasing skill changes so plugin caches can detect an update.
2. Run the build and host-specific checks above. Native schema validation does
   not prove model behavior; test the skill in each host before advertising
   host-level compatibility.
3. Commit and push the reviewed files to the public repository. Confirm CI
   passes. Do not include secrets, local configuration, or generated artifacts.
4. Submit separately to the directories you want:
   - **Claude:** follow the [submission guide](https://claude.com/docs/plugins/submit)
     and use [Manage directory](https://claude.ai/directory/manage). Set
     **Repository** to `jwmarshall/e-prime`, **Plugin path** to `plugin`, and
     **Branch** to `main`. The guide says the folder source cannot change after
     submission: an existing submitted root-folder listing needs a new
     submission for `plugin`; a draft may still adjust its source. Account,
     submission requirements, and review apply; the repository marketplace
     remains a separate distribution route.
   - **Cursor:** submit the public repository through
     [Publish a plugin](https://cursor.com/marketplace/publish). The root Cursor
     marketplace catalog points to `plugin/`, following the
     [nested-plugin repository format](https://cursor.com/docs/reference/plugins#cursor-multi-plugin-repositories).
     Authenticated portal validation and approval remain separate checks.
   - **OpenAI:** follow the [plugin submission guide](https://developers.openai.com/plugins/deploy/submission).
     ZIP the contents of `plugin/` with `plugin.json`, `README.md`, `LICENSE`,
     and `skills/` at the archive root, then upload to the
     [Plugins portal](https://platform.openai.com/plugins). Native Claude files
     are optional for this ZIP. Do not add a parent folder or include repository
     development tooling. Publisher verification, automated checks, and review
     apply. Publish only after approval. Skill updates require a new ZIP.
5. Follow [the npm release checklist](CONTRIBUTING.md#manual-release-checklist)
   separately if publishing to npm. No workflow submits marketplace listings or
   publishes npm packages automatically.

No manifest guarantees directory acceptance or reserves a public listing name.
Cursor and Codex require host-level installation testing; repository checks
alone cannot certify their discovery or activation behavior.

![E-Prime listing icon](plugin/.claude-plugin/icon.png)

The listing image above uses Markdown image syntax, as required by Claude's
listing warning, rather than a code-formatted path. It supplies a square
512 px PNG under 2 MB. The portal may import the icon only on the first save
or submission; changing the repository image does not update an existing
listing's icon. Confirm the image in the portal before submitting.

Folder-source review scans `plugin/`, leaving development tooling outside
the submitted plugin. Repository-level metadata checks still apply.
The root `scripts/` and `.github/` directories contain maintainer packaging
and CI tooling, not plugin runtime. Neither manifest registers hooks, MCP
servers, or credential configuration; the skill requires none. CLI validation
does not establish portal safety approval or directory acceptance.

## Provider references

- [Agent Plugins manifest schema](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json)
- [Claude plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude plugin reference](https://code.claude.com/docs/en/plugins-reference)
- [Cursor plugin reference](https://cursor.com/docs/reference/plugins)
- [OpenAI plugin packaging and catalogs](https://developers.openai.com/plugins/build/plugins)
