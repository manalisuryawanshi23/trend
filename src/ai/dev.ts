import { config } from 'dotenv';
config();

import '@/ai/flows/virality-score.ts';
import '@/ai/flows/trend-forecasting.ts';
import '@/ai/flows/trend-reasoning.ts';
import '@/ai/flows/ai-post-plan.ts';
import '@/ai/flows/url-to-post.ts';
import '@/ai/flows/analyze-post.ts';
import '@/ai/flows/generate-visual-concept.ts';
import '@/ai/flows/generate-captions.ts';
