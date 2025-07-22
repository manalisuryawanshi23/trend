
"use client";

import Image from "next/image";
import type { GenerateVisualConceptOutput, GenerateVisualConceptInput } from "@/ai/flows/generate-visual-concept";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Quote,
  Captions,
  Clapperboard,
  Sparkles,
  Download,
} from "lucide-react";
import { Button } from "./ui/button";

type VisualConceptCardProps = {
  result: {
    input: GenerateVisualConceptInput;
    output: GenerateVisualConceptOutput;
  }
}

export function VisualConceptCard({ result }: VisualConceptCardProps) {
  const { input, output } = result;

  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  const altText = `AI-generated visual for the theme: "${input.trendName}". Concept: a visual representation of the hook "${input.hook}" and caption.`;

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
            <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                    <Image
                        src={output.imageUrl}
                        alt={altText}
                        width={1024}
                        height={576}
                        className="w-full object-cover"
                    />
                </div>
                 <a
                    href={output.imageUrl}
                    download={`uptrend-visual-${slugify(input.trendName)}.png`}
                    className="inline-block"
                >
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                    </Button>
                </a>
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
