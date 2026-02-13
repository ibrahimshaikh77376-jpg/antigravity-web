import React from "react";
import { Phone } from "lucide-react";

const Navigation = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            data-testid="main-navigation"
            className="sticky top-0 z-50 bg-[#FFD700] border-b-2 border-black"
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div
                    data-testid="company-logo"
                    className="text-2xl md:text-3xl font-bold uppercase tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    Horizon Internet
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <button
                        data-testid="nav-pricing-link"
                        onClick={() => scrollToSection("pricing")}
                        className="font-bold uppercase text-sm tracking-wider hover:underline"
                    >
                        Packages
                    </button>
                    <button
                        data-testid="nav-generator-link"
                        onClick={() => scrollToSection("generator")}
                        className="font-bold uppercase text-sm tracking-wider hover:underline"
                    >
                        Download
                    </button>
                    <button
                        data-testid="nav-contact-link"
                        onClick={() => scrollToSection("contact")}
                        className="font-bold uppercase text-sm tracking-wider hover:underline"
                    >
                        Contact
                    </button>
                </div>
                <a
                    data-testid="nav-call-button"
                    href="tel:8369674575"
                    className="inline-flex items-center gap-2 bg-[#007AFF] text-white px-6 py-3 font-bold uppercase text-sm tracking-wider border-2 border-black hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all"
                >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    Call Now
                </a>
            </div>
        </nav>
    );
};

export default Navigation;

