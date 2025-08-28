
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { headers } from 'next/headers';
import { createHash } from 'crypto';

const dailyVisitorsFilePath = path.join(process.cwd(), 'daily-visitors.json');
const visitorCountFilePath = path.join(process.cwd(), 'visitor-count.json');

type DailyVisitors = {
  [date: string]: string[];
};

type VisitorCount = {
    count: number;
}

async function readDailyVisitorsFile(): Promise<DailyVisitors> {
  try {
    const data = await fs.readFile(dailyVisitorsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty object
    return {};
  }
}

async function writeDailyVisitorsFile(data: DailyVisitors): Promise<void> {
  await fs.writeFile(dailyVisitorsFilePath, JSON.stringify(data, null, 2), 'utf8');
}

async function readVisitorCountFile(): Promise<VisitorCount> {
    try {
      const data = await fs.readFile(visitorCountFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { count: 0 };
    }
}

async function writeVisitorCountFile(data: VisitorCount): Promise<void> {
    await fs.writeFile(visitorCountFilePath, JSON.stringify(data, null, 2), 'utf8');
}

async function getVisitorIdentifier(): Promise<string> {
  const headersList = headers();
  // Use a combination of IP address and User-Agent for a more unique identifier
  const ip = (headersList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const userAgent = headersList.get('user-agent') ?? '';
  
  // Create a hash to anonymize the visitor identifier
  const hash = createHash('sha256');
  hash.update(ip + userAgent);
  return hash.digest('hex');
}

export async function trackUniqueVisitor(): Promise<number> {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const visitorId = await getVisitorIdentifier();

  const dailyVisitors = await readDailyVisitorsFile();

  if (!dailyVisitors[today]) {
    dailyVisitors[today] = [];
  }

  if (!dailyVisitors[today].includes(visitorId)) {
    dailyVisitors[today].push(visitorId);
    await writeDailyVisitorsFile(dailyVisitors);
  }
  
  return getVisitorCount();
}

export async function getVisitorCount(): Promise<number> {
    const visitorCountData = await readVisitorCountFile();
    return visitorCountData.count;
}


export async function incrementVisitorCount(): Promise<number> {
    const visitorCountData = await readVisitorCountFile();
    visitorCountData.count += 1;
    await writeVisitorCountFile(visitorCountData);
    return visitorCountData.count;
}
