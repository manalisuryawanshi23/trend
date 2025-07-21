import { notFound } from 'next/navigation';
import Image from 'next/image';
import { allPosts } from '@/lib/blog-data';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { type Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Up Trend Finder`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://uptrendfinder.com/blog/${post.slug}`, // Replace with your actual domain
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const awaitedParams = await params;
  const post = allPosts.find((p) => p.slug === awaitedParams.slug);

  if (!post) {
    notFound();
  }

  // A simple markdown-to-HTML converter
  const renderMarkdown = (markdown: string) => {
    return markdown
      .split('\n\n')
      .map((paragraph, index) => {
        // Handle headings (##)
        if (paragraph.startsWith('## ')) {
          return <h2 key={index} className="font-headline text-2xl md:text-3xl font-bold mt-8 mb-4">{paragraph.substring(3)}</h2>;
        }
        // Handle bullet points (*)
        if (paragraph.startsWith('* ')) {
          const listItems = paragraph.split('\n').map((item, i) => (
            <li key={i} className="mb-2">{item.substring(2)}</li>
          ));
          return <ul key={index} className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>;
        }
        // Handle numbered lists (1.)
        if (paragraph.match(/^\d+\.\s/)) {
            const listItems = paragraph.split('\n').map((item, i) => (
                <li key={i} className="mb-2">{item.substring(item.indexOf(' ')+1)}</li>
            ));
            return <ol key={index} className="list-decimal list-inside space-y-2 mb-4">{listItems}</ol>
        }
        // Handle blockquotes (>)
        if (paragraph.startsWith('> ')) {
            return (
                <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                    {paragraph.substring(2)}
                </blockquote>
            );
        }
        // Default to paragraphs
        return <p key={index} className="mb-6 leading-relaxed">{paragraph}</p>;
      })
      .filter(p => p !== null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            {post.title}
          </h1>
          <div className="text-muted-foreground text-sm flex items-center gap-4">
            <span>Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden border">
          <Image
            src={post.image}
            alt={post.title}
            fill
            data-ai-hint={post.imageAiHint}
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          {renderMarkdown(post.content)}
        </div>
      </article>
    </div>
  );
}
