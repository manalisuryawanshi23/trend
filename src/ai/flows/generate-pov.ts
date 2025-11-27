
'use server';

/**
 * @fileOverview An AI-powered POV (Point of View) caption generator.
 *
 * - generatePov - A function that generates multiple POV caption options based on user input.
 * - GeneratePovInput - The input type for the generatePov function.
 * - GeneratePovOutput - The return type for the generatePov function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePovInputSchema = z.object({
  description: z.string().describe("A short description of the POV scenario. e.g., 'A dog watching its owner leave for work'"),
  vibe: z.string().describe("The desired tone or vibe for the POV (e.g., 'Funny', 'Dramatic', 'Relatable')."),
  language: z.enum(['English', 'Hinglish']).describe("The language for the captions."),
  includeSong: z.boolean().describe('Whether or not to include a song/lyric suggestion.'),
});
export type GeneratePovInput = z.infer<typeof GeneratePovInputSchema>;

const PovOptionSchema = z.object({
    caption: z.string().describe('A complete, ready-to-use POV caption.'),
    songSuggestion: z.string().optional().describe("A suggested trending song or lyric that fits the mood of the POV. e.g., 'Song: As It Was - Harry Styles' or 'Lyric: Running up that hill...'"),
});

const GeneratePovOutputSchema = z.object({
  povs: z.array(PovOptionSchema).describe('An array of exactly 5 unique POV options.'),
});
export type GeneratePovOutput = z.infer<typeof GeneratePovOutputSchema>;


export async function generatePov(input: GeneratePovInput): Promise<GeneratePovOutput> {
  return generatePovFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePovPrompt',
  input: {schema: GeneratePovInputSchema},
  output: {schema: GeneratePovOutputSchema},
  templateFormat: 'handlebars',
  prompt: `You are a social media expert and a viral content creator specializing in POV (Point of View) style videos.

Your task is to generate 5 unique and creative POV caption options based on the following details.

**POV Details:**
- **Scenario:** {{description}}
- **Desired Vibe:** {{vibe}}
- **Language:** {{language}} (If Hinglish, mix Hindi and English naturally as seen on social media.)

**Instructions:**
1.  Generate exactly 5 distinct POV caption options.
2.  Each option should start with "POV:" and creatively interpret the scenario with the requested 'vibe'.
3.  Write the captions in {{language}}.
4.  {{#if includeSong}}For each caption, also provide a "songSuggestion" with a trending song or lyric that fits the mood. If you suggest a song, format it as "Song: [Song Name] - [Artist]". If you suggest a lyric, format it as "Lyric: '[lyric phrase...]'".{{else}}Do not include song suggestions.{{/if}}
5.  Ensure the captions are engaging and optimized for platforms like TikTok and Instagram Reels.

Output your response in the required JSON format.`,
});

const generatePovFlow = ai.defineFlow(
  {
    name: 'generatePovFlow',
    inputSchema: GeneratePovInputSchema,
    outputSchema: GeneratePovOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
