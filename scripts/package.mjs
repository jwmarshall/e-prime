import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, posix } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const build = process.argv[2] === '--build';
assert(process.argv.length === (build ? 3 : 2), 'Usage: npm test or npm run build');
assert(process.env.npm_execpath, 'Run through npm test or npm run build');

const expectedFiles = [
  'LICENSE',
  'README.md',
  'package.json',
  'skills/e-prime/SKILL.md',
  'skills/e-prime/references/harnesses.md',
  'skills/e-prime/references/standing-policy.md',
].sort();
const source = (path) => readFileSync(join(root, path), 'utf8');
const pkg = JSON.parse(source('package.json'));
assert.equal(pkg.name, '@jwmarshall/e-prime');
assert.equal(pkg.license, 'MIT');
assert.equal(pkg.private, undefined, 'Package must remain publishable');
assert.equal(pkg.publishConfig.access, 'public');
assert.equal(pkg.publishConfig.registry, 'https://registry.npmjs.org/');
assert.deepEqual(pkg.pi.skills, ['./skills']);
assert.equal(pkg.bin, undefined, 'The skill must not expose an executable');
for (const field of ['dependencies', 'optionalDependencies', 'peerDependencies', 'devDependencies']) {
  assert.equal(Object.keys(pkg[field] ?? {}).length, 0, `Unexpected ${field}`);
}
for (const hook of ['preinstall', 'install', 'postinstall', 'prepare']) {
  assert.equal(pkg.scripts?.[hook], undefined, `Unexpected lifecycle hook: ${hook}`);
}
if (process.env.RELEASE_TAG !== undefined) {
  assert.equal(process.env.RELEASE_TAG, `v${pkg.version}`, 'Release tag must match package.json version');
}

// Check the current folded-scalar frontmatter, not a general YAML grammar.
const skill = source('skills/e-prime/SKILL.md');
assert.match(skill, /^---\r?\nname: e-prime\r?\ndescription: >\r?\n(?:  .+\r?\n)+---\r?\n/,
  'Expected e-prime name and a nonempty folded description');

for (const path of expectedFiles.filter((file) => file.endsWith('.md'))) {
  for (const [, href] of source(path).matchAll(/\]\(([^\s)]+)\)/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(href)) continue;
    const target = posix.normalize(posix.join(posix.dirname(path), decodeURIComponent(href.split('#')[0])));
    assert(expectedFiles.includes(target), `${path}: local link must ship in the package: ${href}`);
  }
}

const temporary = mkdtempSync(join(tmpdir(), 'e-prime-package-'));
function npm(args, cwd = root) {
  const result = spawnSync(process.execPath, [process.env.npm_execpath, ...args], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, npm_config_update_notifier: 'false' },
  });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `npm ${args[0]} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

try {
  const [packed] = JSON.parse(npm(['pack', '--ignore-scripts', '--json', '--pack-destination', temporary]));
  assert.equal(packed.name, pkg.name);
  assert.equal(packed.version, pkg.version);
  assert.deepEqual(packed.files.map(({ path }) => path).sort(), expectedFiles,
    'Package contents changed: review missing files or unintended disclosures');
  const tarball = join(temporary, packed.filename);

  // Exercise the actual consumer path without network access or lifecycle scripts.
  const consumer = join(temporary, 'consumer');
  mkdirSync(consumer);
  writeFileSync(join(consumer, 'package.json'), '{"name":"e-prime-smoke","private":true}\n');
  npm(['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', tarball], consumer);
  const installed = join(consumer, 'node_modules', '@jwmarshall', 'e-prime');
  for (const path of expectedFiles) {
    assert.equal(readFileSync(join(installed, path), 'utf8'), source(path), `Installed file differs: ${path}`);
  }
  console.log(`Validated ${pkg.name}@${pkg.version}: ${expectedFiles.length} files; local links and offline install passed.`);

  if (build) {
    const dist = join(root, 'dist');
    mkdirSync(dist, { recursive: true });
    // Keep older artifacts intact; release builds run in a fresh checkout.
    copyFileSync(tarball, join(dist, packed.filename));
    const hash = createHash('sha256').update(readFileSync(tarball)).digest('hex');
    writeFileSync(join(dist, 'SHA256SUMS'), `${hash}  ${packed.filename}\n`);
    console.log(`Built dist/${packed.filename} and dist/SHA256SUMS`);
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
