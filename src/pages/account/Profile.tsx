import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { updateCustomerProfile } from "@/lib/shopify-customer";
import { getCustomer } from "@/lib/shopify";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { customer, accessToken, setCustomer } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    phone: customer?.phone || "",
  });

  if (!customer) return null;

  const handleSave = async () => {
    if (!accessToken) return;
    
    setIsLoading(true);
    try {
      const result = await updateCustomerProfile(accessToken, formData);
      
      if (result.errors.length > 0) {
        toast.error(result.errors[0].message);
        return;
      }
      
      // Refresh customer data
      const updatedCustomer = await getCustomer(accessToken);
      if (updatedCustomer) {
        setCustomer(updatedCustomer);
      }
      
      toast.success("Profile updated");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-1">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your account details</p>
      </div>

      <div className="bg-secondary/20 border border-border/30 rounded-sm p-6 space-y-6">
        {isEditing ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-foreground mb-2">First name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Last name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-foreground mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2.5 bg-foreground text-background text-sm rounded-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 border border-border text-foreground text-sm rounded-sm hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Name</p>
                <p className="text-foreground">
                  {customer.firstName || customer.lastName 
                    ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                    : '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                <p className="text-foreground">{customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                <p className="text-foreground">{customer.phone || '—'}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 border border-border text-foreground text-sm rounded-sm hover:bg-secondary transition-colors mt-2"
            >
              Edit profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
