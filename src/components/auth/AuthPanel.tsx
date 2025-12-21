import { useEffect, useRef } from "react";
import { X, User, Package, MapPin, LogOut, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { Link } from "react-router-dom";

export const AuthPanel = () => {
  const { 
    isAuthPanelOpen, 
    closeAuthPanel, 
    authView, 
    setAuthView,
    customer,
    logout
  } = useAuthStore();
  
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthPanelOpen) {
        closeAuthPanel();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isAuthPanelOpen, closeAuthPanel]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isAuthPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthPanelOpen]);

  if (!isAuthPanelOpen) return null;

  const handleLogout = () => {
    logout();
    closeAuthPanel();
  };

  const menuItems = [
    { icon: Package, label: "My Orders", href: "/account/orders" },
    { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  ];

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeAuthPanel}
        style={{ animation: 'fadeIn 300ms ease-out' }}
      />
      
      {/* Panel */}
      <div 
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l border-border/30 shadow-2xl flex flex-col"
        style={{ 
          animation: 'slideInRight 350ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <h2 className="font-serif text-xl text-foreground">
            {customer ? `Hello, ${customer.firstName || 'there'}` : 
             authView === 'login' ? 'Welcome back' :
             authView === 'signup' ? 'Create account' :
             'Reset password'}
          </h2>
          <button
            onClick={closeAuthPanel}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {customer && authView === 'menu' ? (
            // Logged in menu
            <div className="space-y-1" style={{ animation: 'fadeInUp 400ms ease-out' }}>
              <p className="text-sm text-muted-foreground mb-6">
                Manage your orders and account details.
              </p>
              
              {menuItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeAuthPanel}
                  className="flex items-center justify-between p-4 -mx-2 rounded-sm hover:bg-secondary/50 transition-colors duration-200 group"
                  style={{ 
                    animation: `fadeInUp 400ms ease-out ${150 + index * 50}ms both` 
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} strokeWidth={1.5} className="text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
              
              <div className="pt-6 mt-6 border-t border-border/30">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-4 -mx-2 w-full text-left rounded-sm hover:bg-secondary/50 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  style={{ animation: 'fadeInUp 400ms ease-out 300ms both' }}
                >
                  <LogOut size={18} strokeWidth={1.5} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          ) : authView === 'login' ? (
            <LoginForm />
          ) : authView === 'signup' ? (
            <SignupForm />
          ) : authView === 'forgot' ? (
            <ForgotPasswordForm />
          ) : null}
        </div>
        
        {/* Footer - only show for auth forms */}
        {!customer && (
          <div className="p-6 border-t border-border/30 text-center">
            {authView === 'login' ? (
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button 
                  onClick={() => setAuthView('signup')}
                  className="text-foreground hover:underline underline-offset-4"
                >
                  Create one
                </button>
              </p>
            ) : authView === 'signup' ? (
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button 
                  onClick={() => setAuthView('login')}
                  className="text-foreground hover:underline underline-offset-4"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <button 
                  onClick={() => setAuthView('login')}
                  className="text-foreground hover:underline underline-offset-4"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default AuthPanel;
