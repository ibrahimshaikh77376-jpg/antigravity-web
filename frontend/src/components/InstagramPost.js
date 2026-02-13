import React from "react";
import { Sun, Wifi, Phone } from "lucide-react";

const InstagramPost = () => {
    return (
        <div
            id="instagram-post"
            data-testid="instagram-post"
            className="aspect-square bg-[#FFD700] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative"
            style={{ width: "540px", height: "540px" }}
        >
            <div className="noise-texture absolute inset-0"></div>

            <div className="relative z-10 h-full flex flex-col p-8">
                <div className="bg-[#FF4500] text-white px-4 py-2 border-2 border-black inline-block self-start mb-4">
                    <span className="font-bold uppercase text-sm tracking-widest">
                        🔥 Summer Sale 🔥
                    </span>
                </div>

                <h1
                    className="text-5xl font-bold uppercase leading-none mb-4"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    HIGH-SPEED
                    <br />
                    INTERNET
                    <br />
                    <span className="text-[#007AFF]">HOT DEALS!</span>
                </h1>

                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-4">
                    <p className="text-3xl font-bold uppercase mb-2">Get 100 Mbps</p>
                    <p className="text-xl font-medium text-slate-700">for 50 Mbps price</p>
                </div>

                <div className="flex gap-3 mb-4">
                    <div className="bg-white border-2 border-black p-3">
                        <Wifi className="w-6 h-6 text-[#007AFF]" strokeWidth={2.5} />
                    </div>
                    <div className="bg-white border-2 border-black p-3">
                        <Sun className="w-6 h-6 text-[#FFD700]" strokeWidth={2.5} />
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="bg-black text-white p-4 border-2 border-black mb-3">
                        <div className="flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" strokeWidth={2.5} />
                            <span className="text-2xl font-bold tracking-wider">836 967 4575</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p
                            className="text-2xl font-bold uppercase"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            HORIZON INTERNET
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstagramPost;

