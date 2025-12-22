import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { User, Package, MapPin, LogOut } from "lucide-react";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { customerLogout } from "@/lib/shopify";
import { toast } from "sonner";

const AccountLayout = () => {
  const { customer, accessToken, logout, openAuthPanel } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!customer) {
      openAuthPanel('login');
      navigate('/');
    }
  }, [customer, navigate, openAuthPanel]);

  if (!customer) return null;

  const handleLogout = async () => {
    if (accessToken) {
      await customerLogout(accessToken);
    }
    logout();
    toast.success("You've been signed out");
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: "Profile", href: "/account" },
    { icon: Package, label: "Orders", href: "/account/orders" },
    { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  ];

  const isActive = (href: string) => {
    if (href === "/account") {
      return location.pathname === "/account";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <EditorialHeader />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              My Account
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {customer.firstName || customer.displayName}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
            {/* Sidebar Navigation */}
            <aside className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200 mt-4"
              >
                <LogOut size={18} strokeWidth={1.5} />
                <span className="text-sm">Sign out</span>
              </button>
            </aside>

            {/* Content Area */}
            <div className="min-h-[400px]">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      
      <EditorialFooter />
    </div>
  );
};

export default AccountLayout;
