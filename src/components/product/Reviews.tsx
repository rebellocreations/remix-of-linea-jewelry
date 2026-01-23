import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";
import { toast } from "sonner";

interface Review {
    id: string;
    user: string;
    rating: number;
    text: string;
    date: string;
}

const Reviews = ({ productId }: { productId: string }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [text, setText] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        // Load reviews from local storage
        const stored = localStorage.getItem(`reviews_${productId}`);
        if (stored) {
            setReviews(JSON.parse(stored));
        }
    }, [productId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a star rating");
            return;
        }

        const newReview: Review = {
            id: Date.now().toString(),
            user: name || "Anonymous",
            rating,
            text,
            date: new Date().toLocaleDateString(),
        };

        const updated = [newReview, ...reviews];
        setReviews(updated);
        localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));

        // Reset form
        setRating(0);
        setText("");
        setName("");
        toast.success("Review submitted!");
    };

    const averageRating = reviews.length
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "0.0";

    return (
        <div className="bg-white rounded-2xl p-6 lg:p-12 shadow-[0_2px_40px_rgba(0,0,0,0.02)]">
            <h2 className="font-serif text-2xl text-stone-800 mb-8">Customer Reviews</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-baseline gap-4">
                        <span className="text-6xl font-serif text-stone-900">{averageRating}</span>
                        <div className="flex flex-col">
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} size={16} fill={i <= Math.round(Number(averageRating)) ? "currentColor" : "none"} className={i <= Math.round(Number(averageRating)) ? "" : "text-stone-300"} />
                                ))}
                            </div>
                            <span className="text-sm text-stone-500 mt-1">{reviews.length} Reviews</span>
                        </div>
                    </div>

                    {/* Write Review Form */}
                    <form onSubmit={handleSubmit} className="bg-stone-50 p-6 rounded-xl space-y-4">
                        <h3 className="font-medium text-stone-800">Write a Review</h3>

                        {/* Star Input */}
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    className="text-amber-400 transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <Star
                                        size={24}
                                        fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                                        className={(hoverRating || rating) >= star ? "" : "text-stone-300"}
                                    />
                                </button>
                            ))}
                        </div>

                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-olive"
                            required
                        />

                        <textarea
                            placeholder="Share your thoughts..."
                            value={text}
                            onChange={e => setText(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 text-sm h-24 resize-none focus:outline-none focus:border-olive"
                            required
                        />

                        <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-700 text-white">Post Review</Button>
                    </form>
                </div>

                {/* Review List */}
                <div className="lg:col-span-2 space-y-6">
                    {reviews.length === 0 ? (
                        <div className="text-center py-12 text-stone-400 italic">
                            No reviews yet. Be the first to review this artwork!
                        </div>
                    ) : (
                        reviews.map(review => (
                            <div key={review.id} className="border-b border-stone-100 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-stone-100 grid place-items-center text-stone-500">
                                            <User size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-stone-900">{review.user}</p>
                                            <div className="flex text-amber-400 text-xs">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Star key={i} size={12} fill={i <= review.rating ? "currentColor" : "none"} className={i <= review.rating ? "" : "text-stone-300"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-stone-400">{review.date}</span>
                                </div>
                                <p className="text-stone-600 text-sm leading-relaxed mt-3">{review.text}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
