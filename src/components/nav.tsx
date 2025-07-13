"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const navItems = [
  { href: '/trends', label: 'Trend Forecasting' },
  { href: '/repurpose', label: 'Repurpose Content' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2 rounded-lg bg-muted p-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'transition-colors duration-200',
            pathname === item.href
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
