import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Mock data similar to shop page
const SIMILAR_PRODUCTS = [
    {
        id: "similar-1",
        handle: "amber-lamp",
        title: "Amber Glow Lamp",
        price: "₹1,299",
        image: "/amber-signature-bg.png"
    },
    {
        id: "similar-2",
        handle: "emerald-vase",
        title: "Emerald Vase",
        price: "₹899",
        image: "/journey-bottles.png" // using available placeholders
    },
    {
        id: "similar-3",
        handle: "planter-set",
        title: "Upcycled Planter Set",
        price: "₹1,499",
        image: "/planters.png"
    },
    {
        id: "similar-4",
        handle: "glass-set",
        title: "Eco Glass Set",
        price: "₹799",
        image: "/glassesandbowls.png"
    }
];

const SimilarProducts = () => {
    return (
        <div className="py-20">
            <div className="flex justify-between items-end mb-10 px-2 lg:px-4">
                <h2 className="font-serif text-3xl text-stone-800">You May Also Like</h2>
                <Link to="/category/shop" className="text-sm font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 group">
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {SIMILAR_PRODUCTS.map(product => (
                    <Link key={product.id} to={`/product/${product.handle}`} className="group block">
                        <div className="aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden mb-4 relative">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 className="font-serif text-lg text-stone-900 group-hover:text-olive transition-colors">{product.title}</h3>
                        <p className="text-stone-500 text-sm mt-1">{product.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;
