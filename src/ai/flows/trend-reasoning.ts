// trend-reasoning.ts
'use server';
/**
 * @fileOverview Provides reasoning behind why a trend is predicted to rise, including the Google Trends keyword link and any viral audio/sound.
 *
 * - trendReasoning - A function that provides reasoning behind a trend.
 * - TrendReasoningInput - The input type for the trendReasoning function.
 * - TrendReasoningOutput - The return type for the trendReasoning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendReasoningInputSchema = z.object({
  platform: z.string().describe('Social media platform (e.g., Instagram, TikTok).'),
  niche: z.string().describe('Content niche (e.g., fashion, food).'),
  region: z.string().describe('User selected country or location.'),
  trend: z.string().describe('The predicted trend to analyze.'),
});
export type TrendReasoningInput = z.infer<typeof TrendReasoningInputSchema>;

const TrendReasoningOutputSchema = z.object({
  reasoning: z.string().describe('Explanation of why the trend is rising.'),
  googleTrendsLink: z.string().describe('Link to Google Trends keyword data.'),
  viralAudioSound: z.string().optional().describe('Name or ID of viral audio/sound, if applicable.'),
});
export type TrendReasoningOutput = z.infer<typeof TrendReasoningOutputSchema>;

export async function trendReasoning(input: TrendReasoningInput): Promise<TrendReasoningOutput> {
  return trendReasoningFlow(input);
}

const trendReasoningPrompt = ai.definePrompt({
  name: 'trendReasoningPrompt',
  input: {schema: TrendReasoningInputSchema},
  output: {schema: TrendReasoningOutputSchema},
  prompt: `You are a social media trend expert. Explain why the following trend is predicted to rise on {{platform}} in the {{niche}} niche, specifically in {{region}}. Provide a Google Trends link related to the trend.

Trend: {{trend}}
\nYour Output Should Include:
1.  Reason Why It’s Rising – short insight (e.g., celebrity event, movie release, seasonal topic)
2.  Google Trends Keyword Link or keyword(s) used to detect the trend
3.  If applicable: Viral Audio/Sound name or ID`,
});

const trendReasoningFlow = ai.defineFlow(
  {
    name: 'trendReasoningFlow',
    inputSchema: TrendReasoningInputSchema,
    outputSchema: TrendReasoningOutputSchema,
  },
  async input => {
    const {output} = await trendReasoningPrompt(input);
    return output!;
  }
);
