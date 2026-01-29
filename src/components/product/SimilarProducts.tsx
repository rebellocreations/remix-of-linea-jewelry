import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

interface SimilarProductsProps {
    currentProductId: string;
    currentProductHandle: string;
    collectionHandle?: string;
}

const SimilarProducts = ({ currentProductId, currentProductHandle, collectionHandle }: SimilarProductsProps) => {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSimilarProducts = async () => {
            setLoading(true);
            try {
                // Fetch more products than needed to filter out current product
                const allProducts = await fetchProducts(10);
                
                // Filter out the current product and limit to 4
                const filtered = allProducts
                    .filter(p => p.node.id !== currentProductId && p.node.handle !== currentProductHandle)
                    .slice(0, 4);
                
                setProducts(filtered);
            } catch (e) {
                console.error("Failed to load similar products:", e);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadSimilarProducts();
    }, [currentProductId, currentProductHandle]);

    // Determine the collection URL for "View All"
    const viewAllUrl = collectionHandle 
        ? `/collections?collection=${collectionHandle}`
        : "/collections";

    if (loading) {
        return (
            <div className="py-20">
                <div className="flex justify-between items-end mb-10 px-2 lg:px-4">
                    <h2 className="font-serif text-3xl text-stone-800">You May Also Like</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <Skeleton className="aspect-[4/5] rounded-xl" />
                            <Skeleton className="h-5 w-3/4 mt-4" />
                            <Skeleton className="h-4 w-1/3 mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="py-20">
            <div className="flex justify-between items-end mb-10 px-2 lg:px-4">
                <h2 className="font-serif text-3xl text-stone-800">You May Also Like</h2>
                <Link 
                    to={viewAllUrl} 
                    className="text-sm font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 group"
                >
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {products.map(product => {
                    const image = product.node.images.edges?.[0]?.node;
                    const price = product.node.priceRange.minVariantPrice;

                    return (
                        <Link 
                            key={product.node.id} 
                            to={`/product/${product.node.handle}`} 
                            className="group block"
                        >
                            <div className="aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden mb-4 relative">
                                {image ? (
                                    <img
                                        src={image.url}
                                        alt={image.altText || product.node.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h3 className="font-serif text-lg text-stone-900 group-hover:text-olive transition-colors">
                                {product.node.title}
                            </h3>
                            <p className="text-stone-500 text-sm mt-1">
                                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SimilarProducts;
