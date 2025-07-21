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
import { Wand2, Search, Sparkles, Image, Menu, X, LifeBuoy } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Forecast', icon: <Wand2 className="h-5 w-5" /> },
  { href: '/repurpose', label: 'Repurpose', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/analyze', label: 'Analyze', icon: <Search className="h-5 w-5" /> },
  { href: '/visualize', label: 'Visualize', icon: <Image className="h-5 w-5" /> },
];

const helpGuide = [
    {
        tool: "Forecast",
        description: "Predicts emerging social media trends 24-72 hours before they go viral. Best for finding your next viral video idea before anyone else."
    },
    {
        tool: "Repurpose",
        description: "Transforms any URL (like a blog post or news article) into a ready-to-post social media update. Best for quickly turning existing content into fresh social media updates."
    },
    {
        tool: "Analyze",
        description: "Deconstructs the success (or failure) of any social media post. Best for understanding the mechanics of viral content in your niche."
    },
    {
        tool: "Visualize",
        description: "Turns your post ideas into AI-generated visual concepts. Best for brainstorming a unique look and feel for your next post."
    }
]

export function Nav() {
  const pathname = usePathname();
  const activePath = pathname === '/trends' ? '/' : pathname;

  const helpDialog = (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex h-9 w-9" aria-label="Help">
                <LifeBuoy className="h-5 w-5" />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
                        <AccordionContent className="text-muted-foreground">
                            {item.description}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
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
        {helpDialog}
      </div>


      {/* Mobile Navigation */}
      <div className="md:hidden">
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
                    <h2 className="font-headline text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Up Trend Finder
                    </h2>
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
                    <DialogContent className="sm:max-w-[425px]">
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
                                    <AccordionContent className="text-muted-foreground">
                                        {item.description}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </DialogContent>
                </Dialog>
              </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
