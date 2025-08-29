
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
    .array(z.string())
    .describe(
      "An array of images, as data URIs that must include a MIME type and use Base64 encoding. For videos, these are keyframes. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  platform: z.string().describe('The social media platform (e.g., Instagram, TikTok, Twitter).'),
  niche: z.string().optional().describe('The content niche (e.g., fashion, food, memes).'),
  userInput: z.string().optional().describe('Optional user instructions or context.'),
  vibe: z.string().optional().describe("The desired tone or vibe for the captions (e.g., 'Funny', 'Inspirational')."),
  callToAction: z.string().optional().describe('A specific call-to-action goal for the post (e.g., "Ask a question", "Encourage shares").')
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
  prompt: `You are a social media expert and a brilliant copywriter. Your task is to analyze the provided media and generate 8 distinct and creative caption options for a social media post.

**Media Analysis:**
The provided media is an array of data URIs.
- If the array contains a single image, analyze that image.
- If the array contains multiple images, they represent keyframes extracted from a video. Analyze the sequence of frames to understand the video's narrative, action, and subject.

**Analysis Context:**
- **Platform:** {{platform}}
{{#if niche}}- **Niche:** {{niche}}{{/if}}
{{#if userInput}}- **User Instructions:** {{userInput}}{{/if}}
{{#if vibe}}- **Desired Vibe:** {{vibe}}{{/if}}
{{#if callToAction}}- **Call-to-Action Goal:** {{callToAction}}{{/if}}


**Your Task:**
Based on the visual content and the provided context, generate exactly 8 unique options.
- Each option must have a different "vibe" or "angle". If a specific vibe was requested, ensure some options match it while still offering creative alternatives.
- If a call-to-action was requested, seamlessly integrate it into the captions. For example, if the goal is "Ask an engaging question," end the caption with a relevant question. If the goal is "Promote a link in bio," naturally guide users to check it out.
- For each option, provide:
1.  A one-word "vibe" (e.g., 'Funny', 'Inspirational', 'Witty', 'Minimalist', 'Storytelling').
2.  A compelling caption that matches the vibe.
3.  A relevant, comma-separated string of hashtags.

**Media for Analysis:**
{{#each media}}
{{media url=this}}
{{/each}}

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
