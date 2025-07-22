
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the mission, vision, and team behind Up Trend Finder. Discover how we use AI to empower content creators and social media managers.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            About Up Trend Finder
          </h1>
          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            Uncovering tomorrow&apos;s viral trends, today.
          </p>
        </header>

        <article className="prose prose-lg dark:prose-invert mx-auto space-y-6">
          <h2 className="font-headline text-3xl font-semibold">Our Mission</h2>
          <p>
            In the fast-paced world of social media, staying ahead of the curve is everything. At Up Trend Finder, our mission is to empower content creators, social media managers, and businesses with the predictive insights they need to succeed. We believe that with the right data and a touch of AI magic, anyone can catch the next big wave before it goes viral.
          </p>

          <h2 className="font-headline text-3xl font-semibold">What We Do</h2>
          <p>
            Up Trend Finder is an AI-powered suite of tools designed to demystify the art of going viral. We leverage advanced machine learning models to analyze real-time social data, search behavior, and emerging patterns across major platforms. Our tools help you:
          </p>
          <ul>
            <li>
              <strong>Forecast Trends:</strong> Predict what content formats, sounds, and topics are about to take off in your specific niche and region.
            </li>
            <li>
              <strong>Repurpose Content:</strong> Magically transform any URL—like a blog post or news article—into multiple social media posts tailored for different platforms.
            </li>
            <li>
              <strong>Analyze Posts:</strong> Deconstruct the success (or failure) of any social media post to understand what makes content resonate with audiences.
            </li>
             <li>
              <strong>Visualize Ideas:</strong> Turn your post concepts into AI-generated visual mockups to see your vision come to life.
            </li>
          </ul>

          <h2 className="font-headline text-3xl font-semibold">Our Story</h2>
          <p>
            Up Trend Finder was born from a simple observation: the most successful creators don&apos;t just follow trends—they anticipate them. We saw a gap between raw social data and actionable creative strategy. Our team of data scientists, AI engineers, and social media experts came together to build a platform that bridges that gap, making high-level trend forecasting accessible to everyone.
          </p>

          <h2 className="font-headline text-3xl font-semibold">Who We&apos;re For</h2>
          <p>
            Whether you&apos;re an aspiring influencer, a small business owner, a marketing agency, or just someone passionate about creating great content, Up Trend Finder is built for you. Our goal is to level the playing field, giving you the advantage you need to grow your audience and make an impact.
          </p>
        </article>
      </div>
    </div>
  );
}
