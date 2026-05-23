/* eslint-disable */
/**
 * After `cap sync`, Capacitor copies the entire `public/` folder
 * (and several Next.js auto-generated icon variants) into
 * `android/app/src/main/assets/public/`. Several of those files are
 * pure web concerns and just bloat the APK with no benefit:
 *
 *   - learnitquick.apk        (recursive — would double the APK size)
 *   - og-image.png            (only displayed in social-card previews)
 *   - icon-192.png            (PWA install icon, native Android uses mipmap)
 *   - icon-512.png            (same)
 *   - apple-touch-icon.png    (iOS home-screen icon, irrelevant in WebView)
 *   - icon.png / apple-icon.png  (Next.js icon convention copies of the
 *                                 1254x1254 source — ~1 MB each, web-only)
 *   - manifest.webmanifest    (PWA manifest, irrelevant in WebView)
 *
 * Removing them keeps the APK lean (~4.5 MB instead of 10+ MB) without
 * affecting the website at all (out/ still has them).
 */

const fs = require('node:fs');
const path = require('node:path');

const assetsRoot = path.join(
  __dirname,
  '..',
  'android',
  'app',
  'src',
  'main',
  'assets',
  'public'
);

const dropList = [
  'learnitquick.apk',
  'og-image.png',
  'icon-192.png',
  'icon-512.png',
  'icon.png',
  'apple-icon.png',
  'apple-touch-icon.png',
  'manifest.webmanifest',
];

let totalStripped = 0;
let totalBytes = 0;
for (const name of dropList) {
  const target = path.join(assetsRoot, name);
  if (fs.existsSync(target)) {
    totalBytes += fs.statSync(target).size;
    fs.unlinkSync(target);
    totalStripped++;
  }
}

if (totalStripped > 0) {
  const mb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(
    `Stripped ${totalStripped} web-only asset(s) from Android bundle (${mb} MB freed).`
  );
}
