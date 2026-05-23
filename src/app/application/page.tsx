import type { Metadata } from 'next';
import { ApplicationContent } from './content';
import { JsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://learnitquick.vercel.app';

export const metadata: Metadata = {
  title: 'Download LearnItQuick for Android — Free APK, No Play Store Needed',
  description:
    'Direct APK download of the LearnItQuick math & English learning app for Android phones and tablets. 4.5 MB, free, no ads, works offline, no signup. Sideload-able — no Play Store required.',
  keywords: [
    'learnitquick apk',
    'kids math apk',
    'kids english apk',
    'first grade learning apk',
    'free educational apk',
    'sideload kids app',
    'download learnitquick',
    'learnitquick android',
    'apk no play store',
    'offline kids learning app',
  ],
  alternates: { canonical: '/application/' },
  openGraph: {
    title: 'Download LearnItQuick for Android — APK',
    description:
      'Free, offline-friendly math & English app for kids. Direct APK download — no Play Store required, no signup, no ads.',
    url: `${SITE_URL}/application/`,
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download LearnItQuick for Android',
    description: 'Free APK · 4.5 MB · No ads · No signup · Offline',
    images: ['/og-image.png'],
  },
};

const applicationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/application/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Download App',
          item: `${SITE_URL}/application/`,
        },
      ],
    },
    {
      '@type': ['SoftwareApplication', 'MobileApplication', 'EducationalApplication'],
      '@id': `${SITE_URL}/application/#app`,
      name: 'LearnItQuick',
      alternateName: 'Learn It Quick',
      description:
        'Educational math and English game for first graders. 16 game modes, free, no ads, works fully offline.',
      url: `${SITE_URL}/application/`,
      image: `${SITE_URL}/og-image.png`,
      downloadUrl: `${SITE_URL}/learnitquick.apk`,
      installUrl: `${SITE_URL}/application/`,
      fileSize: '4.5 MB',
      softwareVersion: '0.1.0',
      operatingSystem: 'Android 7.0 and up',
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'Educational Game',
      releaseNotes: 'Initial release with 8 math modes and 8 English modes.',
      genre: ['Educational', 'Quiz', 'Math', 'English', 'Kids'],
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'kids',
      },
      typicalAgeRange: '5-7',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/learnitquick.apk`,
      },
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
  ],
};

export default function ApplicationPage() {
  return (
    <>
      <JsonLd data={applicationJsonLd} />
      <ApplicationContent />
    </>
  );
}
