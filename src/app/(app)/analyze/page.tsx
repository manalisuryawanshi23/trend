"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Search, Lightbulb, TrendingUp, Target, ThumbsDown, Wand2 } from "lucide-react";

import { analyzePost } from "@/ai/flows/analyze-post";
import type { AnalyzePostOutput } from "@/ai/flows/analyze-post";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const analysisFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzePostOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof analysisFormSchema>>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      url: "",
    }
  });

  async function onSubmit(values: z.infer<typeof analysisFormSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzePost(values);
       if (result) {
        setAnalysisResult(result);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch(e) {
       console.error(e);
      toast({
        variant: "destructive",
        title: "Error Analyzing Post",
        description: "Could not analyze the content from the URL. Please check the link and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
            <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter">
                Deconstruct Any Post
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Paste a link to any social media post to get an AI-powered breakdown of what made it work (or what didn't).
            </p>
        </header>

        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Search className="text-primary" /> Analyze a Social Media Post
              </CardTitle>
              <CardDescription>
                Provide the public URL to a post (e.g., on TikTok, Instagram, Twitter/X).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                     <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.tiktok.com/@user/video/123..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-bold text-lg py-6 px-8" size="lg">
                    {isLoading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                    {isLoading ? 'Analyzing...' : 'Analyze Post'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12 max-w-4xl mx-auto">
          {isLoading && (
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold mb-6 text-center animate-pulse">Deconstructing Viral DNA...</h2>
                <Card className="p-6">
                    <Skeleton className="h-8 w-3/5 mb-4" />
                    <Skeleton className="h-20 w-full" />
                    <Separator className="my-4" />
                    <Skeleton className="h-6 w-2/5 mb-2" />
                    <Skeleton className="h-16 w-full" />
                </Card>
            </div>
          )}

          {!isLoading && analysisResult && (
             <Card className="shadow-md border">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl font-bold text-foreground">
                        Analysis Report
                    </CardTitle>
                    <CardDescription>
                        {analysisResult.isViral ? "This post shows strong signs of virality." : "This post has room for improvement."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-muted-foreground">Virality Score</h3>
                            <span className="font-bold text-2xl text-primary">{analysisResult.viralityScore}<span className="text-sm text-muted-foreground">/100</span></span>
                        </div>
                        <Progress value={analysisResult.viralityScore} className="h-3" />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-semibold flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-primary"/>Key Reasoning</h3>
                        <p className="text-muted-foreground">{analysisResult.reasoning}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-primary"/>Hook Analysis (0-3s)</h3>
                            <p className="text-muted-foreground">{analysisResult.hookAnalysis}</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold flex items-center"><Target className="w-5 h-5 mr-2 text-primary"/>Content & CTA Analysis</h3>
                            <p className="text-muted-foreground">{analysisResult.contentAnalysis}</p>
                            <p className="text-muted-foreground">{analysisResult.ctaAnalysis}</p>
                        </div>
                    </div>
                </CardContent>
                {analysisResult.improvementSuggestions && (
                    <CardFooter className="flex-col items-start gap-4 bg-muted/50 pt-6">
                        <h3 className="font-headline text-xl font-semibold flex items-center"><Wand2 className="w-5 h-5 mr-2 text-accent"/>Improvement Suggestions</h3>
                        <p className="text-muted-foreground">{analysisResult.improvementSuggestions}</p>
                    </CardFooter>
                )}
             </Card>
          )}
        </section>
    </div>
  );
}
