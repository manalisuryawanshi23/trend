
import type {Metadata} from 'next';
import Link from 'next/link';
import React from 'react';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster";
import { Nav } from '@/components/nav';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppThemeProvider } from "@/components/theme-provider";
import './globals.css';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

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
    default: 'UpTrendFinder: AI Social Media Trend Prediction Tool',
    template: '%s | UpTrendFinder',
  },
  description: 'Forecast viral trends 24-72 hours before they explode. UpTrendFinder uses AI to analyze social media data, giving you the insights to go viral.',
  alternates: {
    canonical: 'https://uptrendfinder.com',
  },
};

const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
];

const socialLinks = [
    { href: '#', label: 'Facebook', icon: <Facebook className="h-5 w-5"/> },
    { href: '#', label: 'Instagram', icon: <Instagram className="h-5 w-5"/> },
    { href: '#', label: 'X', icon: <Twitter className="h-5 w-5"/> },
    { href: '#', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5"/> },
]

function Footer() {
    return (
        <footer className="py-8 md:py-12 border-t bg-background">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="font-headline text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      UpTrendFinder
                    </Link>
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                   {footerLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="hover:text-primary hover:underline underline-offset-4">
                          {link.label}
                      </Link>
                   ))}
                </div>
                 <div className="flex justify-center gap-4">
                    {socialLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-primary" aria-label={link.label}>
                            {link.icon}
                        </Link>
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
        <head>
          {/* Google Tag Manager */}
          <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N7LD5VDR');`}
          </Script>
          {/* End Google Tag Manager */}

          {/* Google tag (gtag.js) */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-58EXMBMZ1W"></Script>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-58EXMBMZ1W');
            `}
          </Script>
          {/* End Google tag (gtag.js) */}
        </head>
      <body className={cn("font-body antialiased", fontInter.variable, fontSpaceGrotesk.variable)}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N7LD5VDR"
            height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          <AppThemeProvider>
            <div className="flex flex-col min-h-screen bg-background">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                  <div className="flex items-center justify-between gap-4">
                      <Link href="/" className="font-headline text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        UpTrendFinder
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
          </AppThemeProvider>
      </body>
    </html>
  );
}
