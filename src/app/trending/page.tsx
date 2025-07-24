
import { getTopTrends } from '@/ai/flows/top-trends';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from '@/components/platform-icon';
import type { Metadata } from 'next';
import { Hash } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Trending Now',
  description: 'Discover the hottest trends across every niche, updated in real-time. See what\'s buzzing in fashion, gaming, food, and more with our AI-powered trend dashboard.',
};


export default async function TrendingPage() {
  const { trends } = await getTopTrends();

  // Group trends by niche
  const trendsByNiche = trends.reduce((acc, trend) => {
    const { niche } = trend;
    if (!acc[niche]) {
      acc[niche] = [];
    }
    acc[niche].push(trend);
    return acc;
  }, {} as Record<string, typeof trends>);

  // Sort niches by the number of trends in descending order
  const sortedNiches = Object.entries(trendsByNiche).sort(([, a], [, b]) => b.length - a.length);

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

      <div className="space-y-12">
        {sortedNiches.map(([niche, nicheTrends]) => (
          <section key={niche}>
            <h2 className="font-headline text-2xl font-bold mb-6 inline-block rounded-md bg-muted px-4 py-2">{niche}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {nicheTrends.slice(0, 3).map((trend) => (
                <Card key={trend.trendName} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border hover:border-primary/50">
                  <CardHeader>
                      <div className="flex items-center gap-3">
                         <PlatformIcon platform={trend.platform} className="w-4 h-4 text-muted-foreground" />
                         <Badge variant="outline">{trend.platform}</Badge>
                      </div>
                      <h3 className="font-headline text-xl font-bold pt-2">{trend.trendName}</h3>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{trend.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
                      <div className="flex flex-wrap gap-2 items-center w-full">
                        <Hash className="w-4 h-4 text-muted-foreground"/>
                        {trend.hashtags.split(',').map(tag => (
                            <Badge key={tag.trim()} variant="secondary" className="font-mono text-xs">{tag.trim()}</Badge>
                        ))}
                      </div>
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
          </section>
        ))}
      </div>
    </div>
  );
}

// Enable dynamic rendering for this page
export const revalidate = 0;

