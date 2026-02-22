import { motion } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const TextReveal = ({ text, className = "", delay = 0, as: Component = "span" }: TextRevealProps) => {
    const characters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay,
            },
        },
    };

    const characterVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as any,
            },
        },
    };

    return (
        <Component className={`inline-block ${className}`}>
            <motion.span
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex flex-wrap"
            >
                {characters.map((char, index) => (
                    <span
                        key={index}
                        className="inline-block overflow-hidden h-[1.2em] -mb-[0.2em]"
                    >
                        <motion.span
                            variants={characterVariants}
                            className="inline-block whitespace-pre"
                        >
                            {char}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Component>
    );
};

export default TextReveal;
