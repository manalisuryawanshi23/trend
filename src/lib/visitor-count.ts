
'use server';

import * as fs from 'fs/promises';
import * as path from 'path';

const countFilePath = path.join(process.cwd(), 'visitor-count.json');

type VisitorCount = {
  count: number;
};

async function readCount(): Promise<VisitorCount> {
  try {
    const data = await fs.readFile(countFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, start with 0
    if (error.code === 'ENOENT') {
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

export async function incrementVisitorCount(): Promise<void> {
  const data = await readCount();
  data.count += 1;
  await writeCount(data);
}
