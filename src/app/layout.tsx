import type {Metadata} from 'next';
import { Nav } from '@/components/nav';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: 'Up Trend Finder',
  description: 'Uncover tomorrow\'s viral trends today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="min-h-screen bg-background">
           <header className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="font-headline text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Up Trend Finder
                </h1>
                <Nav />
            </div>
          </header>
          <main>
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
