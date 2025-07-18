import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Nav } from '@/components/nav';

export const metadata: Metadata = {
  title: 'Trend Seer',
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
           <header className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Trend Seer
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
