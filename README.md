# Trend Seer: AI-Powered Social Media Trend Forecasting

Trend Seer is a powerful web application designed for content creators, social media managers, and marketers. It leverages generative AI to analyze real-time social media data and search analytics, forecasting emerging content trends 24–72 hours before they go viral.

This document provides a complete overview of the Trend Seer application, its architecture, and how to work with the code.

## Table of Contents

1.  [Core Features](#core-features)
2.  [Tech Stack](#tech-stack)
3.  [Project Structure](#project-structure)
4.  [Core AI Flows (`/src/ai/flows`)](#core-ai-flows-srcaiflows)
5.  [Frontend (`/src/app` & `/src/components`)](#frontend-srcapp--srccomponents)
6.  [Shared Logic & Data (`/src/lib`)](#shared-logic--data-srclib)
7.  [Getting Started Locally](#getting-started-locally)
8.  [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Core Features

-   **Trend Forecasting**: Predicts emerging trends with AI-powered post plans.
-   **Top Trending Dashboard**: A real-time, filterable view of the top trends by niche, region, and platform.
-   **AI Caption Generator**: Creates multiple unique caption options from an uploaded image or video.
-   **Content Repurposing**: Magically transforms any URL (like a blog post) into a social media post.
-   **Post Analysis**: Deconstructs the success of any social media post from a URL.
-   **Visual Concept Generator**: Turns a post idea into an AI-generated image.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI Integration**: [Genkit (by Firebase)](https://firebase.google.com/docs/genkit)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

The project is organized into several key directories:

```
/
├── src/
│   ├── app/                # Next.js App Router pages (the frontend)
│   ├── ai/                 # All Genkit AI-related code
│   │   └── flows/          # Individual AI agent definitions (the app's "brain")
│   ├── components/         # Reusable React components (UI building blocks)
│   │   └── ui/             # Unmodified ShadCN UI components
│   ├── lib/                # Shared utilities, data, and type definitions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets (images, etc.)
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Core AI Flows (`/src/ai/flows`)

This directory is the heart of the application. Each file defines a specific AI capability using Genkit. A "flow" is a server-side function that typically calls a generative model with a carefully crafted prompt.

-   **`trend-forecasting.ts`**: Powers the main "Forecast" page. Takes user inputs (niche, platform, etc.) and predicts 5 emerging trends.
-   **`top-trends.ts`**: Powers the "Top Trending" page. Fetches a comprehensive list of current trends across all major niches for a given region.
-   **`generate-captions.ts`**: Powers the "Captions" page. Analyzes an uploaded image/video and generates 8 unique caption options.
-   **`repurpose-url.ts`**: Powers the "Repurpose" page. Takes a URL, analyzes its content, and creates a social media post plan.
-   **`analyze-post.ts`**: Powers the "Analyze" page. Takes a social media post URL and provides a detailed breakdown of its performance and virality.
-   **`generate-visual-concept.ts`**: Powers the "Visualize" page. Generates an image based on a user's post idea (theme, hook, caption).
-   **`trend-reasoning.ts`**: A supplementary flow used in the "Forecast" page to provide a deeper analysis of why a specific trend is popular.

## Frontend (`/src/app` & `/src/components`)

The frontend is built using the Next.js App Router.

### Pages (`/src/app`)

Each folder inside `/src/app` corresponds to a URL route.

-   **/ (page.tsx)**: The main "Forecast" page.
-   **/trending (page.tsx)**: The "Top Trending" dashboard.
-   **/captions (page.tsx)**: The AI Caption Generator tool.
-   **/repurpose (page.tsx)**: The URL content repurposing tool.
-   **/analyze (page.tsx)**: The post analysis tool.
-   **/visualize (page.tsx)**: The visual concept generator.
-   **/blog (page.tsx)**: The main blog page listing all articles.
-   **/blog/[slug]/page.tsx**: The detail page for a single blog post.

### Components (`/src/components`)

This directory contains reusable React components used across the pages.

-   **`nav.tsx`**: The main site navigation component.
-   **`trend-card.tsx`**: The accordion-style card used to display a single trend on the "Forecast" page.
-   **`trend-detail-dialog.tsx`**: The popup dialog that shows detailed information about a trend on the "Top Trending" page.
-   **`platform-icon.tsx`**: A helper component to display the correct social media icon based on a platform name.

## Shared Logic & Data (`/src/lib`)

This directory contains code and data shared between the frontend and the AI backend.

-   **`data.ts`**: Contains static data used throughout the application, such as the list of niches, countries, and available platforms. **This file is important for customizing the options available in the UI.**
-   **`utils.ts`**: General utility functions, including the `cn` function for merging Tailwind CSS classes.
-   **`types.ts`**: Defines shared TypeScript types, ensuring data consistency between the AI flows and the frontend components.
-   **`blog-data.ts`**: Contains all the content for the blog posts.

## Getting Started Locally

To run the application in a local development environment, follow these steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_google_ai_studio_api_key
    ```

### Running the Development Server

The application requires two separate processes to run concurrently: the Next.js frontend and the Genkit AI server.

1.  **Start the Next.js Frontend:**
    ```bash
    npm run dev
    ```
    This will start the web application, usually on `http://localhost:9003`.

2.  **Start the Genkit AI Server:**
    In a separate terminal, run:
    ```bash
    npm run genkit:watch
    ```
    This starts the Genkit server, which listens for requests from the frontend and executes the AI flows. It will automatically restart when you make changes to the files in `/src/ai`.

## Troubleshooting Common Issues

-   **Error: `headers() should be awaited before using its value`**
    -   **Cause**: This Next.js error occurs when a dynamic server function (like `headers()` for reading request headers) is used in a component that is rendered as part of the root layout (`src/app/layout.tsx`). This forces all pages to be dynamically rendered, which is inefficient and causes errors.
    -   **Solution**: Do not place components that rely on dynamic server functions like `headers()` or `cookies()` directly in the root layout. These should be used within specific pages that are intended to be dynamic.

-   **AI Flows Not Responding or Failing:**
    -   **Check your `.env` file**: Ensure that `GEMINI_API_KEY` is set correctly.
    -   **Check the Genkit Terminal**: Look for any error messages in the terminal where you ran `npm run genkit:watch`.
    -   **API Quotas**: You may have exceeded the rate limits for the Gemini API. Check your Google AI Studio dashboard.
