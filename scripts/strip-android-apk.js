/* eslint-disable */
/**
 * After `cap sync`, Capacitor copies the entire `public/` folder
 * (including `learnitquick.apk`) into `android/app/src/main/assets/public/`,
 * which would re-bundle the APK inside the new APK and double its size.
 *
 * This script removes that recursive copy. Safe to run anytime.
 */

const fs = require('node:fs');
const path = require('node:path');

const target = path.join(
  __dirname,
  '..',
  'android',
  'app',
  'src',
  'main',
  'assets',
  'public',
  'learnitquick.apk'
);

if (fs.existsSync(target)) {
  fs.unlinkSync(target);
  console.log(`Stripped APK from Android assets: ${path.relative(process.cwd(), target)}`);
}
