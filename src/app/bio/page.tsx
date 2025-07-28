
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Sparkles, Copy, Check } from "lucide-react";

import { generateBio } from "@/ai/flows/generate-bio";
import type { GenerateBioOutput } from "@/ai/flows/generate-bio";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const platforms = ['Instagram', 'Twitter / X', 'LinkedIn', 'Facebook', 'TikTok', 'Pinterest'];
const vibes = ['Professional', 'Witty', 'Inspirational', 'Casual', 'Friendly', 'Bold', 'Minimalist'];

const bioFormSchema = z.object({
  platform: z.string({ required_error: "Please select a platform." }),
  name: z.string().min(2, "Please enter your name or brand name."),
  description: z.string().min(10, "Please provide a brief description."),
  vibe: z.string({ required_error: "Please select a vibe." }),
  includeEmojis: z.boolean().default(true),
  callToAction: z.string().optional(),
});

function BioResultCard({ bio }: { bio: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(bio);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">{bio}</p>
                <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy bio">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
            </CardContent>
        </Card>
    );
}

export default function BioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateBioOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bioFormSchema>>({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      platform: "Instagram",
      name: "",
      description: "",
      vibe: "Professional",
      includeEmojis: true,
      callToAction: "",
    }
  });

  async function onSubmit(values: z.infer<typeof bioFormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateBio(values);
      if (output && output.bios) {
        setResult(output);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch(e) {
       console.error(e);
      toast({
        variant: "destructive",
        title: "Error Generating Bios",
        description: "Could not generate bios. The AI may be overloaded, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
                AI Social Media Bio Generator
            </h1>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Describe yourself or your brand, and our AI will craft 5 unique bios tailored for any platform.
            </p>
        </header>

        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="text-primary" /> Generate Your Bio
              </CardTitle>
              <CardDescription>
                Fill in the details below to get started. The more context you provide, the better the results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
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
                     <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name / Brand Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Describe Yourself or Your Brand</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g., 'I'm a software engineer who loves sharing AI tips and drinking coffee.' or 'We sell handmade, sustainable jewelry.'" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                      control={form.control}
                      name="vibe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vibe / Tone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a vibe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vibes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="callToAction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Call-to-Action (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., '👇 Shop my new collection'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                        control={form.control}
                        name="includeEmojis"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 md:col-span-2">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                Include Emojis
                                </FormLabel>
                                <FormMessage />
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-bold text-lg py-6 px-8" size="lg">
                    {isLoading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                    {isLoading ? 'Generating Bios...' : 'Generate Bios'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12 max-w-4xl mx-auto">
          {isLoading && (
             <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold text-center animate-pulse">✨ AI is writing...</h2>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i} className="bg-muted/50 p-4 animate-pulse">
                            <div className="h-5 w-4/5 bg-muted rounded-md"></div>
                        </Card>
                    ))}
                </div>
            </div>
          )}

          {!isLoading && result && (
             <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold text-center">Your AI-Generated Bios</h2>
                <div className="space-y-3">
                    {result.bios.map((option, index) => (
                       <BioResultCard key={index} bio={option.bio} />
                    ))}
                </div>
             </div>
          )}
        </section>
    </div>
  );
}
