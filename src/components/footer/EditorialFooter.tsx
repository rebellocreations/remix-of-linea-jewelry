import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const EditorialFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    navigation: [
      { name: "Index", href: "/" },
      { name: "All Lamps", href: "/collections" },
      { name: "Our Story", href: "/about/our-story" },
      { name: "Sustainability", href: "/about/sustainability" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Return Policy", href: "/return-policy" },
    ],
    help: [
      { name: "Contact", href: "/contact" },
      { name: "FAQ", href: "/contact" },
      { name: "Care Instructions", href: "/about/care" },
    ],
  };

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      text: "Free shipping from ₹1999",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      text: "Easy returns within 3 days",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      text: "Secure payments online",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      text: "24/7 customer support",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`bg-[#1A1A1A] text-white transition-all duration-700 ease-editorial ${isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
        }`}
    >
      {/* Top Features Section */}
      <div className="border-b border-white/5">
        <div className="px-6 lg:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-8 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:bg-white/10"
              >
                <div className="text-white/80">{feature.icon}</div>
                <span className="text-xs md:text-sm tracking-wider font-light text-white/60">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand Info */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-center lg:text-left">
              REBELLO
            </h2>
            <div className="flex flex-col items-center lg:items-start gap-4">
              <p className="text-sm tracking-[0.2em] text-white/40 uppercase">
                Artisanal Upcycling
              </p>
              <p className="text-xs text-white/30 text-center lg:text-left">
                © {new Date().getFullYear()} All Rights Reserved
              </p>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-6 font-medium">
                  (Navigation)
                </h4>
                <ul className="space-y-4">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors duration-300 font-light"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-6 font-medium">
                  (Legal)
                </h4>
                <ul className="space-y-4">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors duration-300 font-light"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-6 font-medium">
                  (Help)
                </h4>
                <ul className="space-y-4">
                  {footerLinks.help.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors duration-300 font-light"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EditorialFooter;
