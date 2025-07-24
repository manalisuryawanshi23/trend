
import { getTopTrends } from '@/ai/flows/top-trends';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlatformIcon } from '@/components/platform-icon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Trending Now',
  description: 'Discover the hottest trends across every niche, updated in real-time. See what\'s buzzing in fashion, gaming, food, and more with our AI-powered trend dashboard.',
};

export default async function TrendingPage() {
  const { trends } = await getTopTrends();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
          What&apos;s Trending Now
        </h1>
        <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
          A real-time snapshot of the top emerging trends across the internet, powered by AI.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trends.map((trend) => (
          <Card key={trend.trendName} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={`https://placehold.co/600x400.png`}
                  data-ai-hint={trend.visualHint}
                  alt={`Visual for ${trend.trendName}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="flex items-center gap-1.5">
                        <PlatformIcon platform={trend.platform} className="w-3.5 h-3.5" />
                        {trend.platform}
                    </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 space-y-2">
              <p className="text-sm font-semibold text-primary">{trend.niche}</p>
              <h2 className="font-headline text-lg font-bold">{trend.trendName}</h2>
              <p className="text-sm text-muted-foreground">{trend.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="w-full">
                    <div className="flex justify-between items-center mb-1 text-xs font-medium">
                        <span className="text-muted-foreground">Virality Score</span>
                        <span className="text-primary">{trend.viralityScore}</span>
                    </div>
                    <Progress value={trend.viralityScore} className="h-2" />
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Enable dynamic rendering for this page
export const revalidate = 0;
