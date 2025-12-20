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
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="py-16 lg:py-24 flex items-center justify-center"
    >
      <div className="overflow-hidden">
        <p 
          className={`font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground italic text-center transition-transform duration-700 ease-editorial ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          "{text}"
        </p>
      </div>
    </div>
  );
};

export default TransitionLine;
