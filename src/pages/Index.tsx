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
import BestSellers from "@/components/content/BestSellers";
import GrainOverlay from "@/components/ambient/GrainOverlay";
import FloatingQuote from "@/components/ambient/FloatingQuote";
import ScrollStoryline from "@/components/ambient/ScrollStoryline";
import ScrollPause from "@/components/ambient/ScrollPause";
import ReviewsMarquee from "@/components/content/ReviewsMarquee";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Rebello Creations — Handcrafted Upcycled Glass Decor & Lighting | India"
        description="Rebello Creations transforms discarded glass bottles into luxury handcrafted lamps, drinkware, candles & home decor. Sustainable, eco-friendly, made in India. Shop now!"
        canonical="https://www.rebellocreations.com/"
        keywords="upcycled glass decor, handcrafted home decor India, sustainable home decor, recycled bottle lamps, eco-friendly gifts, Rebello Creations"
      />
      {/* Subtle grain texture across entire page */}
      <GrainOverlay opacity={0.025} />

      {/* Scroll-connected vertical storyline */}
      <ScrollStoryline />

      <EditorialHeader />

      <main>
        <EditorialHero />



        <FeaturedProducts />

        <OurCollections />

        <TransformationSlider />

        <ReelsSection />
        <BestSellers />

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
        <ReviewsMarquee />








        <EnvironmentalImpact />
      </main>

      <EditorialFooter />
    </div>
  );
};

export default Index;

