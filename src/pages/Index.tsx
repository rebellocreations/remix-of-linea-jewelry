import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LargeHero from "../components/content/LargeHero";
import FiftyFiftySection from "../components/content/FiftyFiftySection";
import OneThirdTwoThirdsSection from "../components/content/OneThirdTwoThirdsSection";
import ProductCarousel from "../components/content/ProductCarousel";
import EditorialSection from "../components/content/EditorialSection";
import Reveal from "@/components/motion/Reveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <LargeHero />
        <div id="featured-products">
          <Reveal delayMs={50}>
            <ProductCarousel />
          </Reveal>
        </div>
        <Reveal delayMs={100}>
          <FiftyFiftySection />
        </Reveal>
        <Reveal delayMs={150}>
          <OneThirdTwoThirdsSection />
        </Reveal>
        <Reveal delayMs={200}>
          <EditorialSection />
        </Reveal>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
