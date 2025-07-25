"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const trendFormSchema = z.object({
  region: z.string(),
  niche: z.string(),
  platform: z.string(),
});

type TrendFormValues = z.infer<typeof trendFormSchema>;

type Trend = {
  keyword: string;
  region: string;
  niche: string;
  platform: string;
};

export default function ForecastTrends() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("United States");
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const trendForm = useForm<TrendFormValues>({
    resolver: zodResolver(trendFormSchema),
    defaultValues: {
      region: "United States",
      niche: "all",
      platform: "all",
    },
  });

  useEffect(() => {
    setLoading(true);
    fetch("/trends.json")
      .then((res) => res.json())
      .then((data) => {
        setTrends(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const { uniqueNiches, uniquePlatforms, filteredAndGroupedTrends } = useMemo(() => {
    if (!trends || trends.length === 0) {
      return {
        uniqueNiches: [],
        uniquePlatforms: [],
        filteredAndGroupedTrends: [],
      };
    }

    const filtered = trends.filter((trend) => {
      const regionMatch = trend.region === selectedRegion;
      const nicheMatch = selectedNiche === "all" || trend.niche === selectedNiche;
      const platformMatch = selectedPlatform === "all" || trend.platform === selectedPlatform;
      return regionMatch && nicheMatch && platformMatch;
    });

    const grouped = filtered.reduce((acc, trend) => {
      const existing = acc.find((item: any) => item.keyword === trend.keyword);
      if (!existing) {
        acc.push(trend);
      }
      return acc;
    }, [] as Trend[]);

    const niches = Array.from(new Set(trends.map((t) => t.niche)));
    const platforms = Array.from(new Set(trends.map((t) => t.platform)));

    return {
      uniqueNiches: niches,
      uniquePlatforms: platforms,
      filteredAndGroupedTrends: grouped,
    };
  }, [trends, selectedRegion, selectedNiche, selectedPlatform]);

  const onSubmit = (data: TrendFormValues) => {
    setSelectedRegion(data.region);
    setSelectedNiche(data.niche);
    setSelectedPlatform(data.platform);
    localStorage.setItem("trendPreferences", JSON.stringify(data));
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Forecast Trends</CardTitle>
          <CardDescription>Analyze emerging trends by region, niche, and platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={trendForm.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Region</Label>
              <Input {...trendForm.register("region")} placeholder="Enter region" />
            </div>
            <div>
              <Label>Niche</Label>
              <Select onValueChange={(val) => trendForm.setValue("niche", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select niche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {uniqueNiches.map((niche) => (
                    <SelectItem key={niche} value={niche}>
                      {niche}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Platform</Label>
              <Select onValueChange={(val) => trendForm.setValue("platform", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {uniquePlatforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Preferences 
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Your trend preferences will help personalize your insights.</p>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))
          : filteredAndGroupedTrends.map((trend, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{trend.keyword}</CardTitle>
                  <CardDescription>
                    {trend.niche} · {trend.platform}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
      </div>
    </div>
  );
}
