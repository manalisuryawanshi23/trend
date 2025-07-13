"use client";

import type { Trend } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PlatformIcon } from "@/components/platform-icon";
import { 
  Lightbulb, 
  Captions, 
  Hash, 
  SmilePlus, 
  Clapperboard, 
  Clock, 
  BarChart3, 
  Link as LinkIcon, 
  Music 
} from "lucide-react";

export function TrendCard({ trend }: { trend: Trend }) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={trend.trendName} className="border-b-0">
          <AccordionTrigger className="p-6 text-left hover:no-underline [&[data-state=open]]:bg-primary/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <PlatformIcon platform={trend.postPlan.suggestedPostFormat} />
                  <p className="font-headline text-2xl font-bold text-foreground">{trend.trendName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={trend.viralityScore} className="h-3 w-full max-w-[200px]" />
                  <span className="font-semibold text-primary text-sm whitespace-nowrap">{trend.viralityScore} / 100 Virality</span>
                </div>
              </div>
              <Button variant="ghost" className="shrink-0 text-primary hover:text-primary hover:bg-primary/10">
                View Details
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6">
              <Separator className="mb-6" />
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                
                <div className="space-y-4">
                  <h3 className="font-headline text-xl font-semibold text-foreground flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-primary" />AI-Powered Post Plan</h3>
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
                      <div><strong>Hashtags:</strong> <span className="font-mono">{trend.postPlan.hashtags.join(' ')}</span></div>
                    </li>
                     <li className="flex items-start gap-3">
                      <SmilePlus className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Emoji Combo:</strong> {trend.postPlan.emojiCombo}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clapperboard className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Format:</strong> <Badge variant="secondary">{trend.postPlan.suggestedPostFormat}</Badge></div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                      <div><strong>Best Time to Post:</strong> {trend.postPlan.bestTimeToPost}</div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-headline text-xl font-semibold text-foreground flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-primary" />Trend Analysis</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>Reason Why It’s Rising:</strong> {trend.reasonWhyRising}
                    </p>
                    {trend.googleTrendsLink && (
                       <div className="flex items-start gap-3">
                        <LinkIcon className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                        <a href={trend.googleTrendsLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold break-all">
                          Google Trends Data
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
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
