export const PRICING = {
    // 1. Project Scope (The Core Build)
    scope: {
        landing: { label: "Landing Page (Single Page)", price: 5000, desc: "Best for ads & portfolios. One long scrolling page." },
        business: { label: "Business Website (5-7 Pages)", price: 12000, desc: "Standard company site. Home, About, Services, Contact." },
        ecommerce_starter: { label: "Online Store (Starter)", price: 25000, desc: "Sell up to 10 products. Includes shopping cart & checkout." },
        ecommerce_pro: { label: "Online Store (Pro)", price: 45000, desc: "Unlimited products, filters, and advanced shop features." },
        webapp: { label: "Custom Web Application", price: 60000, desc: "For complex ideas like portals, dashboards, or SaaS." }
    },

    // 2. Design Categories
    design: {
        standard: { label: "Standard Design", price: 0, desc: "We select the best professional template for your content." },
        elite: { label: "Elite Choice", price: 5000, desc: "You pick a specific reference/template, we build exactly that." },
        premium: { label: "Premium Ultimate", price: 10000, desc: "Unlimited revisions until satisfied. 100% Custom + Animations." }
    },

    // 3. Functionality & Tech
    cms: {
        none: { label: "Static (No Editing)", price: 0, desc: "Fastest & cheapest. I will update content for you." },
        sanity: { label: "Easy Content Editing (CMS)", price: 10000, desc: "I'll build a dashboard so you can change text/images yourself." }
    },
    auth: {
        no: { label: "No User Login", price: 0 },
        yes: { label: "Customer Login System", price: 8000, desc: "Includes Google Login, Email/Password Login, and User Profile." }
    },
    payment: {
        no: { label: "No Payments", price: 0 },
        standard: { label: "Online Payment Setup", price: 5000, desc: "Accept UPI, Credit Cards, and GPay directly on your site." }
    },

    // 4. Content & Assets
    content: {
        client: { label: "I have my own content", price: 0, desc: "You provide all text and photos ready to go." },
        basic: { label: "Basic Content Cleanup", price: 3000, desc: "I will fix grammar and format your raw text." },
        pro: { label: "Professional Copywriting", price: 8000, desc: "I will write persuasive content that sells your business." }
    },
    logo: {
        have: { label: "I have a Logo", price: 0 },
        need: { label: "Logo Design Service", price: 2500, desc: "I will design 3 professional logo concepts for you." }
    },
    seo: {
        basic: { label: "Basic Google Setup", price: 0, desc: "Your site will be visible on Google." },
        advanced: { label: "Advanced Ranking Boost", price: 5000, desc: "Technical optimizations to help you rank higher than competitors." }
    },

    // 5. Add-ons
    hosting: {
        free: { label: "Standard Hosting", price: 0, desc: "Good for personal or simple business sites." },
        vps: { label: "High-Speed Cloud Server", price: 5000, desc: "Recommended for high traffic or heavy usage (1 Year)." },
        domain: { label: "Website Domain Name", price: 1000, desc: "Registration for .com or .in (1 Year)." }
    },

    // 6. Growth & Trust Pack (Free Inclusions)
    inclusions: [
        { label: "Click-to-Whatsapp", desc: "Let visitors chat with you instantly (High Conversion)." },
        { label: "Lead Capture Form", desc: "Get customer inquiries sent directly to your email." },
        { label: "Social Media Linking", desc: "Connect visitors to your Instagram & LinkedIn profiles." },
        { label: "Google Map Location", desc: "Help local customers find your office easily." },
        { label: "SSL Security Certificate", desc: "Green Lock icon to build trust & safety for users." }
    ]
};
