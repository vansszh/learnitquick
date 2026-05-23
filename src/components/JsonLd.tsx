/**
 * Inline a JSON-LD structured-data block. Used from server components
 * (e.g. page.tsx and layout.tsx) so the resulting <script> appears in
 * the static HTML and is fully crawlable.
 *
 * Usage:
 *   <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', ... }} />
 *
 * Multiple schemas can be combined into a graph:
 *   <JsonLd data={{ '@context': 'https://schema.org', '@graph': [a, b, c] }} />
 */
export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
);
