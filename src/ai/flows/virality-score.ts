'use server';

/**
 * @fileOverview A virality score AI agent.
 *
 * - viralityScore - A function that handles the virality score generation process.
 * - ViralityScoreInput - The input type for the viralityScore function.
 * - ViralityScoreOutput - The return type for the viralityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ViralityScoreInputSchema = z.object({
  platform: z
    .string()
    .describe("Platform the trend is on (e.g., Instagram, YouTube Shorts, TikTok, Twitter, Facebook)."),
  niche: z.string().describe("Niche of the trend (e.g., fashion, food, memes, finance, gaming, fitness)."),
  region: z.string().describe("Region where the trend is occurring."),
  userType: z.string().describe("Type of user (e.g., Influencer, business, student, meme page, educator)."),
  trendName: z.string().describe("Name of the trend."),
  trendReason: z.string().describe("Reason the trend is rising."),
  googleTrendsLink: z.string().describe("Link to the Google Trends data for the trend."),
});
export type ViralityScoreInput = z.infer<typeof ViralityScoreInputSchema>;

const ViralityScoreOutputSchema = z.object({
  viralityScore: z
    .number()
    .describe("Virality score of the trend, from 0 to 100, based on social and search indicators."),
  reasoning: z
    .string()
    .describe("Explanation of why the trend received the virality score."),
});
export type ViralityScoreOutput = z.infer<typeof ViralityScoreOutputSchema>;

export async function viralityScore(input: ViralityScoreInput): Promise<ViralityScoreOutput> {
  return viralityScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'viralityScorePrompt',
  input: {schema: ViralityScoreInputSchema},
  output: {schema: ViralityScoreOutputSchema},
  prompt: `You are an expert social media data scientist that determines the virality score of a trend between 0 and 100 based on a combination of factors.

Factors include the platform the trend is on, its niche, the region it is occurring in, the type of user, the trend name, the reason it is rising, and its google trends data.

Platform: {{{platform}}}
Niche: {{{niche}}}
Region: {{{region}}}
User Type: {{{userType}}}
Trend Name: {{{trendName}}}
Trend Reason: {{{trendReason}}}
Google Trends Link: {{{googleTrendsLink}}}

Give the trend a virality score between 0 and 100, and include reasoning for why it received this score.
`,
});

const viralityScoreFlow = ai.defineFlow(
  {
    name: 'viralityScoreFlow',
    inputSchema: ViralityScoreInputSchema,
    outputSchema: ViralityScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
