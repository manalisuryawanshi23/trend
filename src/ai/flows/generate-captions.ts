
'use server';

/**
 * @fileOverview An AI-powered caption generator that creates multiple options from an image or video.
 *
 * - generateCaptions - A function that generates caption and hashtag options from media.
 * - GenerateCaptionsInput - The input type for the generateCaptions function.
 * - GenerateCaptionsOutput - The return type for the generateCaptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaptionsInputSchema = z.object({
  media: z
    .string()
    .describe(
      "A photo or video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  platform: z.string().describe('The social media platform (e.g., Instagram, TikTok, Twitter).'),
  niche: z.string().optional().describe('The content niche (e.g., fashion, food, memes).'),
  userInput: z.string().optional().describe('Optional user instructions or context.'),
});
export type GenerateCaptionsInput = z.infer<typeof GenerateCaptionsInputSchema>;

const CaptionOptionSchema = z.object({
    vibe: z.string().describe("The overall tone or vibe of this caption option (e.g., 'Funny', 'Inspirational', 'Witty')."),
    caption: z.string().describe('An engaging caption for the post.'),
    hashtags: z.string().describe('A string of relevant hashtags, separated by commas.'),
});

const GenerateCaptionsOutputSchema = z.object({
  captions: z.array(CaptionOptionSchema).describe('An array of exactly 8 caption and hashtag options.'),
});
export type GenerateCaptionsOutput = z.infer<typeof GenerateCaptionsOutputSchema>;


export async function generateCaptions(input: GenerateCaptionsInput): Promise<GenerateCaptionsOutput> {
  return generateCaptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaptionsPrompt',
  input: {schema: GenerateCaptionsInputSchema},
  output: {schema: GenerateCaptionsOutputSchema},
  templateFormat: 'handlebars',
  prompt: `You are a social media expert and a brilliant copywriter. Your task is to analyze the provided image/video and generate 8 distinct and creative caption options for a social media post.

**Analysis Context:**
- **Platform:** {{platform}}
{{#if niche}}- **Niche:** {{niche}}{{/if}}
{{#if userInput}}- **User Instructions:** {{userInput}}{{/if}}

**Your Task:**
Based on the visual content of the media, generate exactly 8 unique options. Each option must have a different "vibe" or "angle". For each option, provide:
1.  A one-word "vibe" (e.g., 'Funny', 'Inspirational', 'Witty', 'Minimalist', 'Storytelling').
2.  A compelling caption that matches the vibe.
3.  A relevant, comma-separated string of hashtags.

**Media for Analysis:**
{{media url=media}}

Output your response in the required JSON format.`,
});

const generateCaptionsFlow = ai.defineFlow(
  {
    name: 'generateCaptionsFlow',
    inputSchema: GenerateCaptionsInputSchema,
    outputSchema: GenerateCaptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
