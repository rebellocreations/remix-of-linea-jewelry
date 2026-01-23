import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const TransformationSlider = () => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0.5); // 0 to 1
    const smoothX = useSpring(x, { stiffness: 400, damping: 30 }); // Smooth movement

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newX = (e.clientX - rect.left) / rect.width;
            x.set(Math.max(0, Math.min(1, newX)));
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newX = (e.touches[0].clientX - rect.left) / rect.width;
            x.set(Math.max(0, Math.min(1, newX)));
        }
    };

    // Initial interaction hint
    useEffect(() => {
        // Slight movement to indicate interactivity
        const timer = setTimeout(() => {
            x.set(0.55);
            setTimeout(() => x.set(0.5), 600);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden cursor-ew-resize bg-background"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchMove={handleTouchMove}
            ref={containerRef}
        >
            {/* Background Layer (RIGHT SIDE - "After" / Reborn) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/aftersplit.png"
                    alt="Handcrafted glass lamp in a cozy home environment"
                    className="w-full h-full object-cover"
                />
                {/* Overlay Text for Right Side */}
                <div className="absolute inset-0 flex items-center justify-end px-8 lg:px-24 pointer-events-none">
                    <div className="text-right max-w-md">
                        <span className="block font-serif text-4xl lg:text-6xl text-white drop-shadow-md mb-4">
                            After: Reborn by Hand
                        </span>
                        <div className="space-y-4">
                            <p className="text-lg lg:text-xl text-white/95 font-light leading-relaxed">
                                Cut. Shaped. <br />
                                Transformed into something meaningful.
                            </p>
                            <p className="text-sm lg:text-base text-white/70 font-light border-t border-white/20 pt-4 mt-2 inline-block">
                                Each piece is handcrafted with care, turning waste into functional art for modern homes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Foreground Layer (LEFT SIDE - "Before" / Waste) 
          Using clipPath to create the split 
      */}
            <motion.div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{
                    clipPath: useTransform(smoothX, (value) => `inset(0 ${100 - value * 100}% 0 0)`)
                }}
            >
                <img
                    src="/wastesplit.jpeg"
                    alt="Discarded glass bottles waiting to be recycled"
                    className="w-full h-full object-cover filter brightness-[0.85]"
                />

                {/* Overlay Text for Left Side */}
                <div className="absolute inset-0 flex items-center justify-start px-8 lg:px-24 pointer-events-none">
                    <div className="text-left max-w-md">
                        <span className="block font-serif text-4xl lg:text-6xl text-white drop-shadow-md mb-4">
                            Before: Discarded, Forgotten
                        </span>
                        <div className="space-y-4">
                            <p className="text-lg lg:text-xl text-white/95 font-light leading-relaxed">
                                Once used.<br />
                                Once thrown away.<br />
                                Glass bottles with no purpose left.
                            </p>
                            <p className="text-sm lg:text-base text-white/70 font-light border-t border-white/20 pt-4 mt-2 inline-block">
                                Collected from homes, bars, and landfills, waiting to be forgotten.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dark overlay specifically for visual hierarchy */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </motion.div>

            {/* Divider Handle */}
            <motion.div
                className="absolute top-0 bottom-0 w-px bg-white/50 z-20 pointer-events-none"
                style={{ left: useTransform(smoothX, (value) => `${value * 100}%`) }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <div className="w-1.5 h-1.5 bg-white rounded-full transition-transform duration-300 transform scale-100" />
                </div>
            </motion.div>

            {/* Global Description - Centered Bottom */}
            <div className="absolute bottom-12 left-0 right-0 text-center z-30 pointer-events-none">
                <span className="inline-block py-2 px-6 bg-black/20 backdrop-blur-md rounded-full text-white/90 text-sm tracking-widest uppercase border border-white/10">
                    Slide to Transform
                </span>
            </div>
        </section>
    );
};

export default TransformationSlider;
