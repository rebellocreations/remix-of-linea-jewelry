import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const videos = [
    "1157647519",
    "1157647344",
    // Duplicate as requested, but I'll likely need to ensure unique keys if I map
    "1157647112",
    "1157646769",
    "1157646656",
];

const ReelsSection = () => {
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
            ref={sectionRef}
            className="py-12 md:py-16 lg:py-24 bg-[#FAF9F6] overflow-hidden" // Off-white neutral background
        >
            <div className="container mx-auto px-6 lg:px-12 mb-10 lg:mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wide text-center px-4"
                >
                    Watch how waste transforms into design
                </motion.h2>
            </div>

            {/* 
        Desktop: Horizontal Scroll Strip
        Mobile: Swipeable Carousel (CSS Scroll Snap)
      */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex overflow-x-auto snap-x snap-mandatory pb-8 px-6 lg:px-12 gap-4 lg:gap-6 no-scrollbar"
                style={{
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {videos.map((id, index) => (
                    <div
                        key={`${id}-${index}`}
                        className="flex-shrink-0 snap-center relative w-[240px] h-[430px] sm:w-[280px] sm:h-[500px] md:w-[320px] md:h-[570px] bg-black/5 rounded-2xl overflow-hidden shadow-lg group"
                    >
                        {/* 
              Vimeo Embed 
              background=1: Autoplay, muted, loop, no controls
            */}
                        <iframe
                            src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ pointerEvents: "none" }} // Ensure no interaction/play button overlay
                            title={`Rebello Reel ${index + 1}`}
                        />

                        {/* Inner shadow overlay for depth */}
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] rounded-2xl pointer-events-none" />
                    </div>
                ))}

                {/* Spacer for right padding on mobile scroll */}
                <div className="w-2 lg:w-6 flex-shrink-0" />
            </motion.div>

            {/* Custom CSS to hide scrollbar but keep functionality */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
};

export default ReelsSection;
