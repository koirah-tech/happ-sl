import HomeHeroSection from "@/components/public-pages/landing-page/heroSection";
import WhatWeDoSection from "@/components/public-pages/landing-page/whatWeDoSection";



export default function Home() {
  return (
    <div className="grid gap-10 items-center justify-center">
        <HomeHeroSection />
        <WhatWeDoSection />
    </div>
  );
}