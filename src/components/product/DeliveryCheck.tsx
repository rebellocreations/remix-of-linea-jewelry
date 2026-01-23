import { useState } from "react";
import { Truck, CheckCircle2 } from "lucide-react";

const DeliveryCheck = () => {
    const [pincode, setPincode] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const checkDelivery = () => {
        if (pincode.length !== 6) {
            setStatus("error");
            setMessage("Please enter a valid 6-digit pincode.");
            return;
        }

        setStatus("loading");
        setTimeout(() => {
            // Mock logic
            setStatus("success");
            setMessage("Delivery by " + new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { weekday: 'long', day: 'numeric', month: 'short' }));
        }, 1200);
    };

    return (
        <div className="mt-8 pt-6 border-t border-dashed border-stone-200">
            <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-stone-500" />
                <span className="text-sm font-medium text-stone-700">Check Delivery</span>
            </div>

            <div className="flex gap-2 relative">
                <input
                    type="text"
                    value={pincode}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 6) setPincode(val);
                    }}
                    placeholder="Enter Pincode"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-olive transition-colors"
                />
                <button
                    onClick={checkDelivery}
                    className="text-sm font-medium text-olive hover:text-olive-700 px-3 absolute right-1 top-1/2 -translate-y-1/2 disabled:opacity-50"
                    disabled={pincode.length !== 6}
                >
                    Check
                </button>
            </div>

            {status === "loading" && (
                <p className="text-xs text-stone-500 mt-2 animate-pulse">Calculating delivery time...</p>
            )}

            {status === "success" && (
                <div className="flex items-center gap-2 mt-2 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 size={14} />
                    {message} | Free Delivery
                </div>
            )}

            {status === "error" && (
                <p className="text-xs text-red-500 mt-2">{message}</p>
            )}
        </div>
    );
};

export default DeliveryCheck;
