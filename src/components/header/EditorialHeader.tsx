import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/cart/CartDrawer";

// Rebello Creations collections
const collections = [
  { name: "Glasses & Bowls", handle: "glasses-bowls" },
  { name: "Platters", handle: "platters" },
  { name: "Lamps", handle: "lamps" },
  { name: "Candles", handle: "candles" },
  { name: "Planters", handle: "planters" },
  { name: "Soap Dispenser", handle: "soap-dispenser" },
  { name: "Sippers & Jars", handle: "sippers-jars" },
];

const EditorialHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionHovered, setIsCollectionHovered] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleCollectionMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsCollectionHovered(true);
  };

  const handleCollectionMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsCollectionHovered(false);
    }, 200);
  };

  return (
    <header
      className="fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-editorial bg-white/95 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl"
    >
      <nav className="flex items-center justify-between h-20 px-6 lg:px-12">
        {/* Left - Navigation */}
        <div className="hidden lg:flex items-center space-x-10">
          {/* Collections with dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCollectionMouseEnter}
            onMouseLeave={handleCollectionMouseLeave}
          >
            <Link
              to="/collections"
              className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300 editorial-link py-6 block"
            >
              Collections
            </Link>

            {/* Animated Dropdown */}
            <AnimatePresence>
              {isCollectionHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2"
                >
                  <div className="bg-background border border-border/50 rounded-xl shadow-2xl min-w-[220px] py-2 overflow-hidden">
                    {collections.map((collection, index) => (
                      <motion.div
                        key={collection.handle}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.15 }}
                      >
                        <Link
                          to={`/collections?collection=${collection.handle}`}
                          className="block px-5 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-olive/5 transition-all duration-200"
                          onClick={() => setIsCollectionHovered(false)}
                        >
                          {collection.name}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="border-t border-border/50 mt-2 pt-2">
                      <Link
                        to="/collections"
                        className="block px-5 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                        onClick={() => setIsCollectionHovered(false)}
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/about/our-story"
            className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300 editorial-link"
          >
            About
          </Link>

          <Link
            to="/blogs"
            className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300 editorial-link"
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300 editorial-link"
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Center - Logo */}
        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <img
            src="/logo.PNG"
            alt="Rebello Creations"
            className="brand-logo h-20 md:h-24 lg:h-28"
          />
        </Link>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button
            className="p-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
            aria-label="Account"
            onClick={handleAccountClick}
          >
            <User size={20} strokeWidth={1.5} />
          </button>
          <CartDrawer />
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-6 py-10 space-y-8">
              {/* Collections with sub-items */}
              <div>
                <Link
                  to="/collections"
                  className="block font-serif text-xl tracking-tight text-foreground hover:text-amber-700 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collections
                </Link>
                <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-4">
                  {collections.map((collection) => (
                    <Link
                      key={collection.handle}
                      to={`/collections?collection=${collection.handle}`}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <Link
                  to="/about/our-story"
                  className="block font-serif text-xl tracking-tight text-foreground hover:text-amber-700 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <Link
                  to="/blogs"
                  className="block font-serif text-xl tracking-tight text-foreground hover:text-amber-700 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>

                <Link
                  to="/contact"
                  className="block font-serif text-xl tracking-tight text-foreground hover:text-amber-700 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                <Link
                  to="/account"
                  className="block font-serif text-xl tracking-tight text-foreground hover:text-amber-700 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default EditorialHeader;