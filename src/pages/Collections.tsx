import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { fetchProducts, fetchCollections, fetchProductsByCollection, ShopifyProduct, ShopifyCollection } from "@/lib/shopify";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const FossilReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const FossilStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const Collections = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [collections, setCollections] = useState<ShopifyCollection[]>([]);
    const [loading, setLoading] = useState(true);
    const [collectionsLoading, setCollectionsLoading] = useState(true);

    const activeCollection = searchParams.get("collection") || "all";

    useEffect(() => {
        const loadCollections = async () => {
            try {
                const data = await fetchCollections(20);
                setCollections(data);
            } catch (e) {
                console.error("Failed to load collections:", e);
            } finally {
                setCollectionsLoading(false);
            }
        };
        loadCollections();
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                if (activeCollection === "all") {
                    const data = await fetchProducts(24);
                    setProducts(data);
                } else {
                    const data = await fetchProductsByCollection(activeCollection, 24);
                    setProducts(data);
                }
            } catch (e) {
                console.error("Failed to load products:", e);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
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
                    initial="hidden"
                    animate="visible"
                    variants={FossilStagger}
                    className="text-center px-6 mb-16"
                >
                    <motion.span variants={FossilReveal} className="text-xs tracking-[0.25em] uppercase text-olive/80 mb-4 block">
                        Explore Our
                    </motion.span>
                    <motion.h1 variants={FossilReveal} className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light tracking-tight mb-6">
                        Collections
                    </motion.h1>
                    <motion.p variants={FossilReveal} className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
                        Each piece is handcrafted from recycled glass bottles,
                        transformed into functional art for your home.
                    </motion.p>
                </motion.div>

                {/* Collection Filter Tabs */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FossilStagger}
                    className="px-6 lg:px-12 mb-16"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        <motion.button
                            variants={FossilReveal}
                            onClick={() => handleCollectionChange("all")}
                            className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${activeCollection === "all"
                                    ? "bg-foreground text-background"
                                    : "bg-transparent text-foreground/70 hover:text-foreground border border-border/50 hover:border-border"
                                }`}
                        >
                            All
                        </motion.button>

                        {collectionsLoading ? (
                            [...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-24 rounded-full" />
                            ))
                        ) : (
                            collections.map((collection) => (
                                <motion.button
                                    key={collection.node.id}
                                    variants={FossilReveal}
                                    onClick={() => handleCollectionChange(collection.node.handle)}
                                    className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${activeCollection === collection.node.handle
                                            ? "bg-foreground text-background"
                                            : "bg-transparent text-foreground/70 hover:text-foreground border border-border/50 hover:border-border"
                                        }`}
                                >
                                    {collection.node.title}
                                </motion.button>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Product Grid */}
                <section className="px-6 lg:px-12">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {[...Array(6)].map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="aspect-[4/5] rounded-[2rem]" />
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
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: index % 3 * 0.1, // Stagger based on column
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                        >
                                            <Link
                                                to={`/product/${product.node.handle}`}
                                                className="group block"
                                            >
                                                <motion.div
                                                    className="relative overflow-hidden rounded-[2rem] bg-[#F5F5F0] aspect-[4/5] shadow-sm transition-all duration-500 ease-smooth group-hover:shadow-2xl group-hover:-translate-y-2"
                                                >
                                                    <div className="absolute inset-0 bg-[#F5EAD4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                                                    {image ? (
                                                        <img
                                                            src={image.url}
                                                            alt={image.altText || product.node.title}
                                                            loading="lazy"
                                                            className="relative z-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-muted-foreground/50 text-sm">
                                                            No Image
                                                        </div>
                                                    )}

                                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                                        <span className="bg-white/95 hover:bg-white text-[#1A1A1A] rounded-full px-8 py-3 shadow-xl backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] font-medium inline-block whitespace-nowrap border border-black/5">
                                                            Shop Now
                                                        </span>
                                                    </div>
                                                </motion.div>

                                                <div className="mt-8 text-center space-y-1.5 px-2">
                                                    <p className="text-[10px] text-olive/60 tracking-[0.2em] uppercase font-medium">
                                                        Handcrafted Glass
                                                    </p>
                                                    <h3 className="font-serif text-2xl text-[#1A1A1A] font-light leading-tight">
                                                        {product.node.title}
                                                    </h3>
                                                    <p className="text-xs text-stone-400 font-light tracking-wide pt-1">
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
