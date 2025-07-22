
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Image as ImageIcon, Sparkles, Wand2, Copy, Check, Hash, Video } from "lucide-react";
import Image from "next/image";

import { generateCaptions } from "@/ai/flows/generate-captions";
import type { GenerateCaptionsOutput, GenerateCaptionsInput } from "@/ai/flows/generate-captions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'AI Caption Generator',
//   description: 'Generate 8 unique, creative caption and hashtag ideas for your social media posts. Upload an image or video and let our AI do the writing for you.',
// };


const platforms = ['Instagram', 'TikTok', 'Twitter / X', 'Facebook', 'LinkedIn', 'Pinterest'];
const vibes = ['Funny', 'Inspirational', 'Witty', 'Professional', 'Casual', 'Storytelling', 'Minimalist', 'Bold', 'Other'];
const ctaGoals = [
    'Ask an engaging question',
    'Encourage comments',
    'Encourage shares',
    'Drive profile visits',
    'Promote a link in bio',
    'Other'
];


const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_MEDIA_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/quicktime", // .mov
];


const captionsFormSchema = z.object({
  platform: z.string({ required_error: "Please select a platform." }),
  userInput: z.string().optional(),
  vibe: z.string().optional(),
  otherVibe: z.string().optional(),
  callToAction: z.string().optional(),
  otherCallToAction: z.string().optional(),
  media: z.any()
    .refine(files => files?.length === 1, "An image or video file is required.")
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE_BYTES, `Max file size is ${MAX_FILE_SIZE_MB}MB.`)
    .refine(
      files => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      "Only JPG, PNG, GIF, WEBP, MP4, MOV, and WEBM formats are supported."
    ),
});

function CaptionCard({ vibe, caption, hashtags }: { vibe: string; caption: string; hashtags: string; }) {
    const [copiedCaption, setCopiedCaption] = useState(false);
    const [copiedHashtags, setCopiedHashtags] = useState(false);

    const handleCopy = (text: string, type: 'caption' | 'hashtags') => {
        navigator.clipboard.writeText(text);
        if (type === 'caption') {
            setCopiedCaption(true);
            setTimeout(() => setCopiedCaption(false), 2000);
        } else {
            setCopiedHashtags(true);
            setTimeout(() => setCopiedHashtags(false), 2000);
        }
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <Badge variant="secondary">{vibe}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                 <div>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold">Caption</p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleCopy(caption, 'caption')} aria-label="Copy caption">
                                        {copiedCaption ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Copy Caption</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <p className="text-muted-foreground text-sm">{caption}</p>
                 </div>
                 <Separator />
                 <div>
                     <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold">Hashtags</p>
                         <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                     <Button variant="ghost" size="icon" onClick={() => handleCopy(hashtags, 'hashtags')} aria-label="Copy hashtags">
                                        {copiedHashtags ? <Check className="h-4 w-4 text-green-500" /> : <Hash className="h-4 w-4" />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Copy Hashtags</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <p className="text-sm font-mono text-primary/80 break-words">{hashtags}</p>
                 </div>
            </CardContent>
        </Card>
    );
}

export default function CaptionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateCaptionsOutput | null>(null);
  const [preview, setPreview] = useState<{url: string, type: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof captionsFormSchema>>({
    resolver: zodResolver(captionsFormSchema),
    defaultValues: {
      platform: "Instagram",
      userInput: "",
      vibe: "",
      otherVibe: "",
      callToAction: "",
      otherCallToAction: "",
    }
  });

  const selectedVibe = form.watch("vibe");
  const selectedCta = form.watch("callToAction");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("media", event.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
            url: reader.result as string,
            type: file.type
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      form.setValue("media", null);
    }
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  async function onSubmit(values: z.infer<typeof captionsFormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const mediaFile = values.media[0];
      const mediaDataUri = await toBase64(mediaFile);

      const input: GenerateCaptionsInput = {
        media: mediaDataUri,
        platform: values.platform,
        userInput: values.userInput,
        vibe: values.vibe === 'Other' ? values.otherVibe : values.vibe,
        callToAction: values.callToAction === 'Other' ? values.otherCallToAction : values.callToAction,
      };

      const output = await generateCaptions(input);
       if (output && output.captions) {
        setResult(output);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch(e) {
       console.error(e);
      toast({
        variant: "destructive",
        title: "Error Generating Captions",
        description: "Could not generate captions. The AI may be overloaded or the media file could not be processed.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
                AI Caption Generator
            </h1>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload media, add some direction, and our AI will write 8 unique caption options for you in seconds.
            </p>
        </header>

        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-2 border-primary/20">
                <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="text-primary" /> Create Captions from Media
                </CardTitle>
                <CardDescription>
                    Upload an image or video to get started. Optionally, provide some context for better results.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="media"
                                    render={() => (
                                    <FormItem>
                                        <FormLabel>Image or Video</FormLabel>
                                        <FormControl>
                                            <div 
                                                className="w-full aspect-video border-2 border-dashed border-muted-foreground/50 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept={ACCEPTED_MEDIA_TYPES.join(',')}
                                                />
                                                {preview ? (
                                                    preview.type.startsWith('image/') ? (
                                                        <Image src={preview.url} alt="Image preview" width={300} height={168} className="max-h-full w-auto object-contain rounded-md" />
                                                    ) : (
                                                        <video src={preview.url} controls className="max-h-full w-auto object-contain rounded-md" />
                                                    )
                                                ) : (
                                                    <div className="space-y-2">
                                                        <div className="flex gap-4">
                                                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                                            <Video className="h-12 w-12 text-muted-foreground" />
                                                        </div>
                                                        <p className="font-semibold">Click to upload an image or video</p>
                                                        <p className="text-xs text-muted-foreground">MP4, MOV, GIF, etc up to {MAX_FILE_SIZE_MB}MB</p>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
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
                            name="userInput"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Optional Context / Instructions</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 'A funny take for my foodie followers'" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="vibe"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Vibe / Tone (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a vibe (optional)" />
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
                             {selectedVibe === 'Other' && (
                               <FormField
                                control={form.control}
                                name="otherVibe"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Your Vibe</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 'Nostalgic and dreamy'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            )}
                            <FormField
                            control={form.control}
                            name="callToAction"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Call to Action Goal (Optional)</FormLabel>
                                 <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a CTA goal (optional)" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {ctaGoals.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             {selectedCta === 'Other' && (
                                <FormField
                                 control={form.control}
                                 name="otherCallToAction"
                                 render={({ field }) => (
                                     <FormItem>
                                     <FormLabel>Your CTA</FormLabel>
                                     <FormControl>
                                         <Input placeholder="e.g., 'Check out my new song'" {...field} />
                                     </FormControl>
                                     <FormMessage />
                                     </FormItem>
                                 )}
                                 />
                             )}
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-bold text-lg py-6 px-8" size="lg">
                            {isLoading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                            {isLoading ? 'Generating Captions...' : 'Generate Captions'}
                        </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>

        <section className="mt-12 max-w-6xl mx-auto">
          {isLoading && (
             <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold text-center animate-pulse">✨ AI is writing...</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader><div className="h-6 w-20 bg-muted rounded-md"></div></CardHeader>
                            <CardContent className="space-y-2">
                                <div className="h-4 w-full bg-muted rounded-md"></div>
                                <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                                <div className="h-4 w-3/4 bg-muted rounded-md"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
          )}

          {!isLoading && result && (
             <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold text-center">Your AI-Generated Captions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {result.captions.map((caption, index) => (
                       <CaptionCard key={index} {...caption} />
                    ))}
                </div>
             </div>
          )}
        </section>
    </div>
  );
}
