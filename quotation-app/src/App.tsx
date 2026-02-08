import { useState, useRef, useEffect } from 'react'
import { QuoteForm } from './components/QuoteForm';
import { Invoice } from './components/Invoice';
import { Brochure } from './components/Brochure';
import { useQuoteCalculator } from './hooks/useQuoteCalculator';
import { Receipt, LayoutTemplate, Download } from 'lucide-react';
// @ts-ignore
import html2pdf from 'html2pdf.js';

function App() {
    const [viewMode, setViewMode] = useState('quote'); // 'quote' | 'brochure'

    const defaultFormData = {
        clientName: "Vishal Khanna",
        scope: "business",
        design: "standard",
        cms: "none",
        auth: "no",
        payment: "no",
        content: "client",
        logo: "have",
        seo: "basic",
        hosting: "none",
        domainNew: false,
        extras: [],
        discount: 0
    };

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('quoteFormData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved data", e);
                return defaultFormData;
            }
        }
        return defaultFormData;
    });

    useEffect(() => {
        localStorage.setItem('quoteFormData', JSON.stringify(formData));
    }, [formData]);

    const componentRef = useRef(null);
    const calculation = useQuoteCalculator(formData);

    const handleDownloadPDF = () => {
        const element = document.getElementById('invoice-container');
        if (!element) return;

        // Default filename
        const defaultName = `Quote_${formData.clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`;
        const fileName = window.prompt("Enter filename for PDF:", defaultName);

        if (!fileName) return; // User cancelled

        const opt = {
            margin: 0,
            filename: `${fileName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // @ts-ignore
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="min-h-screen bg-dark">
            {/* Header - Hidden on Print */}
            <nav className="bg-card border-b border-white/10 p-4 print:hidden sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="h-8" />
                        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
                            Quotation Maker
                        </h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('quote')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${viewMode === 'quote' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Receipt size={18} /> <span className="hidden sm:inline">Generator</span>
                        </button>
                        <button
                            onClick={() => setViewMode('brochure')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${viewMode === 'brochure' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <LayoutTemplate size={18} /> <span className="hidden sm:inline">Rate Card</span>
                        </button>
                        <div className="w-px bg-white/10 mx-2"></div>
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95"
                        >
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-4 md:p-8">
                {viewMode === 'quote' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Input Panel (Left) - Hidden on Print */}
                        <div className="lg:col-span-4 print:hidden space-y-6">
                            <QuoteForm formData={formData} setFormData={setFormData} onDownload={handleDownloadPDF} />
                        </div>

                        {/* Preview Panel (Right) - Full Width on Print */}
                        <div className="lg:col-span-8 overflow-x-auto print:fixed print:inset-0 print:z-[100] print:bg-white print:overflow-visible">
                            <div className="min-w-[210mm] transform scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top-left lg:origin-top print:transform-none">
                                <Invoice
                                    data={formData}
                                    calculation={calculation}
                                    componentRef={componentRef}
                                />
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex justify-center print:fixed print:inset-0 print:z-[100] print:bg-white print:overflow-visible">
                        <div className="min-w-[210mm] transform scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top print:transform-none">
                            <Brochure />
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default App
