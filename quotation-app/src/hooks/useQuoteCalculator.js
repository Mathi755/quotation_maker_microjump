import { useMemo } from 'react';
import { PRICING } from '../data/pricing';

export function useQuoteCalculator(formData) {
    return useMemo(() => {
        let phases = {
            design: { title: "Design & UX", items: [], total: 0 },
            dev: { title: "Development & Core", items: [], total: 0 },
            features: { title: "Features & Add-ons", items: [], total: 0 }, // New Phase
            assets: { title: "Content & Assets", items: [], total: 0 },
            infra: { title: "Infrastructure", items: [], total: 0 }
        };

        let grandTotal = 0;
        let sl = 1;

        const addItem = (phaseKey, label, desc, price) => {
            if (price === 0 && label.includes("No ")) return;

            phases[phaseKey].items.push({
                sl: sl++,
                desc: label,
                note: desc || "",
                rate: price,
                amount: price
            });
            phases[phaseKey].total += price;
            grandTotal += price;
        };

        // --- Phase 1: Design ---
        // Handle both website and mobile app scopes
        const projectType = formData.projectType || 'website';

        if (projectType === 'mobile_app') {
            const mobileScope = formData.mobileScope || 'basic';
            const mobileScopeObj = PRICING.mobileScope[mobileScope];
            addItem('design', `Mobile App: ${mobileScopeObj.label}`, mobileScopeObj.desc, mobileScopeObj.price);

            // Add platform selection
            const mobilePlatform = formData.mobilePlatform || 'android';
            const platformObj = PRICING.mobilePlatform[mobilePlatform];
            if (mobilePlatform !== 'android') {
                addItem('design', platformObj.label, platformObj.desc, platformObj.price);
            }
        } else {
            const scopeObj = PRICING.scope[formData.scope];
            addItem('design', `Base Build: ${scopeObj.label}`, scopeObj.desc, scopeObj.price);
        }

        const designObj = PRICING.design[formData.design];
        if (formData.design !== 'standard') {
            addItem('design', designObj.label, designObj.desc, designObj.price);
        }

        // --- Phase 2: Dev ---
        const cmsObj = PRICING.cms[formData.cms];
        if (projectType === 'website' && formData.cms !== 'none') {
            addItem('dev', cmsObj.label, "CMS Integration", cmsObj.price);
        }

        const authObj = PRICING.auth[formData.auth];
        if (formData.auth !== 'no') addItem('dev', authObj.label, authObj.desc, authObj.price);

        const payObj = PRICING.payment[formData.payment];
        if (formData.payment !== 'no') addItem('dev', payObj.label, payObj.desc, payObj.price);

        // --- Phase 3: Features (Extras) ---
        if (projectType === 'mobile_app') {
            // Mobile app extras
            if (formData.mobileExtras && Array.isArray(formData.mobileExtras)) {
                formData.mobileExtras.forEach(extraKey => {
                    const extraObj = PRICING.mobileExtras[extraKey];
                    if (extraObj) {
                        addItem('features', extraObj.label, extraObj.desc, extraObj.price);
                    }
                });
            }
        } else {
            // Website extras
            if (formData.extras && Array.isArray(formData.extras)) {
                formData.extras.forEach(extraKey => {
                    const extraObj = PRICING.extras[extraKey];
                    if (extraObj) {
                        addItem('features', extraObj.label, extraObj.desc, extraObj.price);
                    }
                });
            }
        }

        // --- Phase 4: Assets ---
        const contentObj = PRICING.content[formData.content];
        if (formData.content !== 'client') addItem('assets', contentObj.label, contentObj.desc, contentObj.price);

        const logoObj = PRICING.logo[formData.logo];
        if (formData.logo !== 'have') addItem('assets', logoObj.label, logoObj.desc, logoObj.price);

        const seoObj = PRICING.seo[formData.seo];
        if (projectType === 'website' && formData.seo !== 'basic') {
            addItem('assets', seoObj.label, seoObj.desc, seoObj.price);
        }

        // --- Phase 5: Infra ---
        if (projectType === 'website' && formData.hosting !== 'none') {
            const hostingObj = PRICING.hosting[formData.hosting];
            addItem('infra', `Hosting: ${hostingObj.label}`, hostingObj.desc, hostingObj.price);
        }

        if (projectType === 'website' && formData.domainNew) {
            addItem('infra', "Domain Registration", "1 Year Registration (.com/.in)", 1600);
        }

        // --- Mobile App Store Publishing ---
        if (projectType === 'mobile_app' && formData.appStorePublishing && formData.appStorePublishing !== 'none') {
            const publishingObj = PRICING.appStorePublishing[formData.appStorePublishing];
            addItem('infra', publishingObj.label, publishingObj.desc, publishingObj.price);
        }


        // --- Annual Maintenance ---
        const baseProjectValue = grandTotal; // Use current total before maintenance
        // Use custom AMC price if provided, otherwise auto-calculate 5%
        const monthlyAMC = formData.customAmcPrice && Number(formData.customAmcPrice) > 0
            ? Number(formData.customAmcPrice)
            : Math.round(baseProjectValue * 0.05);

        // Calculate total maintenance costs for selected years (mobile apps only)
        const maintenanceYears = Number(formData.maintenanceYears) || 1;
        const maintenanceMonths = maintenanceYears * 12;
        let totalMaintenanceCost = 0;

        if (formData.projectType === 'mobile_app') {
            const amcTotal = monthlyAMC * maintenanceMonths;
            const backendTotal = 2000 * maintenanceMonths;
            const llmTotal = 3000 * maintenanceMonths;
            totalMaintenanceCost = amcTotal + backendTotal + llmTotal;

            addItem('infra', `${maintenanceYears} Year${maintenanceYears !== 1 ? 's' : ''} Maintenance Package`,
                `AMC (₹${amcTotal.toLocaleString()}) + Backend (₹${backendTotal.toLocaleString()}) + LLM (₹${llmTotal.toLocaleString()}) for ${maintenanceMonths} months`,
                totalMaintenanceCost);
        }

        // --- Discount Logic (applies to overall total including maintenance) ---
        const subTotal = grandTotal; // Subtotal includes everything
        let discountAmount = 0;
        const discountValue = Number(formData.discount) || 0;

        // Calculate based on type
        if (formData.discountType === 'percent') {
            // Cap percentage at 100%
            const percent = Math.min(discountValue, 100);
            discountAmount = Math.round((subTotal * percent) / 100);
        } else {
            discountAmount = discountValue;
        }

        grandTotal = subTotal - discountAmount;

        let amcCost = 0;
        if (formData.amc && formData.amc !== 'monthly') {
            const amcObj = PRICING.amc[formData.amc];
            const standardCost = monthlyAMC * amcObj.months;
            const discountedCost = Math.round(standardCost * (1 - amcObj.discount));

            // Only add to total if it's a prepaid plan being charged now
            // Usually AMC is separate, but if "Prepaid" is selected, we might want to show it.
            // For now, we will list it but maybe not add to the "Development Total" unless requested.
            // Let's keep it as an information mostly, or add as a separate line item if they select it.
            // The user wants "Bulk Offer", so let's add it.

            addItem('infra', `Prepaid AMC (${amcObj.label})`, `Includes ${amcObj.months} months support (Saved ${(amcObj.discount * 100)}%)`, discountedCost);
        }

        return { phases, grandTotal, baseProjectValue, monthlyAMC, subTotal, discountAmount, maintenanceYears, totalMaintenanceCost };
    }, [formData]);
}
