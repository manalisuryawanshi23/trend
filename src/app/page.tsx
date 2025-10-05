
import { type Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart2, Zap, Brain, Users, RefreshCw, PenSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import placeholderImages from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'UpTrendFinder: AI Social Media Trend Prediction Tool',
  description: 'Instantly discover the next viral trends with our AI trend forecasting tool. Get AI-powered content ideas to grow faster. Perfect for creators, influencers, and marketers.',
};

const features = [
  {
    icon: <BarChart2 className="w-8 h-8 mb-4 text-primary" />,
    title: "Trend Forecasting",
    description: "Predict viral trends 24-72 hours before they happen. Our AI analyzes millions of data points to give you an unfair advantage.",
    link: "/forecast",
    image: placeholderImages['feature-forecast']
  },
  {
    icon: <RefreshCw className="w-8 h-8 mb-4 text-primary" />,
    title: "Content Repurposing",
    description: "Magically transform any URL—like a blog post or news article—into a ready-to-post social media update for any platform.",
    link: "/repurpose",
    image: placeholderImages['feature-repurpose']
  },
  {
    icon: <Search className="w-8 h-8 mb-4 text-primary" />,
    title: "Post Analyzer",
    description: "Deconstruct the success of any social media post from a URL. Get a virality score and a breakdown of what made it work.",
    link: "/analyze",
    image: placeholderImages['feature-analyze']
  }
];

const testimonials = [
  {
    quote: "UpTrendFinder is my secret weapon. I found a trend for my cooking channel, posted a video, and it hit a million views in two days. It felt like cheating.",
    author: "@foodiecreator",
    role: "TikTok Creator, 1.2M Followers",
    avatar: placeholderImages['avatar-1']
  },
  {
    quote: "As a social media manager for multiple brands, this tool saves me hours of research every week. The AI-powered accuracy is mind-blowing. I can finally be proactive instead of reactive.",
    author: "Sarah L.",
    role: "Social Media Manager",
    avatar: placeholderImages['avatar-2']
  },
    {
    quote: "We use UpTrendFinder to inform content strategy for all our clients. The ability to forecast trends by niche and region is a game-changer for getting our clients ahead of the competition.",
    author: "Mark Chen",
    role: "Founder, Apex Marketing Agency",
    avatar: placeholderImages['avatar-3']
  }
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-background text-center py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-0"></div>
             <div 
                className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse"
                style={{ animationDuration: '8s' }}
            ></div>
            <div 
                className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse"
                style={{ animationDuration: '10s', animationDelay: '2s' }}
            ></div>
            <div className="container relative z-10">
                <Badge variant="outline" className="mb-6 border-primary/50 text-primary font-semibold">
                    🚀 Now with Gemini 2.5 Pro
                </Badge>
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                    Stop Chasing Trends. Start Setting Them.
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
                    UpTrendFinder is your AI co-pilot for social media. We analyze millions of data points to forecast viral trends, generate content ideas, and give you the tools to grow faster.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/forecast">
                        <Button size="lg" className="font-bold text-lg py-7 px-8 w-full sm:w-auto group">
                            Get Your Free Forecast
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
                        The Ultimate Content Creator Toolkit
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Everything you need to outpace the competition and grow your audience faster than ever.
                    </p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Link href={feature.link} key={feature.title} className="group flex">
                            <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-full">
                                <CardHeader>
                                    {feature.icon}
                                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <span className="text-sm font-semibold text-primary group-hover:underline">
                                        Try Now <ArrowRight className="inline-block ml-1 h-4 w-4" />
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
                        Go From Idea to Viral in 3 Steps
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Our workflow is designed to be simple, fast, and powerful.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
                            <span className="font-headline text-2xl font-bold">1</span>
                        </div>
                        <h3 className="font-headline text-xl font-semibold mb-2">Define Your Niche</h3>
                        <p className="text-muted-foreground">Tell our AI your platform, niche, and region to get hyper-relevant trend predictions.</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
                           <span className="font-headline text-2xl font-bold">2</span>
                        </div>
                        <h3 className="font-headline text-xl font-semibold mb-2">Get an AI Post Plan</h3>
                        <p className="text-muted-foreground">Instantly receive a list of emerging trends, complete with a hook, caption, hashtags, and more.</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
                           <span className="font-headline text-2xl font-bold">3</span>
                        </div>
                        <h3 className="font-headline text-xl font-semibold mb-2">Create and Post</h3>
                        <p className="text-muted-foreground">Use the AI-powered plan to create content with confidence and post it before the trend gets saturated.</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Social Proof Section */}
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="container">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
                        Trusted by the World's Fastest-Growing Creators
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.author} className="bg-background/50 border-0 shadow-none">
                            <CardContent className="p-6">
                                <p className="text-lg text-foreground font-medium mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary/50">
                                        <AvatarImage src={testimonial.avatar.src} alt={testimonial.avatar.alt} data-ai-hint={testimonial.avatar.hint} />
                                        <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

         {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center bg-background">
            <div className="container">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Ready to Go Viral?
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
                    Your next big hit is just a click away. Get an instant, AI-powered trend forecast for your niche right now—no credit card or sign-up required.
                </p>
                <Link href="/forecast">
                    <Button size="lg" className="font-bold text-lg py-7 px-8 animate-pulse">
                        🚀 Get Your Free Trend Forecast Now
                    </Button>
                </Link>
            </div>
        </section>
      </main>
    </div>
  );
}
