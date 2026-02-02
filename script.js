document.addEventListener('DOMContentLoaded', () => {
    // Inputs
    const siteTypeSelect = document.getElementById('siteType');
    const pageCountSelect = document.getElementById('pageCount');
    const techStackSelect = document.getElementById('techStack');
    const hostingSelect = document.getElementById('hostingType');
    const form = document.getElementById('quoteForm');

    // Output Areas
    const invoiceTemplate = document.getElementById('invoiceTemplate');
    const actionButtons = document.getElementById('actionButtons');

    // === 1. Dynamic Logic (Form Helpers) ===
    siteTypeSelect.addEventListener('change', (e) => {
        const type = e.target.value;
        if (type === 'static_simple') {
            pageCountSelect.value = '1';
            techStackSelect.value = 'html';
        } else if (type === 'dynamic' || type === 'ecommerce') {
            techStackSelect.value = 'react';
            hostingSelect.value = 'paid';
        }
    });

    // === 2. Generate Logic ===
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        generateInvoiceHTML();
    });

    function generateInvoiceHTML() {
        // A. GET DATA
        const clientName = document.getElementById('clientName').value;
        const siteType = siteTypeSelect.value;
        const typeLabels = siteTypeSelect.options[siteTypeSelect.selectedIndex].text.split(' - ')[0]; // Get label without price
        const pagesRef = pageCountSelect.value;
        const design = document.getElementById('designStyle').value;
        const content = document.getElementById('contentSource').value;
        const tech = techStackSelect.options[techStackSelect.selectedIndex].text;

        // B. CALC PRICING
        let rows = [];
        let grandTotal = 0;

        // B1. Base Price
        let basePrice = 0;
        if (siteType === 'static_simple') basePrice = 3000;
        else if (siteType === 'static_multi') basePrice = 6000;
        else if (siteType === 'dynamic') basePrice = 12000;
        else if (siteType === 'product') basePrice = 15000;
        else if (siteType === 'ecommerce') basePrice = 25000;

        rows.push({
            sl: 1,
            desc: `Website Development - ${typeLabels}`,
            note: `${tech}`,
            qty: 1,
            rate: basePrice,
            amt: basePrice
        });
        grandTotal += basePrice;

        // B2. Extras
        let sl = 2;

        // Pages
        if (pagesRef === '10' && siteType.includes('static')) {
            rows.push({ sl: sl++, desc: 'Additional Pages (Up to 10)', note: 'Content Integration', qty: 1, rate: 4000, amt: 4000 });
            grandTotal += 4000;
        }
        else if (pagesRef === 'custom') {
            rows.push({ sl: sl++, desc: 'Custom Page Scope', note: 'Dynamic Views', qty: 1, rate: 5000, amt: 5000 });
            grandTotal += 5000;
        }

        // Design
        if (design === 'custom') {
            let fee = Math.floor(basePrice * 0.30);
            rows.push({ sl: sl++, desc: 'Premium Custom Design', note: 'UI/UX Polish', qty: 1, rate: fee, amt: fee });
            grandTotal += fee;
        }

        // Content
        if (content === 'we_write') {
            rows.push({ sl: sl++, desc: 'Content Writing Services', note: 'Professional Copy', qty: 1, rate: 3000, amt: 3000 });
            grandTotal += 3000;
        }

        // Hosting
        if (document.getElementById('domainStatus').value === 'new') {
            rows.push({ sl: sl++, desc: 'Domain Registration (.com/.in)', note: '1 Year Validity', qty: 1, rate: 900, amt: 900 });
            grandTotal += 900;
        }
        if (document.getElementById('hostingType').value === 'paid') {
            rows.push({ sl: sl++, desc: 'Premium Cloud Hosting', note: 'Fast Server', qty: 1, rate: 3000, amt: 3000 });
            grandTotal += 3000;
        }

        // Features
        if (document.getElementById('featSearch').checked) {
            rows.push({ sl: sl++, desc: 'Advanced Search Feature', note: 'Filter/Sort', qty: 1, rate: 1000, amt: 1000 });
            grandTotal += 1000;
        }
        if (document.getElementById('featBlog').checked) {
            rows.push({ sl: sl++, desc: 'Blog Section & CMS', note: 'Article Mgmt', qty: 1, rate: 2000, amt: 2000 });
            grandTotal += 2000;
        }

        // Urgency
        if (document.getElementById('urgency').value === 'urgent') {
            let rushFee = Math.floor(grandTotal * 0.20);
            rows.push({ sl: sl++, desc: 'Priority Delivery Fee', note: 'Fast Track', qty: 1, rate: rushFee, amt: rushFee });
            grandTotal += rushFee;
        }

        // C. UPDATE UI
        // Update Header Info
        document.getElementById('invClientName').textContent = clientName;
        document.getElementById('invClientType').textContent = typeLabels;
        document.getElementById('invDate').textContent = new Date().toLocaleDateString('en-IN');
        document.getElementById('invValid').textContent = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');

        let quoteNum = Math.floor(Math.random() * 100) + 100;
        document.getElementById('invQuoteNo').textContent = `MJ/2026/${quoteNum}`;

        // Update Table
        const tbody = document.getElementById('invTableBody');
        tbody.innerHTML = ''; // Clear prev

        rows.forEach(row => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="text-align: center;">${row.sl}</td>
                <td><strong>${row.desc}</strong></td>
                <td><small>${row.note}</small></td>
                <td style="text-align: right;">${row.rate.toLocaleString('en-IN')}</td>
                <td style="text-align: right;"><strong>${row.amt.toLocaleString('en-IN')}</strong></td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById('invGrandTotal').textContent = grandTotal.toLocaleString('en-IN');

        // Show Invoice & Scroll to it
        invoiceTemplate.classList.remove('hidden');
        actionButtons.classList.remove('hidden');

        // Hide preview text, the Invoice *is* the preview now
        document.querySelector('.preview-box p').classList.add('hidden');

        // Scroll to the visual invoice
        invoiceTemplate.scrollIntoView({ behavior: 'smooth' });
    }
});
