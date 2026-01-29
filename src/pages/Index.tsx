import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import EditorialHero from "@/components/content/EditorialHero";
import FeaturedProducts from "@/components/content/FeaturedProducts";
import OurCollections from "@/components/content/OurCollections";
import TransformationSlider from "@/components/content/TransformationSlider";
import ReelsSection from "@/components/content/ReelsSection";
import EnvironmentalImpact from "@/components/content/EnvironmentalImpact";
import BrandStory from "@/components/content/BrandStory";
import EditorialJourney from "@/components/content/EditorialJourney";
import SignatureCandles from "@/components/content/SignatureCandles";
import Testimonials from "@/components/content/Testimonials";
import GrainOverlay from "@/components/ambient/GrainOverlay";
import FloatingQuote from "@/components/ambient/FloatingQuote";
import ScrollStoryline from "@/components/ambient/ScrollStoryline";
import ScrollPause from "@/components/ambient/ScrollPause";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grain texture across entire page */}
      <GrainOverlay opacity={0.025} />

      {/* Scroll-connected vertical storyline */}
      <ScrollStoryline />

      <EditorialHeader />

      <main>
        <EditorialHero />



        <FeaturedProducts />

        <OurCollections />

        <ReelsSection />

        {/* Floating quote after products */}
        <FloatingQuote
          text="Each lamp holds a past life."
          position="right"
        />

        <BrandStory />



        <EditorialJourney />

        {/* New premium sections */}
        <SignatureCandles />

        <Testimonials />








        <EnvironmentalImpact />
      </main>

      <EditorialFooter />
    </div>
  );
};

export default Index;

