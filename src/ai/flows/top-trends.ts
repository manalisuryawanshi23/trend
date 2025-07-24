
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
    hashtags: z.string().describe('A string of 3-5 relevant hashtags, separated by commas (e.g., #AIart, #generativeart, #digitalart).'),
});

const TopTrendsOutputSchema = z.object({
  trends: z.array(TrendSchema).describe('A list of 12-15 diverse, top-trending topics across different popular niches.'),
});
export type TopTrendsOutput = z.infer<typeof TopTrendsOutputSchema>;

const fallbackTrends: TopTrendsOutput = {
    trends: [
        {
            trendName: 'AI-Generated Art',
            niche: 'AI & Future Tech',
            description: 'Creators are using AI to generate surreal and stunning visuals, pushing the boundaries of creativity.',
            platform: 'Instagram',
            viralityScore: 92,
            hashtags: '#AIart, #generativeart, #digitalart',
        },
        {
            trendName: 'The "One-Pan" Dinner',
            niche: 'Food & Cooking',
            description: 'Simple, delicious recipes that only require a single pan, tapping into the demand for low-effort meals.',
            platform: 'TikTok',
            viralityScore: 88,
            hashtags: '#onepanmeal, #easyrecipe, #tiktokfood',
        },
        {
            trendName: 'Vintage Streetwear Finds',
            niche: 'Fashion',
            description: 'Thrift hauls and styling videos focused on 90s and Y2K streetwear are dominating fashion feeds.',
            platform: 'Instagram Reels',
            viralityScore: 85,
            hashtags: '#vintagefashion, #thrifthaul, #90sstyle',
        },
        {
            trendName: 'Cozy Gaming Setups',
            niche: 'Gaming',
            description: 'Gamers are sharing their cozy, aesthetic gaming setups, focusing on comfort and ambiance over raw power.',
            platform: 'YouTube Shorts',
            viralityScore: 82,
            hashtags: '#gamingsetup, #cozygaming, #desksetup',
        },
        {
            trendName: '"Main Character Energy" Clips',
            niche: 'Comedy',
            description: 'Using cinematic audio to turn mundane daily activities into epic, main-character moments.',
            platform: 'TikTok',
            viralityScore: 95,
            hashtags: '#maincharacter, #cinematic, #pov',
        },
        {
            trendName: 'Silent Vlogs',
            niche: 'Lifestyle',
            description: 'Day-in-the-life vlogs with no talking, focusing on calming sounds (ASMR) and aesthetic visuals.',
            platform: 'YouTube',
            viralityScore: 78,
            hashtags: '#silentvlog, #asmr, #dayinthelife',
        },
        {
            trendName: 'Sustainable DIY Projects',
            niche: 'DIY & Crafts',
            description: 'Upcycling and DIY projects that focus on sustainability and reducing waste are highly popular.',
            platform: 'Pinterest',
            viralityScore: 75,
            hashtags: '#sustainableliving, #diycrafts, #upcycling',
        },
        {
            trendName: 'Budget Travel Hacks',
            niche: 'Travel',
            description: 'Creators share clever tips and tricks for traveling the world on a tight budget.',
            platform: 'Instagram',
            viralityScore: 89,
            hashtags: '#budgettravel, #travelhacks, #cheaptravel',
        }
    ]
};


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
6.  **hashtags**: A comma-separated string of 3-5 relevant hashtags.

Your response must be in JSON format.`,
});

const topTrendsFlow = ai.defineFlow(
  {
    name: 'topTrendsFlow',
    outputSchema: TopTrendsOutputSchema,
  },
  async () => {
    try {
        const {output} = await prompt();
        if (!output || !output.trends || output.trends.length === 0) {
            console.warn('AI returned no trends, using fallback.');
            return fallbackTrends;
        }
        return output;
    } catch (error) {
        console.warn('Error fetching top trends from AI, using fallback:', error);
        return fallbackTrends;
    }
  }
);
