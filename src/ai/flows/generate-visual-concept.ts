'use server';

/**
 * @fileOverview An AI-powered visual concept generator for social media trends.
 *
 * - generateVisualConcept - A function that generates an image based on a trend's description.
 * - GenerateVisualConceptInput - The input type for the generateVisualConcept function.
 * - GenerateVisualConceptOutput - The return type for the generateVisualConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVisualConceptInputSchema = z.object({
  trendName: z.string().describe('The name of the trend.'),
  hook: z.string().describe('The hook for the post.'),
  caption: z.string().describe('The caption for the post.'),
  suggestedPostFormat: z.string().describe('The suggested format for the post (e.g., Reel, meme).'),
});
export type GenerateVisualConceptInput = z.infer<typeof GenerateVisualConceptInputSchema>;

const GenerateVisualConceptOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateVisualConceptOutput = z.infer<typeof GenerateVisualConceptOutputSchema>;

export async function generateVisualConcept(input: GenerateVisualConceptInput): Promise<GenerateVisualConceptOutput> {
  return generateVisualConceptFlow(input);
}

function getAspectRatio(format: string): string {
    const lowerFormat = format.toLowerCase();
    if (lowerFormat.includes('reel') || lowerFormat.includes('short') || lowerFormat.includes('tiktok') || lowerFormat.includes('story')) {
        return '9:16';
    }
    if (lowerFormat.includes('instagram post') || lowerFormat.includes('facebook post')) {
        return '1:1';
    }
    return '16:9';
}

const generateVisualConceptFlow = ai.defineFlow(
  {
    name: 'generateVisualConceptFlow',
    inputSchema: GenerateVisualConceptInputSchema,
    outputSchema: GenerateVisualConceptOutputSchema,
  },
  async ({ trendName, hook, caption, suggestedPostFormat }) => {
    const aspectRatio = getAspectRatio(suggestedPostFormat);

    const prompt = `Generate a compelling visual concept for a social media post.
Theme: "${trendName}"
Format: ${suggestedPostFormat}
Hook: "${hook}"
Caption: "${caption}"

Create an eye-catching, high-quality image that captures the essence of this idea.
The style should be modern, photographic, and suitable for social media.`;
    
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: prompt,
      aspectRatio, // Correct: Moved aspectRatio here
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
