import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignatureCollection = () => {
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
            className="relative min-h-[600px] lg:h-[700px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: "url('/amber-signature-bg.png')",
                backgroundPosition: "center 40%", // Slightly adjust vertical focus
            }}
        >
            {/* Dark overlay for text readability on left side */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)",
                }}
            />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-amber-50 font-light leading-tight mb-8 drop-shadow-lg">
                            Signatures in Amber
                        </h2>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Sustainable recycled glass.",
                                "Hand-shaped with care.",
                                "Warm, inviting glow."
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-4 text-amber-100/90 text-lg font-light tracking-wide shadow-sm"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
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
                                to="/category/amber-series"
                                className="inline-block px-8 py-3.5 bg-[#D4C5B9]/10 border border-[#D4C5B9]/40 text-[#D4C5B9] text-sm tracking-widest uppercase hover:bg-[#D4C5B9]/20 hover:border-[#D4C5B9]/60 hover:text-white transition-all duration-300 backdrop-blur-sm"
                            >
                                Explore the Amber Series
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SignatureCollection;
