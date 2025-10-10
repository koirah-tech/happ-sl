import FeatureSection from "@/components/public-pages/landing-page/featureSection";
import HomeHeroSection from "@/components/public-pages/landing-page/heroSection";
import HowItWorks from "@/components/public-pages/landing-page/howItWorksSection";
import Divider from "@/components/ui/divider";


export default function Home() {
  return (
    <div className="grid gap-5 items-center justify-center">
        <HomeHeroSection />
        <Divider className="my-8" width={"md:w-3xl md:mx-auto"}  variant="dashed"/>
        <HowItWorks />
        <FeatureSection />
    </div>
  );
}