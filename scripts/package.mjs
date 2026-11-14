import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, posix } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pluginRoot = join(root, 'plugin');
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
assert.deepEqual(pkg.pi.skills, ['./plugin/skills']);
assert.deepEqual(pkg.files, ['plugin/skills/e-prime/']);
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

// Keep the consumer's npm layout independent of the repository's plugin folder.
const packageMetadata = { ...pkg, files: ['skills/e-prime/'], pi: { skills: ['./skills'] } };
delete packageMetadata.scripts;
const packageContent = (path) => path === 'package.json'
  ? `${JSON.stringify(packageMetadata, null, 2)}\n`
  : source(path.startsWith('skills/') ? `plugin/${path}` : path);

function filesIn(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory()) return filesIn(join(directory, entry.name), `${path}/`);
    assert(entry.isFile(), `${path}: distribution entries must be regular files, not symlinks`);
    return [path];
  }).sort();
}

const pluginFiles = [
  '.claude-plugin/icon.png',
  '.claude-plugin/plugin.json',
  'LICENSE',
  'README.md',
  'plugin.json',
  ...expectedFiles.filter((path) => path.startsWith('skills/')),
].sort();
assert.deepEqual(filesIn(pluginRoot), pluginFiles,
  'Plugin contents changed: keep development tooling and unrelated files outside the installable folder');
assert.equal(source('plugin/LICENSE'), source('LICENSE'), 'Plugin must carry the project license');

// Git-distributed plugins share the npm skill without copying its policy.
const manifestKeys = new Set([
  '$schema', 'name', 'version', 'description', 'author', 'homepage',
  'repository', 'license', 'keywords',
]);
for (const path of ['plugin/plugin.json', 'plugin/.claude-plugin/plugin.json']) {
  const manifest = JSON.parse(source(path));
  assert.equal(manifest.name, 'e-prime', `${path}: plugin namespace must match the skill`);
  assert.equal(manifest.version, pkg.version, `${path}: version must match package.json`);
  assert.equal(manifest.license, pkg.license, `${path}: license must match package.json`);
  assert.equal(manifest.author.name, pkg.author, `${path}: publisher must match package.json`);
  assert.equal(typeof manifest.description, 'string', `${path}: description must be text`);
  assert(manifest.description.trim(), `${path}: description must not be empty`);
  assert.equal(manifest.homepage, pkg.homepage, `${path}: homepage must match package.json`);
  assert.equal(manifest.repository, 'https://github.com/jwmarshall/e-prime');
  assert(Array.isArray(manifest.keywords) && manifest.keywords.every((tag) => typeof tag === 'string'));
  for (const key of Object.keys(manifest)) {
    assert(manifestKeys.has(key), `${path}: review unexpected field ${key}; this plugin only bundles skills`);
  }
}
assert.equal(JSON.parse(source('plugin/plugin.json')).$schema,
  'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');

const claudeCatalog = JSON.parse(source('.claude-plugin/marketplace.json'));
const codexCatalog = JSON.parse(source('.agents/plugins/marketplace.json'));
const cursorCatalog = JSON.parse(source('.cursor-plugin/marketplace.json'));
for (const catalog of [claudeCatalog, codexCatalog, cursorCatalog]) {
  assert.equal(catalog.name, 'jwmarshall-e-prime');
  assert.equal(catalog.plugins.length, 1, 'The marketplace must distribute only this plugin');
  assert.equal(catalog.plugins[0].name, 'e-prime', 'Marketplace entry must resolve the plugin name');
}
assert.equal(claudeCatalog.owner.name, pkg.author);
assert.equal(claudeCatalog.plugins[0].source, './plugin', 'Claude marketplace must resolve the plugin folder');
assert.deepEqual(codexCatalog.plugins[0].source, { source: 'local', path: './plugin' },
  'Codex marketplace must resolve the plugin folder');
assert.equal(codexCatalog.plugins[0].policy.installation, 'AVAILABLE', 'Plugin installation must remain opt-in');
assert.equal(codexCatalog.plugins[0].policy.authentication, 'ON_INSTALL');
assert.equal(codexCatalog.plugins[0].category, 'Productivity');
assert.equal(cursorCatalog.owner.name, pkg.author);
assert.equal(cursorCatalog.plugins[0].source, 'plugin', 'Cursor marketplace must resolve the plugin folder');
for (const field of ['version', 'description', 'homepage', 'license']) {
  assert.equal(cursorCatalog.plugins[0][field], pkg[field], `Cursor catalog ${field} must match package.json`);
}
assert.equal(cursorCatalog.plugins[0].author.name, pkg.author);
assert.equal(cursorCatalog.plugins[0].repository, 'https://github.com/jwmarshall/e-prime');

// Check the current folded-scalar frontmatter, not a general YAML grammar.
const skill = source('plugin/skills/e-prime/SKILL.md');
assert.match(skill, /^---\r?\nname: e-prime\r?\ndescription: >\r?\n(?:  .+\r?\n)+---\r?\n/,
  'Expected e-prime name and a nonempty folded description');

function checkLinks(files, content) {
  for (const path of files.filter((file) => file.endsWith('.md'))) {
    for (const [, href] of content(path).matchAll(/\]\(([^\s)]+)\)/g)) {
      if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(href)) continue;
      const target = posix.normalize(posix.join(posix.dirname(path), decodeURIComponent(href.split('#')[0])));
      assert(files.includes(target), `${path}: local link must stay inside the distribution: ${href}`);
    }
  }
}
checkLinks(expectedFiles, packageContent);
checkLinks(pluginFiles, (path) => source(`plugin/${path}`));

const temporary = mkdtempSync(join(tmpdir(), 'e-prime-package-'));
// Development checks never need the caller's credentials or npm configuration.
const npmEnvironment = {
  HOME: temporary,
  USERPROFILE: temporary,
  TMPDIR: temporary,
  TMP: temporary,
  TEMP: temporary,
  npm_config_cache: join(temporary, 'cache'),
  npm_config_userconfig: join(temporary, 'user.npmrc'),
  npm_config_globalconfig: join(temporary, 'global.npmrc'),
  npm_config_offline: 'true',
  npm_config_ignore_scripts: 'true',
  npm_config_update_notifier: 'false',
};
// Preserve only executable lookup and Windows process-startup settings.
for (const key of ['PATH', 'SystemRoot', 'WINDIR', 'ComSpec', 'PATHEXT']) {
  if (process.env[key] !== undefined) npmEnvironment[key] = process.env[key];
}
function npm(args, cwd = root) {
  const result = spawnSync(process.execPath, [process.env.npm_execpath, ...args], {
    cwd,
    encoding: 'utf8',
    env: npmEnvironment,
  });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `npm ${args[0]} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

try {
  writeFileSync(npmEnvironment.npm_config_userconfig, '');
  writeFileSync(npmEnvironment.npm_config_globalconfig, '');
  const staging = join(temporary, 'package');
  for (const path of expectedFiles) {
    const destination = join(staging, path);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, packageContent(path));
  }
  const [packed] = JSON.parse(npm(['pack', '--ignore-scripts', '--json', '--pack-destination', temporary], staging));
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
    assert.equal(readFileSync(join(installed, path), 'utf8'), packageContent(path), `Installed file differs: ${path}`);
  }
  console.log(`Validated ${pkg.name}@${pkg.version}: marketplace manifests, ${expectedFiles.length} npm files, local links, and offline install passed.`);

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
