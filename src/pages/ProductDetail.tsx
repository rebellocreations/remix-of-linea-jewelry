import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// New Components
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductAccordion from "@/components/product/ProductAccordion";
import Reviews from "@/components/product/Reviews";
import SimilarProducts from "@/components/product/SimilarProducts";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ambient/GrainOverlay";

const ProductDetail = () => {
  const { productId } = useParams();
  const handle = productId || "";

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const p = await fetchProductByHandle(handle);
        setProduct(p);
      } catch (e) {
        console.error("Failed to load Shopify product:", e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (handle) load();
  }, [handle]);

  const images = useMemo(() => product?.images?.edges?.map((e: any) => e.node) ?? [], [product]);
  const variant = product?.variants?.edges?.[0]?.node;

  const onAddToCart = (quantity: number) => {
    if (!product || !variant) return;

    addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: quantity,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: `${quantity}x ${product.title}`,
      position: "top-center",
    });
  };

  const onBuyNow = (quantity: number) => {
    onAddToCart(quantity);
    // In a real app, this would redirect to checkout immediately
    window.location.href = "/checkout";
  };

  if (loading) return <div className="min-h-screen grid place-items-center bg-[#F9F8F6]">Loading...</div>;
  if (!product) return <div className="min-h-screen grid place-items-center bg-[#F9F8F6]">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-olive-100 relative overflow-hidden">
      {/* Background Graphic Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Faded Nature/Business Graphic */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          src="/bgimage.png"
          alt=""
          className="w-full h-full object-cover mix-blend-multiply"
        />
        {/* Ambient Color Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-olive-200/20 rounded-full blur-[100px] mix-blend-multiply"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[120px] mix-blend-multiply"
        />
      </div>

      <GrainOverlay opacity={0.03} />
      <EditorialHeader />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-28 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto relative z-10"
        aria-label="Product details"
      >

        {/* Breadcrumb */}
        <div className="mb-8 hidden lg:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/collections">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-stone-800">{product.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7">
            <ProductGallery images={images} />
          </div>

          {/* Right Column: Info (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <ProductInfo
                product={product}
                variant={variant}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <ProductAccordion description={product.description} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="mt-24 lg:mt-32 max-w-5xl mx-auto">
          <Reviews productId={product.id} />
        </div>

        <div className="mt-16 border-t border-stone-200 pt-16">
          <SimilarProducts />
        </div>
      </motion.main>

      <EditorialFooter />
    </div>
  );
};

export default ProductDetail;
