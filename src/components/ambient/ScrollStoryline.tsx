import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollStoryline = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // Use framer-motion's useScroll — updates motion values directly without React re-renders
  const { scrollYProgress } = useScroll();

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const dotTop = useTransform(scrollYProgress, (v) => `calc(15% + ${v * 70}%)`);

  // Don't render or set up scroll tracking on mobile/tablet (component is hidden via CSS anyway)
  if (isMobile) return null;

  return (
    <div className="fixed left-6 lg:left-12 top-0 h-screen z-40 pointer-events-none hidden lg:block">
      {/* Static guide line */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-muted-foreground/10" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-0 top-[15%] w-px bg-amber/60"
        style={{ height: progressHeight }}
      />

      {/* Glowing dot at the end */}
      <motion.div
        className="absolute left-[-3px] w-[7px] h-[7px] rounded-full bg-amber"
        style={{
          top: dotTop,
          boxShadow: '0 0 10px hsl(38 90% 55% / 0.6), 0 0 20px hsl(38 90% 55% / 0.3)',
        }}
      />
    </div>
  );
};

export default ScrollStoryline;
