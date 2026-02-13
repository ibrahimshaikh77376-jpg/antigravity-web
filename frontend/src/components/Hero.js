import React from "react";
import { Sun, Wifi, Zap } from "lucide-react";

const Hero = () => {
    return (
        <section
            data-testid="hero-section"
            className="relative overflow-hidden bg-[#FFD700] noise-texture"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1759185260477-1a264e5dd18e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwyfHxzdW1tZXIlMjBiZWFjaCUyMGZ1biUyMGJyaWdodCUyMGNvbG9yc3xlbnwwfHx8fDE3NzA5Nzc1NDB8MA&ixlib=rb-4.1.0&q=85")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "multiply",
            }}
        >
            <div className="absolute inset-0 bg-[#FFD700] opacity-60"></div>
            <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div
                        data-testid="summer-sale-badge"
                        className="inline-block mb-6 bg-[#FF4500] text-white px-6 py-3 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse-slow"
                    >
                        <span className="font-bold uppercase text-lg tracking-widest">
                            🔥 Sizzling Summer Sale 🔥
                        </span>
                    </div>

                    <h1
                        data-testid="hero-heading"
                        className="hero-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 text-black"
                    >
                        HIGH-SPEED
                        <br />
                        INTERNET FOR
                        <br />
                        <span className="text-[#007AFF]">HOT SUMMER DAYS!</span>
                    </h1>

                    <div
                        data-testid="hero-offer"
                        className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8 inline-block"
                    >
                        <p className="text-2xl md:text-4xl font-bold uppercase mb-2">
                            Get up to 100 Mbps
                        </p>
                        <p className="text-xl md:text-2xl font-medium text-slate-700">
                            for the price of 50 Mbps
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-center items-center mb-8">
                        <div
                            data-testid="hero-feature-speed"
                            className="flex items-center gap-2 bg-white border-2 border-black px-6 py-3"
                        >
                            <Zap className="w-6 h-6 text-[#FF4500]" strokeWidth={2.5} />
                            <span className="font-bold uppercase text-sm">Lightning Fast</span>
                        </div>
                        <div
                            data-testid="hero-feature-wifi"
                            className="flex items-center gap-2 bg-white border-2 border-black px-6 py-3"
                        >
                            <Wifi className="w-6 h-6 text-[#007AFF]" strokeWidth={2.5} />
                            <span className="font-bold uppercase text-sm">Reliable</span>
                        </div>
                        <div
                            data-testid="hero-feature-summer"
                            className="flex items-center gap-2 bg-white border-2 border-black px-6 py-3"
                        >
                            <Sun className="w-6 h-6 text-[#FFD700]" strokeWidth={2.5} />
                            <span className="font-bold uppercase text-sm">Summer Special</span>
                        </div>
                    </div>

                    <a
                        data-testid="hero-cta-button"
                        href="tel:8369674575"
                        className="inline-flex items-center justify-center bg-[#FF4500] text-white text-xl md:text-2xl px-10 py-6 font-bold uppercase tracking-wider border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 transition-transform"
                    >
                        Call 836 967 4575 Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;

