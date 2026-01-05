import { useEffect, useRef, useState } from "react";

interface TransitionLineProps {
  text: string;
}

const TransitionLine = ({ text }: TransitionLineProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="py-20 lg:py-28 flex flex-col items-center justify-center gap-6"
    >
      {/* Animated divider line */}
      <div 
        className={`w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-1000 ease-premium ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      />
      
      <div className="overflow-hidden">
        <p 
          className={`font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground italic text-center transition-all duration-800 ease-premium ${
            isVisible 
              ? "translate-y-0 opacity-100 blur-0" 
              : "translate-y-full opacity-0 blur-sm"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          "{text}"
        </p>
      </div>
      
      {/* Bottom divider */}
      <div 
        className={`w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-1000 ease-premium ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
        style={{ transitionDelay: "300ms" }}
      />
    </div>
  );
};

export default TransitionLine;
