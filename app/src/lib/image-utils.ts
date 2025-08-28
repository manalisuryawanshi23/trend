
'use server';

// This file is no longer needed as we are not saving images to the filesystem.
// It can be safely deleted, but we will leave it for now to avoid breaking imports
// if it's used elsewhere, though it shouldn't be.

/**
 * Saves a data URI image to the public directory and returns the public URL.
 * @param dataUri The data URI of the image to save.
 * @param filename The desired filename for the saved image.
 * @returns The public URL of the saved image.
 * @deprecated This function is not compatible with Vercel's read-only filesystem.
 */
export async function saveImage({ dataUri, filename }: { dataUri: string; filename: string; }): Promise<string> {
    // This function is deprecated because Vercel has a read-only filesystem.
    // Instead of saving, we should return the data URI directly to the client.
    console.warn("saveImage is deprecated and should not be used in a serverless environment.");
    
    // For local development, this might still "work", but it's not the correct approach for deployment.
    // Returning the data URI is a fallback, but the calling function should be updated.
    return dataUri; 
}
