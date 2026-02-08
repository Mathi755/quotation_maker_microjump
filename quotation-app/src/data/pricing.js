export const PRICING = {
    // 1. Prebuilt Plans (Shortcuts for clients)
    plans: {
        startup: {
            label: "Startup Launchpad",
            price: 15000,
            desc: "Everything you need to get off the ground quickly.",
            config: {
                scope: 'landing',
                design: 'standard',
                cms: 'none',
                auth: 'no',
                payment: 'no',
                content: 'basic',
                seo: 'basic',
                extras: ['contact_form', 'social_links']
            }
        },
        business: {
            label: "Growth Business",
            price: 35000,
            desc: "Professional multi-page site with CMS and SEO.",
            config: {
                scope: 'business',
                design: 'premium',
                cms: 'sanity',
                auth: 'no',
                payment: 'no',
                content: 'client',
                seo: 'advanced',
                extras: ['contact_form', 'analytics', 'fast_load']
            }
        },
        enterprise: {
            label: "E-Commerce / Enterprise",
            price: 85000,
            desc: "Full-scale solution with payments, users, and high performance.",
            config: {
                scope: 'ecommerce_pro',
                design: 'elite',
                cms: 'sanity',
                auth: 'yes',
                payment: 'standard',
                content: 'pro',
                seo: 'advanced',
                extras: ['dark_mode', 'analytics', 'fast_load', 'chatbot']
            }
        }
    },

    // 2. Project Scope (The Base)
    scope: {
        landing: { label: "High-Converting Landing Page", price: 10000, desc: "Single page funnel designed to convert visitors into leads." },
        business: { label: "Corporate Website (5-8 Pages)", price: 25000, desc: "Complete digital presence for established businesses." },
        ecommerce_starter: { label: "E-Commerce Lite (10 Products)", price: 45000, desc: "Start selling online with a secure checkout system." },
        ecommerce_pro: { label: "Advanced E-Commerce Platform", price: 65000, desc: "Scalable store with unlimited products, inventory & advanced features." },
        webapp: { label: "Custom Functionality / Web App", price: 80000, desc: "Complex logic, dashboards, or SaaS product MVP." }
    },

    // 3. Design Tier
    design: {
        standard: { label: "Clean & Professional", price: 0, desc: "Modern layout using best-practice UI patterns." },
        premium: { label: "Brand-Centric Custom Design", price: 8000, desc: "Unique aesthetics tailored exactly to your brand guidelines." },
        elite: { label: "Elite Motion & Interaction", price: 15000, desc: "Award-winning style with micro-interactions and 3D elements." }
    },

    // 4. Tech & Functionality
    cms: {
        none: { label: "Static Code (Performance Focused)", price: 0, desc: "Ultra-fast, secure, but requires dev to update text." },
        sanity: { label: "Headless CMS Dashboard", price: 12000, desc: "Modern dashboard to manage content without touching code." }
    },
    auth: {
        no: { label: "Public Access Only", price: 0 },
        yes: { label: "User Accounts & Profiles", price: 15000, desc: "Secure login via Google/Email, database storage, and profiles." }
    },
    payment: {
        no: { label: "Inquiry Only", price: 0 },
        standard: { label: "Payment Gateway Integration", price: 8000, desc: "Accept UPI, Cards, and Netbanking securely." }
    },

    // 5. Assets & SEO
    content: {
        client: { label: "Client Provides Content", price: 0, desc: "You supply all final text and images." },
        basic: { label: "Content Polish", price: 5000, desc: "We structure and refine your provided draft." },
        pro: { label: "Strategic Copywriting", price: 12000, desc: "Sales-focused copy written from scratch for your niche." }
    },
    seo: {
        basic: { label: "On-Page SEO Setup", price: 0, desc: "Meta tags, sitemap, and basic indexing." },
        advanced: { label: "Technical SEO Suite", price: 8000, desc: "Schema markup, speed usage, and advanced performance tuning." }
    },

    // 6. Granular Extras (New)
    extras: {
        contact_form: { label: "Advanced Contact Form", price: 2500, desc: "With file uploads and email auto-responders." },
        dark_mode: { label: "Dark/Light Mode Toggle", price: 4000, desc: "Allow users to switch themes preference." },
        fast_load: { label: "Speed Optimization Pack", price: 5000, desc: "Image compression, CDN setup, and lazy loading (Score 90+)." },
        analytics: { label: "Analytics Dashboard", price: 3500, desc: "Google Analytics 4 setup with custom event tracking." },
        social_links: { label: "Social Media Integration", price: 1500, desc: "Live feeds or advanced sharing previews." },
        chatbot: { label: "WhatsApp Chatbot Integration", price: 6000, desc: "Automated greeting and lead capture on WhatsApp." },
        multi_lang: { label: "Multi-Language Support", price: 10000, desc: "Infrastructure to support 2+ languages." }
    },

    // 7. Hosting & Domain
    hosting: {
        none: { label: "Client Manages Hosting", price: 0 },
        free: { label: "Cloud Deployment (Vercel/Netlify)", price: 2000, desc: "Setup fee only. Free tier usage." },
        vps: { label: "Dedicated Cloud Server (1 Yr)", price: 8000, desc: "High performance VPS for scaling applications." }
    },
    logo: {
        have: { label: "I have a Logo", price: 0 },
        need: { label: "Premium Logo Design", price: 5000, desc: "3 Concepts + Source Files." }
    },

    // 9. Growth & Trust Pack (Free Inclusions)
    inclusions: [
        { label: "Click-to-Whatsapp", desc: "Let visitors chat with you instantly (High Conversion)." },
        { label: "Lead Capture Form", desc: "Get customer inquiries sent directly to your email." },
        { label: "Social Media Linking", desc: "Connect visitors to your Instagram & LinkedIn profiles." },
        { label: "Google Map Location", desc: "Help local customers find your office easily." },
        { label: "SSL Security Certificate", desc: "Green Lock icon to build trust & safety for users." }
    ],

    // 10. Maintenance Plans
    amc: {
        monthly: { label: "Monthly Support", discount: 0, months: 1 },
        yearly: { label: "Yearly Care (Save 20%)", discount: 0.20, months: 12 }
    }
};
