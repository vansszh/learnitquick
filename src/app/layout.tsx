import type { Metadata, Viewport } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-body',
});

const SITE_URL = 'https://learnitquick.vercel.app';
const SITE_NAME = 'LearnItQuick';
const DEFAULT_TITLE = 'LearnItQuick — Free Math & English Games for Kids (Grade 1)';
const DEFAULT_DESCRIPTION =
  'Free, ad-free, login-free educational quizzes for first graders. Master multiplication tables, addition, subtraction, spelling, phonics, rhymes, opposites and more. Play online or install the Android APK — works completely offline.';

const KEYWORDS = [
  // Math keywords
  'math games for kids',
  'first grade math',
  '1st grade math games',
  'multiplication tables for kids',
  'times tables practice',
  'addition games',
  'subtraction games',
  'carry forward addition',
  'compare numbers',
  'number patterns kids',
  'counting games',
  // English keywords
  'spelling games for kids',
  'phonics games',
  'rhyming words for kids',
  'opposites for kids',
  'synonyms for kids',
  'plurals practice',
  'first grade english games',
  'kids reading games',
  // Generic
  'free educational games',
  'kids learning app',
  'no ads kids app',
  'offline learning app',
  'first grader app',
  'grade 1 quiz',
  'math quiz kids',
  'multiplayer math game',
  // Brand / dev
  'learnitquick',
  'learn it quick',
  'vansszh',
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s — LearnItQuick',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: 'Vansszh', url: 'https://x.com/vansszh_' }],
  creator: 'Vansszh',
  publisher: 'Vansszh',
  generator: 'Next.js',
  category: 'education',
  classification: 'Educational software for children',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LearnItQuick — Free math and English games for first graders',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: '@vansszh_',
    site: '@vansszh_',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
    date: false,
  },
  // Paste the verification code from Google Search Console here:
  //   verification: { google: 'YOUR-CODE-HERE' }
  verification: {
    google: '',
    other: {
      // 'msvalidate.01': 'YOUR-BING-CODE',
      // 'yandex-verification': 'YOUR-YANDEX-CODE',
    },
  },
  appleWebApp: {
    capable: true,
    title: 'LearnItQuick',
    statusBarStyle: 'default',
  },
  other: {
    // Hint to crawlers and tools about the audience
    'rating': 'general',
    'distribution': 'global',
    'audience': 'children, kids, students, parents, teachers',
    'subject': 'first grade math and english education',
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'application-name': 'LearnItQuick',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFC93C' },
    { media: '(prefers-color-scheme: dark)', color: '#FFC93C' },
  ],
  colorScheme: 'light',
};

// Site-wide structured data: WebSite + Organization + Person (author)
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Vansszh',
      url: 'https://x.com/vansszh_',
      sameAs: [
        'https://x.com/vansszh_',
        'https://www.linkedin.com/in/vansszh/',
      ],
      email: 'mailto:vansszh@gmail.com',
      jobTitle: 'Software Developer',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
        width: 1254,
        height: 1254,
      },
      founder: { '@id': `${SITE_URL}/#person` },
      sameAs: [
        'https://x.com/vansszh_',
        'https://www.linkedin.com/in/vansszh/',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        {/* next/font/google handles font preconnect/preload automatically.
            Site-wide JSON-LD goes here so it's part of every page. */}
        <JsonLd data={siteJsonLd} />
      </head>
      <body className="antialiased min-h-screen text-ink">{children}</body>
    </html>
  );
}
