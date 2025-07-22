
'use server';

import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Saves a data URI image to the public directory and returns the public URL.
 * @param dataUri The data URI of the image to save.
 * @param filename The desired filename for the saved image.
 * @returns The public URL of the saved image.
 */
export async function saveImage({ dataUri, filename }: { dataUri: string; filename: string; }): Promise<string> {
    if (!dataUri.startsWith('data:image')) {
        throw new Error('Invalid data URI provided.');
    }
    
    // Extract the base64 part of the data URI
    const base64Data = dataUri.split(';base64,').pop();
    if (!base64Data) {
        throw new Error('Could not extract base64 data from URI.');
    }

    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Define the path to save the image
    const imageDir = path.join(process.cwd(), 'public', 'generated-images');
    const imagePath = path.join(imageDir, filename);

    // Ensure the directory exists
    await fs.mkdir(imageDir, { recursive: true });
    
    // Save the image
    await fs.writeFile(imagePath, imageBuffer);

    // Return the public URL
    return `/generated-images/${filename}`;
}
