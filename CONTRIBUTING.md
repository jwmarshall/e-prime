# Contributing and releasing

## Local checks

Use Node.js 22+ and npm. This repository has no runtime or development
npm dependencies, so neither `npm install` nor a lockfile is needed.

```sh
npm test
npm run build
```

Both commands validate package metadata, the canonical skill's current
frontmatter shape, relative Markdown link destinations in shipped files, and
an exact six-file package allowlist. They create a real npm tarball, install it
in an isolated temporary project offline with lifecycle scripts disabled, and
compare every installed file with the source. Temporary files are removed.
The npm subprocesses use a temporary home, cache, and empty user/global npm
configuration, with an allowlisted environment rather than inherited secrets.
Both packing and installation run offline with lifecycle scripts disabled.
`npm run build` also writes the tarball and `SHA256SUMS` to `dist/`.
Older local tarballs remain there; the checksum describes only the latest build.

They also check the Git-distributed plugin manifests and catalogs: names,
publisher metadata, version alignment, repository-root sources, and opt-in
installation. These bounded checks are not full provider schema validators.
See [marketplace publishing](MARKETPLACES.md) for native validation and testing.

There is no compilation step. Do not add a bundler, generated skill copy, or
runtime dependency just to package Markdown. Build scripts and development
records must not ship to consumers. If package contents intentionally change,
update the allowlist in `scripts/package.mjs` and the README together.

## Changes and bug reports

- Keep the canonical skill in `skills/e-prime/` and its required references
  self-contained. `references/` at the repository root contains development
  history, not installable policy.
- Preserve technical literals, meaning, opt-in activation, and authority
  boundaries when proposing policy edits.
- Include the host and version, activation scope, a minimal prompt, expected
  behavior, and observed output in behavior reports. Redact secrets and private
  source material before opening a public issue.
- Distinguish static/package checks from actual model or host trials. A passing
  build does not prove grammar compliance or reliable agent behavior.
- Update the README or changelog for user-visible changes. Do not rewrite
  historical trial results to imply that a new revision passed them.

## CI

Pull requests and pushes to `main` run package builds and offline install
checks on Linux and Windows with Node.js 22 and 24. CI also runs actionlint
against all workflows and retains one build artifact for 14 days.

Actions use commit-pinned revisions and read-only permissions by default.
Dependabot proposes GitHub Actions updates weekly. The actionlint binary and
its checksum are pinned in `ci.yml`; update both together when upgrading it.
Only the tag-triggered release job has `contents: write`. The Pages deployment
job has `pages: write` and `id-token: write` for GitHub Pages, not npm publishing.
No workflow needs an npm token or an npm environment.

Repository owners should enable a `main` branch ruleset requiring pull requests
and the four `Package / Node …` checks plus `Workflow lint`, and restrict `v*`
tag creation to maintainers. These GitHub settings require owner configuration;
workflow files alone do not enforce them.

## GitHub Pages

`docs/index.html` contains the complete public site, including its styles.
No JavaScript, external fonts, frontend dependencies, or compilation required.
Keep installation instructions and limitations aligned with the README.

Preview locally with Python 3:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

Open `http://127.0.0.1:8000/` and check desktop and narrow mobile layouts,
navigation anchors, and each installation disclosure. Stop the server with
Ctrl-C. The HTML also works directly from disk.

To deploy:

1. In the repository's **Settings → Pages → Build and deployment**, choose
   **GitHub Actions** as the source.
2. Push the page and `.github/workflows/pages.yml` to `main`. The workflow
   deploys changes to `docs/` or itself; **Actions → GitHub Pages → Run workflow**
   on `main` also triggers a deployment.
3. Check the deployment's environment URL. With the default project-site
   settings, the URL is `https://jwmarshall.github.io/e-prime/`.

The workflow uploads only `docs/` and deploys through the `github-pages`
environment. Configure any required environment approvals in GitHub settings.
It never publishes to npm. Local preview and workflow lint do not establish
that a live Pages deployment succeeded.

## Manual release checklist

### 1. Prepare a reviewed version

1. Choose an unused npm version and update `package.json`. For a subsequent
   release, `npm version patch --no-git-tag-version` updates the version without
   creating a commit or tag. The initial release already uses `0.1.0`.
   Set the same version in `plugin.json` and `.claude-plugin/plugin.json`.
   The build rejects version drift; the catalogs inherit plugin metadata.
   Bump these versions whenever publishing skill changes so plugin updaters
   do not retain the old policy.
2. Move the relevant changelog entries under the version and release date.
3. Run `npm run build`, review the output, and merge the reviewed changes to
   `main`. Wait for all CI checks on that commit to pass.
4. From that clean, up-to-date commit, create and push the matching tag:

   ```sh
   git tag -a v0.1.0 -m "Release v0.1.0"
   git push origin v0.1.0
   ```

Replace `0.1.0` in the examples with the release version. The release workflow
rejects a tag that does not exactly match `v` plus `package.json`'s version.
Do not move released tags or reuse published npm versions.

### 2. Inspect the draft and download its exact tarball

The tag workflow builds and smoke-installs the package, then creates a **draft**
GitHub release containing the tarball, `SHA256SUMS`, and generated notes.
Prerelease versions (for example `0.2.0-rc.1`) produce prerelease drafts.
Nothing is published to npm.

Using an authenticated GitHub CLI, download assets into a new directory outside
the checkout (or use the draft release page):

```sh
mkdir e-prime-release-0.1.0
cd e-prime-release-0.1.0
gh release download v0.1.0 --repo jwmarshall/e-prime \
  --pattern '*.tgz' --pattern SHA256SUMS

# macOS; on Linux use: sha256sum --check SHA256SUMS
shasum -a 256 -c SHA256SUMS
tar -tzf jwmarshall-e-prime-0.1.0.tgz
npm publish ./jwmarshall-e-prime-0.1.0.tgz --dry-run --ignore-scripts \
  --access public --registry https://registry.npmjs.org/
```

Confirm the six-file inventory in the README, version, license, and release
notes. Publish this checked tarball, not a newly packed working directory.
A dry run does not establish npm name availability or publishing permission.

### 3. Publish to npm yourself

Publication requires access to the `@jwmarshall` scope and the authentication
or two-factor approval required by npm for your account. Authenticate locally;
do not commit credentials or add an npm publishing token to GitHub Actions.

```sh
npm login --registry https://registry.npmjs.org/
npm whoami --registry https://registry.npmjs.org/
npm publish ./jwmarshall-e-prime-0.1.0.tgz --ignore-scripts \
  --access public --registry https://registry.npmjs.org/
```

For prereleases, add `--tag next` to both the dry run and actual publish command
so the prerelease does not replace `latest`.

After publication:

```sh
npm view @jwmarshall/e-prime@0.1.0 version dist.integrity \
  --registry https://registry.npmjs.org/
```

Review the generated GitHub release notes and publish the draft through the
GitHub release page. For the first release, remove the README's prepublication
qualifiers once the package is available. Verify discovery and invocation in
your actual host before announcing host-specific compatibility.

No release or publication occurs merely by running local checks. This workflow
deliberately does not configure automatic npm publishing or npm provenance.

Git marketplaces distribute from the repository independently of npm. Follow
[the marketplace checklist](MARKETPLACES.md#publishing-checklist) before
submitting to provider directories. A push, GitHub release, or npm publication
does not submit or approve any official marketplace listing.
