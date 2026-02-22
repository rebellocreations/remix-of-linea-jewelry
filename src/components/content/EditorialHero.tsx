import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EditorialHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax effect for background
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  useEffect(() => {
    // Siatra has a slight delay before triggering the hero sequence
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCollections = () => {
    document.getElementById("our-collections-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Siatra-style "heavy" exponential ease for slide-ups
  const siatraEase = [0.2, 0, 0, 1] as any;

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] md:h-screen min-h-[600px] md:min-h-[700px] w-full overflow-hidden flex items-center justify-center lg:justify-start"
    >
      {/* Background Image with Parallax & Static Fade (Siatra Style) */}
      <motion.div
        className="absolute inset-0 z-0 bg-black"
        style={{ y, opacity }}
      >
        <div
          className={`w-full h-full transition-opacity duration-[1500ms] ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src="/hero-daylight.jpg"
            alt="Sunlit artisan workspace with handcrafted recycled glass decor"
            className="w-full h-full object-cover"
          />
          {/* Gentle overlay to ensure text readability without killing the sunlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent opacity-80" />
        </div>
      </motion.div>

      {/* Content Content - Left Aligned */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-20">
        <div className="max-w-2xl">
          {/* Headline - Whole Block Slide-Up (Siatra Style) */}
          <div className="mb-4 md:mb-6 text-center lg:text-left overflow-hidden pb-2">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 1.2, ease: siatraEase, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight md:leading-[1.1] block"
            >
              Giving Glass a <br className="hidden sm:block" />
              <span className="italic">Second Life</span>
            </motion.h1>
          </div>

          {/* Subtext - Slide-Up Staggered (Siatra Style) */}
          <div className="overflow-hidden mb-8 md:mb-10 text-center lg:text-left mx-auto lg:mx-0 max-w-lg">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 1.2, ease: siatraEase, delay: 0.3 }}
              className="text-base md:text-xl text-white/90 font-light leading-relaxed"
            >
              Handcrafted home décor made from recycled bottles — sustainable, timeless, and unique.
            </motion.p>
          </div>

          {/* CTAs - Slide-Up / Fade-In Staggered (Siatra Style) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 1.2, ease: siatraEase, delay: 0.5 }}
            className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6`}
          >
            {/* Primary CTA */}
            <Link
              to="/collections"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-white text-[#2D2D2D] text-xs md:text-sm tracking-widest uppercase font-medium overflow-hidden transition-all duration-300 hover:bg-[#F5F5F0] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                Explore Collection
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/about/our-story"
              className="group flex items-center gap-2 text-white hover:text-white/80 text-xs md:text-sm tracking-widest uppercase font-medium transition-all duration-300 py-2"
            >
              <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                Our Process
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToCollections}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down" />
        </div>
      </motion.button>
    </section>
  );
};

export default EditorialHero;
