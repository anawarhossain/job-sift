import { CTASection } from "@/components/cTASection/CTASection";
import { FeaturedJobs } from "@/components/featuredJobs/FeaturedJobs";
import { FeaturesGrid } from "@/components/featuresGrid/FeaturesGrid";
import { HeroSection } from "@/components/heroSection/HeroSection";
import { PricingSection } from "@/components/pricingSection/PricingSection";
import { StatsSection } from "@/components/statsSection/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturedJobs />
      <FeaturesGrid />
      <PricingSection />
      <CTASection/>
    </div>
  );
}
