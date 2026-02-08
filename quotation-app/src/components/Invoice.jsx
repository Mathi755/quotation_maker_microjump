import React from 'react';
import { FileText, Download } from 'lucide-react';
import { PRICING } from '../data/pricing';

export const Invoice = ({ data, calculation, componentRef }) => {
    const { phases, grandTotal } = calculation;
    const today = new Date().toLocaleDateString('en-IN');
    const validUntil = new Date(Date.now() + 15 * 86400000).toLocaleDateString('en-IN');

    return (
        <div id="invoice-container" ref={componentRef} className="bg-white text-black p-8 md:max-w-[210mm] w-full mx-auto min-h-[297mm] relative shadow-lg print:shadow-none print:p-0 font-sans text-sm border print:border-none border-gray-200 flex flex-col">

            {/* Header Row */}
            <div className="flex border border-black items-stretch">
                <div className="w-[40%] border-r border-black p-4">
                    <img src="/logo.png" alt="Micro Jump" className="h-12 w-auto object-contain mb-3" />
                    <div className="text-xs text-gray-700 leading-relaxed">
                        <strong>Micro Jump Tech Solutions</strong><br />
                        (Online Business / Remote)<br />
                        +91 86100 16966 / +91 81220 67036 | microjum.netlify.app<br />
                        <span className="text-[10px] text-gray-500">IG: @microjumpoffl | LI: Micro Jump</span>         </div>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-center items-center text-center bg-gray-50">
                    <h1 className="font-black text-2xl uppercase tracking-widest text-gray-900">Quotation</h1>
                    <p className="text-gray-500 text-xs mt-1">Web Development Services</p>
                </div>

                <div className="w-[30%] border-l border-black p-4 flex flex-col justify-center text-right">
                    <div className="mb-1"><span className="text-gray-500 text-xs uppercase">Quote No</span> <br /> <span className="font-bold">MJ/2026/131</span></div>
                    <div><span className="text-gray-500 text-xs uppercase">Date</span> <br /> <span className="font-bold">{today}</span></div>
                </div>
            </div>

            {/* Client & valid */}
            <div className="flex border-x border-b border-black">
                <div className="w-1/2 p-4 border-r border-black">
                    <div className="text-xs text-gray-500 uppercase mb-1">Bill To Client</div>
                    <div className="font-bold text-lg">{data.clientName || "Client Name"}</div>
                    <div className="text-sm text-gray-600 italic mt-1">{PRICING.scope[data.scope]?.label}</div>
                </div>
                <div className="w-1/2 p-4 flex items-center justify-between">
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Valid Until</div>
                        <div className="font-bold">{validUntil}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 uppercase mb-1">Project Type</div>
                        <div className="font-semibold bg-gray-200 px-2 py-1 rounded text-xs">{data.scope.toUpperCase()}</div>
                    </div>
                </div>
            </div>

            {/* Main Table Content */}
            <div className="flex-1 mt-6">
                <table className="w-full border-collapse border border-black text-sm">
                    <thead>
                        <tr className="bg-gray-100 uppercase text-xs tracking-wider text-gray-700">
                            <th className="border border-black p-2 w-12 text-center">SL</th>
                            <th className="border border-black p-2 text-left">Description</th>
                            <th className="border border-black p-2 w-[35%] text-left">Details</th>
                            <th className="border border-black p-2 w-28 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(phases).map((phase, idx) => (
                            phase.items.length > 0 && (
                                <React.Fragment key={idx}>
                                    {/* Section Header */}
                                    <tr className="bg-gray-50">
                                        <td className="border border-black p-2 font-bold text-xs uppercase text-gray-500 bg-gray-50" colSpan="4">
                                            {phase.title}
                                        </td>
                                    </tr>
                                    {/* Items */}
                                    {phase.items.map((row) => (
                                        <tr key={row.sl}>
                                            <td className="border border-black p-2 text-center text-gray-500">{row.sl}</td>
                                            <td className="border border-black p-2 font-semibold text-gray-900">{row.desc}</td>
                                            <td className="border border-black p-2 text-gray-600 text-xs">{row.note}</td>
                                            <td className="border border-black p-2 text-right font-medium">
                                                {row.rate === 0 ? "Included" : `₹ ${row.rate.toLocaleString()}`}
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
            <div className="border border-black bg-gray-50 p-4 rounded-sm">
                <div className="flex justify-end gap-12 mb-2 text-sm text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-gray-900">₹ {calculation.subTotal?.toLocaleString()}</span>
                </div>
                {calculation.discountAmount > 0 && (
                    <div className="flex justify-end gap-12 mb-2 text-sm text-green-600">
                        <span>Discount:</span>
                        <span className="font-semibold">- ₹ {calculation.discountAmount?.toLocaleString()}</span>
                    </div>
                )}
                <div className="border-t border-gray-300 pt-3 flex justify-between items-center bg-gray-900 text-white -mx-4 -mb-4 p-4 mt-2">
                    <div className="text-sm font-medium uppercase tracking-widest pl-2">Total Project Cost</div>
                    <div className="text-2xl font-bold pr-2">₹ {grandTotal.toLocaleString()}</div>
                </div>
            </div>



            {/* Growth & Trust Pack (Bonuses) 
            <div className="mt-6 mb-6">
                <h4 className="font-bold text-sm text-primary uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
                    Growth & Trust Pack (Included Free)
                </h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                    {PRICING.inclusions && PRICING.inclusions.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="text-green-600 font-bold mt-0.5">✓</span>
                            <div>
                                <span className="font-bold text-gray-800">{item.label}</span>
                                <span className="text-gray-500 block text-[10px]">{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
*/}
            {/* Terms & Payment */}
            <div className="mt-8 flex gap-8">
                <div className="w-2/3 text-xs text-gray-600 leading-relaxed">
                    <h4 className="font-bold text-gray-900 uppercase mb-2">Terms & Conditions</h4>
                    <ul className="list-disc pl-4 space-y-1">
                        <li><strong>Payment Terms:</strong> 50% advance to initiate the project, remaining 50% upon completion.</li>
                        <li><strong>Timeline:</strong> Estimated 2-4 weeks largely depends on feedback turnaround.</li>
                        <li className="text-gray-900 bg-yellow-50 p-1 -ml-1 pl-2 rounded">
                            <strong>Maintenance (AMC):</strong> First 1 Month Free. Thereafter,
                            <strong> ₹ {calculation.monthlyAMC?.toLocaleString()} / month</strong>. <br />
                            {data.amc && data.amc !== 'monthly' && (
                                <span className="block mt-1 font-semibold text-primary">
                                    * {PRICING.amc[data.amc].label} selected.
                                </span>
                            )}
                            <span className="text-[10px] text-gray-500 font-normal">
                                * Covers site crashes & bug fixes only. New features charged separately.
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="w-1/3 flex flex-col items-end text-right">
                    <div className="h-20 border-b border-gray-300 w-full mb-2"></div>
                    <p className="font-bold text-sm text-gray-900">Authorized Signatory</p>
                    <p className="text-xs text-gray-500">Micro Jump Tech Solutions</p>
                </div>
            </div>

        </div >
    );
};
