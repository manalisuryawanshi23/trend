"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle } from "lucide-react";

import { trendForecasting } from "@/ai/flows/trend-forecasting";
import type { Trend } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendCard } from "@/components/trend-card";
import { useToast } from "@/hooks/use-toast";

const trendFormSchema = z.object({
  platform: z.enum(['Instagram', 'YouTube Shorts', 'TikTok', 'Twitter', 'Facebook'], {
    required_error: "Please select a platform.",
  }),
  niche: z.string().min(2, { message: "Niche must be at least 2 characters." }),
  region: z.string().min(2, { message: "Region must be at least 2 characters." }),
  userType: z.string().min(2, { message: "User type must be at least 2 characters." }),
});

const platforms = ['Instagram', 'YouTube Shorts', 'TikTok', 'Twitter', 'Facebook'] as const;

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);
  const { toast } = useToast();

  const trendForm = useForm<z.infer<typeof trendFormSchema>>({
    resolver: zodResolver(trendFormSchema),
    defaultValues: {
      platform: 'TikTok',
      niche: 'fashion',
      region: 'USA',
      userType: 'Influencer',
    },
  });

  async function onTrendSubmit(values: z.infer<typeof trendFormSchema>) {
    setIsLoadingTrends(true);
    setTrends([]);
    try {
      const result = await trendForecasting(values);
      if (result && result.trends) {
        setTrends(result.trends);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error Forecasting Trends",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoadingTrends(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter">
          Find Your Next Viral Hit
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us about your content, and we'll predict the next big thing for you.
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Forecasting Parameters</CardTitle>
            <CardDescription>
              Fill out the details below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...trendForm}>
              <form onSubmit={trendForm.handleSubmit(onTrendSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={trendForm.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={trendForm.control}
                    name="niche"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niche</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., fashion, gaming" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={trendForm.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., USA, Brazil" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={trendForm.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Influencer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoadingTrends} className="w-full md:w-auto font-bold text-lg py-6 px-8" size="lg">
                  {isLoadingTrends && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                  {isLoadingTrends ? 'Conjuring Trends...' : 'Forecast Trends'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <section className="mt-12">
        {isLoadingTrends && (
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold mb-6 text-center animate-pulse">Scanning the Socialverse...</h2>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-7 w-3/5" />
                  <Skeleton className="h-4 w-1/5" />
                </div>
                 <Skeleton className="h-5 w-4/5 mt-4" />
              </Card>
            ))}
          </div>
        )}

        {!isLoadingTrends && trends.length > 0 && (
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6 text-center">🔥 Top 5 Emerging Trends</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {trends.map((trend, index) => (
                <TrendCard key={index} trend={trend} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
