import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Beautifully crafted, each piece tells a story.",
        author: "Anjali R.",
    },
    {
        quote: "They're even more lovely in person. Eco-friendly and unique.",
        author: "Rajesh S.",
    },
];

const Testimonials = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.25 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-[#F5F2EE]"
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: index * 0.15 }}
                            className="text-center"
                        >
                            <blockquote className="font-serif text-2xl md:text-3xl lg:text-[2rem] text-foreground/90 font-light leading-snug mb-6">
                                “{testimonial.quote}”
                            </blockquote>
                            <cite className="text-sm tracking-wide text-muted-foreground not-italic uppercase opacity-80">
                                — {testimonial.author}
                            </cite>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
