
import { HeroSection } from "@/components/home/hero-section";
import { VisionSection } from "@/components/home/vision-section";
import { ProductsPreview } from "@/components/home/products-preview";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { StatsSection } from "@/components/home/stats-section";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VisionSection />
      <ProductsPreview />
      <TeamSection />
      <TestimonialsSection />
      <StatsSection />
    </>
  );
}
