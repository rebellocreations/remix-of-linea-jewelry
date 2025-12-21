import { useEffect, useRef, useState } from "react";

interface ScrollPauseProps {
  text: string;
}

const ScrollPause = ({ text }: ScrollPauseProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="min-h-[60vh] flex items-center justify-center px-6"
    >
      <div className="max-w-2xl text-center">
        <div className="overflow-hidden">
          <p 
            className={`font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed transition-all duration-1000 ease-editorial ${
              isVisible 
                ? "translate-y-0 opacity-100" 
                : "translate-y-full opacity-0"
            }`}
          >
            {text}
          </p>
        </div>
        
        {/* Subtle decorative line */}
        <div 
          className={`mt-8 mx-auto h-px bg-amber/40 transition-all duration-1000 ease-editorial ${
            isVisible ? "w-24" : "w-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        />
      </div>
    </div>
  );
};

export default ScrollPause;
