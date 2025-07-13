"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Sparkles } from "lucide-react";

import { urlToPost } from "@/ai/flows/url-to-post";
import type { AiPostPlan } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AiPostCard } from "@/components/ai-post-card";
import { useToast } from "@/hooks/use-toast";

const urlFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  platform: z.enum(['Instagram', 'YouTube Shorts', 'TikTok', 'Twitter', 'Facebook'], {
    required_error: "Please select a platform.",
  }),
});

const platforms = ['Instagram', 'YouTube Shorts', 'TikTok', 'Twitter', 'Facebook'] as const;

export default function RepurposePage() {
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);
  const [repurposedPost, setRepurposedPost] = useState<AiPostPlan | null>(null);
  const { toast } = useToast();

  const urlForm = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
      platform: "Twitter"
    }
  });

  async function onUrlSubmit(values: z.infer<typeof urlFormSchema>) {
    setIsLoadingFromUrl(true);
    setRepurposedPost(null);
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
    <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
            <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter">
                Repurpose Content with AI
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Paste any URL (blog post, news article) to magically turn it into a social media post.
            </p>
        </header>

        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="text-accent" /> Create a Post from a URL
              </CardTitle>
              <CardDescription>
                Provide a URL and a target platform below.
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

        <section className="mt-12">
          {isLoadingFromUrl && (
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold mb-6 text-center animate-pulse">Scanning the Socialverse...</h2>
                <Card className="p-6 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-7 w-3/5" />
                    </div>
                    <Skeleton className="h-5 w-4/5 mt-4" />
                    <Skeleton className="h-5 w-3/5 mt-2" />
                </Card>
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
  );
}
