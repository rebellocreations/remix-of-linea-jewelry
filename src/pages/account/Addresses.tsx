import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { 
  getCustomerAddresses, 
  createCustomerAddress, 
  updateCustomerAddress, 
  deleteCustomerAddress,
  setDefaultAddress,
  ShopifyAddress,
  AddressInput 
} from "@/lib/shopify-customer";
import { Loader2, MapPin, Plus, Trash2, Star, Edit2 } from "lucide-react";
import { toast } from "sonner";

const emptyAddress: AddressInput = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  country: "India",
  zip: "",
  phone: "",
};

const Addresses = () => {
  const { accessToken } = useAuthStore();
  const [addresses, setAddresses] = useState<ShopifyAddress[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddressInput>(emptyAddress);

  const fetchAddresses = async () => {
    if (!accessToken) return;
    
    try {
      const data = await getCustomerAddresses(accessToken);
      setAddresses(data.addresses);
      setDefaultAddressId(data.defaultAddressId);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    setIsSaving(true);
    try {
      if (editingId) {
        const result = await updateCustomerAddress(accessToken, editingId, formData);
        if (result.errors.length > 0) {
          toast.error(result.errors[0].message);
          return;
        }
        toast.success("Address updated");
      } else {
        const result = await createCustomerAddress(accessToken, formData);
        if (result.errors.length > 0) {
          toast.error(result.errors[0].message);
          return;
        }
        toast.success("Address added");
      }
      
      await fetchAddresses();
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyAddress);
    } catch (error) {
      toast.error("Failed to save address");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!accessToken) return;
    
    try {
      const result = await deleteCustomerAddress(accessToken, addressId);
      if (result.errors.length > 0) {
        toast.error(result.errors[0].message);
        return;
      }
      toast.success("Address deleted");
      await fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (addressId: string) => {
    if (!accessToken) return;
    
    try {
      const result = await setDefaultAddress(accessToken, addressId);
      if (result.errors.length > 0) {
        toast.error(result.errors[0].message);
        return;
      }
      setDefaultAddressId(addressId);
      toast.success("Default address updated");
    } catch (error) {
      toast.error("Failed to update default address");
    }
  };

  const startEdit = (address: ShopifyAddress) => {
    setFormData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      address1: address.address1 || "",
      address2: address.address2 || "",
      city: address.city || "",
      province: address.province || "",
      country: address.country || "India",
      zip: address.zip || "",
      phone: address.phone || "",
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-serif text-2xl text-foreground mb-1">Addresses</h2>
          <p className="text-sm text-muted-foreground">Manage your shipping addresses</p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setFormData(emptyAddress);
              setEditingId(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm rounded-sm hover:bg-foreground/90 transition-colors"
          >
            <Plus size={16} />
            Add address
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-secondary/20 border border-border/30 rounded-sm p-6 space-y-4">
          <h3 className="font-medium text-foreground mb-4">
            {editingId ? "Edit address" : "New address"}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-2">First name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Last name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">Address</label>
            <input
              type="text"
              value={formData.address1}
              onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="Street address"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">Apartment, suite, etc. (optional)</label>
            <input
              type="text"
              value={formData.address2}
              onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">State</label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">PIN code</label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                required
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
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-foreground text-background text-sm rounded-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Save changes" : "Add address")}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData(emptyAddress);
              }}
              className="px-6 py-2.5 border border-border text-foreground text-sm rounded-sm hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="text-center py-16 bg-secondary/20 border border-border/30 rounded-sm">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" strokeWidth={1} />
          <p className="text-muted-foreground mb-2">No addresses saved</p>
          <p className="text-sm text-muted-foreground/70">
            Add a shipping address to make checkout faster.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-secondary/20 border border-border/30 rounded-sm p-5 relative"
            >
              {defaultAddressId === address.id && (
                <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-amber-600">
                  <Star size={12} fill="currentColor" />
                  Default
                </span>
              )}
              
              <div className="space-y-1 mb-4">
                <p className="font-medium text-foreground">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{address.address1}</p>
                {address.address2 && (
                  <p className="text-sm text-muted-foreground">{address.address2}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {address.city}, {address.province} {address.zip}
                </p>
                <p className="text-sm text-muted-foreground">{address.country}</p>
                {address.phone && (
                  <p className="text-sm text-muted-foreground">{address.phone}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => startEdit(address)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                {defaultAddressId !== address.id && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Star size={14} />
                    Set default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
