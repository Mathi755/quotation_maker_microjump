import React from 'react';
import { FileText, Download } from 'lucide-react';
import { PRICING } from '../data/pricing';

export const Invoice = ({ data, calculation, componentRef }) => {
    const { phases, grandTotal } = calculation;
    const today = new Date().toLocaleDateString('en-IN');
    const validUntil = new Date(Date.now() + 15 * 86400000).toLocaleDateString('en-IN');

    return (
        <div id="invoice-container" ref={componentRef} className="bg-white text-[#000000] p-8 md:max-w-[210mm] w-full mx-auto min-h-[297mm] relative shadow-lg print:shadow-none print:p-0 font-sans text-sm border print:border-none border-[#e5e7eb] flex flex-col">

            {/* Header Row */}
            <div className="flex border border-[#000000] items-stretch">
                <div className="w-[40%] border-r border-[#000000] p-4">
                    <img src="/logo.png" alt="Micro Jump" className="h-12 w-auto object-contain mb-3" />
                    <div className="text-xs text-[#374151] leading-relaxed">
                        <strong>Micro Jump Tech Solutions</strong><br />
                        (Online Business / Remote)<br />
                        +91 86100 16966 / +91 81220 67036 | microjum.netlify.app<br />
                        <span className="text-[10px] text-[#6b7280]">IG: @microjumpoffl | LI: Micro Jump</span>         </div>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-center items-center text-center bg-[#f9fafb]">
                    <h1 className="font-black text-2xl uppercase tracking-widest text-[#111827]">Quotation</h1>
                    <p className="text-[#6b7280] text-xs mt-1">
                        {(data.projectType || 'website') === 'mobile_app' ? 'Mobile App Development Services' : 'Web Development Services'}
                    </p>
                </div>

                <div className="w-[30%] border-l border-[#000000] p-4 flex flex-col justify-center text-right">
                    <div className="mb-1"><span className="text-[#6b7280] text-xs uppercase">Quote No</span> <br /> <span className="font-bold">MJ/2026/131</span></div>
                    <div><span className="text-[#6b7280] text-xs uppercase">Date</span> <br /> <span className="font-bold">{today}</span></div>
                </div>
            </div>

            {/* Client & valid */}
            <div className="flex border-x border-b border-[#000000]">
                <div className="w-1/2 p-4 border-r border-[#000000]">
                    <div className="text-xs text-[#6b7280] uppercase mb-1">Bill To Client</div>
                    <div className="font-bold text-lg">{data.clientName || "Client Name"}</div>
                    <div className="text-sm text-[#4b5563] italic mt-1">
                        {(data.projectType || 'website') === 'mobile_app'
                            ? PRICING.mobileScope[data.mobileScope]?.label
                            : PRICING.scope[data.scope]?.label}
                    </div>
                </div>
                <div className="w-1/2 p-4 flex items-center justify-between">
                    <div>
                        <div className="text-xs text-[#6b7280] uppercase mb-1">Valid Until</div>
                        <div className="font-bold">{validUntil}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-[#6b7280] uppercase mb-1">Project Type</div>
                        <div className="font-semibold bg-[#e5e7eb] px-2 py-1 rounded text-xs">
                            {(data.projectType || 'website') === 'mobile_app' ? '📱 MOBILE APP' : '🌐 WEBSITE'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Table Content */}
            <div className="flex-1 mt-6">
                <table className="w-full border-collapse border border-[#000000] text-sm">
                    <thead>
                        <tr className="bg-[#f3f4f6] uppercase text-xs tracking-wider text-[#374151]">
                            <th className="border border-[#000000] p-2 w-12 text-center">SL</th>
                            <th className="border border-[#000000] p-2 text-left">Description</th>
                            <th className="border border-[#000000] p-2 w-[35%] text-left">Details</th>
                            <th className="border border-[#000000] p-2 w-28 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(phases).map((phase, idx) => (
                            phase.items.length > 0 && (
                                <React.Fragment key={idx}>
                                    {/* Section Header */}
                                    <tr className="bg-[#f9fafb]">
                                        <td className="border border-[#000000] p-2 font-bold text-xs uppercase text-[#6b7280] bg-[#f9fafb]" colSpan="4">
                                            {phase.title}
                                        </td>
                                    </tr>
                                    {/* Items */}
                                    {phase.items.map((row) => (
                                        <tr key={row.sl} className={row.isRecurring ? 'bg-blue-50/50' : ''}>
                                            <td className="border border-[#000000] p-2 text-center text-[#6b7280]">{row.sl}</td>
                                            <td className="border border-[#000000] p-2 font-semibold text-[#111827]">
                                                {row.desc}
                                                {row.isRecurring && (
                                                    <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                                                        ₹{row.monthlyPrice}/month
                                                    </span>
                                                )}
                                            </td>
                                            <td className="border border-[#000000] p-2 text-[#4b5563] text-xs">{row.note}</td>
                                            <td className="border border-[#000000] p-2 text-right font-medium">
                                                {row.isRecurring ? (
                                                    <span className="text-blue-600 font-semibold">Recurring</span>
                                                ) : row.rate === 0 ? (
                                                    "Included"
                                                ) : (
                                                    `₹ ${row.rate.toLocaleString()}`
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            )
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Total */}
            <div className="border border-[#000000] bg-[#f9fafb] p-4 rounded-sm">
                <div className="flex justify-end gap-12 mb-2 text-sm text-[#4b5563]">
                    <div>
                        <div>Subtotal (Development Costs Only):</div>
                        <div className="text-[10px] text-[#6b7280] italic">Excludes mandatory recurring costs</div>
                    </div>
                    <span className="font-semibold text-[#111827]">₹ {calculation.subTotal?.toLocaleString()}</span>
                </div>
                {calculation.discountAmount > 0 && (
                    <div className="flex justify-end gap-12 mb-2 text-sm text-[#16a34a]">
                        <span>Discount {data.discountType === 'percent' ? `(${data.discount}%)` : ''}:</span>
                        <span className="font-semibold">- ₹ {calculation.discountAmount?.toLocaleString()}</span>
                    </div>
                )}
                <div className="border-t border-[#d1d5db] pt-3 flex justify-between items-center bg-[#111827] text-white -mx-4 -mb-4 p-4 mt-2">
                    <div className="text-sm font-medium uppercase tracking-widest pl-2">Total Project Cost</div>
                    <div className="text-2xl font-bold pr-2">₹ {grandTotal.toLocaleString()}</div>
                </div>
            </div>

            {/* Terms & Payment */}
            <div className="mt-8 flex gap-8">
                <div className="w-2/3 text-xs text-[#4b5563] leading-relaxed">
                    <h4 className="font-bold text-[#111827] uppercase mb-2">Terms & Conditions</h4>
                    <ul className="list-disc pl-4 space-y-1">
                        <li><strong>Payment Terms:</strong> 50% advance to initiate the project, remaining 50% upon completion.</li>
                        <li><strong>Timeline:</strong> Estimated 2-4 weeks largely depends on feedback turnaround.</li>
                        <li className="text-[#111827] bg-[#fefce8] p-1 -ml-1 pl-2 rounded">
                            <strong>Maintenance (AMC):</strong> First 1 Month Free. Thereafter,
                            <strong> ₹ {calculation.monthlyAMC?.toLocaleString()} / month</strong>. <br />
                            {data.amc && data.amc !== 'monthly' && (
                                <span className="block mt-1 font-semibold text-[#6366f1]">
                                    * {PRICING.amc[data.amc].label} selected.
                                </span>
                            )}
                            <span className="text-[10px] text-[#6b7280] font-normal">
                                * Covers {(data.projectType || 'website') === 'mobile_app' ? 'app crashes' : 'site crashes'} & bug fixes only. New features charged separately.
                            </span>
                        </li>
                        {(data.projectType || 'website') === 'mobile_app' && (
                            <>
                                <li className="text-[#111827] bg-[#dbeafe] p-1 -ml-1 pl-2 rounded">
                                    <strong>Cloud Hosting Costs (Mandatory):</strong> To run your app with more users, you must pay monthly fees to cloud providers: <br />
                                    <span className="text-[10px] text-[#6b7280] font-normal ml-2">
                                        • <strong>Backend Hosting:</strong> From ₹2,000/month - may increase according to usage<br />
                                        • <strong>LLM API (if AI features):</strong> From ₹3,000/month - may increase to some extent based on usage<br />
                                        * These costs are paid directly to cloud providers (AWS/Firebase/OpenAI), not to us.
                                    </span>
                                </li>
                                <li className="text-[#111827] bg-[#fef3c7] p-2 -ml-1 pl-2 rounded" style={{ borderWidth: '1px', borderColor: '#facc15', borderStyle: 'solid' }}>
                                    <strong className="text-[#92400e]">💰 Total Approximate Monthly Costs:</strong><br />
                                    <span className="text-xs text-[#78350f] font-semibold ml-2">
                                        AMC (₹{calculation.monthlyAMC?.toLocaleString()}) + Backend (₹2,000+) + LLM (₹3,000+) = <strong>₹{(calculation.monthlyAMC + 5000).toLocaleString()} to ₹{(calculation.monthlyAMC + 8000).toLocaleString()}/month</strong>
                                    </span><br />
                                    <span className="text-[9px] text-[#78350f] ml-2 italic">
                                        * This is an estimate. Actual costs may vary based on number of users and usage patterns.
                                    </span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="w-1/3 flex flex-col items-end text-right">
                    <div className="h-20 border-b border-[#d1d5db] w-full mb-2"></div>
                    <p className="font-bold text-sm text-[#111827]">Authorized Signatory</p>
                    <p className="text-xs text-[#6b7280]">Micro Jump Tech Solutions</p>
                </div>
            </div>

        </div >
    );
};
