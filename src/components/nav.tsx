"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Wand2, Search, Sparkles, Image, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Forecast', icon: <Wand2 className="h-5 w-5 mr-3" /> },
  { href: '/repurpose', label: 'Repurpose', icon: <Sparkles className="h-5 w-5 mr-3" /> },
  { href: '/analyze', label: 'Analyze', icon: <Search className="h-5 w-5 mr-3" /> },
  { href: '/visualize', label: 'Visualize', icon: <Image className="h-5 w-5 mr-3" /> },
];

export function Nav() {
  const pathname = usePathname();
  const activePath = pathname === '/trends' ? '/' : pathname;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1 rounded-lg bg-muted p-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'transition-colors duration-200 flex items-center',
              activePath === item.href
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
            aria-label={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
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
                      {item.icon}
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
