
import { getVisitorCount, incrementVisitorCount } from '@/lib/visitor-count';
import { Users } from 'lucide-react';

export async function VisitorCounter() {
  await incrementVisitorCount();
  const count = await getVisitorCount();

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="h-3 w-3" />
        <span>{count.toLocaleString()} Unique Visitors</span>
    </div>
  );
}
