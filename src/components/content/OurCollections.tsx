import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

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
        image: "/candles.png",
    },
    {
        name: "Planters",
        handle: "planters",
        image: "/planters.png",
    },
    {
        name: "Soap Dispenser",
        handle: "soap-dispenser",
        image: "/soapdispenser.png",
    },
    {
        name: "Sippers & Jars",
        handle: "sippers-jars",
        image: "/sippersandjars.png",
    },
];

const OurCollections = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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
            className="py-12 md:py-20 bg-[#FDFCFA]"
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-8 md:mb-16">
                    <TextReveal
                        text="Our Collections"
                        className="font-serif text-3xl md:text-4xl text-foreground font-light tracking-tight"
                        as="h2"
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-8 max-w-7xl mx-auto px-4 sm:px-0">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.handle}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <Link
                                to={`/collections?collection=${collection.handle}`}
                                className="group flex flex-col items-center w-full"
                            >
                                {/* Circular Thumbnail */}
                                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border border-[#E5DCD5] group-hover:border-[#D4C5B9] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,197,185,0.3)] bg-[#F5F5F0]">
                                    <img
                                        src={collection.image}
                                        alt={collection.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop";
                                        }}
                                    />

                                    {/* Subtle inner glow */}
                                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5 pointer-events-none group-hover:ring-black/0 transition-all duration-500" />
                                </div>

                                {/* Collection Name */}
                                <span className="mt-4 md:mt-6 text-base md:text-lg text-foreground font-light tracking-wide group-hover:text-amber-700 transition-colors duration-300 text-center px-2">
                                    {collection.name}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurCollections;
