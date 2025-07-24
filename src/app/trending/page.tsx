
"use client";

import { useState, useEffect } from 'react';
import { getTopTrends } from '@/ai/flows/top-trends';
import type { TopTrendsOutput } from '@/ai/flows/top-trends';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlatformIcon } from '@/components/platform-icon';
import { Hash, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrendingPage() {
  const [trendsData, setTrendsData] = useState<TopTrendsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedNiches, setExpandedNiches] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTrends() {
      try {
        setIsLoading(true);
        const data = await getTopTrends();
        setTrendsData(data);
      } catch (error) {
        console.error("Failed to fetch trends", error);
        // Optionally, set an error state to show a message to the user
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrends();
  }, []);

  const toggleNicheExpansion = (niche: string) => {
    setExpandedNiches(prev => 
      prev.includes(niche) 
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    );
  };

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
             <header className="text-center mb-12">
                <Skeleton className="h-14 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </header>
            <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                    <section key={i}>
                        <Skeleton className="h-10 w-48 mb-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, j) => (
                                <Card key={j} className="flex flex-col">
                                    <CardHeader>
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-6 w-full mt-2" />
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <Skeleton className="h-16 w-full" />
                                    </CardContent>
                                    <CardFooter>
                                        <Skeleton className="h-8 w-full" />
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

  if (!trendsData) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="font-headline text-2xl">Could not load trends.</h1>
        <p className="text-muted-foreground">Please try refreshing the page.</p>
      </div>
    );
  }

  // Group trends by niche
  const trendsByNiche = trendsData.trends.reduce((acc, trend) => {
    const { niche } = trend;
    if (!acc[niche]) {
      acc[niche] = [];
    }
    acc[niche].push(trend);
    return acc;
  }, {} as Record<string, typeof trendsData.trends>);

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
        {sortedNiches.map(([niche, nicheTrends]) => {
          const isExpanded = expandedNiches.includes(niche);
          const trendsToShow = isExpanded ? nicheTrends : nicheTrends.slice(0, 3);
          
          return (
            <section key={niche}>
              <h2 className="font-headline text-2xl font-bold mb-6 inline-block rounded-md bg-muted px-4 py-2">{niche}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trendsToShow.map((trend) => (
                  <Card key={trend.trendName} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border hover:border-primary/50">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                           <PlatformIcon platform={trend.platform} className="w-4 h-4 text-muted-foreground" />
                           <Badge variant="outline">{trend.platform}</Badge>
                        </div>
                        <h3 className="font-headline text-xl font-bold pt-2">{trend.trendName}</h3>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{trend.description}</div>
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
              {nicheTrends.length > 3 && (
                <div className="text-center mt-6">
                  <Button variant="outline" onClick={() => toggleNicheExpansion(niche)}>
                    {isExpanded ? "Show Less" : "Show More"}
                    {isExpanded 
                        ? <ChevronUp className="w-4 h-4 ml-2" /> 
                        : <ChevronDown className="w-4 h-4 ml-2" />
                    }
                  </Button>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  );
}
