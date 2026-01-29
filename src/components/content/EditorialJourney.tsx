
import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { MoveRight } from 'lucide-react';

const EditorialJourney = () => {
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

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const steps = [
    {
      title: "Discarded Bottles",
      image: "/journey-bottles.png",
      desc: "What others see as waste, we see as a new beginning.",
      delay: "delay-0",
      alt: "Empty glass bottles in canvas bag"
    },
    {
      title: "Crafted by Hand",
      image: "/journey-craft.png",
      desc: "Each lamp is handcrafted slowly from recycled glass.",
      delay: "delay-300",
      alt: "Artisan hands shaping glass"
    },
    {
      title: "Warm Glow",
      image: "/journey-glow.png",
      desc: "Light, revitalized, shapes a new ambiance.",
      delay: "delay-600",
      alt: "Finished lamp glowing naturally"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 bg-[#F9F6F0] overflow-hidden"
    >
      {/* Subtle paper grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        {/* Header Section */}
        <div className={cn(
          "text-center mb-8 md:mb-16 transition-all duration-700 ease-editorial",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-900/20"></div>
            <span className="text-xs md:text-sm tracking-[0.2em] text-amber-700/70 uppercase font-sans font-medium">
              The Journey
            </span>
            <div className="h-[1px] w-12 bg-amber-900/20"></div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-charcoal tracking-tight relative inline-block">
            From <span className="font-semibold">Bottle</span> to Glow
            {/* Vertical line connecting title to card */}
            <div className={cn(
              "absolute left-1/2 -bottom-12 md:bottom-[-64px] w-[1px] h-12 md:h-16 bg-amber-900/20 -translate-x-1/2  transition-all duration-1000 delay-300",
              isVisible ? "h-12 md:h-16 opacity-100" : "h-0 opacity-0"
            )} />
          </h2>
        </div>

        {/* Main Content Card Container */}
        <div className={cn(
          "relative bg-white/40 backdrop-blur-sm rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.02)] transition-all duration-1000 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {/* Magical Sparkles/Glows */}
          <div className="absolute -left-4 top-1/2 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl mix-blend-screen animate-pulse" />
          <div className="absolute right-1/4 -bottom-8 w-32 h-32 bg-amber-100/40 rounded-full blur-3xl mix-blend-screen" />

          {/* Grid/Flex */}
          <div className="flex flex-row overflow-x-auto md:grid md:grid-cols-3 gap-8 md:gap-8 relative items-start no-scrollbar snap-x snap-mandatory">

            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "group flex flex-col items-center text-center relative z-10 flex-shrink-0 w-[260px] md:w-auto snap-center",
                  step.delay
                )}
              >
                {/* Image Container */}
                <div className="relative mb-8 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm ring-1 ring-amber-900/5 bg-white mx-auto max-w-[320px]">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-1000 ease-out transform",
                      isVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"
                    )}
                  />

                  {/* Subtle inner shadow inset */}
                  <div className="absolute inset-0 shadow-[inset_0_2px_20px_rgba(0,0,0,0.05)] pointer-events-none rounded-2xl" />
                </div>

                {/* Arrow Connector (Desktop) */}
                {index < 2 && (
                  <div className={cn(
                    "hidden md:block absolute top-[25%] -right-4 w-8 text-amber-900/20 z-0",
                    isVisible ? "opacity-100" : "opacity-0"
                  )}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full transform translate-x-1/2">
                      <path d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </div>
                )}

                {/* Arrow Connector (Mobile) */}
                {index < 2 && (
                  <div className="md:hidden absolute bottom-[-40px] text-amber-900/20 rotate-90">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
                      <path d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-2 md:space-y-3 max-w-[260px]">
                  <h3 className="text-xl md:text-2xl font-serif text-charcoal/90">{step.title}</h3>
                  <div className="w-8 h-[1px] bg-amber-900/10 mx-auto my-2 md:my-3" />
                  <p className="text-charcoal/60 font-sans leading-relaxed text-xs md:text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Vertical Line passing through middle card */}
          <div className={cn(
            "absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-900/10 -translate-x-1/2 hidden md:block -z-0",
            isVisible ? "opacity-100" : "opacity-0"
          )} />

          {/* Glow at bottom */}
          <div className="absolute left-0 bottom-0 w-full h-1/3 bg-gradient-to-t from-white/40 to-transparent pointer-events-none rounded-b-[3rem]" />
        </div>
      </div>
    </section>
  );
};

export default EditorialJourney;
