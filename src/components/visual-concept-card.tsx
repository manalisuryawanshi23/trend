
"use client";

import Image from "next/image";
import type { GenerateVisualConceptOutput, GenerateVisualConceptInput } from "@/ai/flows/generate-visual-concept";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Quote,
  Captions,
  Clapperboard,
  Sparkles
} from "lucide-react";

type VisualConceptCardProps = {
  result: {
    input: GenerateVisualConceptInput;
    output: GenerateVisualConceptOutput;
  }
}

export function VisualConceptCard({ result }: VisualConceptCardProps) {
  const { input, output } = result;

  return (
    <Card className="shadow-md border">
        <CardHeader>
            <CardTitle className="font-headline text-3xl font-bold text-foreground flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                Your Visual Concept
            </CardTitle>
            <CardDescription>
                An AI-generated visual based on your post idea: "{input.trendName}"
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
                <Image
                    src={output.imageUrl}
                    alt={input.trendName}
                    width={1024}
                    height={576}
                    className="w-full object-cover"
                />
            </div>
            
            <div className="space-y-4">
                <h3 className="font-headline text-xl font-semibold flex items-center">Post Details</h3>
                <ul className="space-y-3 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                    <li className="flex items-start gap-3">
                        <Quote className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <div><strong>Hook:</strong> {input.hook}</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Captions className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <div><strong>Caption:</strong> {input.caption}</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Clapperboard className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <div><strong>Format:</strong> <Badge variant="secondary">{input.suggestedPostFormat}</Badge></div>
                    </li>
                </ul>
            </div>
        </CardContent>
    </Card>
  );
}
