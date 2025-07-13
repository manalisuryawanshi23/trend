import type { TrendForecastingOutput } from '@/ai/flows/trend-forecasting';
import type { AiPostPlanOutput } from '@/ai/flows/ai-post-plan';

// This extracts the type of a single trend object from the 'trends' array 
// within the TrendForecastingOutput type. This allows us to use the specific
// shape of a trend in our components like TrendCard.
export type Trend = TrendForecastingOutput['trends'][number];

// This is the type for a standalone AI-generated post plan. It's used for
// features like the content repurposer.
export type AiPostPlan = AiPostPlanOutput;
