"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wand2, Search, Sparkles, Image, Menu, X, LifeBuoy, CheckCircle2, Star, Rocket, Newspaper, Captions } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Forecast', icon: <Wand2 className="h-5 w-5" /> },
  { href: '/captions', label: 'Captions', icon: <Captions className="h-5 w-5" /> },
  { href: '/repurpose', label: 'Repurpose', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/analyze', label: 'Analyze', icon: <Search className="h-5 w-5" /> },
  { href: '/visualize', label: 'Visualize', icon: <Image className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Newspaper className="h-5 w-5" /> },
];

const helpGuide = [
    {
        tool: "Forecast",
        description: "Predicts emerging social media trends 24-72 hours before they go viral.",
        useCase: "Best for finding your next viral video idea before anyone else.",
        steps: [
            "Select your region and platform.",
            "Choose your content niche and, optionally, a micro-niche.",
            "Select the AI model (Flash is faster, Pro is more powerful).",
            "Click 'Forecast Trends' to see the top 5 emerging trends."
        ],
        proTip: "Check back daily! New trends surface all the time. Saving your preferences makes this even faster."
    },
    {
        tool: "Captions",
        description: "Generates 5 unique caption and hashtag ideas from your image.",
        useCase: "Best for overcoming writer's block and getting creative copy for your posts.",
        steps: [
            "Upload an image.",
            "Select the social media platform you're posting to.",
            "Optionally, add some context or instructions for the AI.",
            "Click 'Generate Captions' to get 5 distinct options."
        ],
        proTip: "Use the 'Optional Context' field to guide the AI's tone, e.g., 'make it funny' or 'ask an engaging question'."
    },
    {
        tool: "Repurpose",
        description: "Transforms any URL (like a blog post or news article) into a ready-to-post social media update.",
        useCase: "Best for quickly turning existing content into fresh social media updates.",
        steps: [
            "Find an article, blog, or any web page with interesting content.",
            "Paste the URL into the 'Content URL' field.",
            "Select the social media platform you want to post to.",
            "Click 'Generate Post' to get a new hook, caption, and hashtags."
        ],
        proTip: "Use this to breathe new life into your old blog posts or share interesting articles you've read."
    },
    {
        tool: "Analyze",
        description: "Deconstructs the success (or failure) of any social media post.",
        useCase: "Best for understanding the mechanics of viral content in your niche.",
        steps: [
            "Find a social media post (e.g., on TikTok, Instagram, Twitter).",
            "Copy the public URL of the post.",
            "Paste it into the 'Post URL' field.",
            "Click 'Analyze Post' for a detailed breakdown and virality score."
        ],
        proTip: "Analyze your competitors' most successful posts to learn what strategies work best in your niche."
    },
    {
        tool: "Visualize",
        description: "Turns your post ideas into AI-generated visual concepts.",
        useCase: "Best for brainstorming a unique look and feel for your next post.",
        steps: [
            "Enter your trend or theme (e.g., 'Cottagecore Aesthetic').",
            "Select the post format to get the right aspect ratio.",
            "Write a compelling hook and caption for your ideal post.",
            "Click 'Generate Visual' to see your idea come to life as an image."
        ],
        proTip: "Be descriptive in your caption! The more detail you provide, the better the AI can match your vision."
    }
]

export function Nav() {
  const pathname = usePathname();
  const activePath = pathname;

  const helpDialogContent = (
    <>
      <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2"> <LifeBuoy className="h-6 w-6 text-primary"/> How to Use Up Trend Finder</DialogTitle>
          <DialogDescription>
              Here’s a quick guide to the tools available in your dashboard.
          </DialogDescription>
      </DialogHeader>
      <Accordion type="single" collapsible className="w-full">
          {helpGuide.map((item) => (
              <AccordionItem value={item.tool} key={item.tool}>
                  <AccordionTrigger className="font-semibold text-lg">{item.tool}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4">
                      <p>{item.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground flex items-center gap-2"><Rocket className="h-4 w-4 text-primary" />How to Use</h4>
                        <ul className="space-y-1.5 pl-2">
                           {item.steps.map((step, i) => (
                             <li key={i} className="flex items-start gap-2">
                               <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                               <span>{step}</span>
                             </li>
                           ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Best For:</h4>
                        <p>{item.useCase}</p>
                      </div>
                      
                       <div className="space-y-2 bg-primary/10 p-3 rounded-md">
                        <h4 className="font-semibold text-primary flex items-center gap-2"><Star className="h-4 w-4" />Pro Tip</h4>
                        <p>{item.proTip}</p>
                      </div>

                  </AccordionContent>
              </AccordionItem>
          ))}
      </Accordion>
    </>
  );

  const helpDialog = (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex h-9 w-9" aria-label="Help">
                <LifeBuoy className="h-5 w-5" />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90svh] overflow-y-auto">
            {helpDialogContent}
        </DialogContent>
    </Dialog>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1 rounded-full bg-muted p-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'transition-colors duration-200 flex items-center rounded-full',
              activePath === item.href
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
            aria-label={item.label}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />
        {helpDialog}
      </div>


      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-full max-w-sm">
             <SheetHeader className="p-4 border-b">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center justify-between">
                    <Link href="/" className="font-headline text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Up Trend Finder
                    </Link>
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon">
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close menu</span>
                       </Button>
                    </SheetClose>
                </div>
             </SheetHeader>
              <nav className="flex flex-col space-y-2 p-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'lg' }),
                        'transition-colors duration-200 flex items-center justify-start text-lg',
                         activePath === item.href
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {React.cloneElement(item.icon, { className: 'h-5 w-5 mr-3' })}
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="lg" className="transition-colors duration-200 flex items-center justify-start text-lg text-muted-foreground hover:bg-muted hover:text-foreground">
                            <LifeBuoy className="h-5 w-5 mr-3" />
                            Help
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md max-h-[90svh] overflow-y-auto">
                        {helpDialogContent}
                    </DialogContent>
                </Dialog>
              </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
