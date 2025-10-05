
import { type Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, BarChart2, Zap, BrainCircuit, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { allPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'UpTrendFinder: AI Social Media Trend Prediction Tool',
  description: 'Instantly discover the next viral trends with our AI trend forecasting tool. Get AI-powered content ideas to grow faster. Perfect for creators, influencers, and marketers.',
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 text-center bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent -z-10"></div>
            <div className="container relative z-10">
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6">
                    Discover Tomorrow's Trends, Today.
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
                    UpTrendFinder is your AI-powered crystal ball for social media, forecasting viral trends 24-72 hours before they explode.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/forecast">
                        <Button size="lg" className="font-bold text-lg py-7 px-8 w-full sm:w-auto">
                            🚀 Try Free Forecast Now
                        </Button>
                    </Link>
                </div>
                 <div className="mt-12 flex justify-center">
                    <Image
                        src="https://picsum.photos/seed/landing-hero/1000/560"
                        alt="Screenshot of the UpTrendFinder dashboard showing an AI trend forecast for a future social media trend."
                        width={1000}
                        height={560}
                        className="rounded-lg border-2 border-primary/20 shadow-2xl shadow-primary/10"
                        priority
                        data-ai-hint="dashboard futuristic"
                    />
                </div>
            </div>
        </section>

        {/* What It Does Section */}
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="container text-center max-w-3xl">
                 <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Stop Guessing, Start Forecasting
                </h2>
                <p className="text-lg text-muted-foreground">
                    UpTrendFinder analyzes millions of real-time social signals to give you a clear, data-driven advantage. Our AI finds emerging patterns, sounds, and topics in your niche, providing you with a complete post plan so you can create content with confidence.
                </p>
            </div>
        </section>


        {/* Sample Forecast Preview */}
        <section className="py-16 md:py-24">
            <div className="container text-center">
                <h3 className="text-sm font-semibold uppercase text-primary tracking-wider mb-2">See It In Action</h3>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
                    Get actionable insights, not just data. Here’s a sample of what you'll get.
                </p>
                <div className="max-w-4xl mx-auto">
                     <Card className="text-left overflow-hidden shadow-lg border-2 border-primary/10">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl flex items-center gap-3">
                                <BarChart2 className="text-primary"/>
                                Example: Upcoming Trend in Fashion 2025
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="font-semibold text-foreground">Trend Name: "Bio-Luminescent Outerwear"</p>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Why it's rising:</span> A fusion of wearable tech and sustainable fashion is driving interest in clothing that glows, powered by bioluminescent algae.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-md space-y-2">
                                <p className="text-sm"><span className="font-semibold">Hook Idea:</span> "My new jacket is alive..."</p>
                                <p className="text-sm"><span className="font-semibold">Caption Idea:</span> "Wearing the future. This jacket is powered by bioluminescent algae, and it's lighting up my feed. What do you think of wearable tech? #bioluminescent #futurefashion #sustainabletech"</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                        The Ultimate Content Creator Advantage
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Get everything you need to outpace the competition and grow your audience faster than ever.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="bg-background">
                        <CardHeader>
                            <Zap className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline">Grow Faster</CardTitle>
                            <CardDescription>Ride the viral wave by catching trends early, leading to explosive organic reach and follower growth.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader>
                            <BrainCircuit className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline">AI-Powered Ideas</CardTitle>
                            <CardDescription>Overcome creator's block with endless AI-generated content ideas, hooks, and captions tailored to your niche.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="bg-background">
                         <CardHeader>
                            <BarChart2 className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline">Stay Ahead</CardTitle>
                            <CardDescription>Our trend forecasting tool gives you the strategic insights to become a leader in your category, not a follower.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader>
                             <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline">Save Time</CardTitle>
                            <CardDescription>Stop endlessly scrolling for ideas. Get data-backed trend reports and post plans in seconds.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 md:py-24">
            <div className="container">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Users className="h-6 w-6 text-primary" />
                        <p className="font-semibold text-lg text-muted-foreground">
                            Trusted by 2,000+ creators and marketers
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground mb-4">"UpTrendFinder is my secret weapon. I found a trend for my cooking channel, posted a video, and it hit a million views in two days. It felt like cheating."</p>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://picsum.photos/seed/avatar1/40/40" alt="@foodiecreator" data-ai-hint="person happy"/>
                                    <AvatarFallback>FC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">@foodiecreator</p>
                                    <p className="text-sm text-muted-foreground">TikTok Creator</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground mb-4">"As a social media manager, this tool saves me hours of research every week. The AI-powered accuracy is mind-blowing. I can finally be proactive instead of reactive."</p>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://picsum.photos/seed/avatar2/40/40" alt="Sarah L." data-ai-hint="professional woman"/>
                                    <AvatarFallback>SL</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Sarah L.</p>
                                    <p className="text-sm text-muted-foreground">Social Media Manager</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

         {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center bg-muted/50">
            <div className="container">
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Ready to Go Viral?
                </h2>
                <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-8">
                    Your next big hit is just a click away. Get an instant, AI-powered trend forecast for your niche right now.
                </p>
                <Link href="/forecast">
                    <Button size="lg" className="font-bold text-lg py-7 px-8 animate-pulse">
                        🚀 Try Free Forecast Now
                    </Button>
                </Link>
                <p className="mt-4 text-sm text-muted-foreground">
                    No sign-up needed. Get your first forecast instantly.
                </p>
            </div>
        </section>
      </main>
    </div>
  );
}
