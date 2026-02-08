import { useMemo } from 'react';
import { PRICING } from '../data/pricing';

export function useQuoteCalculator(formData) {
    return useMemo(() => {
        let phases = {
            design: { title: "Design & UI/UX", items: [], total: 0 },
            dev: { title: "Development & Functionality", items: [], total: 0 },
            assets: { title: "Content & Integrity", items: [], total: 0 },
            infra: { title: "Infrastructure & Deployment", items: [], total: 0 }
        };

        let grandTotal = 0;
        let sl = 1;

        const addItem = (phaseKey, label, desc, price) => {
            // If price is 0, we can skip OR show as "Included" (better for psych).
            // Let's show "Included" for 0 price items if they are selecting a specific option (like Basic SEO).
            // But skip "None" options.
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
        const scopeObj = PRICING.scope[formData.scope];
        addItem('design', `Web Structure: ${scopeObj.label}`, scopeObj.desc, scopeObj.price);

        const designObj = PRICING.design[formData.design];
        if (formData.design !== 'standard') {
            addItem('design', designObj.label, designObj.desc, designObj.price);
        }

        // --- Phase 2: Dev ---
        const cmsObj = PRICING.cms[formData.cms];
        if (formData.cms !== 'none') addItem('dev', cmsObj.label, "Content Management", cmsObj.price);

        const authObj = PRICING.auth[formData.auth];
        if (formData.auth !== 'no') addItem('dev', authObj.label, authObj.desc, authObj.price);

        const payObj = PRICING.payment[formData.payment];
        if (formData.payment !== 'no') addItem('dev', payObj.label, payObj.desc, payObj.price);

        // --- Phase 3: Assets ---
        const contentObj = PRICING.content[formData.content];
        if (formData.content !== 'client') addItem('assets', contentObj.label, contentObj.desc, contentObj.price);

        const logoObj = PRICING.logo[formData.logo];
        if (formData.logo !== 'have') addItem('assets', logoObj.label, logoObj.desc, logoObj.price);

        const seoObj = PRICING.seo[formData.seo];
        if (formData.seo !== 'basic') addItem('assets', seoObj.label, seoObj.desc, seoObj.price);

        // --- Phase 4: Infra ---
        if (formData.hosting !== 'none') {
            const hostingObj = PRICING.hosting[formData.hosting];
            addItem('infra', `Hosting: ${hostingObj.label}`, hostingObj.desc, hostingObj.price);
        }

        if (formData.domainNew) addItem('infra', PRICING.hosting.domain.label, "Annual Fee", PRICING.hosting.domain.price);

        // --- Phase 5: Maintenance (AMC) ---
        // Calculate Base Project Value first (Design + Dev + Assets + Infra)
        const baseProjectValue = grandTotal;
        const monthlyAMC = Math.round(baseProjectValue * 0.03);

        if (formData.amc && formData.amc !== 'monthly') {
            const amcObj = PRICING.amc[formData.amc];
            // Discount applies to the bulk period
            const standardCost = monthlyAMC * amcObj.months;
            const discountedCost = Math.round(standardCost * (1 - amcObj.discount));

            addItem('infra', `Prepaid AMC: ${amcObj.label}`,
                `Value: ₹${monthlyAMC}/mo × ${amcObj.months}m = ₹${standardCost}. Saved ₹${standardCost - discountedCost}`,
                discountedCost
            );
        }

        return { phases, grandTotal, baseProjectValue, monthlyAMC };
    }, [formData]);
}

