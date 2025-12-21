import { useEffect, useState } from "react";

const ScrollStoryline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-6 lg:left-12 top-0 h-screen z-40 pointer-events-none hidden lg:block">
      {/* Static guide line */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-muted-foreground/10" />
      
      {/* Animated progress line */}
      <div 
        className="absolute left-0 top-[15%] w-px bg-amber/60 transition-all duration-100"
        style={{ 
          height: `${scrollProgress * 70}%`,
        }}
      />
      
      {/* Glowing dot at the end */}
      <div 
        className="absolute left-[-3px] w-[7px] h-[7px] rounded-full bg-amber transition-all duration-100"
        style={{ 
          top: `calc(15% + ${scrollProgress * 70}%)`,
          boxShadow: '0 0 10px hsl(38 90% 55% / 0.6), 0 0 20px hsl(38 90% 55% / 0.3)',
        }}
      />
    </div>
  );
};

export default ScrollStoryline;
