import React from "react";
import { Check } from "lucide-react";

const PricingTicket = ({ name, color, textColor = "text-white", plans, features, index }) => {
    return (
        <div
            data-testid={`pricing-ticket-${index}`}
            className="ticket-card bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-200"
        >
            <div className={`${color} ${textColor} p-6 border-b-2 border-dashed border-black`}>
                <h3
                    data-testid={`ticket-name-${index}`}
                    className="text-2xl font-bold uppercase tracking-wider mb-4"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    {name}
                </h3>
                <div className="space-y-2">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            data-testid={`ticket-plan-${index}-${idx}`}
                            className="flex justify-between items-center"
                        >
                            <span className="text-sm font-bold uppercase">
                                {plan.speed} - {plan.duration}
                            </span>
                            <span className="text-xl font-bold">₹{plan.price}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
                    Features
                </h4>
                <ul className="space-y-3">
                    {features.map((feature, idx) => (
                        <li
                            key={idx}
                            data-testid={`ticket-feature-${index}-${idx}`}
                            className="flex items-start gap-2"
                        >
                            <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span className="text-sm font-medium text-slate-700">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PricingTicket;
