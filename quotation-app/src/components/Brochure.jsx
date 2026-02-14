import React from 'react';
import { PRICING } from '../data/pricing';

export const Brochure = () => {
    const websiteSections = [
        { title: "Website Packages", data: PRICING.scope },
        { title: "Design Levels", data: PRICING.design },
        { title: "CMS & Tech", data: PRICING.cms },
        { title: "User Authentication", data: PRICING.auth },
        { title: "Payment Integration", data: PRICING.payment },
        { title: "SEO & Performance", data: PRICING.seo },
        { title: "Hosting", data: PRICING.hosting },
    ];

    const mobileSections = [
        { title: "Mobile App Packages", data: PRICING.mobileScope },
        { title: "Platform Options", data: PRICING.mobilePlatform },
        { title: "Mobile Features", data: PRICING.mobileExtras },
    ];

    const commonSections = [
        { title: "Content Services", data: PRICING.content },
        { title: "Brand Assets (Logo)", data: PRICING.logo },
    ];

    return (
        <div className="bg-white text-black p-8 max-w-[210mm] mx-auto min-h-[297mm] shadow-lg print:shadow-none print:w-full print:h-full font-sans">

            {/* Header */}
            <div className="text-center mb-6 border-b-2 border-black pb-3">
                <img src="/logo.png" alt="Micro Jump" className="h-14 w-auto mx-auto mb-2 object-contain" />
                <h1 className="text-3xl font-black uppercase tracking-widest text-gray-900">Service Rate Card</h1>
                <p className="text-gray-600 mt-1">Website & Mobile App Development Solutions</p>
            </div>

            {/* Website Services Section */}
            <div className="mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 mb-4 uppercase tracking-wide">
                    🌐 Website Development Services
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {websiteSections.map((sec, idx) => (
                        <div key={idx} className="break-inside-avoid">
                            <h3 className="font-bold text-sm border-b border-gray-300 mb-2 pb-1 uppercase tracking-wide text-blue-600">
                                {sec.title}
                            </h3>
                            <div className="space-y-2">
                                {Object.values(sec.data).map((item, i) => (
                                    <div key={i} className="flex justify-between items-start text-xs">
                                        <div className="pr-2 flex-1">
                                            <div className="font-semibold text-gray-800">{item.label}</div>
                                            {item.desc && <div className="text-[10px] text-gray-500 italic mt-0.5">{item.desc}</div>}
                                        </div>
                                        <div className="font-semibold whitespace-nowrap">
                                            {item.price === 0 ? "Included" : `₹${item.price.toLocaleString()}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile App Services Section */}
            <div className="mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 mb-4 uppercase tracking-wide">
                    📱 Mobile App Development Services
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {mobileSections.map((sec, idx) => (
                        <div key={idx} className="break-inside-avoid">
                            <h3 className="font-bold text-sm border-b border-gray-300 mb-2 pb-1 uppercase tracking-wide text-purple-600">
                                {sec.title}
                            </h3>
                            <div className="space-y-2">
                                {Object.values(sec.data).map((item, i) => (
                                    <div key={i} className="flex justify-between items-start text-xs">
                                        <div className="pr-2 flex-1">
                                            <div className="font-semibold text-gray-800">{item.label}</div>
                                            {item.desc && <div className="text-[10px] text-gray-500 italic mt-0.5">{item.desc}</div>}
                                        </div>
                                        <div className="font-semibold whitespace-nowrap">
                                            {item.price === 0 ? "Base" : `₹${item.price.toLocaleString()}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Common Services */}
            <div className="mb-4">
                <h2 className="text-lg font-bold bg-gray-700 text-white px-4 py-2 mb-3 uppercase tracking-wide">
                    Common Services (Website & Mobile)
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {commonSections.map((sec, idx) => (
                        <div key={idx} className="break-inside-avoid">
                            <h3 className="font-bold text-sm border-b border-gray-300 mb-2 pb-1 uppercase tracking-wide text-gray-700">
                                {sec.title}
                            </h3>
                            <div className="space-y-2">
                                {Object.values(sec.data).map((item, i) => (
                                    <div key={i} className="flex justify-between items-start text-xs">
                                        <div className="pr-2 flex-1">
                                            <div className="font-semibold text-gray-800">{item.label}</div>
                                            {item.desc && <div className="text-[10px] text-gray-500 italic mt-0.5">{item.desc}</div>}
                                        </div>
                                        <div className="font-semibold whitespace-nowrap">
                                            {item.price === 0 ? "Included" : `₹${item.price.toLocaleString()}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Maintenance Policy Box */}
            <div className="border border-black p-3 bg-gray-50">
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-gray-800">Annual Maintenance Policy (AMC)</h4>
                <div className="text-xs text-gray-700 space-y-1">
                    <div><strong>First 1 Month:</strong> 100% Free Support for bugs & crashes.</div>
                    <div><strong>Thereafter:</strong> Service Charge of <strong>5% of Project Value per month</strong>.</div>
                    <div className="text-[10px] text-gray-600">*Note: New feature requests after delivery will be charged separately.</div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t-2 border-black flex justify-between items-end text-xs">
                <div>
                    <strong>Micro Jump Tech Solutions</strong> (Online / Remote)<br />
                    +91 86100 16966 / +91 81220 67036<br />
                    microjum.netlify.app
                </div>
                <div className="text-right text-gray-500 text-[10px]">
                    * Prices are subject to change based on specific requirements.<br />
                    * Valid for the current financial year.
                </div>
            </div>

        </div>
    );
};
