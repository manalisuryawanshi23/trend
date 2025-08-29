import { type MetadataRoute } from 'next';
import { allPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.uptrendfinder.com';

  const staticRoutes = [
    '',
    '/about',
    '/analyze',
    '/blog',
    '/captions',
    '/contact',
    '/disclaimer',
    '/trending',
    '/privacy-policy',
    '/repurpose',
    '/terms-and-conditions',
    '/visualize',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    // ✅ CHANGED: Removed time part, keeping only date
    lastModified: new Date().toISOString().split('T')[0],  
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogRoutes = allPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    // ✅ CHANGED: Removed time part, keeping only date
    lastModified: new Date(post.date).toISOString().split('T')[0],  
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
