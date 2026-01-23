import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ambient/GrainOverlay";

const CareInstructions = () => {
    return (
        <div className="min-h-screen bg-[#F9F8F6] font-sans selection:bg-stone-200">
            <GrainOverlay opacity={0.03} />
            <EditorialHeader />

            <main className="pt-32 pb-20">
                <section className="container mx-auto px-6 lg:px-12 py-24 lg:py-32 text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-5xl lg:text-7xl text-[#2D2D2D] mb-8 tracking-tight"
                    >
                        Care Instructions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-serif italic text-2xl text-muted-foreground font-light"
                    >
                        Protecting your piece for years to come.
                    </motion.p>
                </section>

                <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="font-serif text-3xl text-[#2D2D2D]">Glassware Care</h2>
                            <div className="space-y-4 text-stone-600 font-light leading-relaxed">
                                <p>
                                    Our upcycled glassware is durable but should be treated with the same care as any fine artisanal glass.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-2 bg-stone-400 rounded-full flex-shrink-0" />
                                        <span>Hand wash only with mild detergent.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-2 bg-stone-400 rounded-full flex-shrink-0" />
                                        <span>Avoid drastic temperature changes (e.g., boiling water in a cold glass).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-2 bg-stone-400 rounded-full flex-shrink-0" />
                                        <span>Not recommended for microwave or oven use.</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <h2 className="font-serif text-3xl text-[#2D2D2D]">Lighting Maintenance</h2>
                            <div className="space-y-4 text-stone-600 font-light leading-relaxed">
                                <p>
                                    To keep your Rebello Creations lamp shining bright, follow these simple maintenance tips.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-2 bg-stone-400 rounded-full flex-shrink-0" />
                                        <span>Dust regularly with a dry, lint-free cloth or a feather duster.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-2 bg-stone-400 rounded-full flex-shrink-0" />
                                        <span>Always unplug the lamp before cleaning or changing bulbs.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-2 bg-stone-400 rounded-full flex-shrink-0" />
                                        <span>Use only recommended bulb wattages to prevent overheating.</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default CareInstructions;
