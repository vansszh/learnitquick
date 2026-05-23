import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "LearnItQuick - Fun Math Games for Kids",
  description:
    "An interactive educational platform with fun math games and quizzes for first graders. Learn multiplication tables, addition, subtraction, and more!",
  keywords: [
    "math games",
    "educational games",
    "kids learning",
    "multiplication tables",
    "first grade math",
  ],
  authors: [{ name: "LearnItQuick" }],
  openGraph: {
    title: "LearnItQuick - Fun Math Games for Kids",
    description:
      "An interactive educational platform with fun math games and quizzes for first graders.",
    type: "website",
  },
};

// Mobile viewport configuration. `viewportFit: 'cover'` lets the layout
// extend behind notches / device cutouts; we then re-add safe area
// padding in CSS via env(safe-area-inset-*).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FFC93C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎈</text></svg>"
        />
      </head>
      <body className="antialiased min-h-screen text-ink">{children}</body>
    </html>
  );
}
