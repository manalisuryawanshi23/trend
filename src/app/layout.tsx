
import type {Metadata} from 'next';
import Link from 'next/link';
import React from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Nav } from '@/components/nav';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/theme-provider";
import { trackUniqueVisitor } from '@/lib/visitor-count';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import './globals.css';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: {
    default: 'Up Trend Finder | AI-Powered Social Media Trend Forecasting',
    template: '%s | Up Trend Finder',
  },
  description: 'Forecast viral trends 24-72 hours before they explode. Up Trend Finder uses AI to analyze social media data, giving you the insights to go viral.',
};

const footerLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
    { href: '/disclaimer', label: 'Disclaimer' },
    { href: '/blog', label: 'Blog' },
];

async function Footer() {
    const uniqueVisitors = await trackUniqueVisitor();
    return (
        <footer className="py-8 md:py-6 border-t bg-muted/50">
            <div className="container flex flex-col items-center justify-center gap-6 text-center">
                 <Badge variant="outline" className="py-2 px-4 border-primary/20 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{uniqueVisitors.toLocaleString()}</span>
                        <span>Unique Visitors Today</span>
                    </div>
                </Badge>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                   <span>© {new Date().getFullYear()} Up Trend Finder.</span>
                   {footerLinks.map((link) => (
                      <React.Fragment key={link.href}>
                          <span className="hidden md:inline">|</span>
                          <Link href={link.href} className="hover:text-primary hover:underline underline-offset-4">
                              {link.label}
                          </Link>
                      </React.Fragment>
                   ))}
                </div>
            </div>
        </footer>
    );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", fontInter.variable, fontSpaceGrotesk.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="font-headline text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      Up Trend Finder
                    </Link>
                    <Nav />
                </div>
              </div>
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
