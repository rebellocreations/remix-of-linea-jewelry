import { useEffect, useRef, useState } from "react";

interface FloatingQuoteProps {
  text: string;
  position?: "left" | "right" | "center";
  delay?: number;
}

const FloatingQuote = ({ text, position = "center", delay = 0 }: FloatingQuoteProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const positionClasses = {
    left: "text-left pl-6 lg:pl-24",
    right: "text-right pr-6 lg:pr-24",
    center: "text-center",
  };

  return (
    <div
      ref={ref}
      className={`py-12 md:py-20 lg:py-28 ${positionClasses[position]} relative`}
    >
      {/* Subtle decorative line */}
      <div
        className={`absolute ${position === "left" ? "left-6 lg:left-20" :
          position === "right" ? "right-6 lg:right-20" :
            "left-1/2 -translate-x-1/2"
          } top-1/2 -translate-y-1/2 w-px h-12 bg-border transition-all duration-1000 ease-premium ${isVisible ? "opacity-40 scale-y-100" : "opacity-0 scale-y-0"
          }`}
        style={{ transitionDelay: "200ms" }}
      />

      <p
        className={`font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/50 italic transition-all duration-1000 ease-premium px-6 ${isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-6 blur-sm"
          }`}
      >
        "{text}"
      </p>
    </div>
  );
};

export default FloatingQuote;
