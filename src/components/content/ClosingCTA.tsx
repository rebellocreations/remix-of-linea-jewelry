import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ClosingCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-32 lg:py-48 bg-[#FDFCFA]"
        >
            <div className="container mx-auto px-6 lg:px-12 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light leading-tight max-w-2xl mx-auto mb-12"
                >
                    Crafted slowly. Designed to last.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Link
                        to="/collections"
                        className="inline-block px-10 py-4 bg-foreground text-background text-sm tracking-wide uppercase transition-all duration-500 rounded-sm"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                            boxShadow: isHovered
                                ? "0 10px 30px -10px rgba(0,0,0,0.2)"
                                : "0 4px 15px -5px rgba(0,0,0,0.1)",
                        }}
                    >
                        Explore All Collections
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ClosingCTA;
