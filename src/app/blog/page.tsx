
import Link from 'next/link';
import { allPosts } from '@/lib/blog-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Social Media Marketing & Content Strategy',
  description: 'Explore the latest insights, strategies, and tips on social media trends, content creation, and viral marketing from the Up Trend Finder team.',
};

export default function BlogPage() {
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
          The Up Trend Blog
        </h1>
        <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Your source for cutting-edge insights on social media trends, content strategy, and viral marketing.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col">
            <Card className="flex flex-col flex-grow overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex-grow">
                <CardTitle className="font-headline text-xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="pt-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{post.readTime} min read</span>
                <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                  Read More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
