import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import EditorialHero from "@/components/content/EditorialHero";
import FeaturedProducts from "@/components/content/FeaturedProducts";
import BrandStory from "@/components/content/BrandStory";
import EditorialJourney from "@/components/content/EditorialJourney";
import FeaturedCollection from "@/components/content/FeaturedCollection";
import EditorialImageBlocks from "@/components/content/EditorialImageBlocks";
import TransitionLine from "@/components/content/TransitionLine";
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

        <TransitionLine text="Made slowly, not in bulk." />

        <FeaturedProducts />

        {/* Floating quote after products */}
        <FloatingQuote
          text="Each lamp holds a past life."
          position="right"
        />

        <BrandStory />

        {/* Intentional scroll pause after story */}
        <ScrollPause text="This is not mass-produced lighting." />

        <TransitionLine text="Each lamp begins as waste." />

        <EditorialJourney />

        <FeaturedCollection />

        {/* Floating quote before materials */}
        <FloatingQuote
          text="Light, shaped by hand."
          position="left"
        />

        <EditorialImageBlocks />

        {/* Final floating quote */}
        <FloatingQuote
          text="No two pieces are alike."
          position="center"
        />
      </main>

      <EditorialFooter />
    </div>
  );
};

export default Index;
