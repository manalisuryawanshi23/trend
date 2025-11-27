
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Sparkles, Copy, Check, Music } from "lucide-react";

import { generatePov } from "@/ai/flows/generate-pov";
import type { GeneratePovOutput } from "@/ai/flows/generate-pov";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const vibes = ['Funny', 'Dramatic', 'Relatable', 'Wholesome', 'Cringe', 'Sarcastic', 'Heartwarming', 'Chaotic'];
const languages = ['English', 'Hinglish'];

const povFormSchema = z.object({
  description: z.string().min(10, "Please describe the POV scenario.").max(200, "Description is too long."),
  vibe: z.string({ required_error: "Please select a vibe." }),
  language: z.enum(['English', 'Hinglish'], { required_error: "Please select a language." }),
  includeSong: z.boolean().default(true),
  includeEmojis: z.boolean().default(true),
  userInputSong: z.string().optional(),
});

function PovResultCard({ caption, songSuggestion }: { caption: string, songSuggestion?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(caption);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex-grow space-y-2">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{caption}</p>
                    {songSuggestion && (
                         <div className="flex items-center gap-2 text-xs text-primary/80">
                            <Music className="h-3 w-3" />
                            <p>{songSuggestion}</p>
                        </div>
                    )}
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy caption">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
            </CardContent>
        </Card>
    );
}

export default function PovPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratePovOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof povFormSchema>>({
    resolver: zodResolver(povFormSchema),
    defaultValues: {
      description: "",
      vibe: "Funny",
      language: "English",
      includeSong: true,
      includeEmojis: true,
      userInputSong: "",
    }
  });

  async function onSubmit(values: z.infer<typeof povFormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generatePov(values);
      if (output && output.povs) {
        setResult(output);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch(e) {
       console.error(e);
      toast({
        variant: "destructive",
        title: "Error Generating POVs",
        description: "Could not generate captions. The AI may be overloaded, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
                AI POV Caption Generator
            </h1>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Describe a scenario, pick a vibe, and let our AI write the perfect POV caption and suggest a song.
            </p>
        </header>

        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="text-primary" /> Generate POV Ideas
              </CardTitle>
              <CardDescription>
                Fill in the details below to get started. The more specific your scenario, the better the results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>POV Scenario</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g., 'A dog watching its owner leave for work' or 'You're the main character in a movie'" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                          control={form.control}
                          name="userInputSong"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Song/Lyric Idea (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 'Running up that hill...' or 'As It Was by Harry Styles'" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        name="language"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row space-x-4 pt-2"
                                >
                                {languages.map(lang => (
                                    <FormItem key={lang} className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={lang} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {lang}
                                    </FormLabel>
                                    </FormItem>
                                ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="includeEmojis"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
                        <FormField
                            control={form.control}
                            name="includeSong"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                    Suggest a Song/Lyric
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
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-bold text-lg py-6 px-8" size="lg">
                    {isLoading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                    {isLoading ? 'Writing POVs...' : 'Generate POVs'}
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
                <h2 className="font-headline text-3xl font-bold text-center">Your AI-Generated POV Captions</h2>
                <div className="space-y-3">
                    {result.povs.map((option, index) => (
                       <PovResultCard key={index} {...option} />
                    ))}
                </div>
             </div>
          )}
        </section>
    </div>
  );
}
