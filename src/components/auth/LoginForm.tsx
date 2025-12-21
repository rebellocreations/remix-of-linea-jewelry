import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { customerLogin, getCustomer } from "@/lib/shopify";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { setAuthView, setCustomer, setAccessToken, closeAuthPanel, isLoading, setLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    
    try {
      const tokenResult = await customerLogin({ email, password });
      
      if (tokenResult.errors && tokenResult.errors.length > 0) {
        toast.error(tokenResult.errors[0].message);
        setLoading(false);
        return;
      }
      
      if (tokenResult.accessToken) {
        setAccessToken(tokenResult.accessToken.accessToken, tokenResult.accessToken.expiresAt);
        
        // Fetch customer details
        const customerData = await getCustomer(tokenResult.accessToken.accessToken);
        if (customerData) {
          setCustomer(customerData);
          toast.success("Welcome back!");
          closeAuthPanel();
        }
      }
    } catch (error) {
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-muted-foreground" style={{ animation: 'fadeInUp 400ms ease-out' }}>
        Sign in to manage your orders and saved lamps.
      </p>
      
      <div className="space-y-4">
        <div style={{ animation: 'fadeInUp 400ms ease-out 100ms both' }}>
          <label htmlFor="email" className="block text-sm text-foreground mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 bg-secondary/30 border ${errors.email ? 'border-destructive' : 'border-border/50'} rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition-colors duration-200`}
            placeholder="your@email.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </div>
        
        <div style={{ animation: 'fadeInUp 400ms ease-out 150ms both' }}>
          <label htmlFor="password" className="block text-sm text-foreground mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 bg-secondary/30 border ${errors.password ? 'border-destructive' : 'border-border/50'} rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition-colors duration-200`}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-xs text-destructive mt-1">{errors.password}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end" style={{ animation: 'fadeInUp 400ms ease-out 200ms both' }}>
        <button
          type="button"
          onClick={() => setAuthView('forgot')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Forgot password?
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-foreground text-background font-light text-sm rounded-sm hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        style={{ animation: 'fadeInUp 400ms ease-out 250ms both' }}
      >
        <span className={isLoading ? 'opacity-0' : ''}>Sign in</span>
        {isLoading && (
          <Loader2 className="absolute inset-0 m-auto w-5 h-5 animate-spin" />
        )}
        <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </button>
      
      <style>{`
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
    </form>
  );
};

export default LoginForm;
