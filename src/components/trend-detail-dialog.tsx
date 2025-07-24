
"use client";

import { useState } from "react";
import type { TopTrendsOutput } from "@/ai/flows/top-trends";
import { trendReasoning } from "@/ai/flows/trend-reasoning";
import type { TrendReasoningOutput } from "@/ai/flows/trend-reasoning";
import { generateAiPostPlan } from "@/ai/flows/ai-post-plan";
import type { AiPostPlanOutput } from "@/ai/flows/ai-post-plan";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PlatformIcon } from "@/components/platform-icon";
import { useToast } from "@/hooks/use-toast";
import { 
  Lightbulb, 
  Captions, 
  Hash, 
  SmilePlus, 
  Clapperboard, 
  Clock, 
  Link as LinkIcon, 
  Music,
  LoaderCircle,
  Wand2,
} from "lucide-react";

type TrendDetailDialogProps = {
    trend: TopTrendsOutput['trends'][number];
    children: React.ReactNode;
}

export function TrendDetailDialog({ trend, children }: TrendDetailDialogProps) {
  const [reasoning, setReasoning] = useState<TrendReasoningOutput | null>(null);
  const [postPlan, setPostPlan] = useState<AiPostPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOpenChange = async (open: boolean) => {
    if (open && !reasoning && !postPlan) {
      setIsLoading(true);
      try {
        // Fetch reasoning and post plan in parallel
        const [reasoningResult, postPlanResult] = await Promise.all([
          trendReasoning({
            trendName: trend.trendName,
            platform: trend.platform,
            niche: trend.niche,
            region: 'Global', // Assuming global for now, can be made dynamic
          }),
          generateAiPostPlan({
            trend: trend.trendName,
            platform: trend.platform,
            niche: trend.niche,
            region: 'Global',
            userType: 'Content Creator', // Generic user type
            bestTimeToPost: 'evening' // Placeholder
          })
        ]);

        if (reasoningResult) setReasoning(reasoningResult);
        if (postPlanResult) setPostPlan(postPlanResult);
        
        if (!reasoningResult || !postPlanResult) {
            throw new Error("Failed to fetch all trend details from AI.");
        }

      } catch(e) {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Error Getting Details",
          description: "Could not fetch detailed analysis for this trend.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
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

        {isLoading ? (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-headline text-xl font-semibold text-foreground flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-primary" />Trend Analysis</h3>
              <div className="space-y-3 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                <p>
                  <strong>Initial Insight:</strong> {trend.description}
                </p>
                {reasoning?.reasoning && <p><strong>Deeper Analysis:</strong> {reasoning.reasoning}</p>}
                
                {reasoning?.googleTrendsLink && (
                   <div className="flex items-start gap-3">
                    <LinkIcon className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <a href={reasoning.googleTrendsLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold break-all">
                      View on Google Trends
                    </a>
                  </div>
                )}
                {reasoning?.viralAudioSound && (
                  <div className="flex items-start gap-3">
                    <Music className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                    <div><strong>Viral Audio:</strong> {reasoning.viralAudioSound}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-headline text-xl font-semibold text-foreground flex items-center"><Wand2 className="w-5 h-5 mr-2 text-primary" />AI-Powered Post Plan</h3>
              {postPlan ? (
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Captions className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Hook:</strong> {postPlan.hook}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Captions className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Caption:</strong> {postPlan.caption}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Hash className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Hashtags:</strong> <span className="font-mono">{postPlan.hashtags}</span></div>
                    </li>
                     <li className="flex items-start gap-3">
                      <SmilePlus className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Emoji Combo:</strong> {postPlan.emojiCombo}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clapperboard className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Format:</strong> <Badge variant="secondary">{postPlan.suggestedPostFormat}</Badge></div>
                    </li>
                  </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Could not generate a post plan for this trend.</p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
