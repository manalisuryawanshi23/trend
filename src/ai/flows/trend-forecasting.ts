'use server';

/**
 * @fileOverview An AI agent that forecasts social media trends.
 *
 * - trendForecasting - A function that handles the trend forecasting process.
 * - TrendForecastingInput - The input type for the trendForecasting function.
 * - TrendForecastingOutput - The return type for the trendForecasting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendForecastingInputSchema = z.object({
  platform: z.string().describe('The social media platform to focus on.'),
  niche: z.string().describe('The content niche (e.g., fashion, food, memes).'),
  region: z.string().describe('The region or country to focus on.'),
  userType: z.string().describe('The type of user (e.g., influencer, business).'),
  model: z.string().optional().describe('The AI model to use for the prediction.'),
});
export type TrendForecastingInput = z.infer<typeof TrendForecastingInputSchema>;

const TrendForecastingOutputSchema = z.object({
  trends: z.array(
    z.object({
      trendName: z.string().describe('The name of the emerging trend.'),
      reasonWhyRising: z.string().describe('A brief, one-sentence insight into why the trend is emerging.'),
      postPlan: z.object({
        hook: z.string().describe('A suggested hook for a post.'),
        caption: z.string().describe('A suggested caption for the post.'),
        hashtags: z.array(z.string()).describe('Suggested hashtags for the post.'),
        emojiCombo: z.string().describe('A suggested emoji combination for the post.'),
        suggestedPostFormat: z.string().describe('Suggested post format (Reel, meme, tweet).'),
        bestTimeToPost: z.string().describe('The best time to post in the specified region.'),
      }),
    })
  ).describe('Top 5 emerging trends with AI-powered post plans'),
});
export type TrendForecastingOutput = z.infer<typeof TrendForecastingOutputSchema>;

export async function trendForecasting(input: TrendForecastingInput): Promise<TrendForecastingOutput> {
  return trendForecastingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trendForecastingPrompt',
  input: {schema: TrendForecastingInputSchema},
  output: {schema: TrendForecastingOutputSchema},
  prompt: `You are a social media trend forecasting expert with access to real-time social data and search behavior analytics.

  Predict content trends 24-72 hours before they go viral.

  Here are the inputs:
  Platform: {{{platform}}}
  Niche: {{{niche}}}
  Region: {{{region}}}
  User Type: {{{userType}}}

  Output Should Include:
  1. 🔥 Top 5 "Emerging Trends" with early signals (hashtags, sounds, hooks, challenges, post formats)
  2. 💬 A **brief, one-sentence** reason why each trend is rising.
  3. 🧠 AI-Powered Post Plan for each trend:
     - Hook
     - Caption
     - Hashtags
     - Emoji combo
     - Suggested post format (Reel, meme, tweet, etc.)
     - Best time to post in {{{region}}}
  4. ⚠️ Avoid saturated or overused trends (focus on emerging ones)

  Style:
  - Output in JSON format
  - Short, practical, and creator-friendly language
  - No filler or academic explanations

  Goal:
  Give the user a trend advantage based on verified social signals.
  
  Remember to respond in JSON format.
  `, 
});

const trendForecastingFlow = ai.defineFlow(
  {
    name: 'trendForecastingFlow',
    inputSchema: TrendForecastingInputSchema,
    outputSchema: TrendForecastingOutputSchema,
  },
  async ({ model, ...restOfInput }) => {
    const modelToUse = model ? `googleai/${model}` : undefined;
    const {output} = await prompt(restOfInput, { model: modelToUse });
    return output!;
  }
);
