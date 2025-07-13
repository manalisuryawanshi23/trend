"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle } from "lucide-react";

import { trendForecasting } from "@/ai/flows/trend-forecasting";
import type { Trend } from "@/lib/types";
import { getPlatformsForCountry, niches, countries, userTypes } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendCard } from "@/components/trend-card";
import { useToast } from "@/hooks/use-toast";

const trendFormSchema = z.object({
  platform: z.string({ required_error: "Please select a platform." }),
  niche: z.string({ required_error: "Please select a niche." }),
  otherNiche: z.string().optional(),
  microNiche: z.string().optional(),
  otherMicroNiche: z.string().optional(),
  region: z.string({ required_error: "Please select a region." }),
  userType: z.string({ required_error: "Please select a user type." }),
});

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const { toast } = useToast();

  const trendForm = useForm<z.infer<typeof trendFormSchema>>({
    resolver: zodResolver(trendFormSchema),
    defaultValues: {
      platform: '',
      niche: 'Fashion',
      otherNiche: '',
      microNiche: 'Streetwear',
      otherMicroNiche: '',
      region: '',
      userType: 'Content Creator / Influencer',
    },
  });

  const selectedNiche = trendForm.watch("niche");
  const selectedMicroNiche = trendForm.watch("microNiche");
  const selectedRegion = trendForm.watch("region");

  useEffect(() => {
    async function detectLocation() {
      setIsDetectingLocation(true);
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error("Could not fetch location");
        const data = await response.json();
        const countryName = data.country_name;

        if (countryName && countries.includes(countryName as any)) {
          trendForm.setValue('region', countryName);
        } else {
           // Fallback to a default if detection fails or country not in list
          trendForm.setValue('region', 'United States');
        }
      } catch (error) {
        console.error("Location detection error:", error);
         // Fallback to a default on error
        trendForm.setValue('region', 'United States');
      } finally {
        setIsDetectingLocation(false);
      }
    }
    detectLocation();
  }, [trendForm]);

  useEffect(() => {
    // When region changes, update platform options and reset selected platform
    if (selectedRegion) {
        const availablePlatforms = getPlatformsForCountry(selectedRegion);
        trendForm.setValue('platform', availablePlatforms[0]?.name || '');
    }
  }, [selectedRegion, trendForm]);


  async function onTrendSubmit(values: z.infer<typeof trendFormSchema>) {
    setIsLoadingTrends(true);
    setTrends([]);
    try {
      const niche = values.niche === 'Other' ? values.otherNiche : values.niche;
      const microNiche = values.microNiche === 'Other' ? values.otherMicroNiche : values.microNiche;
      
      const nicheValue = microNiche ? `${niche} (${microNiche})` : niche;

      const result = await trendForecasting({
        platform: values.platform,
        niche: nicheValue || '',
        region: values.region,
        userType: values.userType,
      });

      if (result && result.trends) {
        setTrends(result.trends);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error Forecasting Trends",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoadingTrends(false);
    }
  }

  const microNicheOptions = niches.find(n => n.name === selectedNiche)?.microNiches || [];
  const platformOptions = selectedRegion ? getPlatformsForCountry(selectedRegion) : [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter">
          Find Your Next Viral Hit
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us about your content, and we'll predict the next big thing for you.
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Forecasting Parameters</CardTitle>
            <CardDescription>
              Fill out the details below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...trendForm}>
              <form onSubmit={trendForm.handleSubmit(onTrendSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={trendForm.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isDetectingLocation}>
                           <FormControl>
                            <SelectTrigger>
                              {isDetectingLocation && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                              <SelectValue placeholder={isDetectingLocation ? "Detecting location..." : "Select a region"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={trendForm.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedRegion}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {platformOptions.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={trendForm.control}
                    name="niche"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niche</FormLabel>
                        <Select onValueChange={(value) => {
                            field.onChange(value);
                            trendForm.setValue("microNiche", "");
                            trendForm.setValue("otherNiche", "");
                            trendForm.setValue("otherMicroNiche", "");
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a niche" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {niches.map(n => <SelectItem key={n.name} value={n.name}>{n.name}</SelectItem>)}
                             <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {selectedNiche === 'Other' && (
                     <FormField
                        control={trendForm.control}
                        name="otherNiche"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Niche</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Historical Fashion" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  )}
                  
                  <FormField
                      control={trendForm.control}
                      name="microNiche"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Micro-Niche (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={selectedNiche !== 'Other' && microNicheOptions.length === 0}>
                          <FormControl>
                              <SelectTrigger>
                              <SelectValue placeholder="Select a micro-niche" />
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                              {microNicheOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                              <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                          </Select>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  
                  {selectedMicroNiche === 'Other' && (
                     <FormField
                        control={trendForm.control}
                        name="otherMicroNiche"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Micro-Niche</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Victorian Era Gowns" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  )}
                  
                   <FormField
                    control={trendForm.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>User Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your user type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {userTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoadingTrends} className="w-full md:w-auto font-bold text-lg py-6 px-8" size="lg">
                  {isLoadingTrends && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                  {isLoadingTrends ? 'Conjuring Trends...' : 'Forecast Trends'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <section className="mt-12">
        {isLoadingTrends && (
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold mb-6 text-center animate-pulse">Scanning the Socialverse...</h2>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-7 w-3/5" />
                  <Skeleton className="h-4 w-1/5" />
                </div>
                 <Skeleton className="h-5 w-4/5 mt-4" />
              </Card>
            ))}
          </div>
        )}

        {!isLoadingTrends && trends.length > 0 && (
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6 text-center">🔥 Top 5 Emerging Trends</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {trends.map((trend, index) => (
                <TrendCard key={index} trend={trend} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
