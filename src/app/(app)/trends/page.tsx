
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Wand2, Save } from "lucide-react";

import { trendForecasting } from "@/ai/flows/trend-forecasting";
import type { Trend } from "@/lib/types";
import { getPlatformsForCountry, niches, countries, userTypes, aiModels } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  otherUserType: z.string().optional(),
  model: z.string({ required_error: "Please select an AI model." }),
});

type TrendFormValues = z.infer<typeof trendFormSchema>;

const LOCAL_STORAGE_KEY = 'trendseer_prefs';

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const { toast } = useToast();

  const trendForm = useForm<TrendFormValues>({
    resolver: zodResolver(trendFormSchema),
    defaultValues: {
      platform: '',
      niche: 'Fashion',
      otherNiche: '',
      microNiche: 'Streetwear',
      otherMicroNiche: '',
      region: '',
      userType: 'Content Creator / Influencer',
      otherUserType: '',
      model: aiModels[0].name,
    },
  });

  useEffect(() => {
    // Load preferences from localStorage
    const savedPrefsString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPrefsString) {
      try {
        const savedPrefs = JSON.parse(savedPrefsString);
        trendForm.reset(savedPrefs);
        setIsDetectingLocation(false); // Preferences loaded, no need to detect
        return;
      } catch (e) {
        console.error("Failed to parse saved preferences", e);
      }
    }
    
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

  const selectedNiche = trendForm.watch("niche");
  const selectedMicroNiche = trendForm.watch("microNiche");
  const selectedRegion = trendForm.watch("region");
  const selectedUserType = trendForm.watch("userType");

  useEffect(() => {
    // When region changes, update platform options and reset selected platform if it's not available
    if (selectedRegion) {
        const availablePlatforms = getPlatformsForCountry(selectedRegion);
        const currentPlatform = trendForm.getValues("platform");
        if (!availablePlatforms.some(p => p.name === currentPlatform)) {
             trendForm.setValue('platform', availablePlatforms[0]?.name || '');
        }
    }
  }, [selectedRegion, trendForm]);


  async function onTrendSubmit(values: TrendFormValues) {
    setIsLoadingTrends(true);
    setTrends([]);
    try {
      const niche = values.niche === 'Other' ? values.otherNiche : values.niche;
      const microNiche = values.microNiche === 'Other' ? values.otherMicroNiche : values.microNiche;
      const userType = values.userType === 'Other' ? values.otherUserType : values.userType;
      
      const nicheValue = microNiche ? `${niche} (${microNiche})` : niche;

      const result = await trendForecasting({
        platform: values.platform,
        niche: nicheValue || '',
        region: values.region,
        userType: userType || '',
        model: values.model,
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
        description: "An unexpected error occurred. The selected AI model may be overloaded. Please try again later.",
      });
    } finally {
      setIsLoadingTrends(false);
    }
  }

  function savePreferences() {
    const values = trendForm.getValues();
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
      toast({
        title: "Preferences Saved",
        description: "Your forecasting parameters have been saved for your next visit.",
      });
    } catch (e) {
       console.error("Failed to save preferences", e);
       toast({
        variant: "destructive",
        title: "Error Saving Preferences",
        description: "Could not save your preferences. Your browser might have local storage disabled.",
       });
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
              Fill out the details below to get started. You can save your preferences for next time.
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
                        }} value={field.value}>
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
                  
                  <div className="contents sm:block sm:col-span-1">
                    <FormField
                        control={trendForm.control}
                        name="microNiche"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Micro-Niche (Optional)</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                value={field.value} 
                                disabled={selectedNiche !== 'Other' && microNicheOptions.length === 0}
                            >
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
                  </div>
                  
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
                  
                   <div className="sm:col-span-2 space-y-2">
                     <FormField
                      control={trendForm.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
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
                    {selectedUserType === 'Other' && (
                       <FormField
                          control={trendForm.control}
                          name="otherUserType"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Your User Type</FormLabel>
                              <FormControl>
                                  <Input placeholder="e.g., Independent Journalist" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                    )}
                   </div>
                   <div className="sm:col-span-2 space-y-2">
                     <FormField
                      control={trendForm.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Wand2 className="h-4 w-4" />
                            AI Model
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an AI model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {aiModels.map(m => (
                                <SelectItem key={m.name} value={m.name}>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{m.label}</span>
                                        <span className="text-xs text-muted-foreground">{m.description}</span>
                                    </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            More powerful models may provide higher quality results, but take longer to process.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <Button type="submit" disabled={isLoadingTrends} className="w-full md:w-auto font-bold text-lg py-6 px-8 flex-grow" size="lg">
                        {isLoadingTrends && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                        {isLoadingTrends ? 'Conjuring Trends...' : 'Forecast Trends'}
                    </Button>
                    <Button type="button" variant="outline" onClick={savePreferences} className="w-full md:w-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                    </Button>
                </div>
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

    