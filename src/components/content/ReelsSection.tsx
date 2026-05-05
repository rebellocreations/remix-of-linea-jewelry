import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
    "1157647519",
    "1157647344",
    "1157647112",
    "1157646769",
    "1157646656",
];

const ReelsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
    const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
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

    // Lazy-fetch lightweight thumbnails (single small JSON request per video, only when section becomes visible)
    useEffect(() => {
        if (!isVisible) return;
        videos.forEach((id) => {
            if (thumbnails[id]) return;
            fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`)
                .then((r) => (r.ok ? r.json() : null))
                .then((data) => {
                    if (data?.thumbnail_url) {
                        // Request a higher-res thumbnail
                        const hi = data.thumbnail_url.replace(/_\d+x\d+/, "_640x1138");
                        setThumbnails((prev) => ({ ...prev, [id]: hi }));
                    }
                })
                .catch(() => {});
        });
    }, [isVisible]);

    const handlePlay = (key: string) => {
        setActiveVideos((prev) => ({ ...prev, [key]: true }));
    };

    return (
        <section
            ref={sectionRef}
            className="py-12 md:py-16 lg:py-24 bg-[#FAF9F6] overflow-hidden"
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

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex overflow-x-auto snap-x snap-mandatory pb-8 px-6 lg:px-12 gap-4 lg:gap-6 no-scrollbar"
                style={{
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {videos.map((id, index) => {
                    const key = `${id}-${index}`;
                    const isActive = activeVideos[key];
                    const thumb = thumbnails[id];
                    return (
                        <div
                            key={key}
                            className="flex-shrink-0 snap-center relative w-[240px] h-[430px] sm:w-[280px] sm:h-[500px] md:w-[320px] md:h-[570px] bg-black/5 rounded-2xl overflow-hidden shadow-lg group"
                        >
                            {isActive ? (
                                <iframe
                                    src={`https://player.vimeo.com/video/${id}?autoplay=1&loop=1&byline=0&title=0&playsinline=1`}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    title={`Rebello Reel ${index + 1}`}
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handlePlay(key)}
                                    aria-label={`Play Rebello Reel ${index + 1}`}
                                    className="absolute inset-0 w-full h-full flex items-center justify-center group/btn"
                                >
                                    {thumb ? (
                                        <img
                                            src={thumb}
                                            alt={`Rebello Reel ${index + 1} preview`}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300" />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover/btn:bg-black/30 transition-colors duration-300" />
                                    <span className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover/btn:scale-110">
                                        <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
                                    </span>
                                </button>
                            )}

                            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] rounded-2xl pointer-events-none" />
                        </div>
                    );
                })}

                <div className="w-2 lg:w-6 flex-shrink-0" />
            </motion.div>

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
