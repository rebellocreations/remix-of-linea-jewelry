import { useEffect } from "react";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";

const SHOPIFY_STORE_DOMAIN = "1urfjp-ta.myshopify.com";

const AccountPage = () => {
  useEffect(() => {
    // Redirect to Shopify's hosted customer account page
    window.location.href = `https://${SHOPIFY_STORE_DOMAIN}/account`;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <EditorialHeader />
      
      <main className="pt-24 pb-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
          <div className="animate-pulse">
            <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Redirecting to your account...
            </h1>
            <p className="text-muted-foreground text-sm">
              You'll be taken to the secure Shopify login page.
            </p>
          </div>
        </div>
      </main>
      
      <EditorialFooter />
    </div>
  );
};

export default AccountPage;
