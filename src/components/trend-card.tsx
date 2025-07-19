"use client";

import { useState } from "react";
import Image from "next/image";
import type { Trend } from "@/lib/types";
import { trendReasoning } from "@/ai/flows/trend-reasoning";
import type { TrendReasoningOutput } from "@/ai/flows/trend-reasoning";
import { generateVisualConcept } from "@/ai/flows/generate-visual-concept";
import type { GenerateVisualConceptOutput } from "@/ai/flows/generate-visual-concept";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PlatformIcon } from "@/components/platform-icon";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon } from "@/components/icons/image-icon";
import { 
  Lightbulb, 
  Captions, 
  Hash, 
  SmilePlus, 
  Clapperboard, 
  Clock, 
  BarChart3, 
  Link as LinkIcon, 
  Music,
  LoaderCircle,
  Wand2,
} from "lucide-react";

type TrendCardProps = {
    trend: Trend;
    context: {
        platform: string;
        niche: string;
        region: string;
    }
}

export function TrendCard({ trend, context }: TrendCardProps) {
  const [reasoning, setReasoning] = useState<TrendReasoningOutput | null>(null);
  const [visualConcept, setVisualConcept] = useState<GenerateVisualConceptOutput | null>(null);
  const [isLoadingReasoning, setIsLoadingReasoning] = useState(false);
  const [isLoadingVisual, setIsLoadingVisual] = useState(false);
  const { toast } = useToast();

  const handleReasoningClick = async () => {
    if (reasoning) { // If we already have the data, don't re-fetch
      return;
    }
    setIsLoadingReasoning(true);
    try {
      const result = await trendReasoning({
        trendName: trend.trendName,
        ...context
      });
      if (result) {
        setReasoning(result);
      } else {
         throw new Error("Invalid response from AI");
      }
    } catch(e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error Getting Details",
        description: "Could not fetch detailed analysis for this trend.",
      });
    } finally {
      setIsLoadingReasoning(false);
    }
  };

  const handleVisualConceptClick = async () => {
    if (visualConcept) {
        return;
    }
    setIsLoadingVisual(true);
    try {
      const result = await generateVisualConcept({
        trendName: trend.trendName,
        hook: trend.postPlan.hook,
        caption: trend.postPlan.caption,
        suggestedPostFormat: trend.postPlan.suggestedPostFormat,
      });
      if (result && result.imageUrl) {
        setVisualConcept(result);
      } else {
         throw new Error("Invalid response from AI");
      }
    } catch(e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error Generating Visual",
        description: "Could not generate visual concept. The AI may be overloaded.",
      });
    } finally {
      setIsLoadingVisual(false);
    }
  }


  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={trend.trendName} className="border-b-0">
          <AccordionTrigger 
             className="p-4 md:p-6 text-left hover:no-underline [&[data-state=open]]:bg-primary/5"
             onClick={handleReasoningClick}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <PlatformIcon platform={trend.postPlan.suggestedPostFormat} />
                  <p className="font-headline text-xl md:text-2xl font-bold text-foreground">{trend.trendName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={trend.viralityScore} className="h-3 w-full max-w-[150px] md:max-w-[200px]" />
                  <span className="font-semibold text-primary text-sm whitespace-nowrap">{trend.viralityScore} / 100 Virality</span>
                </div>
              </div>
              <div className="shrink-0 text-primary hover:text-primary hover:bg-primary/10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2">
                View Details
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 md:px-6 pb-6">
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
                      <strong>Initial Insight:</strong> {trend.reasonWhyRising}
                    </p>
                    
                     {isLoadingReasoning && (
                       <div className="space-y-2">
                         <Skeleton className="h-4 w-3/4" />
                         <Skeleton className="h-4 w-1/2" />
                       </div>
                     )}

                    {!isLoadingReasoning && reasoning && (
                       <div className="space-y-3 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                        <p>
                          <strong>Deeper Analysis:</strong> {reasoning.reasoning}
                        </p>
                        {reasoning.googleTrendsLink && (
                           <div className="flex items-start gap-3">
                            <LinkIcon className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                            <a href={reasoning.googleTrendsLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold break-all">
                              View on Google Trends
                            </a>
                          </div>
                        )}
                        {reasoning.viralAudioSound && (
                          <div className="flex items-start gap-3">
                            <Music className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground" />
                            <div><strong>Viral Audio:</strong> {reasoning.viralAudioSound}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
                <div className="space-y-4">
                    <h3 className="font-headline text-xl font-semibold text-foreground flex items-center"><ImageIcon className="w-5 h-5 mr-2 text-primary" />Visual Concept</h3>
                    
                    {!visualConcept && (
                        <div className="flex flex-col items-start gap-4">
                            <p className="text-sm text-muted-foreground">Want to see what this trend could look like? Let AI generate a visual concept for you.</p>
                            <Button onClick={handleVisualConceptClick} disabled={isLoadingVisual}>
                                {isLoadingVisual ? (
                                    <>
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="mr-2 h-4 w-4" />
                                        Generate Visual
                                    </>
                                )}
                            </Button>
                        </div>
                    )}

                    {isLoadingVisual && (
                         <div className="aspect-video w-full max-w-lg mx-auto flex items-center justify-center bg-muted rounded-lg">
                            <div className="text-center space-y-2">
                                <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
                                <p className="text-muted-foreground font-medium">Painting with pixels...</p>
                            </div>
                        </div>
                    )}

                    {visualConcept && (
                        <div className="w-full max-w-lg mx-auto">
                           <Image
                                src={visualConcept.imageUrl}
                                alt={`AI concept for ${trend.trendName}`}
                                width={1024}
                                height={576}
                                className="w-full h-auto rounded-lg border-2 border-primary shadow-lg"
                            />
                        </div>
                    )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
