
import { getTopTrends } from '@/ai/flows/top-trends';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from '@/components/platform-icon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Trending Now',
  description: 'Discover the hottest trends across every niche, updated in real-time. See what\'s buzzing in fashion, gaming, food, and more with our AI-powered trend dashboard.',
};

// Simple hash function to generate a number from a string for color generation
const stringToHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const generateGradient = (seed: string) => {
    const hash = stringToHash(seed);
    const h1 = Math.abs(hash) % 360;
    const h2 = (h1 + 90) % 360; // Ensure a nice color shift
    const s = 70;
    const l1 = 85;
    const l2 = 95;
  
    return `radial-gradient(circle, hsl(${h1}, ${s}%, ${l1}%), hsl(${h2}, ${s}%, ${l2}%))`;
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
              <div className="relative aspect-video" style={{ background: generateGradient(trend.trendName) }}>
                <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="flex items-center gap-1.5 bg-background/60 backdrop-blur-sm">
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
