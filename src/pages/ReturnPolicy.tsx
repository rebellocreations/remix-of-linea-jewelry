import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ambient/GrainOverlay";

const ReturnPolicy = () => {
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
                        Return Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-serif italic text-2xl text-muted-foreground font-light"
                    >
                        Our commitment to your satisfaction and our planet.
                    </motion.p>
                </section>

                <section className="container mx-auto px-6 lg:px-12 py-10 lg:py-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="prose prose-stone max-w-none space-y-12"
                    >
                        <div className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#2D2D2D]">Returns & Exchanges</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                At Rebello Creations, we take immense pride in the craftsmanship of our upcycled products. Because each piece is handcrafted from unique discarded glass, minor variations in color, texture, and shape are part of the artistic charm and are not considered defects.
                            </p>
                            <p className="text-stone-600 font-light leading-relaxed">
                                However, if you are not entirely satisfied with your purchase, we are here to help.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl text-[#2D2D2D]">Conditions for Return</h3>
                            <ul className="space-y-3 text-stone-600 font-light leading-relaxed list-none pl-0">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <span>Items must be returned within 14 days of receipt.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <span>Products must be in their original condition and packaging.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-stone-400 rounded-full flex-shrink-0" />
                                    <span>Custom-made or personalized pieces are final sale and cannot be returned.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl text-[#2D2D2D]">Damages during Transit</h3>
                            <p className="text-stone-600 font-light leading-relaxed">
                                In the unlikely event that your order arrives damaged, please contact us at <strong>care@rebellocreations.com</strong> within 48 hours with photographs of the damaged item and packaging. we will arrange for a replacement or a full refund.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl text-[#2D2D2D]">How to Initiate a Return</h3>
                            <p className="text-stone-600 font-light leading-relaxed">
                                To begin a return, please email our care team with your order number. Once approved, we will provide instructions for shipping the item back to our studio.
                            </p>
                        </div>
                    </motion.div>
                </section>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default ReturnPolicy;
