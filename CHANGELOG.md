# Changelog

## Unreleased

- Prepare version 0.1.1 by migrating the canonical skill and plugin manifests
  into `plugin/`, isolating submissions from development tooling while
  preserving npm's six installed paths and root-checkout Pi/omp installation.
  No npm publication; the existing 0.1.0 tag and artifact remain unchanged.
- Isolate development npm subprocesses from inherited credentials and user
  configuration; run packing and smoke installation offline.
- Disable lifecycle scripts in the README's npm installation command and
  separate maintainer checks from plugin installation guidance.
- Add a 512 px PNG Claude listing icon and document repository-review boundaries.

## 0.1.0 — 2026-11-14

- Portable E-Prime skill with evidence-scoped claims, protected technical
  literals, and user-controlled activation.
- Installation guidance for Pi, omp, and filesystem-based skill hosts.
- Public package metadata and a README with examples, scope, and limitations.
- Dependency-free package validation, offline install checks, and tarball builds.
- Cross-platform CI and draft GitHub releases with SHA-256 checksums; npm
  publication remains manual.
- Agent Plugins manifest for Cursor and Codex, plus Claude Code's native plugin
  manifest and repository marketplace. A Codex catalog exposes the same skill.
- Marketplace publishing guidance and build checks for manifest versions,
  catalog sources, and opt-in installation.
- Self-contained dark-mode E-Prime introduction, installation guide, and
  expectations page with mint and lavender accents and a commit-pinned GitHub
  Pages deployment workflow.
