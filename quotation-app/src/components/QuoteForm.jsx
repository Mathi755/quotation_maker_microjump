import React, { useState } from 'react';
import { PRICING } from '../data/pricing';
import { Layout, Palette, Database, PenTool, Server, ChevronDown, ChevronRight, User, Package, Zap, TrendingUp, Download } from 'lucide-react';

const Section = ({ title, icon: Icon, children, isOpen, onToggle }) => (
    <div className="border border-white/10 rounded-lg overflow-hidden transition-all bg-card/40">
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition"
        >
            <div className="flex items-center gap-3 font-semibold text-gray-200">
                <Icon size={18} className="text-primary" />
                {title}
            </div>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {isOpen && <div className="p-4 space-y-4 border-t border-white/5">{children}</div>}
    </div>
);

export const QuoteForm = ({ formData, setFormData, onDownload }) => {
    const [openSection, setOpenSection] = useState('scope');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleExtraChange = (key) => {
        setFormData(prev => {
            const currentExtras = prev.extras || [];
            if (currentExtras.includes(key)) {
                return { ...prev, extras: currentExtras.filter(k => k !== key) };
            } else {
                return { ...prev, extras: [...currentExtras, key] };
            }
        });
    };

    const applyPlan = (planKey) => {
        const plan = PRICING.plans[planKey];
        if (plan && plan.config) {
            setFormData(prev => ({
                ...prev,
                ...plan.config
            }));
            // Optional: Provide visual feedback?
        }
    };

    const toggle = (sec) => setOpenSection(openSection === sec ? null : sec);

    return (
        <div className="space-y-6">

            {/* Quick Plans */}
            <div className="grid grid-cols-3 gap-2">
                {Object.entries(PRICING.plans).map(([k, v]) => (
                    <button
                        key={k}
                        onClick={() => applyPlan(k)}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all group"
                    >
                        <Package size={20} className="mb-2 text-gray-400 group-hover:text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-300">{v.label.split(" ")[0]}</span>
                        <span className="text-[10px] text-primary mt-1">₹{(v.price / 1000).toFixed(0)}k+</span>
                    </button>
                ))}
            </div>

            {/* Client Info */}
            <div className="bg-card/40 border border-white/10 p-4 rounded-lg flex items-center gap-4">
                <User size={20} className="text-gray-400" />
                <div className="flex-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Client Name</label>
                    <input
                        type="text" name="clientName" value={formData.clientName} onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-lg font-medium text-white focus:ring-0 placeholder-gray-600"
                        placeholder="Enter Client Name..."
                    />
                </div>
            </div>

            {/* 1. Scope */}
            <Section title="Core Scope (Base)" icon={Layout} isOpen={openSection === 'scope'} onToggle={() => toggle('scope')}>
                <div>
                    <label className="label">Project Type</label>
                    <select name="scope" value={formData.scope} onChange={handleChange} className="input-field">
                        {Object.entries(PRICING.scope).map(([k, v]) => (
                            <option key={k} value={k}>{v.label} (Starting ₹{v.price.toLocaleString()})</option>
                        ))}
                    </select>
                    <p className="text-xs text-secondary mt-2">{PRICING.scope[formData.scope].desc}</p>
                </div>
            </Section>

            {/* 2. Design */}
            <Section title="Design & UX" icon={Palette} isOpen={openSection === 'design'} onToggle={() => toggle('design')}>
                <div>
                    <label className="label">Visual Complexity</label>
                    <select name="design" value={formData.design} onChange={handleChange} className="input-field">
                        {Object.entries(PRICING.design).map(([k, v]) => (
                            <option key={k} value={k}>{v.label} ({v.price > 0 ? `+₹${v.price}` : 'Base'})</option>
                        ))}
                    </select>
                </div>
            </Section>

            {/* 3. Tech */}
            <Section title="Functionality" icon={Database} isOpen={openSection === 'tech'} onToggle={() => toggle('tech')}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="label">CMS (Content Mgmt)</label>
                        <select name="cms" value={formData.cms} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.cms).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">User Login</label>
                        <select name="auth" value={formData.auth} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.auth).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">Payments</label>
                        <select name="payment" value={formData.payment} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.payment).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Section>

            {/* 4. Extras (New) */}
            <Section title="Add-ons & Extras" icon={Zap} isOpen={openSection === 'extras'} onToggle={() => toggle('extras')}>
                <div className="grid grid-cols-1 gap-2">
                    {Object.entries(PRICING.extras).map(([k, v]) => (
                        <label key={k} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.extras?.includes(k) ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                            <input
                                type="checkbox"
                                checked={formData.extras?.includes(k) || false}
                                onChange={() => handleExtraChange(k)}
                                className="accent-primary w-4 h-4 mt-1 rounded"
                            />
                            <div>
                                <div className={`text-sm font-medium ${formData.extras?.includes(k) ? 'text-primary' : 'text-gray-300'}`}>{v.label}</div>
                                <div className="text-xs text-gray-500">+{v.price.toLocaleString()}</div>
                            </div>
                        </label>
                    ))}
                </div>
            </Section>

            {/* 5. Assets */}
            <Section title="Content & Branding" icon={PenTool} isOpen={openSection === 'assets'} onToggle={() => toggle('assets')}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="label">Writing Service</label>
                        <select name="content" value={formData.content} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.content).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">Logo Design</label>
                        <select name="logo" value={formData.logo} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.logo).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">SEO Tier</label>
                        <select name="seo" value={formData.seo} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.seo).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Section>

            {/* 6. Infra */}
            <Section title="Server & hosting" icon={Server} isOpen={openSection === 'infra'} onToggle={() => toggle('infra')}>
                <div>
                    <label className="label">Hosting Preference</label>
                    <select name="hosting" value={formData.hosting} onChange={handleChange} className="input-field">
                        {Object.entries(PRICING.hosting).map(([k, v]) => (
                            k !== 'domain' && <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                        ))}
                    </select>
                </div>
                <div className="pt-2">
                    <label className="flex items-center gap-3 p-3 bg-white/5 rounded cursor-pointer">
                        <input type="checkbox" name="domainNew" checked={formData.domainNew} onChange={handleChange} className="accent-primary w-5 h-5" />
                        <div>
                            <div className="font-medium">New Domain Registration</div>
                            <div className="text-xs text-gray-500">.com / .in (+₹1,600)</div>
                        </div>
                    </label>
                </div>
            </Section>

            {/* 7. Maintenance */}
            <Section title="Maintenance Plan" icon={Server} isOpen={openSection === 'amc'} onToggle={() => toggle('amc')}>
                <div>
                    <label className="label">Bulk Support Offer</label>
                    <select name="amc" value={formData.amc || 'monthly'} onChange={handleChange} className="input-field">
                        {Object.entries(PRICING.amc).map(([k, v]) => (
                            <option key={k} value={k}>{v.label}</option>
                        ))}
                    </select>
                </div>
            </Section>

            {/* 8. Discount (New) */}
            <div className="glass-card p-6 space-y-4 border border-white/10 rounded-lg bg-card/40">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                        <TrendingUp size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-white">Discount / Adjustment</h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Discount Amount (₹)</label>
                    <input
                        type="number"
                        min="0"
                        value={formData.discount || ''}
                        onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Enter discount amount..."
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={onDownload}
                    className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Download size={20} /> Download PDF
                </button>
            </div>

        </div>
    );
};
