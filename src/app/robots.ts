import type { MetadataRoute } from 'next';

const SITE_URL = 'https://learnitquick.vercel.app';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Don't index Next's internal asset pipeline or 404 page
        disallow: ['/_next/', '/api/', '/404'],
      },
      // Be explicit-friendly to the major crawlers
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' }, // Yahoo
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      // Social-card preview crawlers
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },
      { userAgent: 'WhatsApp', allow: '/' },
      { userAgent: 'Discordbot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
