import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ambient/GrainOverlay";

const FossilReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const FossilStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const OurStory = () => {
    return (
        <div className="min-h-screen bg-[#F9F8F6] font-sans selection:bg-stone-200">
            <GrainOverlay opacity={0.03} />
            <EditorialHeader />

            <main className="pt-32 pb-20">

                {/* 1. HERO SECTION */}
                <section className="container mx-auto px-6 lg:px-12 py-24 lg:py-32 text-center max-w-4xl mx-auto">
                    <motion.div
                        variants={FossilStagger}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            variants={FossilReveal}
                            className="font-serif text-5xl lg:text-7xl text-[#2D2D2D] mb-8 tracking-tight"
                        >
                            About Rebello Creation
                        </motion.h1>
                        <motion.p
                            variants={FossilReveal}
                            className="font-serif italic text-2xl text-muted-foreground font-light"
                        >
                            Turning discarded glass into lasting meaning.
                        </motion.p>
                    </motion.div>
                </section>

                {/* 2. THE SPARK */}
                <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={FossilStagger}
                        >
                            <motion.span variants={FossilReveal} className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 mb-6 block">The Spark</motion.span>
                            <motion.h2 variants={FossilReveal} className="font-serif text-3xl lg:text-4xl text-[#2D2D2D] mb-8 leading-snug">
                                Rebello Creation wasn't born in a boardroom; it was born in the mind of an artist.
                            </motion.h2>
                            <motion.div variants={FossilReveal} className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                                <p>
                                    Our founder, Muskan Tyagi, has always been an art enthusiast, exploring creativity across different fields. Her perspective changed the day she looked at a discarded bottle and didn't see waste, she saw a masterpiece waiting to happen.
                                </p>
                                <p>
                                    That click led to a simple yet powerful realization. The world is full of beautiful discarded glass that deserves a second act.
                                </p>
                                <p>
                                    From that moment, Muskan set out to bridge the gap between sustainability and luxury decor, turning empty icons like Bombay Sapphire and Old Monk into timeless art.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-[4/5] lg:aspect-square bg-stone-200 overflow-hidden"
                        >
                            <img
                                src="/wastesplit.jpeg"
                                alt="Discarded bottles waiting for transformation"
                                className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* 3. VISION & MISSION */}
                <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={FossilReveal}
                            className="bg-white p-12 lg:p-16 shadow-[0_2px_40px_rgba(0,0,0,0.02)]"
                        >
                            <h3 className="font-serif text-3xl text-[#2D2D2D] mb-6">Our Vision</h3>
                            <p className="text-lg text-stone-600 font-light leading-relaxed">
                                To redefine the global perception of waste by becoming the premier name in luxury upcycled decor, proving that sustainability can be sophisticated, artistic, and aspirational.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={FossilStagger}
                            className="bg-white p-12 lg:p-16 shadow-[0_2px_40px_rgba(0,0,0,0.02)]"
                        >
                            <motion.h3 variants={FossilReveal} className="font-serif text-3xl text-[#2D2D2D] mb-6">Our Mission</motion.h3>
                            <motion.p variants={FossilReveal} className="text-lg text-stone-600 font-light leading-relaxed mb-8">
                                At Rebello Creation, our mission is to divert glass from landfills by transforming discarded bottles into high-end lifestyle products.
                            </motion.p>
                            <motion.ul variants={FossilStagger} className="space-y-4">
                                <motion.li variants={FossilReveal} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-[#2D2D2D]">Innovate</span>
                                        <p className="text-stone-500 text-sm mt-1">Use artistic techniques to breathe new life into unique glass shapes.</p>
                                    </div>
                                </motion.li>
                                <motion.li variants={FossilReveal} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-[#2D2D2D]">Inspire</span>
                                        <p className="text-stone-500 text-sm mt-1">Encourage a conscious lifestyle where beauty and environmental responsibility coexist.</p>
                                    </div>
                                </motion.li>
                                <motion.li variants={FossilReveal} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-[#2D2D2D]">Craft</span>
                                        <p className="text-stone-500 text-sm mt-1">Ensure every piece is handcrafted with precision and quality that an art enthusiast like Muskan demands.</p>
                                    </div>
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    </div>
                </section>

                {/* 4. WHY REBELLO? */}
                <section className="py-24 lg:py-32 bg-[#F2F0EB]">
                    <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={FossilStagger}
                        >
                            <motion.h2 variants={FossilReveal} className="font-serif text-4xl lg:text-5xl text-[#2D2D2D] mb-8">Why Rebello?</motion.h2>
                            <motion.p variants={FossilReveal} className="text-xl lg:text-2xl text-stone-600 font-light leading-relaxed mb-8">
                                Every bottle we rescue has its own history and character.
                            </motion.p>
                            <motion.p variants={FossilReveal} className="text-lg text-stone-500 font-light leading-relaxed">
                                When you bring a Rebello piece into your home, you aren’t just buying a lamp or a glass. You are owning a piece of a rebellious movement. One that rebels against the throwaway culture of today.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* 5. FOUNDER QUOTE */}
                <section className="container mx-auto px-6 lg:px-12 py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

                <div className="container mx-auto px-6 lg:px-12">
                    <div className="h-px w-full bg-stone-200" />
                </div>

            </main>

            <EditorialFooter />
        </div>
    );
};

export default OurStory;
