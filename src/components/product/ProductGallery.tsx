import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
    images: Array<{
        url: string;
        altText?: string;
    }>;
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!images.length) return <div className="aspect-[4/5] bg-muted/10 grid place-items-center">No Image</div>;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 h-full lg:max-h-[80vh] sticky top-24">
            {/* Thumbnails (Desktop: Vertical Left) */}
            <div className="hidden lg:flex flex-col gap-4 overflow-y-auto w-24 scrollbar-hide py-1 pr-1">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-square w-full rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === activeIndex
                            ? "border-olive-500 ring-2 ring-olive-500/20 opacity-100 scale-105"
                            : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                            }`}
                    >
                        <img
                            src={img.url}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image Area */}
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full bg-[#f9f8f6] rounded-2xl overflow-hidden group shadow-sm">

                {/* Helper Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-stone-600 shadow-sm pointer-events-none border border-white/50">
                    {activeIndex + 1} / {images.length}
                </div>

                {/* Zoom Trigger */}
                <div
                    className="w-full h-full cursor-zoom-in relative bg-stone-100"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={(e) => {
                        if (!isZoomed) return;
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - left) / width) * 100;
                        const y = ((e.clientY - top) / height) * 100;
                        e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeIndex}
                            src={images[activeIndex].url}
                            alt={images[activeIndex].altText || "Product Image"}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full object-cover origin-center"
                            style={{ transformOrigin: "inherit" }}
                        />
                    </AnimatePresence>
                </div>

                {/* Mobile Swipe Controls */}
                <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all lg:opacity-0 lg:group-hover:opacity-100 z-20"
                >
                    <ChevronLeft size={20} className="text-stone-800" />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all lg:opacity-0 lg:group-hover:opacity-100 z-20"
                >
                    <ChevronRight size={20} className="text-stone-800" />
                </button>

                {/* Mobile Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden z-20">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-stone-800 w-6" : "bg-stone-400/50 w-1.5"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
