import React, { useState } from 'react';
import { PRICING } from '../data/pricing';
import { Layout, Palette, Database, PenTool, Server, ChevronDown, ChevronRight, User, Package, Zap, TrendingUp, Download, Globe, Smartphone } from 'lucide-react';

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

    const handleMobileExtraChange = (key) => {
        setFormData(prev => {
            const currentExtras = prev.mobileExtras || [];
            if (currentExtras.includes(key)) {
                return { ...prev, mobileExtras: currentExtras.filter(k => k !== key) };
            } else {
                return { ...prev, mobileExtras: [...currentExtras, key] };
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

    const projectType = formData.projectType || 'website';

    return (
        <div className="space-y-6">

            {/* Project Type Selector */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-4">
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-3">Select Project Type</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setFormData({ ...formData, projectType: 'website' })}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg font-semibold transition-all ${projectType === 'website'
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <Globe size={20} />
                        <span>Website</span>
                    </button>
                    <button
                        onClick={() => setFormData({ ...formData, projectType: 'mobile_app' })}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg font-semibold transition-all ${projectType === 'mobile_app'
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <Smartphone size={20} />
                        <span>Mobile App</span>
                    </button>
                </div>
            </div>

            {/* Quick Plans */}
            <div className="grid grid-cols-3 gap-2">
                {Object.entries(PRICING.plans)
                    .filter(([k, v]) => {
                        // Filter plans based on project type
                        if (projectType === 'mobile_app') {
                            return k.startsWith('mobile_');
                        } else {
                            return !k.startsWith('mobile_');
                        }
                    })
                    .map(([k, v]) => (
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
                {projectType === 'website' ? (
                    <div>
                        <label className="label">Website Type</label>
                        <select name="scope" value={formData.scope} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.scope).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} (Starting ₹{v.price.toLocaleString()})</option>
                            ))}
                        </select>
                        <p className="text-xs text-secondary mt-2">{PRICING.scope[formData.scope].desc}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="label">Mobile App Type</label>
                            <select name="mobileScope" value={formData.mobileScope} onChange={handleChange} className="input-field">
                                {Object.entries(PRICING.mobileScope).map(([k, v]) => (
                                    <option key={k} value={k}>{v.label} (Starting ₹{v.price.toLocaleString()})</option>
                                ))}
                            </select>
                            {formData.mobileScope && PRICING.mobileScope[formData.mobileScope] && (
                                <p className="text-xs text-secondary mt-2">{PRICING.mobileScope[formData.mobileScope].desc}</p>
                            )}
                        </div>
                        <div>
                            <label className="label">Platform</label>
                            <select name="mobilePlatform" value={formData.mobilePlatform} onChange={handleChange} className="input-field">
                                {Object.entries(PRICING.mobilePlatform).map(([k, v]) => (
                                    <option key={k} value={k}>{v.label} (+₹{v.price.toLocaleString()})</option>
                                ))}
                            </select>
                            {formData.mobilePlatform && PRICING.mobilePlatform[formData.mobilePlatform] && (
                                <p className="text-xs text-secondary mt-2">{PRICING.mobilePlatform[formData.mobilePlatform].desc}</p>
                            )}
                        </div>
                    </div>
                )}
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
                    {projectType === 'website' && (
                        <div>
                            <label className="label">CMS (Content Mgmt)</label>
                            <select name="cms" value={formData.cms} onChange={handleChange} className="input-field">
                                {Object.entries(PRICING.cms).map(([k, v]) => (
                                    <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                                ))}
                            </select>
                        </div>
                    )}
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

            {/* 4. Extras */}
            <Section title="Add-ons & Extras" icon={Zap} isOpen={openSection === 'extras'} onToggle={() => toggle('extras')}>
                <div className="grid grid-cols-1 gap-2">
                    {projectType === 'website' ? (
                        Object.entries(PRICING.extras).map(([k, v]) => (
                            <label key={k} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.extras?.includes(k) ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.extras?.includes(k) || false}
                                    onChange={() => handleExtraChange(k)}
                                    className="accent-primary w-4 h-4 mt-1 rounded"
                                />
                                <div>
                                    <div className={`text-sm font-medium ${formData.extras?.includes(k) ? 'text-primary' : 'text-gray-300'}`}>{v.label}</div>
                                    <div className="text-xs text-gray-500">+₹{v.price.toLocaleString()}</div>
                                </div>
                            </label>
                        ))
                    ) : (
                        Object.entries(PRICING.mobileExtras).map(([k, v]) => (
                            <label key={k} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.mobileExtras?.includes(k) ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.mobileExtras?.includes(k) || false}
                                    onChange={() => handleMobileExtraChange(k)}
                                    className="accent-primary w-4 h-4 mt-1 rounded"
                                />
                                <div>
                                    <div className={`text-sm font-medium ${formData.mobileExtras?.includes(k) ? 'text-primary' : 'text-gray-300'}`}>{v.label}</div>
                                    <div className="text-xs text-gray-500">+₹{v.price.toLocaleString()}</div>
                                </div>
                            </label>
                        ))
                    )}
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
                    {projectType === 'website' && (
                        <div>
                            <label className="label">SEO Tier</label>
                            <select name="seo" value={formData.seo} onChange={handleChange} className="input-field">
                                {Object.entries(PRICING.seo).map(([k, v]) => (
                                    <option key={k} value={k}>{v.label} (+₹{v.price})</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </Section>

            {/* 6. Infra (Website Only) */}
            {projectType === 'website' && (
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
            )}

            {/* 6b. App Store Publishing (Mobile Only) */}
            {projectType === 'mobile_app' && (
                <Section title="App Store Publishing" icon={Server} isOpen={openSection === 'publishing'} onToggle={() => toggle('publishing')}>
                    <div>
                        <label className="label">Store Publishing</label>
                        <select name="appStorePublishing" value={formData.appStorePublishing || 'none'} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.appStorePublishing).map(([k, v]) => (
                                <option key={k} value={k}>{v.label} {v.price > 0 ? `(+₹${v.price})` : ''}</option>
                            ))}
                        </select>
                        <p className="text-xs text-secondary mt-2">
                            {PRICING.appStorePublishing[formData.appStorePublishing || 'none'].desc}
                        </p>
                        {formData.appStorePublishing && formData.appStorePublishing !== 'none' && (
                            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <p className="text-xs text-yellow-200">
                                    <strong>Note:</strong> Store fees are paid directly to Google/Apple, not to us.
                                </p>
                            </div>
                        )}
                    </div>
                </Section>
            )}

            {/* 7. Maintenance */}
            <Section title="Maintenance Plan" icon={Server} isOpen={openSection === 'amc'} onToggle={() => toggle('amc')}>
                <div className="space-y-4">
                    <div>
                        <label className="label">Bulk Support Offer</label>
                        <select name="amc" value={formData.amc || 'monthly'} onChange={handleChange} className="input-field">
                            {Object.entries(PRICING.amc).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <label className="label text-sm mb-2">Custom AMC Price (Optional)</label>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-secondary">₹</span>
                            <input
                                type="number"
                                name="customAmcPrice"
                                value={formData.customAmcPrice || ''}
                                onChange={handleChange}
                                placeholder="Auto-calculated (5% of project)"
                                className="input-field flex-1"
                                min="0"
                            />
                            <span className="text-xs text-secondary">/month</span>
                        </div>
                        <p className="text-xs text-secondary mt-2">
                            Leave empty to auto-calculate (5% of project value). Enter a custom amount to override.
                        </p>
                    </div>

                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <label className="label text-sm mb-2">Maintenance Duration</label>
                        <select
                            name="maintenanceYears"
                            value={formData.maintenanceYears || 1}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="1">1 Year</option>
                            <option value="1.5">1.5 Years (18 months)</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                        </select>
                        <p className="text-xs text-secondary mt-2">
                            Select duration to calculate total costs including AMC, Backend Hosting, and LLM charges.
                        </p>
                    </div>
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
                    <label className="block text-sm font-medium text-gray-400 mb-2">Discount Type</label>
                    <div className="flex bg-white/5 p-1 rounded-lg mb-4 border border-white/10">
                        <button
                            onClick={() => setFormData({ ...formData, discountType: 'fixed', discount: 0 })}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.discountType === 'fixed' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Fixed Amount (₹)
                        </button>
                        <button
                            onClick={() => setFormData({ ...formData, discountType: 'percent', discount: 0 })}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.discountType === 'percent' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Percentage (%)
                        </button>
                    </div>

                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        {formData.discountType === 'percent' ? 'Discount Percentage (%)' : 'Discount Amount (₹)'}
                    </label>
                    <input
                        type="number"
                        min="0"
                        max={formData.discountType === 'percent' ? 100 : undefined}
                        value={formData.discount || ''}
                        onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder={formData.discountType === 'percent' ? "e.g., 10" : "Enter discount amount..."}
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
