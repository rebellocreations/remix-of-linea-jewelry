import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const collections = [
    {
        name: "Glasses & Bowls",
        handle: "glasses-bowls",
        image: "/glassesandbowls.png",
    },
    {
        name: "Platters",
        handle: "platters",
        image: "/platter.png",
    },
    {
        name: "Lamps",
        handle: "lamps",
        image: "/lamp.png",
    },
    {
        name: "Candles",
        handle: "candles",
        image: "/candle.png",
    },
];

const OurCollections = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Siatra-style "heavy" exponential ease
    const siatraEase = [0.2, 0, 0, 1] as any;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 } // Trigger a bit earlier for smooth scroll experience
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="our-collections-section"
            ref={sectionRef}
            className="py-16 md:py-24 lg:py-36 bg-[#F5F5F0] overflow-hidden"
            aria-labelledby="collections-heading"
        >
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header - Siatra Style Block Slide-Up */}
                <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
                    <span
                        className={`text-[10px] md:text-xs tracking-[0.2em] uppercase text-stone-500 mb-4 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                        style={{ transitionDelay: "100ms" }}
                    >
                        Explore by Category
                    </span>
                    <div className="overflow-hidden pb-2">
                        <motion.h2
                            id="collections-heading"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={isVisible ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                            transition={{ duration: 1.2, ease: siatraEase, delay: 0.2 }}
                            className="font-serif text-4xl md:text-5xl lg:text-5xl text-[#1A1A1A] tracking-tight"
                        >
                            Our Collections
                        </motion.h2>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 1.2,
                                ease: siatraEase,
                                delay: 0.2 + index * 0.1 // Stagger by 0.1s
                            }}
                        >
                            <Link
                                to={`/collections/${collection.handle}`}
                                className="group block h-full flex flex-col"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="relative overflow-hidden rounded-[2rem] bg-[#E8E8E0] aspect-square flex items-center justify-center p-8 transition-all duration-500 ease-smooth group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 group-hover:bg-white">
                                    <div className="absolute inset-0 border border-black/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500" />

                                    <img
                                        src={collection.image}
                                        alt={`${collection.name} category`}
                                        className={`w-full h-full object-contain max-w-[80%] max-h-[80%] drop-shadow-sm transition-transform duration-700 ease-out ${hoveredIndex === index ? "scale-105" : "scale-100"
                                            }`}
                                        loading="lazy"
                                    />

                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 border border-black/5">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center justify-between px-2">
                                    <h3 className="font-serif text-xl text-[#1A1A1A] font-light group-hover:text-stone-600 transition-colors duration-300">
                                        {collection.name}
                                    </h3>
                                    <span className="text-[9px] uppercase tracking-[0.1em] text-stone-400 group-hover:text-stone-900 transition-colors duration-300 font-medium">
                                        Explore
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurCollections;
