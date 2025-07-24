
'use server';

import * as fs from 'fs/promises';
import * as path from 'path';

// Note: This is a simple file-based counter for demonstration purposes.
// In a production environment, this could lead to race conditions.
// A more robust solution would use a database with atomic operations.

const countFilePath = path.join(process.cwd(), 'visitor-count.json');

type VisitorCount = {
  count: number;
};

async function readCount(): Promise<VisitorCount> {
  try {
    const data = await fs.readFile(countFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is invalid, start with 0
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return { count: 0 };
    }
    throw error;
  }
}

async function writeCount(data: VisitorCount): Promise<void> {
  await fs.writeFile(countFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getVisitorCount(): Promise<number> {
  const data = await readCount();
  return data.count;
}

/**
 * Increments the visitor count and returns the new count.
 */
export async function incrementVisitorCount(): Promise<number> {
  const data = await readCount();
  data.count += 1;
  await writeCount(data);
  return data.count;
}
