
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Image as ImageIcon, Sparkles, Wand2 } from "lucide-react";
import Image from "next/image";

import { generateVisualConcept } from "@/ai/flows/generate-visual-concept";
import type { GenerateVisualConceptOutput, GenerateVisualConceptInput } from "@/ai/flows/generate-visual-concept";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { VisualConceptCard } from "@/components/visual-concept-card";

const visualizeFormSchema = z.object({
  trendName: z.string().min(3, "Please enter a trend name."),
  hook: z.string().min(5, "Please enter a hook for your post."),
  caption: z.string().min(10, "Please enter a caption."),
  suggestedPostFormat: z.string({ required_error: "Please select a format." }),
});

const postFormats = [
    "Instagram Reel",
    "TikTok Video",
    "YouTube Short",
    "Instagram Post (Square)",
    "Facebook Post",
    "Twitter Post"
];

export default function VisualizePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{input: GenerateVisualConceptInput, output: GenerateVisualConceptOutput} | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof visualizeFormSchema>>({
    resolver: zodResolver(visualizeFormSchema),
    defaultValues: {
      trendName: "",
      hook: "",
      caption: "",
      suggestedPostFormat: "Instagram Reel",
    }
  });

  async function onSubmit(values: z.infer<typeof visualizeFormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateVisualConcept(values);
       if (output && output.imageUrl) {
        setResult({ input: values, output });
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch(e) {
       console.error(e);
      toast({
        variant: "destructive",
        title: "Error Generating Visual",
        description: "Could not generate the visual concept. The AI may be overloaded, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
                Visualize Your Post
            </h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Turn your post idea into an AI-generated visual concept. See your vision come to life.
            </p>
        </header>

        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Wand2 className="text-primary" /> Visual Concept Generator
              </CardTitle>
              <CardDescription>
                Describe your post idea, and our AI will create an image that captures its essence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                      control={form.control}
                      name="trendName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trend or Theme</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 'Cottagecore Aesthetic'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="suggestedPostFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {postFormats.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                        <FormField
                        control={form.control}
                        name="hook"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Hook (The first 3 seconds)</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 'I found the most magical forest...'" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <FormField
                        control={form.control}
                        name="caption"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe the vibe, the story, or the message of your post." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-bold text-lg py-6 px-8" size="lg">
                    {isLoading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                    {isLoading ? 'Generating...' : 'Generate Visual'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12 max-w-4xl mx-auto">
          {isLoading && (
             <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold mb-6 text-center animate-pulse">🎨 Painting with pixels...</h2>
                <Card className="shadow-md border">
                    <CardHeader>
                        <Skeleton className="h-8 w-3/5" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="w-full aspect-video rounded-md" />
                        <div className="mt-6 space-y-4">
                             <Skeleton className="h-6 w-2/5 mb-2" />
                             <Skeleton className="h-16 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
          )}

          {!isLoading && result && (
             <VisualConceptCard result={result} />
          )}
        </section>
    </div>
  );
}
