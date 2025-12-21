import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { customerRecover } from "@/lib/shopify";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [sent, setSent] = useState(false);
  const { setAuthView, isLoading, setLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setErrors({ email: result.error.errors[0].message });
      return;
    }

    setLoading(true);
    
    try {
      const recoverResult = await customerRecover(email);
      
      if (recoverResult.errors && recoverResult.errors.length > 0) {
        toast.error(recoverResult.errors[0].message);
        setLoading(false);
        return;
      }
      
      setSent(true);
      toast.success("Check your email for reset instructions.");
    } catch (error) {
      toast.error("Unable to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-6 text-center" style={{ animation: 'fadeInUp 400ms ease-out' }}>
        <div className="w-16 h-16 mx-auto rounded-full bg-secondary/50 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-8 h-8 text-foreground"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>
        <div>
          <h3 className="font-serif text-lg text-foreground mb-2">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent password reset instructions to {email}
          </p>
        </div>
        <button
          onClick={() => setAuthView('login')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-muted-foreground" style={{ animation: 'fadeInUp 400ms ease-out' }}>
        Enter your email and we'll send you instructions to reset your password.
      </p>
      
      <div style={{ animation: 'fadeInUp 400ms ease-out 100ms both' }}>
        <label htmlFor="recoverEmail" className="block text-sm text-foreground mb-2">
          Email
        </label>
        <input
          id="recoverEmail"
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
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-foreground text-background font-light text-sm rounded-sm hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        style={{ animation: 'fadeInUp 400ms ease-out 150ms both' }}
      >
        <span className={isLoading ? 'opacity-0' : ''}>Send reset link</span>
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

export default ForgotPasswordForm;
