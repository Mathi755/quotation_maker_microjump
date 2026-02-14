export const PRICING = {
    // 0. Project Type (Website vs Mobile App)
    projectType: {
        website: { label: "Website Development", icon: "🌐" },
        mobile_app: { label: "Mobile App Development", icon: "📱" }
    },

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
        },
        // Mobile App Plans
        mobile_starter: {
            label: "Mobile Starter",
            price: 55000,
            desc: "Simple Android app to get started quickly.",
            config: {
                projectType: 'mobile_app',
                mobileScope: 'basic',
                mobilePlatform: 'android',
                design: 'standard',
                auth: 'no',
                payment: 'no',
                content: 'basic',
                mobileExtras: ['splash_screen']
            }
        },
        mobile_business: {
            label: "Mobile Business",
            price: 95000,
            desc: "Cross-platform app with backend integration.",
            config: {
                projectType: 'mobile_app',
                mobileScope: 'business',
                mobilePlatform: 'cross_platform',
                design: 'premium',
                auth: 'yes',
                payment: 'no',
                content: 'client',
                mobileExtras: ['push_notifications', 'splash_screen', 'analytics']
            }
        },
        mobile_ecommerce: {
            label: "Mobile E-Commerce",
            price: 135000,
            desc: "Shopping app with payments and user accounts.",
            config: {
                projectType: 'mobile_app',
                mobileScope: 'ecommerce',
                mobilePlatform: 'cross_platform',
                design: 'premium',
                auth: 'yes',
                payment: 'standard',
                content: 'pro',
                mobileExtras: ['push_notifications', 'offline_mode', 'analytics', 'in_app_purchase']
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

    // 2b. Mobile App Scope
    mobileScope: {
        basic: { label: "Basic Mobile App (5-8 Screens)", price: 15000, desc: "Simple app with essential features and basic navigation." },
        business: { label: "Business Mobile App (10-15 Screens)", price: 30000, desc: "Feature-rich app with backend integration and user management." },
        ecommerce: { label: "E-Commerce Mobile App", price: 50000, desc: "Shopping app with product catalog, cart, and checkout." },
        enterprise: { label: "Enterprise Mobile App", price: 80000, desc: "Complex app with advanced features, real-time sync, and scalability." }
    },

    // 2c. Mobile Platform
    mobilePlatform: {
        android: { label: "Android Only", price: 0, desc: "Native Android app for Google Play Store." },
        ios: { label: "iOS Only", price: 5000, desc: "Native iOS app for Apple App Store (requires Mac for development)." },
        cross_platform: { label: "Cross-Platform (Android + iOS)", price: 3000, desc: "Single codebase for both platforms using React Native/Flutter." }
    },

    // 3. Design Tier
    design: {
        standard: { label: "Clean & Professional", price: 0, desc: "Modern layout using best-practice UI patterns." },
        premium: { label: "Brand-Centric Custom Design", price: 3000, desc: "Unique aesthetics tailored exactly to your brand guidelines." },
        elite: { label: "Elite Motion & Interaction", price: 6000, desc: "Award-winning style with micro-interactions and 3D elements." }
    },

    // 4. Tech & Functionality
    cms: {
        none: { label: "Static Code (Performance Focused)", price: 0, desc: "Ultra-fast, secure, but requires dev to update text." },
        sanity: { label: "Headless CMS Dashboard", price: 12000, desc: "Modern dashboard to manage content without touching code." }
    },
    auth: {
        no: { label: "Public Access Only", price: 0 },
        yes: { label: "User Accounts & Profiles", price: 3000, desc: "Secure login via Google/Email, database storage, and profiles." }
    },
    payment: {
        no: { label: "Inquiry Only", price: 0 },
        standard: { label: "Payment Gateway Integration", price: 3000, desc: "Accept UPI, Cards, and Netbanking securely." }
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

    // 6. Granular Extras (Website)
    extras: {
        contact_form: { label: "Advanced Contact Form", price: 2500, desc: "With file uploads and email auto-responders." },
        dark_mode: { label: "Dark/Light Mode Toggle", price: 4000, desc: "Allow users to switch themes preference." },
        fast_load: { label: "Speed Optimization Pack", price: 5000, desc: "Image compression, CDN setup, and lazy loading (Score 90+)." },
        analytics: { label: "Analytics Dashboard", price: 3500, desc: "Google Analytics 4 setup with custom event tracking." },
        social_links: { label: "Social Media Integration", price: 1500, desc: "Live feeds or advanced sharing previews." },
        chatbot: { label: "WhatsApp Chatbot Integration", price: 6000, desc: "Automated greeting and lead capture on WhatsApp." },
        multi_lang: { label: "Multi-Language Support", price: 10000, desc: "Infrastructure to support 2+ languages." }
    },

    // 6b. Mobile App Extras
    mobileExtras: {
        push_notifications: { label: "Push Notifications", price: 2000, desc: "Send alerts and updates to users' devices." },
        offline_mode: { label: "Offline Mode & Data Sync", price: 3000, desc: "Work without internet and sync when online." },
        gps_maps: { label: "GPS & Maps Integration", price: 2500, desc: "Location tracking and map-based features." },
        camera: { label: "Camera & Photo Upload", price: 1500, desc: "Take photos and upload from device." },
        social_login: { label: "Social Media Login", price: 2000, desc: "Login with Google, Facebook, or Apple ID." },
        in_app_purchase: { label: "In-App Purchases", price: 4000, desc: "Sell digital products or subscriptions within the app." },
        biometric: { label: "Biometric Authentication", price: 2000, desc: "Fingerprint or Face ID login for security." },
        video_streaming: { label: "Video Streaming", price: 5000, desc: "Stream video content within the app." },
        chat_messaging: { label: "Real-Time Chat", price: 6000, desc: "In-app messaging between users." },
        qr_scanner: { label: "QR Code Scanner", price: 1500, desc: "Scan and process QR codes." },
        splash_screen: { label: "Custom Splash Screen", price: 1000, desc: "Branded loading screen on app launch." },
        analytics: { label: "Mobile Analytics", price: 1500, desc: "Track user behavior and app performance." }
    },

    // 6c. App Store Publishing (Mobile Only)
    appStorePublishing: {
        none: { label: "No Store Publishing", price: 0, desc: "App files delivered only, no store submission." },
        playstore: { label: "Google Play Store Publishing", price: 3000, desc: "One-time Google Play developer account fee. Paid to Google." },
        appstore: { label: "Apple App Store Publishing", price: 12000, desc: "Annual Apple Developer Program fee ($99 USD). Paid to Apple yearly." },
        both: { label: "Both Play Store & App Store", price: 15000, desc: "Publishing on both platforms. Fees paid to Google & Apple." }
    },

    // 6d. Recurring Costs (Mobile Only - Optional)
    recurringCosts: {
        backend_basic: { label: "Basic Backend Hosting", monthlyPrice: 500, desc: "Cloud hosting for app backend (Firebase/Supabase free tier + buffer)." },
        backend_standard: { label: "Standard Backend Hosting", monthlyPrice: 2000, desc: "Scalable cloud infrastructure for growing apps." },
        backend_premium: { label: "Premium Backend Hosting", monthlyPrice: 5000, desc: "High-performance dedicated resources for enterprise apps." },
        llm_basic: { label: "Basic LLM API Usage", monthlyPrice: 1000, desc: "AI features with limited API calls (~10K requests/month)." },
        llm_standard: { label: "Standard LLM API Usage", monthlyPrice: 3000, desc: "Moderate AI usage (~50K requests/month)." },
        llm_premium: { label: "Premium LLM API Usage", monthlyPrice: 8000, desc: "Heavy AI usage (~200K requests/month)." }
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
