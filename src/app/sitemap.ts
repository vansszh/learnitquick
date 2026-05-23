import type { MetadataRoute } from 'next';

const SITE_URL = 'https://learnitquick.vercel.app';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/application/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
