import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully self-contained static site in `out/`.
  // This lets us drop the build straight into a WebView (Capacitor)
  // for an Android APK, or host it on any plain static file server.
  output: "export",

  // Required for `output: 'export'` if any <Image> ever creeps in.
  // We use SVGs/emojis today, but this keeps the build resilient.
  images: { unoptimized: true },

  // Use `/route/index.html` instead of `/route.html` so the file://
  // scheme inside the Android WebView can resolve every page.
  trailingSlash: true,
};

export default nextConfig;
