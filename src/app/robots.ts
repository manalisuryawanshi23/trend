
import { type MetadataRoute } from 'next';

// IMPORTANT: Replace this with your actual domain
const siteUrl = 'https://www.uptrendfinder.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
