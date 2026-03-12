import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const reviews = [
  { name: "Tushar", text: "Great Stuff!!" },
  { name: "Aman Agarwal", text: "well-crafted product. Loved the colors and the way it lights up the room ✨. Feels handmade and unique. 💯" },
  { name: "Aksh Tyagi", text: "Rebello Creations inspires with its beautiful designs and thoughtful details. You can feel the passion and love in every piece. The work is of high quality, the creativity is heartfelt, and the experience is wonderful. I highly recommend it 🫶" },
  { name: "Ayushi Agrawal", text: "I picked this vodka sipper and 6 glasses I absolutely in love with these Thankyou" },
  { name: "Yatharth Misra", text: "I am genuinely impressed by the craftsmanship from Rabello Creations. This isn't just a bottle with a light kit; the custom fitting is seamless and feels incredibly sturdy—no wobble at all. But the real highlight is that textured fabric" },
  { name: "Prateek Choudhary", text: "I bought the platter and glasses as a gift for my near and dear ones, and they loved it. They were genuinely surprised to see such an innovative reuse concept. The finishing and quality are really good, and it feels great to gift something that’s both beautiful and sustainable. Totally worth it! ✨😎" },
  { name: "Harsh Sing", text: "Very unique concept . The products are of very good quality. Glass cuttings are super smooth and feels much premium . I think photos don't do justice for the products. You will feel it once you get your hands on it . ❤️1" },
  { name: "Kajal Tyagi", text: "I m really impressed with Rebello Creation products👍 The quality is excellent with great attention to detail and finishing. The designs are stylish, elegant nd asthetic. The materials used feel premium and durable that making the products" },
  { name: "Daksh Gaur", text: "The most aesthetic products you will ever find, best service best quality best price 👍" },
  { name: "Shubhee Patel", text: "I have purchased few products from rebello creations and they are really cool and aesthetic at the same time they serve the purpose too ....a must buy product ✨✨✨✨✨" },
  { name: "Apurva Sharma", text: "Best experience ever, thanks! 👍 Loved the product! 😊" },
  { name: "Ashish Sharma", text: "Amazing collection and wonderful products" },
  { name: "Saksham Tapadia", text: "Great products. Awesome" },
  { name: "Prerna Rebari", text: "Such beautiful products, go for it🔥" },
  { name: "Jatin Tyagi", text: "Awesome products & quality 🥰" },
  { name: "Anubhav Tyagi", text: "Interesting products! 100/100🙌" },
  { name: "Charu Vaishnav", text: "Premium quality with reasonable price" },
  { name: "Yash Deora", text: "Awesome products & quality" },
  { name: "Diwankar Mishra", text: "Totally worth it." }
];

// Split reviews into two rows for a better visual effect
const half = Math.ceil(reviews.length / 2);
const firstRow = [...reviews].slice(0, half);
const secondRow = [...reviews].slice(half);

const ReviewCard = ({ name, text }: { name: string; text: string }) => (
  <div className={cn(
    "group flex w-[320px] md:w-[380px] shrink-0 flex-col gap-4 rounded-3xl bg-white/60 p-7 shadow-sm border border-black/5 dark:bg-card/50 dark:border-border/50 backdrop-blur-xl transition-all duration-500 hover:shadow-md hover:bg-white dark:hover:bg-card",
  )}>
    <div className="flex items-center gap-1 text-amber-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
    <p className="text-[14px] md:text-[15px] font-sans font-light text-slate-600 dark:text-slate-300 leading-[1.6] flex-grow line-clamp-4 transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-100">
      "{text}"
    </p>
    <div className="flex items-center gap-3 pt-3 mt-auto border-t border-black/5 dark:border-white/5">
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium text-xs overflow-hidden shrink-0 dark:bg-slate-800 dark:text-slate-300 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        {name.charAt(0).toUpperCase()}
      </div>
      <div>
        <h4 className="font-sans font-medium text-[13px] tracking-wide text-slate-800 dark:text-slate-200">{name}</h4>
      </div>
    </div>
  </div>
);

const ReviewsMarquee = () => {
  return (
    <section className="py-32 overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white dark:from-background dark:to-background border-t border-black/[0.03] dark:border-white/[0.03]">
      <div className="container px-4 md:px-6 mb-20">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-2 border border-primary/10">
              Community Love
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-slate-900 dark:text-slate-100 leading-tight"
          >
            Words from our <br/><span className="italic text-slate-500 font-light">brightest </span> customers.
          </motion.h2>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        
        {/* First Row */}
        <div className="flex w-full overflow-hidden mb-8">
          <motion.div 
            className="flex w-max"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {/* Exactly two identical halves */}
            <div className="flex shrink-0 gap-6 pr-6">
              {[...firstRow, ...firstRow, ...firstRow].map((review, idx) => (
                <ReviewCard key={`r1c1-${idx}`} {...review} />
              ))}
            </div>
            <div className="flex shrink-0 gap-6 pr-6">
              {[...firstRow, ...firstRow, ...firstRow].map((review, idx) => (
                <ReviewCard key={`r1c2-${idx}`} {...review} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Second Row - Reverse Direction */}
        <div className="flex w-full overflow-hidden">
          <motion.div 
             className="flex w-max"
             animate={{ x: [-1000, 0] }}
             transition={{
               x: {
                 repeat: Infinity,
                 repeatType: "loop",
                 duration: 65,
                 ease: "linear",
               },
             }}
          >
            {/* Exactly two identical halves */}
            <div className="flex shrink-0 gap-6 pr-6">
              {[...secondRow, ...secondRow, ...secondRow].map((review, idx) => (
                <ReviewCard key={`r2c1-${idx}`} {...review} />
              ))}
            </div>
            <div className="flex shrink-0 gap-6 pr-6">
              {[...secondRow, ...secondRow, ...secondRow].map((review, idx) => (
                <ReviewCard key={`r2c2-${idx}`} {...review} />
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-20 flex justify-center"
      >
        <a 
          href="https://share.google/5jB1sEsMRM5v9qrid" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 dark:bg-slate-100 px-8 py-4 text-sm font-medium text-white dark:text-slate-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          <span className="relative z-10 flex items-center gap-2">
            Read More Reviews
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 opacity-0 transition-all duration-300 group-hover:right-3 group-hover:opacity-100 z-10">
             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default ReviewsMarquee;
