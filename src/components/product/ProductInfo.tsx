import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import DeliveryCheck from "./DeliveryCheck";
import { motion } from "framer-motion";

interface ProductInfoProps {
  product: any;
  variant: any;
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
}

const ProductInfo = ({ product, variant, onAddToCart, onBuyNow }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const price = variant?.price;
  const compareAtPrice = variant?.compareAtPrice;

  const handleQuantity = (type: "inc" | "dec") => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const discount = compareAtPrice
    ? Math.round(
      ((parseFloat(compareAtPrice.amount) - parseFloat(price.amount)) /
        parseFloat(compareAtPrice.amount)) *
      100
    )
    : 0;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="flex flex-col h-full font-sans"
    >
      {/* Title & Badge */}
      <motion.div variants={fadeInUp}>
        <h1 className="font-serif text-3xl lg:text-5xl text-stone-800 leading-tight mb-3">
          {product.title}
        </h1>
        <span className="inline-block px-3 py-1 bg-olive-50 text-olive-700 text-xs tracking-wider rounded-full uppercase font-medium mb-6 border border-olive-100">
          Sustainable Decor
        </span>
      </motion.div>

      {/* Price Block */}
      <motion.div variants={fadeInUp} className="flex items-baseline gap-3 mb-2">
        <span className="text-3xl font-medium text-stone-900">
          {price?.currencyCode} {parseFloat(price?.amount).toFixed(2)}
        </span>
        {compareAtPrice && (
          <span className="text-xl text-stone-400 line-through decoration-stone-400/50">
            {compareAtPrice.currencyCode} {parseFloat(compareAtPrice.amount).toFixed(2)}
          </span>
        )}
        {discount > 0 && (
          <span className="text-sm font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded ml-1 border border-amber-100">
            {discount}% OFF
          </span>
        )}
      </motion.div>
      <motion.p variants={fadeInUp} className="text-sm text-stone-500 mb-8">
        Incl. of all taxes. Free shipping on orders above ₹999.
      </motion.p>

      {/* Selectors */}
      <motion.div variants={fadeInUp} className="space-y-6">
        {/* Quantity */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-stone-700 w-20">Quantity</span>
          <div className="flex items-center border border-stone-200 rounded-lg p-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantity("dec")}
              className="p-2 hover:bg-stone-50 text-stone-600 disabled:opacity-30 rounded-md transition-colors"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </motion.button>
            <div className="w-12 text-center text-lg font-medium text-stone-800">{quantity}</div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantity("inc")}
              className="p-2 hover:bg-stone-50 text-stone-600 rounded-md transition-colors"
            >
              <Plus size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mt-10">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 hover:text-stone-900 h-14 rounded-xl text-base"
          onClick={() => onAddToCart(quantity)}
        >
          <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
        </Button>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            className="w-full bg-[#3A3F35] hover:bg-[#2C3028] text-white h-14 rounded-xl text-base shadow-lg shadow-olive-900/20"
            onClick={() => onBuyNow(quantity)}
          >
            <Zap className="mr-2 h-5 w-5 fill-current" /> Buy Now
          </Button>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-8">
        <DeliveryCheck />
      </motion.div>
    </motion.div>
  );
};

export default ProductInfo;