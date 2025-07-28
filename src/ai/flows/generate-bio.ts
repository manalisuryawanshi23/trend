
'use server';

/**
 * @fileOverview An AI-powered social media bio generator.
 *
 * - generateBio - A function that generates multiple bio options based on user input.
 * - GenerateBioInput - The input type for the generateBio function.
 * - GenerateBioOutput - The return type for the generateBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBioInputSchema = z.object({
  platform: z.string().describe('The social media platform the bio is for (e.g., Instagram, Twitter, LinkedIn).'),
  name: z.string().describe('The user\'s name or brand name.'),
  description: z.string().describe('A comma-separated list of keywords or a short paragraph describing the user or brand.'),
  vibe: z.string().describe("The desired tone or vibe for the bio (e.g., 'Professional', 'Witty', 'Inspirational')."),
  includeEmojis: z.boolean().describe('Whether or not to include emojis in the bio.'),
  callToAction: z.string().optional().describe('An optional call-to-action to include at the end of the bio.'),
});
export type GenerateBioInput = z.infer<typeof GenerateBioInputSchema>;

const BioOptionSchema = z.object({
    bio: z.string().describe('A complete, ready-to-use social media bio.'),
});

const GenerateBioOutputSchema = z.object({
  bios: z.array(BioOptionSchema).describe('An array of exactly 5 unique bio options.'),
});
export type GenerateBioOutput = z.infer<typeof GenerateBioOutputSchema>;


export async function generateBio(input: GenerateBioInput): Promise<GenerateBioOutput> {
  return generateBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBioPrompt',
  input: {schema: GenerateBioInputSchema},
  output: {schema: GenerateBioOutputSchema},
  templateFormat: 'handlebars',
  prompt: `You are a social media expert and a brilliant copywriter specializing in crafting compelling and effective user bios.

Your task is to generate 5 unique bio options for a user based on the following details.

**User Details:**
- **Platform:** {{platform}} (Ensure the bio length and style are appropriate for this platform. e.g., Twitter/X bios are shorter).
- **Name/Brand:** {{name}}
- **Description/Keywords:** {{description}}
- **Desired Vibe:** {{vibe}}
{{#if callToAction}}- **Call-to-Action to Include:** "{{callToAction}}"{{/if}}

**Instructions:**
1.  Generate exactly 5 distinct bio options.
2.  Each option should reflect the requested 'vibe' and incorporate the user's description/keywords.
3.  {{#if includeEmojis}}Include relevant emojis to make the bios engaging.{{else}}Do not use any emojis.{{/if}}
4.  If a call-to-action is provided, seamlessly integrate it into each bio.
5.  Ensure the bios are concise, impactful, and optimized for discoverability on the specified platform.

Output your response in the required JSON format.`,
});

const generateBioFlow = ai.defineFlow(
  {
    name: 'generateBioFlow',
    inputSchema: GenerateBioInputSchema,
    outputSchema: GenerateBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
