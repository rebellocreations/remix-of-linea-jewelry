import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MaterialsCraft = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-[#FAF7F5]" // Warm off-white background from reference
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Text Content (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="lg:col-span-5 lg:pr-8"
                    >
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#2D2D2D] font-light leading-tight mb-8">
                            Materials & Craft
                        </h2>

                        <ul className="space-y-4">
                            {[
                                "Sustainable recycled glass.",
                                "Hand-shaped with care.",
                                "Warm, inviting glow."
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="flex items-center gap-3 text-[#555555]"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#888888] flex-shrink-0" />
                                    <span className="text-lg font-light tracking-wide">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right: Image Grid (7 cols) */}
                    <div className="lg:col-span-7 pl-0 lg:pl-8">
                        <div className="grid grid-cols-2 gap-5">
                            {/* Left tall image (Glass Shards/Texture) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="row-span-2 relative h-full min-h-[480px]"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=800&fit=crop"
                                    alt="Recycled glass shards texture"
                                    className="w-full h-full object-cover rounded-2xl shadow-sm"
                                />
                            </motion.div>

                            {/* Right stacked images */}
                            <div className="flex flex-col gap-5 h-full">
                                {/* Top: Glass cups/bottles */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="relative h-[230px] flex-1"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop"
                                        alt="Glassware craftsmanship"
                                        className="w-full h-full object-cover rounded-2xl shadow-sm"
                                    />
                                </motion.div>

                                {/* Bottom: Hands holding lamp */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                    className="relative h-[230px] flex-1"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop"
                                        alt="Warm glowing lamp in hands"
                                        className="w-full h-full object-cover rounded-2xl shadow-sm"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MaterialsCraft;
