import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform, animate } from "framer-motion";
import { Leaf, Recycle, Hammer, Trees } from "lucide-react";

// CountUp Component for the numbers
const CountUp = ({ to }: { to: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            count.set(0); // Reset
            const controls = animate(count, to, { duration: 2.5, ease: "easeOut" });
            return controls.stop;
        }
    }, [isInView, to, count]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const EnvironmentalImpact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const cards = [
        {
            id: 1,
            number: 2000,
            suffix: "+",
            label: "Glass bottles saved from landfills",
            icon: <Recycle className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600" strokeWidth={1.5} />,
            bg: "bg-emerald-50",
        },
        {
            id: 2,
            title: "Lower Carbon Footprint",
            description: "Upcycling glass reduces energy usage compared to manufacturing new glass.",
            icon: <Leaf className="w-12 h-12 lg:w-16 lg:h-16 text-olive-600" strokeWidth={1.5} />,
            bg: "bg-olive-50",
        },
        {
            id: 3,
            title: "Sustainable Craftsmanship",
            description: "Each piece is hand-cut, hand-shaped, and crafted locally.",
            icon: <Hammer className="w-12 h-12 lg:w-16 lg:h-16 text-amber-700" strokeWidth={1.5} />,
            bg: "bg-amber-50",
        },
        {
            id: 4,
            number: 60,
            suffix: "+",
            label: "Trees Saved",
            icon: <Trees className="w-12 h-12 lg:w-16 lg:h-16 text-green-600" strokeWidth={1.5} />,
            bg: "bg-green-50",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="py-32 bg-[#F9F8F6] relative overflow-hidden"
        >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img
                    src="/bgimage.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Central wash to ensure readability while keeping edges visible */}
                <div className="absolute inset-0 bg-white/40 radial-mask" />
            </div>

            <style>{`
        .radial-mask {
          background: radial-gradient(circle at top center, rgba(249,248,246,0.95) 0%, rgba(249,248,246,0.5) 50%, transparent 100%);
        }
      `}</style>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="font-serif text-4xl lg:text-5xl text-[#2D2D2D] mb-6 drop-shadow-sm"
                    >
                        Our Environmental Impact
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted-foreground text-xl font-light leading-relaxed drop-shadow-sm"
                    >
                        Turning waste into purpose, one bottle at a time.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                            whileHover={{ y: -8 }}
                            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                        >
                            <div className={`w-24 h-24 rounded-full ${card.bg} flex items-center justify-center mb-8`}>
                                {card.icon}
                            </div>

                            {card.number ? (
                                <div className="flex flex-col items-center">
                                    <span className="font-serif text-4xl lg:text-5xl text-[#2D2D2D] mb-4 font-medium">
                                        <CountUp to={card.number} />
                                        {card.suffix}
                                    </span>
                                    <span className="text-muted-foreground text-lg font-medium">{card.label}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <h3 className="font-serif text-xl text-[#2D2D2D] mb-4">{card.title}</h3>
                                    <p className="text-base text-muted-foreground leading-relaxed max-w-[200px]">
                                        {card.description}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footer Micro-text + Logo */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mt-24"
                >
                    <p className="text-base text-muted-foreground/80 tracking-wide mb-12 drop-shadow-sm font-medium">
                        Every Rebello piece prevents waste, supports craftsmanship, and extends the life of materials.
                    </p>

                    {/* Logo - Large size as requested */}
                    <div className="flex justify-center opacity-100 mix-blend-multiply">
                        <img src="/logo.PNG" alt="Rebello Creations" className="brand-logo h-48 md:h-64" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EnvironmentalImpact;
