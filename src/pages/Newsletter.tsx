import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ambient/GrainOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Thank you for joining our movement.");
            setEmail("");
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] font-sans selection:bg-stone-200">
            <GrainOverlay opacity={0.03} />
            <EditorialHeader />

            <main className="pt-32 pb-20 min-h-[70vh] flex flex-col justify-center">
                <section className="container mx-auto px-6 lg:px-12 py-24 text-center max-w-2xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 mb-6 block"
                    >
                        The Rebellious Movement
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-5xl lg:text-7xl text-[#2D2D2D] mb-8 tracking-tight"
                    >
                        Join the Circle
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-serif italic text-xl text-muted-foreground font-light mb-12"
                    >
                        Be the first to hear about new rescues, limited drops, and our journey in sustainability.
                    </motion.p>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                    >
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white border-stone-200 rounded-none h-12 focus-visible:ring-stone-400"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-charcoal text-white hover:bg-charcoal/90 rounded-none px-8 h-12 h-12 font-light tracking-wide transition-all"
                        >
                            {isSubmitting ? "Joining..." : "Subscribe"}
                        </Button>
                    </motion.form>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-8 text-xs text-stone-400 font-light"
                    >
                        By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                    </motion.p>
                </section>
            </main>

            <EditorialFooter />
        </div>
    );
};

export default Newsletter;
