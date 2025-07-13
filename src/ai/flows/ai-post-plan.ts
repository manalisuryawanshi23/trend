'use server';

/**
 * @fileOverview An AI-powered post plan generator for social media trends.
 *
 * - generateAiPostPlan - A function that generates an AI post plan based on the provided trend information.
 * - AiPostPlanInput - The input type for the generateAiPostPlan function.
 * - AiPostPlanOutput - The return type for the generateAiPostPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPostPlanInputSchema = z.object({
  trend: z.string().describe('The emerging trend to generate a post plan for.'),
  platform: z.string().describe('The social media platform (e.g., Instagram, TikTok, Twitter).'),
  niche: z.string().describe('The content niche (e.g., fashion, food, memes).'),
  region: z.string().describe('The region or location of the user.'),
  userType: z.string().describe('The type of user (e.g., influencer, business, student).'),
  bestTimeToPost: z.string().describe('The best time to post in the specified region')
});
export type AiPostPlanInput = z.infer<typeof AiPostPlanInputSchema>;

const AiPostPlanOutputSchema = z.object({
  hook: z.string().describe('A captivating hook for the post.'),
  caption: z.string().describe('An engaging caption for the post.'),
  hashtags: z.string().describe('Relevant hashtags for the post, separated by commas.'),
  emojiCombo: z.string().describe('A creative combination of emojis for the post.'),
  suggestedPostFormat: z.string().describe('The suggested post format (e.g., Reel, meme, tweet).'),
});
export type AiPostPlanOutput = z.infer<typeof AiPostPlanOutputSchema>;

export async function generateAiPostPlan(input: AiPostPlanInput): Promise<AiPostPlanOutput> {
  return aiPostPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPostPlanPrompt',
  input: {schema: AiPostPlanInputSchema},
  output: {schema: AiPostPlanOutputSchema},
  prompt: `You are a social media expert. Generate a post plan for the following trend on {{platform}} in the {{niche}} niche, tailored for a {{userType}} in {{region}}. The best time to post is {{bestTimeToPost}}.\n\nTrend: {{trend}}\n\nInclude a hook, caption, relevant hashtags (separated by commas), a creative emoji combination, and a suggested post format.\n\nOutput in JSON format.`,
});

const aiPostPlanFlow = ai.defineFlow(
  {
    name: 'aiPostPlanFlow',
    inputSchema: AiPostPlanInputSchema,
    outputSchema: AiPostPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
