import React from 'react';
import { PRICING } from '../data/pricing';

export const Brochure = () => {
    const sections = [
        { title: "Web Packages", data: PRICING.scope },
        { title: "Design Levels", data: PRICING.design },
        { title: "Functionality (CMS/Tech)", data: PRICING.cms },
        { title: "User Authentication", data: PRICING.auth },
        { title: "E-Commerce / Payments", data: PRICING.payment },
        { title: "Content Services", data: PRICING.content },
        { title: "Brand Assets", data: PRICING.logo },
        { title: "SEO & Performance", data: PRICING.seo },
        { title: "Hosting & Infrastructure", data: PRICING.hosting },
    ];

    return (
        <div className="bg-white text-black p-8 max-w-[210mm] mx-auto min-h-[297mm] shadow-lg print:shadow-none print:w-full print:h-full font-sans">

            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-black pb-4">
                <img src="/logo.png" alt="Micro Jump" className="h-16 w-auto mx-auto mb-2 object-contain" />
                <h1 className="text-3xl font-black uppercase tracking-widest text-gray-900">Service Rate Card</h1>
                <p className="text-gray-600 mt-1">Professional Web Development Solutions</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 gap-6">
                {sections.map((sec, idx) => (
                    <div key={idx} className="break-inside-avoid">
                        <h3 className="font-bold text-lg border-b border-black mb-3 pb-1 uppercase tracking-wide text-primary">
                            {sec.title}
                        </h3>
                        <div className="space-y-3">
                            {Object.values(sec.data).map((item, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div className="pr-2">
                                        <div className="font-bold text-sm text-gray-800">{item.label}</div>
                                        {item.desc && <div className="text-xs text-gray-500 italic mt-0.5">{item.desc}</div>}
                                    </div>
                                    <div className="font-semibold text-sm whitespace-nowrap">
                                        {item.price === 0 ? "Included" : `₹ ${item.price.toLocaleString()}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Maintenance Policy Box */}
            <div className="mt-8 border border-black p-4 bg-gray-50">
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-primary">Annual Maintenance Policy (AMC)</h4>
                <div className="flex justify-between items-center text-sm">
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li><strong>First 1 Month:</strong> 100% Free Support for bugs & crashes.</li>
                        <li><strong>Thereafter:</strong> Service Charge of <strong>3% of Project Value per month</strong>.</li>
                        <li>*Note: New feature requests after delivery will be charged separately.</li>
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t-2 border-black flex justify-between items-end text-sm">
                <div>
                    <strong>Micro Jump Tech Solutions</strong> (Online / Remote)<br />
                    +91 86100 16966 / +91 81220 67036<br />
                    microjum.netlify.app
                </div>
                <div className="text-right text-gray-500 text-xs">
                    * Prices are subject to change based on specific requirements.<br />
                    * Valid for the current financial year.
                </div>
            </div>

        </div>
    );
};
