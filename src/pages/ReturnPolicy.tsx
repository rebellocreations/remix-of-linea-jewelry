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
                        <div className="space-y-6">
                            <h2 className="font-serif text-2xl lg:text-3xl text-[#1a1a1a]">4. How to Initiate a Request</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                To start a replacement request, please email us at <a href="mailto:rebellocreations@gmail.com" className="font-bold hover:text-amber-700 transition-colors">rebellocreations@gmail.com</a> or WhatsApp us at <a href="https://wa.me/917424942487" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-amber-700 transition-colors">7424942487</a> with:
                            </p>
                            <ul className="space-y-3 text-stone-600 font-light leading-relaxed pl-4 list-disc marker:text-stone-300">
                                <li>Your Order Number.</li>
                                <li>The mandatory Unboxing Video.</li>
                                <li>High-resolution photos of the damage (if applicable).</li>
                            </ul>
                        </div>

                         {/* General Terms & Conditions */}
                         <div className="space-y-6 pt-12 border-t border-stone-200">
                            <h2 className="font-serif text-2xl lg:text-3xl text-[#1a1a1a]">General Terms & Conditions</h2>
                            <p className="text-stone-600 font-light leading-relaxed">
                                To ensure a smooth experience for our community, the following rules apply to all orders placed on the Rebello Creation website:
                            </p>
                            
                            <div className="space-y-8 mt-8">
                                <div>
                                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Handcrafted Variation</h3>
                                    <p className="text-stone-600 font-light leading-relaxed">
                                        No two Rebello pieces are identical. By purchasing, you acknowledge that slight variations in shape, size, and color from the website images are a hallmark of artisanal upcycling.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Order Cancellation</h3>
                                    <p className="text-stone-600 font-light leading-relaxed">
                                        Orders can only be cancelled within 12 hours of placement. After this period, the upcycling process begins, and the order cannot be revoked.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Shipping & Handling</h3>
                                    <p className="text-stone-600 font-light leading-relaxed">
                                        While we use premium eco-friendly packaging to secure your glass, Rebello Creation is not liable for delays caused by third-party courier services or unforeseen weather conditions.
                                    </p>
                                    <p className="text-stone-700 font-medium mt-2">
                                        Free shipping above ₹1999 everywhere.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Usage Disclaimer</h3>
                                    <p className="text-stone-600 font-light leading-relaxed">
                                        Our products (lamps/sippers) are made from reclaimed glass. Please follow the provided care instructions (e.g., hand-wash only, avoid extreme heat) to ensure the longevity of your piece.
                                    </p>
                                    <p className="text-red-800/80 text-sm font-medium mt-2 bg-red-50 inline-block px-3 py-1 rounded-sm border border-red-100">
                                        Caution: Do not microwave.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Intellectual Property</h3>
                                    <p className="text-stone-600 font-light leading-relaxed">
                                        All designs, photography, and brand content are the property of Rebello Creation and Muskan Tyagi. Unauthorized use is strictly prohibited.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default ReturnPolicy;
