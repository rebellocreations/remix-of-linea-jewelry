import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignatureCandles = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[500px] md:min-h-[600px] lg:h-[700px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: "url('/signature_candles_bg.png')",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay for text readability on left side */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)",
                }}
            />

            <div className="container mx-auto px-6 lg:px-12 relative z-10 py-16 md:py-0">
                <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-4 drop-shadow-lg">
                            Signature Candles
                        </h2>

                        <p className="text-white/90 text-base md:text-xl font-light leading-relaxed mb-8 drop-shadow-md">
                            Hand-poured candles crafted from reclaimed glass bottles.
                            Designed to add warmth, character, and purpose to your space.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Made from upcycled liquor and wine bottles",
                                "Clean, warm glow for everyday spaces",
                                "Handcrafted in small batches"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 text-white/90 text-sm md:text-lg font-light tracking-wide"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                                    <span style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                to="/collections?collection=candles"
                                className="inline-block w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-white/10 border border-white/40 text-white text-xs md:text-sm tracking-widest uppercase hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-sm"
                            >
                                Explore Candles →
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SignatureCandles;
