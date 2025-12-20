import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import EditorialHero from "@/components/content/EditorialHero";
import FeaturedProducts from "@/components/content/FeaturedProducts";
import BrandStory from "@/components/content/BrandStory";
import FeaturedCollection from "@/components/content/FeaturedCollection";
import EditorialImageBlocks from "@/components/content/EditorialImageBlocks";
import TransitionLine from "@/components/content/TransitionLine";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EditorialHeader />
      
      <main>
        <EditorialHero />
        
        <TransitionLine text="Made slowly, not in bulk." />
        
        <FeaturedProducts />
        
        <BrandStory />
        
        <TransitionLine text="Each lamp begins as waste." />
        
        <FeaturedCollection />
        
        <EditorialImageBlocks />
      </main>
      
      <EditorialFooter />
    </div>
  );
};

export default Index;
