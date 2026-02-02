import React, { useState } from 'react';
import { PRICING } from '../data/pricing';
import { Layout, Palette, Database, PenTool, Server, ChevronDown, ChevronRight, User } from 'lucide-react';

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

export const QuoteForm = ({ formData, setFormData }) => {
    const [openSection, setOpenSection] = useState('scope');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggle = (sec) => setOpenSection(openSection === sec ? null : sec);

    return (
        <div className="space-y-4">

            {/* Client Info (Always Visible) */}
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
            <Section title="Project Scope" icon={Layout} isOpen={openSection === 'scope'} onToggle={() => toggle('scope')}>
                <div>
                    <label className="label">What type of website?</label>
                    <select name="scope" value={formData.scope} onChange={handleChange} className="input-field">
                        {Object.entries(PRICING.scope).map(([k, v]) => (
                            <option key={k} value={k}>{v.label} (₹{v.price.toLocaleString()})</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">{PRICING.scope[formData.scope].desc}</p>
                </div>
            </Section>

            {/* 2. Design */}
            <Section title="Design & Aesthetics" icon={Palette} isOpen={openSection === 'design'} onToggle={() => toggle('design')}>
                <div>
                    <label className="label">Visual Complexity</label>
                    <select name="design" value={formData.design} onChange={handleChange} className="input-field">
                        {Object.entries(PRICING.design).map(([k, v]) => (
                            <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                        ))}
                    </select>
                </div>
            </Section>

            {/* 3. Tech */}
            <Section title="Functionality & Tech" icon={Database} isOpen={openSection === 'tech'} onToggle={() => toggle('tech')}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="label">Content Management (CMS)</label>
                        <select name="cms" value={formData.cms} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.cms).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">User Login?</label>
                        <select name="auth" value={formData.auth} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.auth).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">Payment Gateway</label>
                        <select name="payment" value={formData.payment} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.payment).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Section>

            {/* 4. Assets */}
            <Section title="Content & Branding" icon={PenTool} isOpen={openSection === 'assets'} onToggle={() => toggle('assets')}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="label">Content Writing</label>
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
                        <label className="label">SEO Package</label>
                        <select name="seo" value={formData.seo} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.seo).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Section>

            {/* 5. Infra */}
            <Section title="Server & hosting" icon={Server} isOpen={openSection === 'infra'} onToggle={() => toggle('infra')}>
                <div>
                    <label className="label">Hosting Preference</label>
                    <select name="hosting" value={formData.hosting} onChange={handleChange} className="input-field">
                        {Object.entries(PRICING.hosting).map(([k, v]) => (
                            // Skip domain key here, it's separate
                            k !== 'domain' && <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                        ))}
                    </select>
                </div>
                <div className="pt-2">
                    <label className="flex items-center gap-3 p-3 bg-white/5 rounded cursor-pointer">
                        <input type="checkbox" name="domainNew" checked={formData.domainNew} onChange={handleChange} className="accent-primary w-5 h-5" />
                        <div>
                            <div className="font-medium">New Domain Registration</div>
                            <div className="text-xs text-gray-500">.com / .in (+₹1,000)</div>
                        </div>
                    </label>
                </div>
            </Section>

        </div>
    );
};
