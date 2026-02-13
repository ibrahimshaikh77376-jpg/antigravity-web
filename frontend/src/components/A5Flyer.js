import React from "react";
import { Sun, Wifi, Phone, Check } from "lucide-react";

const A5Flyer = () => {
    return (
        <div
            id="a5-flyer"
            data-testid="a5-flyer"
            className="bg-[#FFD700] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative"
            style={{ width: "420px", height: "595px" }}
        >
            <div className="noise-texture absolute inset-0"></div>

            <div className="relative z-10 h-full flex flex-col p-6">
                <div className="bg-[#FF4500] text-white px-3 py-2 border-2 border-black inline-block self-start mb-3">
                    <span className="font-bold uppercase text-xs tracking-widest">
                        🔥 Sizzling Summer Sale 🔥
                    </span>
                </div>

                <h1
                    className="text-4xl font-bold uppercase leading-none mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    HIGH-SPEED
                    <br />
                    INTERNET FOR
                    <br />
                    <span className="text-[#007AFF]">HOT SUMMER DAYS!</span>
                </h1>

                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mb-4">
                    <p className="text-2xl font-bold uppercase mb-1">Get up to 100 Mbps</p>
                    <p className="text-lg font-medium text-slate-700">for the price of 50 Mbps</p>
                </div>

                <div className="bg-white border-2 border-black p-4 mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                        Why Choose Us?
                    </h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#10B981]" strokeWidth={2.5} />
                            <span className="text-sm font-medium">Lightning Fast Speed</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#10B981]" strokeWidth={2.5} />
                            <span className="text-sm font-medium">Unlimited Data</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#10B981]" strokeWidth={2.5} />
                            <span className="text-sm font-medium">24/7 Support</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#10B981]" strokeWidth={2.5} />
                            <span className="text-sm font-medium">Premium OTT Platforms</span>
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white border-2 border-black p-3 text-center">
                        <Wifi className="w-8 h-8 text-[#007AFF] mx-auto mb-2" strokeWidth={2.5} />
                        <p className="text-xs font-bold uppercase">Reliable</p>
                    </div>
                    <div className="bg-white border-2 border-black p-3 text-center">
                        <Sun className="w-8 h-8 text-[#FFD700] mx-auto mb-2" strokeWidth={2.5} />
                        <p className="text-xs font-bold uppercase">Summer Deal</p>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="bg-[#FF4500] text-white p-4 border-2 border-black mb-3">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Phone className="w-6 h-6" strokeWidth={2.5} />
                            <span className="text-3xl font-bold tracking-wider">836 967 4575</span>
                        </div>
                        <p className="text-center text-sm font-bold uppercase tracking-wider">
                            Call Now for Installation
                        </p>
                    </div>

                    <div className="text-center">
                        <p
                            className="text-3xl font-bold uppercase"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            HORIZON INTERNET
                        </p>
                        <p className="text-xs font-medium text-slate-700">Your Summer Connection Partner</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default A5Flyer;

