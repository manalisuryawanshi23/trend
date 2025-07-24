
'use server';

/**
 * @fileOverview An AI agent that identifies the top trending topics across various niches.
 *
 * - getTopTrends - A function that returns a list of top trends.
 * - TopTrendsOutput - The return type for the getTopTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendSchema = z.object({
    trendName: z.string().describe('The name of the emerging trend.'),
    niche: z.string().describe('The content niche this trend belongs to (e.g., Fashion, Gaming, Food).'),
    description: z.string().describe('A brief, one-sentence description of the trend and why it\'s popular.'),
    platform: z.string().describe('The primary social media platform where this trend is popular (e.g., TikTok, Instagram).'),
    viralityScore: z.number().min(0).max(100).describe('A score from 0-100 indicating the trend\'s current virality.'),
    visualHint: z.string().describe('A one or two-word hint for generating a representative image for this trend (e.g., "neon cityscape", "vintage camera").'),
});

const TopTrendsOutputSchema = z.object({
  trends: z.array(TrendSchema).describe('A list of 12-15 diverse, top-trending topics across different popular niches.'),
});
export type TopTrendsOutput = z.infer<typeof TopTrendsOutputSchema>;

export async function getTopTrends(): Promise<TopTrendsOutput> {
  return topTrendsFlow();
}

const prompt = ai.definePrompt({
  name: 'topTrendsPrompt',
  output: {schema: TopTrendsOutputSchema},
  prompt: `You are a social media trend expert and data analyst with access to real-time social data.

Your task is to identify the top 12-15 emerging trends across a wide variety of popular niches (e.g., Fashion, Food, Gaming, Tech, Comedy, Beauty, AI, Sports, etc.). Do not focus on just one niche; provide a diverse and interesting mix.

For each trend, you must provide:
1.  **trendName**: The name of the trend.
2.  **niche**: The niche it belongs to.
3.  **description**: A short, compelling one-sentence explanation of the trend.
4.  **platform**: The main platform where it is currently trending.
5.  **viralityScore**: A 0-100 score of its current viral potential.
6.  **visualHint**: A 1-2 word hint for a background image (e.g., "scandinavian kitchen", "cyberpunk aesthetic").

Your response must be in JSON format.`,
});

const topTrendsFlow = ai.defineFlow(
  {
    name: 'topTrendsFlow',
    outputSchema: TopTrendsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
