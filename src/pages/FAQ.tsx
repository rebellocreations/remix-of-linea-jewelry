import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";

const FossilReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
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

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: { category: string; items: FAQItem[] }[] = [
    {
        category: "Orders & Shipping",
        items: [
            {
                question: "How long does shipping take?",
                answer: "We typically process and dispatch orders within 3–5 business days. Delivery usually takes 5–7 business days depending on your location within India. For international orders, please allow 10–15 business days."
            },
            {
                question: "Do you offer free shipping?",
                answer: "Yes! We offer free shipping on all orders above ₹1,999. For orders below that, a flat shipping fee of ₹99 is applied."
            },
            {
                question: "Can I track my order?",
                answer: "Absolutely. Once your order is dispatched, you'll receive an email with a tracking link so you can follow your package every step of the way."
            },
        ]
    },
    {
        category: "Products & Materials",
        items: [
            {
                question: "What materials are used in your products?",
                answer: "All our products are handcrafted from upcycled glass bottles — think Bombay Sapphire, Old Monk, and other iconic bottles. Each piece is hand-cut, polished, and finished by skilled artisans."
            },
            {
                question: "Are the products safe to use?",
                answer: "Yes. All edges are carefully smoothed and polished during the crafting process. Our glasses, bowls, and platters are food-safe and perfectly suitable for everyday use."
            },
            {
                question: "Will each piece look exactly like the photos?",
                answer: "Since every product is handcrafted from a unique bottle, slight variations in colour, texture, and shape are natural. This is what makes each piece one-of-a-kind!"
            },
        ]
    },
    {
        category: "Returns & Exchanges",
        items: [
            {
                question: "What is your return policy?",
                answer: "We accept returns within 3 days of delivery for unused, undamaged items in their original packaging. Please reach out to us via email or Instagram to initiate a return."
            },
            {
                question: "What if my product arrives damaged?",
                answer: "We take great care in packaging, but if your item arrives damaged, please contact us within 48 hours with photos. We'll arrange a replacement or full refund — no questions asked."
            },
            {
                question: "Can I exchange a product?",
                answer: "Yes, exchanges are possible within 3 days of delivery, subject to availability. Please contact our team to arrange an exchange."
            },
        ]
    },
    {
        category: "Custom & Bulk Orders",
        items: [
            {
                question: "Do you accept custom orders?",
                answer: "Yes! We love creating custom pieces. Whether it's a specific bottle, size, or design — reach out to us via the Contact page or DM us on Instagram to discuss your ideas."
            },
            {
                question: "Do you offer bulk or corporate gifting?",
                answer: "Absolutely. Rebello Creations products make unique, eco-friendly corporate gifts. We offer special pricing for bulk orders. Get in touch with us for a custom quote."
            },
        ]
    },
    {
        category: "Care & Maintenance",
        items: [
            {
                question: "How do I care for my Rebello products?",
                answer: "Our products are easy to maintain. Simply hand-wash with mild soap and water. Avoid using abrasive cleaners or placing items in the dishwasher. For lamps and candles, wipe gently with a soft cloth."
            },
            {
                question: "Can I use the glasses for hot beverages?",
                answer: "We recommend using our glasses for cold or room-temperature beverages only, as sudden temperature changes may affect the glass."
            },
        ]
    },
];

const FAQAccordionItem = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => (
    <div className="border-b border-[#E8E4DE] last:border-0">
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between py-5 px-1 text-left group"
        >
            <span className="text-[#2C3028] font-medium text-base md:text-lg pr-4 group-hover:text-[#6B7B5C] transition-colors duration-300">
                {item.question}
            </span>
            <ChevronDown
                className={`w-5 h-5 text-[#8B8B8B] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#6B7B5C]" : ""}`}
            />
        </button>
        <motion.div
            initial={false}
            animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
        >
            <p className="text-[#5C5C5C] leading-relaxed pb-5 px-1">
                {item.answer}
            </p>
        </motion.div>
    </div>
);

const FAQ = () => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        document.title = "FAQ | Rebello Creations — Upcycled Glass Decor";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute(
                "content",
                "Find answers to frequently asked questions about Rebello Creations — shipping, returns, materials, custom orders, and product care."
            );
        }
    }, []);

    const toggleItem = (key: string) => {
        setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <EditorialHeader />

            <main className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FossilStagger}
                    className="max-w-[800px] mx-auto"
                >
                    {/* Header */}
                    <motion.div variants={FossilReveal} className="text-center mb-16">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C3028] mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg md:text-xl text-[#5C5C5C] max-w-2xl mx-auto leading-relaxed">
                            Everything you need to know about our products, orders, and more.
                        </p>
                    </motion.div>

                    {/* FAQ Sections */}
                    {faqData.map((section, sectionIdx) => (
                        <motion.div
                            key={section.category}
                            variants={FossilReveal}
                            className="mb-12"
                        >
                            <h2 className="font-serif text-2xl md:text-3xl text-[#2C3028] mb-6">
                                {section.category}
                            </h2>
                            <div className="bg-white rounded-2xl border border-[#E8E4DE] shadow-sm px-6 md:px-8">
                                {section.items.map((item, itemIdx) => {
                                    const key = `${sectionIdx}-${itemIdx}`;
                                    return (
                                        <FAQAccordionItem
                                            key={key}
                                            item={item}
                                            isOpen={!!openItems[key]}
                                            onToggle={() => toggleItem(key)}
                                        />
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}

                    {/* CTA */}
                    <motion.div variants={FossilReveal} className="text-center mt-16">
                        <p className="text-[#5C5C5C] mb-4">
                            Still have questions?
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2C3028] text-white rounded-xl font-medium hover:bg-[#3D4338] transition-all duration-300 active:scale-[0.98]"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </motion.div>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default FAQ;
