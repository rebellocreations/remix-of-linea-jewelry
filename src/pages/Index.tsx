import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import EditorialHero from "@/components/content/EditorialHero";
import AsymmetricProductGrid from "@/components/product/AsymmetricProductGrid";
import BrandStory from "@/components/content/BrandStory";
import FeaturedCollection from "@/components/content/FeaturedCollection";
import EditorialImageBlocks from "@/components/content/EditorialImageBlocks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EditorialHeader />
      
      <main>
        <EditorialHero />
        <AsymmetricProductGrid />
        <BrandStory />
        <FeaturedCollection />
        <EditorialImageBlocks />
      </main>
      
      <EditorialFooter />
    </div>
  );
};

export default Index;