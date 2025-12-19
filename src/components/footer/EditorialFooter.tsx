import { Link } from "react-router-dom";

const EditorialFooter = () => {
  const footerLinks = {
    shop: [
      { name: "All Lamps", href: "/category/shop" },
      { name: "Table Lamps", href: "/category/table-lamps" },
      { name: "Pendant Lights", href: "/category/pendant-lights" },
      { name: "Floor Lamps", href: "/category/floor-lamps" },
    ],
    support: [
      { name: "Shipping & Returns", href: "/about/customer-care" },
      { name: "Care Instructions", href: "/about/care" },
      { name: "Size Guide", href: "/about/size-guide" },
      { name: "Contact Us", href: "/about/contact" },
    ],
    connect: [
      { name: "Instagram", href: "https://instagram.com" },
      { name: "Pinterest", href: "https://pinterest.com" },
      { name: "Newsletter", href: "/newsletter" },
    ],
  };

  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-2xl tracking-wide">
              REBELLO
            </Link>
            <p className="mt-6 text-sm text-charcoal-foreground/60 leading-relaxed max-w-xs">
              Handcrafted lighting from recycled materials. Each piece tells a
              story of transformation.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-charcoal-foreground/50 mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-charcoal-foreground/80 hover:text-charcoal-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-charcoal-foreground/50 mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-charcoal-foreground/80 hover:text-charcoal-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-charcoal-foreground/50 mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-charcoal-foreground/80 hover:text-charcoal-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-charcoal-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-charcoal-foreground/40">
              © {new Date().getFullYear()} Rebello Creations. All rights
              reserved.
            </p>
            <p className="text-xs text-charcoal-foreground/40 italic">
              "Transforming waste into light, one bottle at a time."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EditorialFooter;