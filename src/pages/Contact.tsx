import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, ArrowRight, Loader2 } from "lucide-react";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";

const FossilReveal = {
    hidden: { opacity: 0, y: 20 },
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

const Contact = () => {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    useEffect(() => {
        document.title = "Contact Rebello Creations | Sustainable Upcycled Glass Decor";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute(
                "content",
                "Get in touch with Rebello Creations for custom upcycled glass decor, collaborations, or support via Instagram, email, or contact form."
            );
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mvzkbjkr", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <EditorialHeader />

            <main className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FossilStagger}
                    className="max-w-[750px] mx-auto"
                >
                    {/* Header Section */}
                    <motion.div variants={FossilReveal} className="text-center mb-16">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C3028] mb-6">
                            Contact Rebello
                        </h1>
                        <p className="text-lg md:text-xl text-[#5C5C5C] max-w-2xl mx-auto leading-relaxed">
                            Have a question, collaboration idea, or custom request? We'd love to hear from you.
                        </p>
                    </motion.div>

                    {/* Contact Details section */}
                    <motion.div variants={FossilStagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        <motion.a
                            variants={FossilReveal}
                            href="https://www.instagram.com/rebello.creations/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-[#E8E4DE] shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#FAF8F5] text-[#6B7B5C] group-hover:bg-[#6B7B5C] group-hover:text-white transition-colors duration-300">
                                    <Instagram className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#8B8B8B] mb-0.5">Follow us</p>
                                    <p className="font-medium text-[#2C3028]">@rebello.creations</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#E8E4DE] group-hover:text-[#6B7B5C] transition-colors" />
                        </motion.a>

                        <motion.a
                            variants={FossilReveal}
                            href="mailto:rebellocreations@gmail.com"
                            className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-[#E8E4DE] shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#FAF8F5] text-[#6B7B5C] group-hover:bg-[#6B7B5C] group-hover:text-white transition-colors duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#8B8B8B] mb-0.5">Email us</p>
                                    <p className="font-medium text-[#2C3028]">rebellocreations@gmail.com</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#E8E4DE] group-hover:text-[#6B7B5C] transition-colors" />
                        </motion.a>
                    </motion.div>

                    {/* Form section */}
                    <motion.div
                        variants={FossilReveal}
                        className="bg-white rounded-[2rem] p-8 md:p-12 border border-[#E8E4DE] shadow-sm min-h-[400px] flex flex-col justify-center"
                    >
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-[#F2F4F0] rounded-full flex items-center justify-center mx-auto text-[#6B7B5C]">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                                    >
                                        <svg
                                            className="w-10 h-10"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <div>
                                    <h3 className="font-serif text-3xl text-[#2C3028] mb-3">Message Sent</h3>
                                    <p className="text-[#5C5C5C] leading-relaxed">
                                        Thank you for reaching out. We've received your message and will get back to you within 24–48 hours.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7B5C] hover:gap-3 transition-all mt-4"
                                >
                                    Send another message
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-[#4A4A4A] ml-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Your name"
                                        className="w-full px-5 py-4 bg-[#FAF8F5] border border-[#E8E4DE] rounded-xl focus:outline-none focus:border-[#6B7B5C] focus:ring-1 focus:ring-[#6B7B5C]/20 transition-all duration-300 placeholder:text-[#BBB]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-[#4A4A4A] ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="hello@example.com"
                                        className="w-full px-5 py-4 bg-[#FAF8F5] border border-[#E8E4DE] rounded-xl focus:outline-none focus:border-[#6B7B5C] focus:ring-1 focus:ring-[#6B7B5C]/20 transition-all duration-300 placeholder:text-[#BBB]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-[#4A4A4A] ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="Tell us about your custom request or query..."
                                        className="w-full px-5 py-4 bg-[#FAF8F5] border border-[#E8E4DE] rounded-xl focus:outline-none focus:border-[#6B7B5C] focus:ring-1 focus:ring-[#6B7B5C]/20 transition-all duration-300 placeholder:text-[#BBB] resize-none"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-sm text-red-500 ml-1">
                                        Something went wrong. Please try again or email us directly.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full py-5 bg-[#2C3028] text-white rounded-xl font-medium hover:bg-[#3D4338] transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>

                                <p className="text-center text-sm text-[#8B8B8B] pt-4 italic">
                                    We usually respond within 24–48 hours.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default Contact;
