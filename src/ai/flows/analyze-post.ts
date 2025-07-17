'use server';

/**
 * @fileOverview An AI agent that analyzes a social media post from a URL and explains why it was successful or not.
 *
 * - analyzePost - A function that takes a URL and generates a post analysis.
 * - AnalyzePostInput - The input type for the analyzePost function.
 * - AnalyzePostOutput - The return type for the analyzePost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePostInputSchema = z.object({
  url: z.string().url().describe('The URL of the social media post to analyze.'),
});
export type AnalyzePostInput = z.infer<typeof AnalyzePostInputSchema>;

const AnalyzePostOutputSchema = z.object({
  isViral: z.boolean().describe('A determination of whether the post is considered viral or successful.'),
  viralityScore: z.number().min(0).max(100).describe('A score from 0-100 indicating the post\'s success or virality.'),
  reasoning: z.string().describe('A summary of why the post performed the way it did.'),
  hookAnalysis: z.string().describe('A detailed analysis of the post\'s hook.'),
  contentAnalysis: z.string().describe('A detailed analysis of the post\'s main content, editing, and pacing.'),
  ctaAnalysis: z.string().describe('A detailed analysis of the post\'s call to action or engagement strategy.'),
  improvementSuggestions: z.string().optional().describe('Actionable suggestions for how the post could be improved. Only provide if the post is not considered highly successful.'),
});
export type AnalyzePostOutput = z.infer<typeof AnalyzePostOutputSchema>;

export async function analyzePost(input: AnalyzePostInput): Promise<AnalyzePostOutput> {
  return analyzePostFlow(input);
}

const analyzePostPrompt = ai.definePrompt({
  name: 'analyzePostPrompt',
  input: {schema: AnalyzePostInputSchema},
  output: {schema: AnalyzePostOutputSchema},
  prompt: `You are a viral marketing expert who specializes in deconstructing social media posts to understand their success.

Your task is to analyze the content at the provided URL. Determine if the post was successful/viral and provide a detailed analysis of its components.

URL to analyze: {{{url}}}

Your analysis must be objective and based on established principles of viral marketing and content strategy.

Your output must be a JSON object containing:
- isViral: A boolean indicating if the post is successful.
- viralityScore: A score from 0-100 for its performance.
- reasoning: A summary of why the post performed well or poorly.
- hookAnalysis: A breakdown of the first 1-3 seconds. What makes it effective or ineffective?
- contentAnalysis: An analysis of the main body of the content. Look at pacing, editing, storytelling, value provided, etc.
- ctaAnalysis: An analysis of the call to action. How does it encourage engagement (likes, comments, shares)?
- improvementSuggestions: If the post is not top-tier (score below 80), provide specific, actionable suggestions for what could be improved.
`,
});

const analyzePostFlow = ai.defineFlow(
  {
    name: 'analyzePostFlow',
    inputSchema: AnalyzePostInputSchema,
    outputSchema: AnalyzePostOutputSchema,
  },
  async input => {
    const {output} = await analyzePostPrompt(input);
    return output!;
  }
);
