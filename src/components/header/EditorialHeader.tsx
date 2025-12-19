import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, Menu, X } from "lucide-react";
import CartDrawer from "@/components/cart/CartDrawer";

const EditorialHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/category/shop" },
    { name: "Collection", href: "/category/collection" },
    { name: "About", href: "/about/our-story" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-editorial ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between h-20 px-6 lg:px-12">
        {/* Left - Navigation */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300 editorial-link"
            >
              {link.name}
            </Link>
          ))}
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
          className="absolute left-1/2 transform -translate-x-1/2 font-serif text-2xl lg:text-3xl tracking-wide text-foreground"
        >
          REBELLO
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
            className="hidden lg:block p-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
            aria-label="Wishlist"
          >
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <CartDrawer />
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-up">
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block font-serif text-2xl text-foreground hover:text-olive transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default EditorialHeader;