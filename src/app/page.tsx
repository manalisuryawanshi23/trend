"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Sparkles } from "lucide-react";

import { trendForecasting } from "@/ai/flows/trend-forecasting";
import { urlToPost } from "@/ai/flows/url-to-post";
import type { Trend, AiPostPlan } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendCard } from "@/components/trend-card";
import { AiPostCard } from "@/components/ai-post-card";
import { useToast } from "@/hooks/use-toast";

const trendFormSchema = z.object({
  platform: z.enum(['Instagram', 'YouTube Shorts', 'TikTok', 'Twitter', 'Facebook'], {
    required_error: "Please select a platform.",
  }),
  niche: z.string().min(2, { message: "Niche must be at least 2 characters." }),
  region: z.string().min(2, { message: "Region must be at least 2 characters." }),
  userType: z.string().min(2, { message: "User type must be at least 2 characters." }),
});

const urlFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
   platform: z.enum(['Instagram', 'YouTube Shorts', 'TikTok', 'Twitter', 'Facebook'], {
    required_error: "Please select a platform.",
  }),
});

const platforms = ['Instagram', 'YouTube Shorts', 'TikTok', 'Twitter', 'Facebook'] as const;

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);
  const [repurposedPost, setRepurposedPost] = useState<AiPostPlan | null>(null);
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

  const urlForm = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
      platform: "Twitter"
    }
  });

  async function onTrendSubmit(values: z.infer<typeof trendFormSchema>) {
    setIsLoadingTrends(true);
    setTrends([]);
    setRepurposedPost(null);
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

  async function onUrlSubmit(values: z.infer<typeof urlFormSchema>) {
    setIsLoadingFromUrl(true);
    setRepurposedPost(null);
    setTrends([]);
    try {
      const result = await urlToPost(values);
       if (result) {
        setRepurposedPost(result);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch(e) {
       console.error(e);
      toast({
        variant: "destructive",
        title: "Error Generating Post",
        description: "Could not fetch or process the content from the URL. Please check the link and try again.",
      });
    } finally {
      setIsLoadingFromUrl(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Trend Seer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Uncover tomorrow's viral trends today. Our AI analyzes real-time data to give you the ultimate creative edge.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Find Your Next Viral Hit</CardTitle>
              <CardDescription>
                Tell us about your content, and we'll predict the next big thing for you.
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

          <Card className="shadow-lg border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="text-accent" /> Repurpose Content with AI
              </CardTitle>
              <CardDescription>
                Paste any URL (blog post, news article) to magically turn it into a social media post.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...urlForm}>
                <form onSubmit={urlForm.handleSubmit(onUrlSubmit)} className="space-y-8">
                  <div className="space-y-6">
                     <FormField
                      control={urlForm.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://your-blog.com/awesome-article" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={urlForm.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Platform</FormLabel>
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
                  </div>
                  <Button type="submit" disabled={isLoadingFromUrl} className="w-full md:w-auto font-bold text-lg py-6 px-8 bg-accent hover:bg-accent/90" size="lg">
                    {isLoadingFromUrl && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                    {isLoadingFromUrl ? 'Reading & Creating...' : 'Generate Post'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <section>
          {(isLoadingTrends || isLoadingFromUrl) && (
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold mb-6 text-center animate-pulse">Scanning the Socialverse...</h2>
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6">
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
              <div className="space-y-4">
                {trends.map((trend, index) => (
                  <TrendCard key={index} trend={trend} />
                ))}
              </div>
            </div>
          )}

          {!isLoadingFromUrl && repurposedPost && (
             <div>
              <h2 className="font-headline text-3xl font-bold mb-6 text-center">✨ Your AI-Generated Post</h2>
              <div className="max-w-4xl mx-auto">
                <AiPostCard postPlan={repurposedPost} />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
