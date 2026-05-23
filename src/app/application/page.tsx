import type { Metadata } from 'next';
import { ApplicationContent } from './content';

export const metadata: Metadata = {
  title: 'Download LearnItQuick for Android',
  description:
    'Get the LearnItQuick math & English learning app for Android phones and tablets. Free, no ads, works offline. Direct APK download.',
  openGraph: {
    title: 'Download LearnItQuick for Android',
    description:
      'Free, offline-friendly math & English app for kids. Direct APK download — no Play Store required.',
    type: 'website',
  },
};

export default function ApplicationPage() {
  return <ApplicationContent />;
}
