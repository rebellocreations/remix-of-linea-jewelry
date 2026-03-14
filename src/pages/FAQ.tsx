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
                answer: "Since each piece is handcrafted from reclaimed glass, please allow 3–5 business days for processing. Shipping times typically range from 5–7 business days depending on your location."
            },
            {
                question: "Do you offer free shipping?",
                answer: "Yes! We offer free shipping on all orders above ₹1,999."
            },
            {
                question: "Can I track my order?",
                answer: "Yes! Once your order is dispatched, you will receive an email with a tracking number and a link to monitor its journey to your home."
            },
        ]
    },
    {
        category: "Products & Materials",
        items: [
            {
                question: "What materials are used in your products?",
                answer: "Our primary material is discarded glass bottles that we rescue and upcycle. We also use eco-friendly accents like natural cork, hemp twine, or non-toxic paints to ensure every item stays true to our sustainable roots."
            },
            {
                question: "Are the products safe to use?",
                answer: "Absolutely. All our glassware undergoes a meticulous multi-step sanding and polishing process to ensure the edges are perfectly smooth and safe. Any finishes used are lead-free and non-toxic."
            },
            {
                question: "Will each piece look exactly like the photos?",
                answer: "Because we work with reclaimed materials, no two bottles are identical. Minor variations in tint, thickness, or slight imperfections are a testament to the bottle's \"former life\" and make your piece truly one-of-a-kind."
            },
        ]
    },
    {
        category: "Returns & Exchanges",
        items: [
            {
                question: "What is your return policy?",
                answer: "Because each piece is unique and handcrafted, we do not offer refunds or returns. However, we offer replacements if the product arrived damaged or broken during transit, or if you received the wrong item. Replacement requests must be initiated within 3 business days of delivery."
            },
            {
                question: "What if my product arrives damaged?",
                answer: "We're sorry to hear that! To process a replacement, we require a continuous, uncut unboxing video showing the unopened package and shipping label. Please email us at rebellocreations@gmail.com or WhatsApp us at 7424942487 with your Order Number, the unboxing video, and photos of the damage within 3 business days of delivery."
            },
            {
                question: "Can I exchange a product?",
                answer: "Due to the handcrafted, made-to-order nature of our products, standard exchanges are not available. However, if your item arrived damaged or you received the wrong product, we will happily replace it — just make sure to have your unboxing video ready and contact us within 3 business days of delivery."
            },
        ]
    },
    {
        category: "Custom & Bulk Orders",
        items: [
            {
                question: "Do you accept custom orders?",
                answer: "We love getting creative! Whether you have a specific bottle in mind or want a personalized gift for someone special, we're happy to discuss custom commissions. Reach out to us via email or send us a DM on Instagram to start your custom project."
            },
            {
                question: "Do you offer bulk or corporate gifting?",
                answer: "Yes. Rebello products make excellent sustainable corporate gifts. We offer tiered pricing for bulk orders — perfect for weddings, events, or eco-conscious office gifting."
            },
        ]
    },
    {
        category: "Care & Maintenance",
        items: [
            {
                question: "How do I care for my Rebello products?",
                answer: "To preserve the clarity and any hand-painted details, we recommend hand washing with mild soap and a soft cloth. Avoid abrasive sponges."
            },
            {
                question: "Can I use the glasses for hot beverages?",
                answer: "Most upcycled glass is not tempered for extreme heat. To be safe, we recommend using our glasses for cold or room-temperature beverages only to prevent thermal shock and cracking."
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
