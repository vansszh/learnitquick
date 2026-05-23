/* eslint-disable */
/**
 * One-shot Android APK builder.
 *
 * Usage:
 *   node scripts/build-apk.js debug      → app-debug.apk    (unsigned, for testing)
 *   node scripts/build-apk.js release    → app-release.apk  (unsigned release; sign separately)
 *
 * Requires the portable JDK + Android SDK already installed under
 *   %USERPROFILE%\dev-tools\
 * (See README / first-time setup.) Sets up env vars automatically.
 */

const { execSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const variant = (process.argv[2] || 'debug').toLowerCase();
if (!['debug', 'release'].includes(variant)) {
  console.error('Usage: node scripts/build-apk.js [debug|release]');
  process.exit(1);
}

const tools = path.join(os.homedir(), 'dev-tools');
const jdkDir = fs
  .readdirSync(tools, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name.startsWith('jdk-21'))
  .map((d) => path.join(tools, d.name))[0];

if (!jdkDir) {
  console.error(
    `\n✗ JDK 21 not found at ${tools}.\n` +
    `Run the one-time install steps first (see README).\n`
  );
  process.exit(1);
}

const androidHome = path.join(tools, 'android-sdk');
if (!fs.existsSync(androidHome)) {
  console.error(`\n✗ Android SDK not found at ${androidHome}.\n`);
  process.exit(1);
}

process.env.JAVA_HOME = jdkDir;
process.env.ANDROID_HOME = androidHome;
process.env.ANDROID_SDK_ROOT = androidHome;
process.env.PATH = [
  path.join(jdkDir, 'bin'),
  path.join(androidHome, 'cmdline-tools', 'latest', 'bin'),
  path.join(androidHome, 'platform-tools'),
  process.env.PATH || '',
].join(path.delimiter);

const repoRoot = path.resolve(__dirname, '..');

function run(cmd, opts = {}) {
  console.log(`\n▸ ${cmd}\n`);
  execSync(cmd, { stdio: 'inherit', cwd: opts.cwd || repoRoot, env: process.env });
}

console.log(`Building APK (${variant})…`);
console.log(`  JAVA_HOME=${process.env.JAVA_HOME}`);
console.log(`  ANDROID_HOME=${process.env.ANDROID_HOME}`);

run('npm run build');
run('npx cap sync android');
run('node scripts/strip-android-apk.js');

const gradleTask = variant === 'debug' ? 'assembleDebug' : 'assembleRelease';
const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
run(`${gradlew} ${gradleTask} --no-daemon`, { cwd: path.join(repoRoot, 'android') });

const apkSrc = path.join(
  repoRoot,
  'android',
  'app',
  'build',
  'outputs',
  'apk',
  variant,
  `app-${variant}.apk`
);
if (!fs.existsSync(apkSrc)) {
  console.error(`\n✗ Expected APK not produced at ${apkSrc}`);
  process.exit(1);
}

const distDir = path.join(repoRoot, 'dist-apk');
fs.mkdirSync(distDir, { recursive: true });
const apkDest = path.join(distDir, `learnitquick-${variant}.apk`);
fs.copyFileSync(apkSrc, apkDest);

const sizeMB = (fs.statSync(apkDest).size / (1024 * 1024)).toFixed(2);
console.log(`\n✔ APK ready: ${apkDest}  (${sizeMB} MB)\n`);
if (variant === 'release') {
  console.log(
    'Note: this is an UNSIGNED release APK. To distribute, sign it with apksigner:\n' +
    '  apksigner sign --ks <your.keystore> --out signed.apk learnitquick-release.apk\n'
  );
}
