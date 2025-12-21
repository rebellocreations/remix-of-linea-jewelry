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
      { threshold: 0.5 }
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
      className={`py-16 lg:py-24 ${positionClasses[position]}`}
    >
      <p 
        className={`font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground/60 italic transition-all duration-1000 ease-editorial ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        }`}
      >
        "{text}"
      </p>
    </div>
  );
};

export default FloatingQuote;
