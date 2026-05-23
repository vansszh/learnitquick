import type { Metadata } from 'next';
import { GameApp } from '@/components/GameApp';
import { JsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://learnitquick.vercel.app';

export const metadata: Metadata = {
  // Home page-specific overrides — the layout already supplies sensible defaults,
  // these tighten the title / description for organic clicks.
  title: 'Free Math & English Games for First Graders — Play Online or Offline',
  description:
    'Multiplication tables, addition, spelling, phonics and more — 16 game modes for first graders, free, no ads, no signup. Play online or download the Android app.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Free Math & English Games for First Graders — LearnItQuick',
    description:
      '16 educational game modes covering grade 1 math and English. Free, ad-free, login-free. Play in your browser or install the Android app.',
    url: SITE_URL,
    type: 'website',
    images: ['/og-image.png'],
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['WebApplication', 'EducationalApplication', 'Game'],
      '@id': `${SITE_URL}/#webapp`,
      name: 'LearnItQuick',
      alternateName: 'Learn It Quick',
      description:
        'Free educational quiz game for first graders covering math (multiplication tables, addition, subtraction, comparison, counting, number patterns, word problems, carry forward) and English (spelling, rhyming words, opposites, synonyms, phonics, missing letter, plurals, picture matching).',
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      inLanguage: 'en',
      isAccessibleForFree: true,
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'Educational Game',
      operatingSystem: 'Web Browser, Android',
      browserRequirements: 'Requires a modern browser with JavaScript enabled.',
      genre: ['Educational', 'Quiz', 'Math', 'English', 'Kids'],
      educationalLevel: 'Grade 1',
      educationalUse: ['Practice', 'Assessment', 'Self-paced learning'],
      learningResourceType: ['Game', 'Quiz', 'Flashcard'],
      teaches: [
        'Multiplication tables 1-10',
        'Single and double-digit addition',
        'Subtraction',
        'Comparison of numbers (less than, greater than, equal)',
        'Carry-forward addition',
        'Counting',
        'Number patterns and sequences',
        'Word problems',
        'Spelling',
        'Rhyming words',
        'Opposites (antonyms)',
        'Synonyms',
        'Phonics and letter sounds',
        'Missing letters',
        'Plurals',
        'Picture-word matching',
      ],
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'kids',
      },
      typicalAgeRange: '5-7',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: 'Free',
      },
      aggregateRating: undefined, // populate when real reviews exist
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'PlayAction',
        target: SITE_URL,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is LearnItQuick free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, completely free. No ads, no in-app purchases, no signup, no email required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What grade level is LearnItQuick for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is designed for first graders (ages 5-7), with easy / medium / hard difficulty for each game so kids can grow into harder content.',
          },
        },
        {
          '@type': 'Question',
          name: 'What math topics does LearnItQuick cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Times tables 1-10, addition, subtraction, comparison (< = >), carry-forward addition, counting, word problems, and number patterns.',
          },
        },
        {
          '@type': 'Question',
          name: 'What English topics does LearnItQuick cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Spelling, rhyming words, opposites, synonyms, letter sounds (phonics), missing letters, plurals, and picture-word matching.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I play LearnItQuick offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Android app works fully offline. The website also works offline once it has loaded once, since all logic runs in the browser.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there an Android app?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Visit /application on the website to download the APK. You install it directly on your phone — no Play Store account needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does LearnItQuick collect personal data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. There is no signup, no analytics, no tracking. Player names, avatars and coins are stored only on the device using browser localStorage.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <GameApp />
    </>
  );
}
