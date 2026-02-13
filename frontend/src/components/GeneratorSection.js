import React, { useState } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import InstagramPost from "@/components/InstagramPost";
import A5Flyer from "@/components/A5Flyer";
import { toast } from "sonner";

const GeneratorSection = () => {
    const [activeTab, setActiveTab] = useState("instagram");

    const downloadImage = async (elementId, filename) => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2,
            });

            const link = document.createElement("a");
            link.download = filename;
            link.href = dataUrl;
            link.click();

            toast.success("Downloaded successfully!");
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Failed to download image");
        }
    };

    return (
        <section
            id="generator"
            data-testid="generator-section"
            className="py-24 bg-white"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2
                        data-testid="generator-heading"
                        className="text-5xl md:text-7xl font-bold uppercase mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        Download Promotional Material
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 font-medium">
                        Get ready-to-use Instagram posts and printable flyers
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="flex gap-4 mb-8 justify-center">
                        <button
                            data-testid="tab-instagram"
                            onClick={() => setActiveTab("instagram")}
                            className={`px-8 py-4 font-bold uppercase tracking-wider border-2 border-black transition-all ${activeTab === "instagram"
                                ? "bg-[#007AFF] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                : "bg-white text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                }`}
                        >
                            Instagram Post
                        </button>
                        <button
                            data-testid="tab-flyer"
                            onClick={() => setActiveTab("flyer")}
                            className={`px-8 py-4 font-bold uppercase tracking-wider border-2 border-black transition-all ${activeTab === "flyer"
                                ? "bg-[#007AFF] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                : "bg-white text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                }`}
                        >
                            A5 Flyer
                        </button>
                    </div>

                    <div className="bg-[#F1F5F9] border-2 border-dashed border-slate-300 p-8 mb-8 flex items-center justify-center min-h-[600px]">
                        {activeTab === "instagram" ? (
                            <div className="w-full max-w-lg">
                                <InstagramPost />
                            </div>
                        ) : (
                            <div className="w-full max-w-md">
                                <A5Flyer />
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <button
                            data-testid="download-button"
                            onClick={() =>
                                downloadImage(
                                    activeTab === "instagram" ? "instagram-post" : "a5-flyer",
                                    activeTab === "instagram"
                                        ? "horizon-internet-instagram.png"
                                        : "horizon-internet-flyer.png"
                                )
                            }
                            className="inline-flex items-center gap-3 bg-[#FF4500] text-white text-xl px-10 py-6 font-bold uppercase tracking-wider border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 transition-transform"
                        >
                            <Download className="w-6 h-6" strokeWidth={2.5} />
                            Download {activeTab === "instagram" ? "Instagram Post" : "A5 Flyer"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeneratorSection;

