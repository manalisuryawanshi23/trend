
"use client";

import type { Trend } from "@/ai/flows/top-trends";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlatformIcon } from "@/components/platform-icon";
import { 
  Lightbulb, 
  Captions, 
  Hash, 
  SmilePlus, 
  Clapperboard, 
  Link as LinkIcon, 
  Music,
  Wand2,
} from "lucide-react";

type TrendDetailDialogProps = {
    trend: Trend;
    children: React.ReactNode;
}

export function TrendDetailDialog({ trend, children }: TrendDetailDialogProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl md:text-3xl flex items-start gap-3">
            <PlatformIcon platform={trend.platform} className="w-6 h-6 mt-1 text-primary"/>
            <span>{trend.trendName}</span>
          </DialogTitle>
          <DialogDescription>
            A detailed breakdown of the "{trend.niche}" trend on {trend.platform}.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-headline text-xl font-semibold text-foreground flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-primary" />Trend Analysis</h3>
              <div className="space-y-3 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                <p>
                  <strong>Initial Insight:</strong> {trend.description}
                </p>
                <p><strong>Deeper Analysis:</strong> {trend.reasoning}</p>
                
                {trend.googleTrendsLink && (
                   <div className="flex items-start gap-3">
                    <LinkIcon className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <a href={trend.googleTrendsLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold break-all">
                      View on Google Trends
                    </a>
                  </div>
                )}
                {trend.viralAudioSound && (
                  <div className="flex items-start gap-3">
                    <Music className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <div><strong>Viral Audio:</strong> {trend.viralAudioSound}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-headline text-xl font-semibold text-foreground flex items-center"><Wand2 className="w-5 h-5 mr-2 text-primary" />AI-Powered Post Plan</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                    <Captions className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <div><strong>Hook:</strong> {trend.postPlan.hook}</div>
                </li>
                <li className="flex items-start gap-3">
                    <Captions className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <div><strong>Caption:</strong> {trend.postPlan.caption}</div>
                </li>
                <li className="flex items-start gap-3">
                    <Hash className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <div><strong>Hashtags:</strong> <span className="font-mono">{trend.hashtags}</span></div>
                </li>
                    <li className="flex items-start gap-3">
                    <SmilePlus className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <div><strong>Emoji Combo:</strong> {trend.postPlan.emojiCombo}</div>
                </li>
                <li className="flex items-start gap-3">
                    <Clapperboard className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <div><strong>Format:</strong> <Badge variant="secondary">{trend.postPlan.suggestedPostFormat}</Badge></div>
                </li>
                </ul>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}

    