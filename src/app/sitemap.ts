
import { type MetadataRoute } from 'next';
import { allPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANT: Replace this with your actual domain
  const siteUrl = 'https://www.uptrendfinder.com';

  // Generate URLs for all static pages
  const staticRoutes = [
    '',
    '/about',
    '/analyze',
    '/blog',
    '/captions',
    '/contact',
    '/disclaimer',
    '/privacy-policy',
    '/repurpose',
    '/terms-and-conditions',
    '/visualize',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Generate URLs for all blog posts
  const blogRoutes = allPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
