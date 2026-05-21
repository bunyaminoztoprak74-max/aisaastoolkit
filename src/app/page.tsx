import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { TrendingTools } from "@/components/home/TrendingTools";
import { TopComparisons } from "@/components/home/TopComparisons";
import { FeaturedReviews } from "@/components/home/FeaturedReviews";
import { WhyTrustUs } from "@/components/home/WhyTrustUs";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export const metadata: Metadata = {
  title: "AISaaSToolkit — Best AI Tools Reviews & Comparisons 2026",
  description: "Independent reviews, comparisons, and rankings of the best AI SaaS tools in 2026. Find the right AI automation, writing, video, and SEO tools for your business.",
  alternates: { canonical: "https://aisaastoolkit.com" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <TrendingTools />
      <FeaturedReviews />
      <TopComparisons />
      <WhyTrustUs />
      <NewsletterSignup />
    </>
  );
}
