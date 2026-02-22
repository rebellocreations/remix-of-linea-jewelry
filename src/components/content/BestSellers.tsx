import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { motion } from "framer-motion";

const BestSellers = () => {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Siatra-style "heavy" exponential ease
    const siatraEase = [0.2, 0, 0, 1] as any;

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchProducts(10); // Fetch a few more for continuous feel
                setProducts(data);
            } catch (e) {
                console.error("Failed to load best sellers:", e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Auto-scroll logic - Butter smooth
    useEffect(() => {
        if (loading || isPaused || products.length === 0) return;

        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollStep = 0.5; // Smaller step for smoothness
        const scrollInterval = 16; // 60fps-ish (1000/60 = 16.6)

        const intervalId = setInterval(() => {
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 2) {
                // Smoothly reset or loop
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainer.scrollLeft += scrollStep;
            }
        }, scrollInterval);

        return () => clearInterval(intervalId);
    }, [loading, isPaused, products]);

    return (
        <section
            className="bg-[#FAF9F6] py-24 md:py-32 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="flex justify-center overflow-hidden pb-2 mb-6">
                        <motion.h2
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: siatraEase }}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A]"
                        >
                            Our bestsellers
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 1.2, ease: siatraEase }}
                        >
                            <Link
                                to="/collections"
                                className="text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]/60 border-b border-[#1A1A1A]/20 pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
                            >
                                See All
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Product Grid/Scroll */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar pb-12 -mx-6 px-6 cursor-grab active:cursor-grabbing"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-72 md:w-80 animate-pulse">
                                <div className="aspect-[4/5] bg-stone-200 rounded-[2rem] mb-6" />
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
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        delay: idx * 0.1,
                                        duration: 1.2,
                                        ease: siatraEase
                                    }}
                                    className="flex-shrink-0 w-72 md:w-80 group"
                                >
                                    <Link to={`/product/${product.node.handle}`} className="block">
                                        <div className="aspect-[4/5] overflow-hidden bg-white mb-6 relative rounded-[2rem] md:rounded-[3rem] shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                                            {image && (
                                                <img
                                                    src={image.url}
                                                    alt={image.altText || product.node.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 text-[#1A1A1A] font-medium transition-colors duration-300 group-hover:text-stone-600">
                                                {product.node.title}
                                            </h3>
                                            <p className="text-xs text-stone-500 font-light uppercase tracking-tight transition-colors duration-300 group-hover:text-stone-900">
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
