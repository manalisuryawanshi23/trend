
'use server';

import * as fs from 'fs/promises';
import * as path from 'path';
import { headers } from 'next/headers';
import { createHash } from 'crypto';


// Note: This is a simple file-based analytics system for demonstration purposes.
// In a production environment, this could lead to race conditions.
// A more robust solution would use a database (like Redis or Firestore) with atomic operations.

const dailyVisitorsLogPath = path.join(process.cwd(), 'daily-visitors.json');

type DailyVisitorsLog = {
  [date: string]: string[]; // date format: YYYY-MM-DD, value is an array of hashed IPs
};

async function readDailyLog(): Promise<DailyVisitorsLog> {
  try {
    const data = await fs.readFile(dailyVisitorsLogPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is invalid, start with an empty log
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return {};
    }
    throw error;
  }
}

async function writeDailyLog(data: DailyVisitorsLog): Promise<void> {
  await fs.writeFile(dailyVisitorsLogPath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Tracks a unique visitor for the current day and returns the count of unique visitors for the day.
 */
export async function trackUniqueVisitor(): Promise<number> {
  const forwardedFor = headers().get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : headers().get('x-real-ip');
  
  // Use a fallback for local development if no IP is found
  const identifier = ip || 'local-dev-user';

  // For privacy, we'll hash the IP address along with a daily salt (the date)
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const hash = createHash('sha256').update(identifier + today).digest('hex');

  const log = await readDailyLog();

  // Clean up old log entries to keep the file size manageable
  const recentDates = Object.keys(log).slice(-30); // Keep last 30 days
  const recentLog: DailyVisitorsLog = {};
  for (const date of recentDates) {
      recentLog[date] = log[date];
  }
  
  if (!recentLog[today]) {
    recentLog[today] = [];
  }

  if (!recentLog[today].includes(hash)) {
    recentLog[today].push(hash);
    await writeDailyLog(recentLog);
  }

  return recentLog[today].length;
}
