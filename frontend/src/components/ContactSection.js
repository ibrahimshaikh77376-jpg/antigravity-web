import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Phone, Mail, User, Package } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
    package: z.string().min(1, "Please select a package"),
    message: z.string().optional(),
});

const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.post(`${BACKEND_URL}/api/contact`, data);
            toast.success("Inquiry submitted! We'll contact you soon.");
            reset();
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            toast.error("Failed to submit inquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            data-testid="contact-section"
            className="py-24 bg-[#FFFBEB]"
        >
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2
                            data-testid="contact-heading"
                            className="text-5xl md:text-7xl font-bold uppercase mb-4"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            Get In Touch
                        </h2>
                        <p className="text-lg md:text-xl text-slate-700 font-medium">
                            Let us know which package you're interested in
                        </p>
                    </div>

                    <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-2"
                                >
                                    <User className="w-4 h-4" strokeWidth={2.5} />
                                    Name
                                </label>
                                <input
                                    data-testid="contact-name-input"
                                    id="name"
                                    {...register("name")}
                                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#007AFF] font-medium"
                                    placeholder="Your full name"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1 font-medium">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-2"
                                >
                                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                                    Phone
                                </label>
                                <input
                                    data-testid="contact-phone-input"
                                    id="phone"
                                    {...register("phone")}
                                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#007AFF] font-medium"
                                    placeholder="Your phone number"
                                />
                                {errors.phone && (
                                    <p className="text-red-600 text-sm mt-1 font-medium">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-2"
                                >
                                    <Mail className="w-4 h-4" strokeWidth={2.5} />
                                    Email (Optional)
                                </label>
                                <input
                                    data-testid="contact-email-input"
                                    id="email"
                                    {...register("email")}
                                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#007AFF] font-medium"
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1 font-medium">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="package"
                                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-2"
                                >
                                    <Package className="w-4 h-4" strokeWidth={2.5} />
                                    Package Interest
                                </label>
                                <select
                                    data-testid="contact-package-select"
                                    id="package"
                                    {...register("package")}
                                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#007AFF] font-medium"
                                >
                                    <option value="">Select a package</option>
                                    <option value="Prestige Package">Prestige Package</option>
                                    <option value="Showbox Package">Showbox Package</option>
                                    <option value="IPTV + OTT + Gold">IPTV + OTT + Gold</option>
                                    <option value="IPTV Platinum STD">IPTV Platinum STD</option>
                                    <option value="IPTV + OTT + Platinum">IPTV + OTT + Platinum</option>
                                    <option value="OTT + STD + Net">OTT + STD + Net</option>
                                    <option value="Internet Plans">Internet Plans</option>
                                </select>
                                {errors.package && (
                                    <p className="text-red-600 text-sm mt-1 font-medium">
                                        {errors.package.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="text-sm font-bold uppercase tracking-wider mb-2 block"
                                >
                                    Additional Message (Optional)
                                </label>
                                <textarea
                                    data-testid="contact-message-input"
                                    id="message"
                                    {...register("message")}
                                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#007AFF] font-medium h-32 resize-none"
                                    placeholder="Any specific requirements?"
                                />
                            </div>

                            <button
                                data-testid="contact-submit-button"
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#FF4500] text-white text-xl py-5 font-bold uppercase tracking-wider border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-300 text-center">
                            <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                                Or Call Us Directly
                            </p>
                            <a
                                data-testid="contact-direct-call"
                                href="tel:8369674575"
                                className="inline-flex items-center gap-2 text-3xl font-bold text-[#007AFF] hover:underline"
                            >
                                <Phone className="w-8 h-8" strokeWidth={2.5} />
                                836 967 4575
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
