"use client";

import type { AiPostPlan } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/platform-icon";
import { 
  Captions, 
  Hash, 
  SmilePlus, 
  Clapperboard, 
} from "lucide-react";

export function AiPostCard({ postPlan }: { postPlan: AiPostPlan }) {
  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl font-bold text-foreground flex items-center gap-3">
           <PlatformIcon platform={postPlan.suggestedPostFormat} />
           AI-Generated Post for {postPlan.suggestedPostFormat.includes('Tweet') ? "Twitter" : postPlan.suggestedPostFormat.split(" ")[0]}
        </CardTitle>
      </CardHeader>
      <CardContent>
          <div className="space-y-4">
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
          </div>
      </CardContent>
    </Card>
  );
}
