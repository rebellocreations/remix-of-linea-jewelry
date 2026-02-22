import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { motion, useScroll, useTransform } from "framer-motion";

const BestSellers = () => {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchProducts(8);
                setProducts(data);
            } catch (e) {
                console.error("Failed to load best sellers:", e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <section className="bg-[#FAF9F6] py-24 md:py-32 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6"
                    >
                        Our bestsellers
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <Link
                            to="/collections"
                            className="text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]/60 border-b border-[#1A1A1A]/20 pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
                        >
                            See All
                        </Link>
                    </motion.div>
                </div>

                {/* Product Grid/Scroll */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar pb-12 -mx-6 px-6 cursor-grab active:cursor-grabbing"
                >
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-72 md:w-80 animate-pulse">
                                <div className="aspect-[4/5] bg-stone-200 rounded-sm mb-6" />
                                <div className="h-4 bg-stone-200 w-2/3 mb-2" />
                                <div className="h-4 bg-stone-100 w-1/3" />
                            </div>
                        ))
                    ) : (
                        products.map((product, idx) => {
                            const image = product.node.images.edges?.[0]?.node;
                            const price = product.node.priceRange.minVariantPrice;

                            return (
                                <motion.div
                                    key={product.node.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                                    className="flex-shrink-0 w-72 md:w-80 group"
                                >
                                    <Link to={`/product/${product.node.handle}`} className="block">
                                        <div className="aspect-[4/5] overflow-hidden bg-white mb-6 relative">
                                            {image && (
                                                <img
                                                    src={image.url}
                                                    alt={image.altText || product.node.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-xs tracking-widest uppercase mb-2 text-[#1A1A1A]">
                                                {product.node.title}
                                            </h3>
                                            <p className="text-xs text-stone-500 font-light">
                                                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
