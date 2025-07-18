'use server';

/**
 * @fileOverview An AI agent that provides a detailed analysis of why a social media trend is emerging.
 *
 * - trendReasoning - A function that provides a detailed reasoning for a trend.
 * - TrendReasoningInput - The input type for the trendReasoning function.
 * - TrendReasoningOutput - The return type for the trendReasoning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendReasoningInputSchema = z.object({
  trendName: z.string().describe('The name of the trend to analyze.'),
  platform: z.string().describe('The social media platform.'),
  niche: z.string().describe('The content niche.'),
  region: z.string().describe('The geographical region.'),
});
export type TrendReasoningInput = z.infer<typeof TrendReasoningInputSchema>;

const TrendReasoningOutputSchema = z.object({
  reasoning: z.string().describe('A detailed explanation of why the trend is rising, citing cultural context, events, or other factors.'),
  googleTrendsLink: z.string().describe('A full, working URL to the Google Trends page for a relevant keyword.'),
  viralAudioSound: z.string().optional().describe('The name or ID of a viral audio/sound associated with the trend, if applicable.'),
});
export type TrendReasoningOutput = z.infer<typeof TrendReasoningOutputSchema>;

export async function trendReasoning(input: TrendReasoningInput): Promise<TrendReasoningOutput> {
  return trendReasoningFlow(input);
}

const trendReasoningPrompt = ai.definePrompt({
  name: 'trendReasoningPrompt',
  input: {schema: TrendReasoningInputSchema},
  output: {schema: TrendReasoningOutputSchema},
  prompt: `You are a social media trend expert and data analyst.
For the given trend, provide a deeper analysis of why it is becoming popular.

Trend: "{{trendName}}"
Platform: {{platform}}
Niche: {{niche}}
Region: {{region}}

Your analysis must include:
1.  **Detailed Reasoning**: A comprehensive explanation for why the trend is rising. Go beyond the obvious. Is it tied to a recent movie, a cultural event, a new technology, a meme format, or a specific community's behavior?
2.  **Google Trends Link**: Find a relevant, popular search term for this trend on Google Trends and construct a full, working URL for it (e.g., https://trends.google.com/trends/explore?q=your-keyword). Do not just output the keyword.
3.  **Viral Audio**: If applicable, identify a specific viral audio or sound that is commonly used with this trend on the specified platform. If there is no specific sound, omit this field.

Output your response in JSON format.`,
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
