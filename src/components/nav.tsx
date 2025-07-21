"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Wand2, Search, Sparkles, Image } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Forecast', icon: <Wand2 className="h-4 w-4 sm:mr-2" /> },
  { href: '/repurpose', label: 'Repurpose2', icon: <Sparkles className="h-4 w-4 sm:mr-2" /> },
  { href: '/analyze', label: 'Analyze', icon: <Search className="h-4 w-4 sm:mr-2" /> },
  { href: '/visualize', label: 'Visualize', icon: <Image className="h-4 w-4 sm:mr-2" /> },
];

export function Nav() {
  const pathname = usePathname();

  // A simple way to map root and /trends to the same nav item
  const activePath = pathname === '/trends' ? '/' : pathname;

  return (
    <nav className="flex items-center space-x-1 rounded-lg bg-muted p-1">
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
          <span className="hidden sm:inline">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
