import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Heart, Globe } from "lucide-react";
import GrainOverlay from "@/components/ambient/GrainOverlay";

const OurStory = () => {
    return (
        <div className="min-h-screen bg-[#F9F8F6] font-sans selection:bg-stone-200">
            <GrainOverlay opacity={0.03} />
            <EditorialHeader />

            <main className="pt-32 pb-20">

                {/* 1. HERO SECTION (Minimal, Text First) */}
                <section className="container mx-auto px-6 lg:px-12 py-24 lg:py-32 text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-5xl lg:text-7xl text-[#2D2D2D] mb-8 tracking-tight"
                    >
                        About Rebello Creation
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-serif italic text-2xl text-muted-foreground font-light"
                    >
                        Turning discarded glass into lasting meaning.
                    </motion.p>
                </section>

                {/* 2. THE SPARK (Story Section) */}
                <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 mb-6 block">The Spark</span>
                            <h2 className="font-serif text-3xl lg:text-4xl text-[#2D2D2D] mb-8 leading-snug">
                                Rebello Creation wasn't born in a boardroom; it was born in the mind of an artist.
                            </h2>
                            <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                                <p>
                                    Our founder, Muskan Tyagi, has always been an art enthusiast, exploring creativity across different fields. Her perspective changed the day she looked at a discarded bottle and didn't see waste, she saw a masterpiece waiting to happen.
                                </p>
                                <p>
                                    That click led to a simple yet powerful realization. The world is full of beautiful discarded glass that deserves a second act.
                                </p>
                                <p>
                                    From that moment, Muskan set out to bridge the gap between sustainability and luxury decor, turning empty icons like Bombay Sapphire and Old Monk into timeless art.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-[4/5] lg:aspect-square bg-stone-200 overflow-hidden" // Removed rounded corners for sharper editorial look
                        >
                            <img
                                src="/wastesplit.jpeg"
                                alt="Discarded bottles waiting for transformation"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* 3. VISION & MISSION (Side by Side Cards) */}
                <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-12 lg:p-16 shadow-[0_2px_40px_rgba(0,0,0,0.02)]"
                        >
                            <h3 className="font-serif text-3xl text-[#2D2D2D] mb-6">Our Vision</h3>
                            <p className="text-lg text-stone-600 font-light leading-relaxed">
                                To redefine the global perception of waste by becoming the premier name in luxury upcycled decor, proving that sustainability can be sophisticated, artistic, and aspirational.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-12 lg:p-16 shadow-[0_2px_40px_rgba(0,0,0,0.02)]"
                        >
                            <h3 className="font-serif text-3xl text-[#2D2D2D] mb-6">Our Mission</h3>
                            <p className="text-lg text-stone-600 font-light leading-relaxed mb-8">
                                At Rebello Creation, our mission is to divert glass from landfills by transforming discarded bottles into high-end lifestyle products.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-[#2D2D2D]">Innovate</span>
                                        <p className="text-stone-500 text-sm mt-1">Use artistic techniques to breathe new life into unique glass shapes.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-[#2D2D2D]">Inspire</span>
                                        <p className="text-stone-500 text-sm mt-1">Encourage a conscious lifestyle where beauty and environmental responsibility coexist.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-[#2D2D2D]">Craft</span>
                                        <p className="text-stone-500 text-sm mt-1">Ensure every piece is handcrafted with precision and quality that an art enthusiast like Muskan demands.</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 4. WHY REBELLO? (Emotional Anchor) */}
                <section className="py-24 lg:py-32 bg-[#F2F0EB]"> {/* Slightly darker beige */}
                    <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-serif text-4xl lg:text-5xl text-[#2D2D2D] mb-8">Why Rebello?</h2>
                            <p className="text-xl lg:text-2xl text-stone-600 font-light leading-relaxed mb-8">
                                Every bottle we rescue has its own history and character.
                            </p>
                            <p className="text-lg text-stone-500 font-light leading-relaxed">
                                When you bring a Rebello piece into your home, you aren’t just buying a lamp or a glass. You are owning a piece of a rebellious movement. One that rebels against the throwaway culture of today.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 5. FOUNDER QUOTE (Minimal) */}
                <section className="container mx-auto px-6 lg:px-12 py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <blockquote className="font-serif text-3xl lg:text-5xl text-[#2D2D2D] leading-tight mb-8">
                            "Every bottle has a past; at Rebello, we give it a future."
                        </blockquote>
                        <cite className="not-italic text-stone-500 tracking-wide uppercase text-sm font-medium">
                            — Muskan Tyagi, Founder
                        </cite>
                    </motion.div>
                </section>

                {/* 6. CLOSING DIVIDER */}
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="h-px w-full bg-stone-200" />
                </div>

            </main>

            <EditorialFooter />
        </div>
    );
};

export default OurStory;
