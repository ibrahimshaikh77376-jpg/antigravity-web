import React from "react";
import PricingTicket from "@/components/PricingTicket";

const pricingData = [
    {
        name: "Prestige Package",
        color: "bg-[#FF4500]",
        plans: [
            { speed: "50 Mbps", duration: "12M", price: "5000" },
        ],
        features: [
            "Amazon Prime (Lite)",
            "SonyLiv Premium",
            "Hotstar, Zee5, Discovery+",
            "OTT Plus, Dangal Play",
            "+ 350 Live TV Channels",
        ],
    },
    {
        name: "Showbox Package",
        color: "bg-[#007AFF]",
        plans: [
            { speed: "50 Mbps", duration: "1M", price: "450" },
            { speed: "50 Mbps", duration: "4M", price: "1200" },
            { speed: "50 Mbps", duration: "6M", price: "2300" },
            { speed: "50 Mbps", duration: "12M", price: "4500" },
        ],
        features: [
            "SonyLiv Premium",
            "Hotstar, Zee5, Discovery+",
            "OTT Plus, Dangal Play",
            "+ 350 Live TV Channels",
        ],
    },
    {
        name: "IPTV + OTT + Gold",
        color: "bg-[#FFD700]",
        textColor: "text-black",
        plans: [
            { speed: "50 Mbps", duration: "1M", price: "599" },
            { speed: "50 Mbps", duration: "4M", price: "1999" },
            { speed: "50 Mbps", duration: "6M", price: "2999" },
            { speed: "50 Mbps", duration: "12M", price: "5999" },
        ],
        features: [
            "Premium IPTV Channels",
            "Multiple OTT Platforms",
            "Live TV & On-Demand",
            "HD Streaming Quality",
        ],
    },
    {
        name: "IPTV Platinum STD",
        color: "bg-[#9333EA]",
        plans: [
            { speed: "50 Mbps", duration: "1M", price: "699" },
            { speed: "50 Mbps", duration: "4M", price: "1799" },
            { speed: "50 Mbps", duration: "6M", price: "3499" },
            { speed: "50 Mbps", duration: "12M", price: "6999" },
        ],
        features: [
            "Platinum IPTV Access",
            "Premium Content Library",
            "Multiple Device Support",
            "24/7 Streaming",
        ],
    },
    {
        name: "IPTV + OTT + Platinum",
        color: "bg-[#EC4899]",
        plans: [
            { speed: "50 Mbps", duration: "1M", price: "799" },
            { speed: "50 Mbps", duration: "4M", price: "1999" },
            { speed: "50 Mbps", duration: "6M", price: "3999" },
            { speed: "50 Mbps", duration: "12M", price: "6999" },
        ],
        features: [
            "Complete Entertainment",
            "All Premium OTTs",
            "Platinum IPTV",
            "Unlimited Streaming",
        ],
    },
    {
        name: "OTT + STD + Net",
        color: "bg-[#10B981]",
        plans: [
            { speed: "50 Mbps", duration: "1M", price: "375" },
            { speed: "50 Mbps", duration: "4M", price: "1100" },
            { speed: "50 Mbps", duration: "6M", price: "1875" },
            { speed: "50 Mbps", duration: "12M", price: "3750" },
        ],
        features: [
            "Popular OTT Platforms",
            "Standard TV Channels",
            "Fast Internet",
            "Value Bundle",
        ],
    },
    {
        name: "Internet Plans",
        color: "bg-[#007AFF]",
        plans: [
            { speed: "30 Mbps", duration: "1M", price: "350" },
            { speed: "30 Mbps", duration: "6M", price: "1799" },
            { speed: "30 Mbps", duration: "12M", price: "2999" },
            { speed: "50 Mbps", duration: "1M", price: "400" },
            { speed: "50 Mbps", duration: "12M", price: "3999" },
            { speed: "75 Mbps", duration: "1M", price: "425" },
            { speed: "75 Mbps", duration: "12M", price: "4250" },
        ],
        features: [
            "High-Speed Broadband",
            "Unlimited Data",
            "24/7 Support",
            "Easy Installation",
        ],
    },
];

const PricingSection = () => {
    return (
        <section
            id="pricing"
            data-testid="pricing-section"
            className="py-24 bg-[#FFFBEB]"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2
                        data-testid="pricing-heading"
                        className="text-5xl md:text-7xl font-bold uppercase mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        Choose Your Perfect Plan
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 font-medium">
                        Unbeatable prices for blazing fast internet
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {pricingData.map((pkg, index) => (
                        <PricingTicket key={index} {...pkg} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;

