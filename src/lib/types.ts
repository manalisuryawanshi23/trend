import type { TrendForecastingOutput } from '@/ai/flows/trend-forecasting';

// This extracts the type of a single trend object from the 'trends' array 
// within the TrendForecastingOutput type. This allows us to use the specific
// shape of a trend in our components like TrendCard.
export type Trend = TrendForecastingOutput['trends'][number];
