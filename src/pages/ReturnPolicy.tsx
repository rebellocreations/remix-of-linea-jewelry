import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ambient/GrainOverlay";

const ReturnPolicy = () => {
    return (
        <div className="min-h-screen bg-[#FDFCFA] font-sans selection:bg-stone-200">
            <GrainOverlay opacity={0.03} />
            <EditorialHeader />

            <main className="pt-32 pb-20">
                <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1a1a] mb-6 tracking-tight"
                    >
                        Return & Replacement Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-serif italic text-xl lg:text-2xl text-muted-foreground/80 font-light"
                    >
                        Fairness and quality for all our customers.
                    </motion.p>
                </section>

                <section className="container mx-auto px-6 lg:px-12 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-16"
                    >
                        {/* Introduction */}
                        <div className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
                            <p>
                                At Rebello Creation, we take immense pride in the handcrafted nature of our upcycled products. Because each piece is unique and made-to-order, we maintain a strict policy to ensure fairness and quality for all our customers.
                            </p>
                        </div>

                        {/* 1. Eligibility for Replacement */}
                        <div className="space-y-6">
                            <h2 className="font-serif text-2xl lg:text-3xl text-[#1a1a1a]">1. Eligibility for Replacement</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                We offer replacements only in the following cases:
                            </p>
                            <ul className="space-y-3 text-stone-600 font-light leading-relaxed pl-4 list-disc marker:text-stone-300">
                                <li>The product arrived damaged or broken during transit.</li>
                                <li>You received the wrong item.</li>
                            </ul>
                            <div className="bg-[#F8F7F5] border-l-2 border-stone-300 p-6 md:p-8 mt-8 italic text-stone-600 text-[13px] md:text-sm leading-relaxed">
                                <span className="font-bold not-italic">Please Note:</span> Due to the nature of upcycled glass, minor imperfections, scratches, or variations in the original bottle's texture are not considered defects; they are part of the bottle's history and the "Rebello" aesthetic.
                            </div>
                        </div>

                        {/* 2. Mandatory Unboxing Video Proof */}
                        <div className="space-y-6">
                            <h2 className="font-serif text-2xl lg:text-3xl text-[#1a1a1a]">2. Mandatory Unboxing Video Proof</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                To protect both the customer and our brand against transit damage, we require a continuous unboxing video.
                            </p>
                            <ul className="space-y-3 text-stone-600 font-light leading-relaxed pl-4 list-disc marker:text-stone-300">
                                <li>The video must show the unopened package and the shipping label clearly.</li>
                                <li>The video must be uncut and unedited from the start of opening until the product is fully inspected.</li>
                            </ul>
                            <p className="text-stone-700 font-medium text-sm pt-2">
                                Failure to provide a clear unboxing video will result in the immediate rejection of the replacement claim.
                            </p>
                        </div>

                        {/* 3. Reporting Timeline */}
                        <div className="space-y-6">
                            <h2 className="font-serif text-2xl lg:text-3xl text-[#1a1a1a]">3. Reporting Timeline</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                Time is of the essence for fragile goods.
                            </p>
                            <ul className="space-y-3 text-stone-600 font-light leading-relaxed pl-4 list-disc marker:text-stone-300">
                                <li>Any request for a replacement must be initiated within 3 business days from the date of delivery (as confirmed by our logistics partner).</li>
                                <li>Requests made after the 3-day window will not be entertained.</li>
                            </ul>
                        </div>

                        {/* 4. How to Initiate a Request */}
                        <div className="space-y-6 pb-12">
                            <h2 className="font-serif text-2xl lg:text-3xl text-[#1a1a1a]">4. How to Initiate a Request</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                To start a replacement request, please email us at <a href="mailto:rebellocreations@gmail.com" className="font-bold hover:text-amber-700 transition-colors">rebellocreations@gmail.com</a> with:
                            </p>
                            <ul className="space-y-3 text-stone-600 font-light leading-relaxed pl-4 list-disc marker:text-stone-300">
                                <li>Your Order Number.</li>
                                <li>The mandatory Unboxing Video.</li>
                                <li>High-resolution photos of the damage (if applicable).</li>
                            </ul>
                        </div>
                    </motion.div>
                </section>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default ReturnPolicy;
