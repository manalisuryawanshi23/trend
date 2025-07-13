'use server';
/**
 * @fileOverview An AI agent that converts content from a URL into a social media post.
 *
 * - urlToPost - A function that takes a URL and generates a social media post.
 * - UrlToPostInput - The input type for the urlToPost function.
 * - UrlToPostOutput - The return type for the urlToPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {AiPostPlanOutput} from './ai-post-plan';

const UrlToPostInputSchema = z.object({
  url: z.string().url().describe('The URL of the content to repurpose.'),
  platform: z.enum([
    'Instagram',
    'YouTube Shorts',
    'TikTok',
    'Twitter',
    'Facebook',
  ]).describe('The social media platform to generate the post for.'),
});
export type UrlToPostInput = z.infer<typeof UrlToPostInputSchema>;

export type UrlToPostOutput = AiPostPlanOutput;

export async function urlToPost(input: UrlToPostInput): Promise<UrlToPostOutput> {
  return urlToPostFlow(input);
}

const urlToPostPrompt = ai.definePrompt({
  name: 'urlToPostPrompt',
  input: {schema: UrlToPostInputSchema},
  output: {schema: z.custom<UrlToPostOutput>()},
  prompt: `You are a social media expert tasked with repurposing content from a URL for a specific platform.

Your task is to analyze the content at the provided URL and create a social media post for {{platform}}.

URL to analyze: {{{url}}}

Your output must be a JSON object containing:
- hook: A captivating hook to grab attention.
- caption: An engaging caption summarizing the key points of the content.
- hashtags: A string of relevant hashtags, separated by commas.
- emojiCombo: A creative combination of emojis.
- suggestedPostFormat: The best format for the post on {{platform}} (e.g., Carousel Post, Tweet, Reel script).

Analyze the content and generate the post plan.
`,
});

const urlToPostFlow = ai.defineFlow(
  {
    name: 'urlToPostFlow',
    inputSchema: UrlToPostInputSchema,
    outputSchema: z.custom<UrlToPostOutput>(),
  },
  async input => {
    const {output} = await urlToPostPrompt(input);
    return output!;
  }
);
