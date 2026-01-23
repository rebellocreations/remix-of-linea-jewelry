import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// Rebello Creations collections
const collections = [
    { name: "All", handle: "all" },
    { name: "Glasses & Bowls", handle: "glasses-bowls" },
    { name: "Platters", handle: "platters" },
    { name: "Lamps", handle: "lamps" },
    { name: "Candles", handle: "candles" },
    { name: "Planters", handle: "planters" },
    { name: "Soap Dispenser", handle: "soap-dispenser" },
    { name: "Sippers & Jars", handle: "sippers-jars" },
];

const Collections = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [headerVisible, setHeaderVisible] = useState(false);

    const activeCollection = searchParams.get("collection") || "all";

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                // For now, fetch all products - in production, filter by collection tag
                const data = await fetchProducts(24);
                setProducts(data);
            } catch (e) {
                console.error("Failed to load products:", e);
            } finally {
                setLoading(false);
            }
        };
        load();

        // Trigger header animation
        setTimeout(() => setHeaderVisible(true), 100);
    }, [activeCollection]);

    const handleCollectionChange = (handle: string) => {
        if (handle === "all") {
            setSearchParams({});
        } else {
            setSearchParams({ collection: handle });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <EditorialHeader />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center px-6 mb-16"
                >
                    <span className="text-xs tracking-[0.25em] uppercase text-olive/80 mb-4 block">
                        Explore Our
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light tracking-tight mb-6">
                        Collections
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                        Each piece is handcrafted from recycled glass bottles,
                        transformed into functional art for your home.
                    </p>
                </motion.div>

                {/* Collection Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 10 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="px-6 lg:px-12 mb-16"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {collections.map((collection) => (
                            <button
                                key={collection.handle}
                                onClick={() => handleCollectionChange(collection.handle)}
                                className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${activeCollection === collection.handle
                                        ? "bg-foreground text-background"
                                        : "bg-transparent text-foreground/70 hover:text-foreground border border-border/50 hover:border-border"
                                    }`}
                            >
                                {collection.name}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Product Grid */}
                <section className="px-6 lg:px-12">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {[...Array(6)].map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="aspect-[4/5] rounded-xl" />
                                    <div className="mt-6 space-y-3">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-6 w-2/3" />
                                        <Skeleton className="h-4 w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-muted-foreground">No products found in this collection.</p>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                        >
                            <AnimatePresence mode="popLayout">
                                {products.map((product, index) => {
                                    const image = product.node.images.edges?.[0]?.node;
                                    const price = product.node.priceRange.minVariantPrice;

                                    return (
                                        <motion.div
                                            key={product.node.id}
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.08,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link
                                                to={`/product/${product.node.handle}`}
                                                className="group block"
                                            >
                                                {/* Image Card */}
                                                <div className="relative overflow-hidden rounded-2xl bg-[#F5F5F0] aspect-[4/5] transition-all duration-500 ease-out group-hover:shadow-xl group-hover:-translate-y-1">
                                                    {/* Warm overlay on hover */}
                                                    <div className="absolute inset-0 bg-[#F5EAD4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                                                    {image ? (
                                                        <img
                                                            src={image.url}
                                                            alt={image.altText || product.node.title}
                                                            loading="lazy"
                                                            className="relative z-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-muted-foreground/50 text-sm">
                                                            No Image
                                                        </div>
                                                    )}

                                                    {/* Floating Action Button */}
                                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out">
                                                        <span className="bg-white/95 hover:bg-white text-foreground rounded-full px-6 py-2.5 shadow-lg backdrop-blur-sm text-xs uppercase tracking-wider font-medium inline-block">
                                                            View Item
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="mt-6 text-center space-y-1.5 px-2">
                                                    <p className="text-xs text-olive/70 tracking-wide uppercase">
                                                        Handcrafted
                                                    </p>
                                                    <h3 className="font-serif text-xl text-foreground font-light">
                                                        {product.node.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground font-medium pt-1">
                                                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </section>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default Collections;
