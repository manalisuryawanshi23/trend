
'use server';

import { getVisitorCount, incrementVisitorCount } from '@/lib/visitor-count';
import { Users } from 'lucide-react';
import { Badge } from './ui/badge';

export async function VisitorCounter() {
  const count = await incrementVisitorCount();

  return (
    <Badge variant="outline" className="py-2 px-4 border-primary/20 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-semibold">{count.toLocaleString()}</span>
            <span>Forecasts Generated</span>
        </div>
    </Badge>
  );
}
