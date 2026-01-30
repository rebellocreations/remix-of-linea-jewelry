export const returnPolicyConfig = {
    title: "Return & Replacement Policy",
    tagline: "Fairness and quality for all our customers.",
    intro: "At Rebello Creation, we take immense pride in the handcrafted nature of our upcycled products. Because each piece is unique and made-to-order, we maintain a strict policy to ensure fairness and quality for all our customers.",

    eligibility: {
        title: "1. Eligibility for Replacement",
        description: "We offer replacements only in the following cases:",
        conditions: [
            "The product arrived damaged or broken during transit.",
            "You received the wrong item."
        ],
        note: "Due to the nature of upcycled glass, minor imperfections, scratches, or variations in the original bottle's texture are not considered defects; they are part of the bottle's history and the \"Rebello\" aesthetic."
    },

    mandatoryVideoProof: {
        required: true,
        title: "2. Mandatory Unboxing Video Proof",
        warningText: "Mandatory Unboxing Video",
        description: "To protect both the customer and our brand against transit damage, we require a continuous unboxing video.",
        requirements: [
            "The video must show the unopened package and the shipping label clearly.",
            "The video must be uncut and unedited from the start of opening until the product is fully inspected."
        ],
        consequence: "Failure to provide a clear unboxing video will result in the immediate rejection of the replacement claim."
    },

    timeline: {
        title: "3. Reporting Timeline",
        description: "Time is of the essence for fragile goods.",
        conditions: [
            "Any request for a replacement must be initiated within 3 business days from the date of delivery (as confirmed by our logistics partner).",
            "Requests made after the 3-day window will not be entertained."
        ]
    },

    howToInitiate: {
        title: "4. How to Initiate a Request",
        description: "To start a replacement request, please email us at rebellocreations@gmail.com or WhatsApp us at 7424942487 with:",
        requirements: [
            "Your Order Number.",
            "The mandatory Unboxing Video.",
            "High-resolution photos of the damage (if applicable)."
        ],
        email: "rebellocreations@gmail.com"
    },

    // Simplified fields for quick display
    returnWindowText: "Replacement requests must be initiated within 3 business days of delivery",
    returnFeeText: "Free replacement for damaged items",
    conditionText: "Mandatory unboxing video required for all claims",
    checkoutLine: "Please record an unboxing video when opening your package. Required for any replacement claims."
};
