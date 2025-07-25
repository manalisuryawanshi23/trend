
"use client";

import { useState, useEffect, useMemo } from 'react';
import { getTopTrends } from '@/ai/flows/top-trends';
import type { TopTrendsOutput } from '@/ai/flows/top-trends';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from '@/components/platform-icon';
import { Hash, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendDetailDialog } from '@/components/trend-detail-dialog';

export default function TrendingPage() {
  const [trendsData, setTrendsData] = useState<TopTrendsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  useEffect(() => {
    async function fetchTrends() {
      try {
        setIsLoading(true);
        const data = await getTopTrends();
        setTrendsData(data);
      } catch (error) {
        console.error("Failed to fetch trends", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrends();
  }, []);

  const { uniqueNiches, uniquePlatforms, filteredTrends } = useMemo(() => {
    if (!trendsData) return { uniqueNiches: [], uniquePlatforms: [], filteredTrends: [] };

    const trends = trendsData.trends;
    const uniqueNiches = ['all', ...Array.from(new Set(trends.map(t => t.niche)))];
    const uniquePlatforms = ['all', ...Array.from(new Set(trends.map(t => t.platform)))];

    const filtered = trends.filter(trend => {
      const nicheMatch = selectedNiche === 'all' || trend.niche === selectedNiche;
      const platformMatch = selectedPlatform === 'all' || trend.platform === selectedPlatform;
      return nicheMatch && platformMatch;
    });

    const grouped = filtered.reduce((acc, trend) => {
      const { niche } = trend;
      if (!acc[niche]) {
        acc[niche] = [];
      }
      acc[niche].push(trend);
      return acc;
    }, {} as Record<string, typeof trendsData.trends>);

    const sortedAndGrouped = Object.entries(grouped).sort(([, a], [, b]) => b.length - a.length);

    return { uniqueNiches, uniquePlatforms, filteredTrends: sortedAndGrouped };

  }, [trendsData, selectedNiche, selectedPlatform]);

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

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
          What's Trending Now
        </h1>
        <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
          A real-time snapshot of the top emerging trends across the internet, powered by AI.
        </p>
      </header>

      <Card className="p-4 sm:p-6 mb-8 max-w-4xl mx-auto shadow-lg border-2 border-primary/10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <h3 className="font-headline text-lg font-semibold sm:col-span-1 flex items-center gap-2"><Search className="w-5 h-5"/>Filter Trends</h3>
            <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Niche" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueNiches.map(niche => (
                            <SelectItem key={niche} value={niche}>{niche === 'all' ? 'All Niches' : niche}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Platform" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniquePlatforms.map(platform => (
                            <SelectItem key={platform} value={platform}>{platform === 'all' ? 'All Platforms' : platform}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </Card>

      <div className="space-y-12">
        {filteredTrends.length > 0 ? filteredTrends.map(([niche, nicheTrends]) => (
          <section key={niche}>
            <h2 className="font-headline text-2xl font-bold mb-6 inline-block rounded-md bg-muted px-4 py-2">{niche}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {nicheTrends.map((trend) => (
                 <TrendDetailDialog key={trend.trendName} trend={trend}>
                    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border hover:border-primary/50 h-full cursor-pointer">
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
                 </TrendDetailDialog>
              ))}
            </div>
          </section>
        )) : (
            <div className="text-center py-12">
                <p className="text-lg font-semibold">No trends found for the selected filters.</p>
                <p className="text-muted-foreground">Try adjusting your filter criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
}
