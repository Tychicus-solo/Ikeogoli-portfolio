// Individual Figma panels exclude the gallery backgrounds and gutters.
const ichetaPanels = {
  "style-guide.png": [
    { file: "style-guide-1.webp", width: 3840, height: 2400 },
  ],
  "solution-overview.png": [
    { file: "solution-overview-1.webp", width: 3840, height: 2400 },
  ],
  "web-app-design.png": [
    { file: "web-app-design-1.webp", width: 3840, height: 2400 },
    { file: "web-app-design-2.webp", width: 3840, height: 2400 },
  ],
  "business-dashboard.png": [
    { file: "business-dashboard-1.webp", width: 3840, height: 2400 },
  ],
  "product-inventory.png": [
    { file: "product-inventory-1.webp", width: 3840, height: 2400 },
    { file: "product-inventory-2.webp", width: 3840, height: 2400 },
  ],
  "marketplace.png": [
    { file: "marketplace-1.webp", width: 3840, height: 2400 },
    { file: "marketplace-2.webp", width: 620, height: 800, columnSpan: 1 },
    { file: "marketplace-3.webp", width: 620, height: 800, columnSpan: 1 },
  ],
  "explore-services.png": [
    { file: "explore-services-1.webp", width: 3840, height: 2400 },
  ],
  "order-tracking.png": [
    { file: "order-tracking-1.webp", width: 3840, height: 2400 },
  ],
  "explore-vendors.png": [
    { file: "explore-vendors-1.webp", width: 3840, height: 2400 },
    { file: "explore-vendors-2.webp", width: 3840, height: 2400 },
  ],
  "community.png": [
    { file: "community-1.webp", width: 3840, height: 2400 },
    { file: "community-2.webp", width: 620, height: 620, columnSpan: 1 },
    { file: "community-3.webp", width: 620, height: 620, columnSpan: 1 },
  ],
  "wishlists.png": [
    { file: "wishlists-1.webp", width: 3840, height: 2400 },
    { file: "wishlists-2.webp", width: 620, height: 720, columnSpan: 1 },
    { file: "wishlists-3.webp", width: 620, height: 720, columnSpan: 1 },
  ],
  "wallet-system.png": [
    { file: "wallet-system-1.webp", width: 3840, height: 2400 },
    { file: "wallet-system-2.webp", width: 3840, height: 2400 },
  ],
};

const ichetaImage = (file) => {
  const panels = ichetaPanels[file]?.map(({ file: panelFile, ...dimensions }) => ({
    src: `/assets/dark mode images/case-studies/icheta/panels/${panelFile}`,
    ...dimensions,
  }));
  return {
    src: `/assets/dark mode images/case-studies/icheta/${file}`,
    lightSrc: `/assets/dark mode images/case-studies/icheta/${file}`,
    lightPanels: panels,
    darkPanels: panels,
  };
};

const pplImage = (file) => ({
  src: `/assets/dark mode images/case-studies/ppl/${file}`,
  lightSrc: `/assets/dark mode images/case-studies/ppl/${file}`,
});

const fitfamImage = (file) => {
  // Export panels separately so gallery backgrounds aren't baked into the gaps.
  const count = {
    "style-guide.png": 2,
    "approach.png": 1,
    "mobile-app-design.png": 2,
    "home-screen.png": 3,
    "workout-studio.png": 1,
    "community.png": 2,
    "health-journal.png": 1,
  }[file];
  const panels = count ? Array.from({ length: count }, (_, index) => ({
    src: `/assets/dark mode images/case-studies/fitfam/panels/${file.replace(".png", "")}-${index + 1}.webp`,
    width: 3840,
    height: 2400,
  })) : undefined;
  return {
    src: `/assets/dark mode images/case-studies/fitfam/${file}`,
    lightSrc: `/assets/dark mode images/case-studies/fitfam/${file}`,
    lightPanels: panels,
    darkPanels: panels,
  };
};

const pettysaveImage = (file) => ({
  src: `/assets/dark mode images/case-studies/pettysave/${file}`,
  lightSrc: `/assets/dark mode images/case-studies/pettysave/${file}`,
});

const realvestImage = (file) => ({
  src: `/assets/dark mode images/case-studies/realvest/${file}`,
  lightSrc: `/assets/dark mode images/case-studies/realvest/${file}`,
});

const lyvadsPanels = (file, theme) => {
  const count = {
    "style-guide.png": 2,
    "creator-module.png": 3,
    "business-module.png": 3,
    "website-design.png": 3,
    "admin-system.png": 3,
  }[file];
  if (!count) return undefined;

  // Keep the Figma panels separate: the composite exports contain opaque gutters.
  const scale = theme === "dark" && file === "style-guide.png" ? 2 : 1;
  return Array.from({ length: count }, (_, index) => ({
    src: `/assets/${theme} mode images/case-studies/lyvads/panels/${file.replace(".png", "")}-${index + 1}.webp`,
    width: 1280 * scale,
    height: 800 * scale,
  }));
};

const lyvadsImage = (file) => ({
  src: `/assets/dark mode images/case-studies/lyvads/${file}`,
  lightSrc: `/assets/light mode images/case-studies/lyvads/${file}`,
  lightPanels: lyvadsPanels(file, "light"),
  darkPanels: lyvadsPanels(file, "dark"),
});

const oneappPanels = (file, theme) => {
  const count = {
    "system-overview.png": 1,
    "approach.png": 1,
    "web-mobile-platform.png": 2,
    "key-features.png": 2,
    "mobile-app.png": theme === "dark" ? 6 : 4,
    "website-design.png": 4,
    "admin-system.png": 4,
    "app-shots.png": 1,
  }[file];
  if (!count) return undefined;
  // Individual Figma exports have no baked-in gutters or outer shadows.
  return Array.from({ length: count }, (_, index) => {
    const darkSpecific = theme === "dark" && (
      (file === "mobile-app.png" && (index === 2 || index === 3)) ||
      (file === "admin-system.png" && index === 3) ||
      file === "app-shots.png"
    );
    // Matching Figma panels reuse one URL across themes for cache reuse.
    const panelNumber = theme === "dark" && file === "mobile-app.png" && index >= 4
      ? index - 1
      : index + 1;
    const assetTheme = darkSpecific ? "dark" : "light";
    const highResolution = darkSpecific && (
      file === "app-shots.png" || file === "admin-system.png"
    );
    const scale = highResolution ? 3 : darkSpecific ? 1 : 2;
    return {
      src: `/assets/${assetTheme} mode images/case-studies/oneapp/clean/${file.replace(".png", "")}${count > 1 ? `-${panelNumber}` : ""}${highResolution ? "-3x" : ""}.webp`,
      width: 1280 * scale,
      height: (file === "app-shots.png" ? 960 : 800) * scale,
    };
  });
};

const oneappImage = (file) => ({
  src: `/assets/dark mode images/case-studies/oneapp/${file}`,
  // Carousel exports are shared; there is no separate light-mode carousel.
  lightSrc: `/assets/${file.startsWith("hero-carousel/") ? "dark" : "light"} mode images/case-studies/oneapp/${file}`,
  lightPanels: oneappPanels(file, "light"),
  darkPanels: oneappPanels(file, "dark"),
});

export const CASE_STUDIES = {
  emmanuel: {
    title: "Emmanuel’s Portfolio",
    intro: "Emmanuel's refreshed portfolio balanced personality with technical expertise. The results were clear: more interviews and higher salary offers. Authentic presentation transformed his career prospects. I teamed up with Emmanuel to redesign his portfolio—bringing fresh vision to his developer brand. Happy to report the new site is doing exactly what we planned it would!",
    liveSite: null,
    heroImage: "/assets/dark mode images/case-studies/emmanuel/hero.webp",
    heroImages: [{
      src: "/assets/dark mode images/case-studies/emmanuel/hero.webp",
      lightSrc: "/assets/dark mode images/case-studies/emmanuel/hero.webp",
    }],
    meta: [
      { label: "Services", values: ["Web App Design", "Web Design"] },
      { label: "Duration", values: ["6 months"] },
      { label: "Industry", values: ["Real estate", "SaaS"] },
      { label: "Tools", values: ["Figma", "Asana", "Google meet"] },
    ],
    challengeTag: "OVERVIEW",
    challenge: [{
      title: "Strategic Portfolio Architecture",
      body: "When Emmanuel reached out about his portfolio, I saw a challenge I had encountered many times before: strong technical talent hidden behind a generic online presence. After discussing what makes developers stand out, we mapped a clear direction. 'Your work deserves center stage,' I told him, sharing a vision for a sleek dark interface that would turn his projects into compelling visual stories. Together we rebuilt his digital identity, placing his most innovative solutions where recruiters could not miss them. We designed a structure that guides visitors through his journey, with each element adding to a unified story. The result was remarkable. What was once just another portfolio is now a magnet for opportunities he once only imagined.",
    }],
    visuals: [{
      type: "image",
      src: "/assets/dark mode images/case-studies/emmanuel/panel-1.webp",
      alt: "Emmanuel’s portfolio: introduction, projects, experience and contact",
      ...(() => {
        const panels = Array.from({ length: 4 }, (_, index) => ({
          src: `/assets/dark mode images/case-studies/emmanuel/panel-${index + 1}.webp`,
          width: 3840,
          height: 2400,
        }));
        return { lightPanels: panels, darkPanels: panels };
      })(),
    }],
    otherProjects: ["realvest", "lyvads"],
  },
  lyvads: {
    title: "Lyvads",
    intro:
      "Working closely with product owners and a cross-functional team, I crafted refreshing mobile app designs for Lyvads - a platform that bridges businesses and individuals with creators to generate custom video content, from promotional ads to personalized shoutouts.\n\nThe platform empowers creators to monetize their influence while helping clients get authentic, tailored video content.",
    heroImage: {
      src: "/assets/dark mode images/case-studies/lyvads-hero.png",
      lightSrc: "/assets/light mode images/case-studies/lyvads-hero.png",
    },
    heroImages: [
      lyvadsImage("hero-carousel/lyvads-hero-1.png"),
      lyvadsImage("hero-carousel/lyvads-hero-2.png"),
      lyvadsImage("hero-carousel/lyvads-hero-3.png"),
      lyvadsImage("hero-carousel/lyvads-hero-4.png"),
      lyvadsImage("hero-carousel/lyvads-hero-5.png"),
      lyvadsImage("hero-carousel/lyvads-hero-6a.png"),
      lyvadsImage("hero-carousel/lyvads-hero-6b.png"),
    ],
    meta: [
      {
        label: "Services",
        values: ["Mobile App Design", "Website Design"],
      },
      {
        label: "Duration",
        values: ["3 months"],
      },
      {
        label: "Industry",
        values: ["Social media", "Commerce"],
      },
      {
        label: "Tools",
        values: ["Figma", "Lotties", "Zoho"],
      },
    ],
    challenge: [
      {
        title: "Unreliable collaboration process",
        body:
          "Businesses and creators struggled to find a dependable way to connect, negotiate, and establish mutually beneficial partnerships, leading to missed opportunities and inefficient collaborations.",
      },
      {
        title: "Unresolved content disputes",
        body:
          "The lack of a structured dispute resolution system led to frequent conflicts when businesses were dissatisfied with delivered content or creators faced issues with provided materials, causing frustration on both sides.",
      },
      {
        title: "Complex user journey",
        body:
          "Users faced a complicated and overwhelming platform experience that made it difficult to navigate through essential tasks like browsing creators, requesting content, and managing deliverables.",
      },
      {
        title: "Identity verification risks",
        body:
          "Businesses were hesitant to invest in creator collaborations due to the high risk of encountering fake profiles and impersonators, with no reliable way to verify creator authenticity.",
      },
    ],
    visuals: [
      {
        type: "image",
        ...lyvadsImage("style-guide.png"),
        alt: "Lyvads typography, color, and visual identity system",
        width: 2560,
        height: 3280,
      },
    ],
    sections: [
      {
        tag: "THE APPROACH",
        color: "#1DD78D",
        points: [
          {
            title: "Research-informed branding and user experience",
            body:
              "I kicked off with deep research and team brainstorming to shape the user experience, mapping everything out through wireframes. After establishing a consistent design system, I crafted three core platforms: an intuitive mobile app, a responsive website, and an admin dashboard to power it all behind the scenes.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...lyvadsImage("components.png"),
            alt: "Lyvads design system components and UI foundations",
            width: 1280,
            height: 800,
          },
        ],
      },
      {
        tag: "USER-CENTERED EXPERIENCE",
        color: "#8C62FF",
        points: [
          {
            title: "Mobile app design",
            body:
              "I created a dynamic platform that serves two distinct user groups - creators monetizing their influence and audiences seeking personalized video content. Each feature was designed with real user behavior in mind, focusing on creating natural workflows that feel intuitive rather than forced.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...lyvadsImage("mobile-app.png"),
            alt: "Lyvads mobile app screens showing creator discovery and profile flows",
            width: 1280,
            height: 800,
          },
        ],
      },
      {
        tag: "CREATOR MODULE",
        color: "#2CBDF2",
        points: [
          {
            title: "Content showcase",
            body:
              "Think of it as a creator's digital storefront - they can drop up to 5 videos that really show their personality and style. It's like giving potential clients a highlight reel of what they're all about, which has been a game-changer for engagement rates and connection-building.",
          },
          {
            title: "Request management",
            body:
              "Created this super smooth system where creators can handle incoming video requests like a pro. They set their own prices, choose what kinds of content they're down to create (like promos or shoutouts), and basically run their whole video business from one slick dashboard.",
          },
          {
            title: "Performance analytics",
            body:
              "The platform gives creators a bird's-eye view of how they're performing - think engagement metrics, audience growth, and all those juicy analytics. They can also dial in their niche and industry focus, making it easier for the right clients to find them.",
          },
          {
            title: "Command center",
            body:
              "Created an intuitive settings hub where creators can lock down their account security, fine-tune their content preferences, and manage how they interact with clients. It's all about giving them full control over their digital presence.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...lyvadsImage("creator-module.png"),
            alt: "Lyvads creator module screen flows",
            width: 1280,
            height: 2480,
          },
        ],
      },
      {
        tag: "BUSINESS/INDIVIDUAL MODULE",
        color: "#FFB31F",
        points: [
          {
            title: "Smart discovery feed",
            body:
              "Picture a personalized content stream that actually gets smarter as you use it. It surfaces creators based on your interests, interactions, and who you follow - making it super easy to find the perfect creator for your needs.",
          },
          {
            title: "Video request system",
            body:
              "We made requesting custom videos as easy as ordering takeout. Users can browse a creator's offerings, pick exactly what they want (whether it's a birthday shoutout or a product promotion), and get the ball rolling with just a few taps.",
          },
          {
            title: "Collaboration tracking",
            body:
              "Built a transparent system where users can track their request status in real-time. Whether it's pending, in progress, or ready for viewing, you're always in the loop about where things stand.",
          },
          {
            title: "Built-in wallet system",
            body:
              "Integrated a hassle-free payment solution that lets users load up their wallet and handle transactions right in the app. No more bouncing between payment platforms - it's all right there.",
          },
          {
            title: "Smart notification hub",
            body:
              "Developed an intelligent notification system that keeps everyone in sync. Whether it's a new request, a completed video, or important account updates, users stay informed without getting overwhelmed.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...lyvadsImage("business-module.png"),
            alt: "Lyvads business and individual user module screen flows",
            width: 1280,
            height: 2480,
          },
        ],
      },
      {
        tag: "WEBSITE DESIGN",
        color: "#8C62FF",
        points: [
          {
            title: "A highly engaging web experience",
            body:
              "Building on the app's success, I spearheaded the design of a high-converting website that would serve as our platform's digital storefront. The goal was to translate the dynamic mobile experience into an engaging web presence that effectively showcased our platform's unique value proposition: connecting creators with audiences seeking personalized video content.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...lyvadsImage("website-design.png"),
            alt: "Lyvads website design screens",
            width: 1280,
            height: 2480,
          },
        ],
      },
      {
        tag: "ADMIN SYSTEM",
        color: "#2CBDF2",
        points: [
          {
            title: "Managing all platform activities behind the scene",
            body:
              "To round out the platform ecosystem, I designed a comprehensive admin dashboard that served as mission control for operations. The system gave administrators full visibility over platform activities - from monitoring creator-client collaborations and user engagement to managing content moderation and transactions. Built for scale, the dashboard made it seamless for admins to handle user verification, quality control, and performance analytics as the platform grew.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...lyvadsImage("admin-system.png"),
            alt: "Lyvads admin dashboard screens and management flows",
            width: 1280,
            height: 2480,
          },
        ],
      },
    ],
    conclusionTitle: "Lyvads: Bridging Creators and Audiences Through Design",
    conclusion:
      "Building Lyvads was a masterclass in marketplace design that yielded key insights about connecting creators with their audience. The project demonstrated how thoughtful design can transform social influence into business opportunities while maintaining seamless experiences across mobile, web, and admin platforms. By focusing on distinct yet complementary user journeys for both creators and clients, we created a scalable ecosystem that proves successful marketplaces must deliver clear value to all participants.\n\nThe platform's ability to balance user needs - making content requests effortless for clients while empowering creators with robust business tools - showcases how strategic design thinking can bridge market gaps and drive meaningful engagement.",
    otherProjects: ["oneapp", "realvest"],
  },
  oneapp: {
    title: "OneApp",
    intro:
      "One app transforms real estate purchasing through our platform connecting users with affordable properties via flexible payments and co-ownership options.\n\nI led the design team that balanced these user needs with business objectives, creating a solution that increased conversion rates while establishing a distinctive market position in the competitive real estate space.",
    heroImage: {
      src: "/assets/dark mode images/case-studies/oneapp-hero.png",
      lightSrc: "/assets/light mode images/case-studies/oneapp-hero.png",
    },
    heroImages: [
      oneappImage("hero-carousel/oneapp-hero-1.png"),
      oneappImage("hero-carousel/oneapp-hero-2.png"),
      oneappImage("hero-carousel/oneapp-hero-3.png"),
      oneappImage("hero-carousel/oneapp-hero-4.png"),
      oneappImage("hero-carousel/oneapp-hero-5.png"),
      oneappImage("hero-carousel/oneapp-hero-6.png"),
    ],
    heroWidth: 3296,
    heroHeight: 2048,
    challengeColor: "#FD6A6A",
    meta: [
      {
        label: "Services",
        values: ["Mobile App Design", "Web App Design", "Web Design"],
      },
      {
        label: "Duration",
        values: ["6 months"],
      },
      {
        label: "Industry",
        values: ["Real estate", "SaaS"],
      },
      {
        label: "Tools",
        values: ["Figma", "Asana", "Google meet"],
      },
    ],
    challenge: [
      {
        title: "Navigating the Digital Divide",
        body:
          "Designing for users aged 35-60 meant rethinking standard UX approaches. This demographic brought varying levels of tech comfort that required simpler flows, more intuitive navigation, and careful attention to accessibility that younger-focused platforms often overlook.",
      },
      {
        title: "Dual-User Architecture",
        body:
          "Our platform needed to satisfy two very different groups. Realtors wanted powerful tools to manage listings and track clients, while customers needed a straightforward way to find and buy properties.",
      },
      {
        title: "Purchase Pathway Clarity",
        body:
          "We offered multiple ways to invest - from buying outright or in instalments to co-owning properties. The challenge was presenting these options without confusing users about exactly what they were purchasing, especially for co-ownership where the details really matter.",
      },
      {
        title: "Performance-Based Realtor Ecosystem",
        body:
          "We needed a fair system to rank realtors based on their results while tracking their teams and activities. The interface had to motivate top performers while remaining simple enough for less tech-savvy agents to understand their standing and improvement areas.",
      },
    ],
    visuals: [
      {
        type: "image",
        ...oneappImage("system-overview.png"),
        alt: "OneApp user type, realtor dashboard, and customer analytics system overview",
        width: 2560,
        height: 1600,
      },
    ],
    sections: [
      {
        tag: "THE APPROACH",
        color: "#1DD78D",
        points: [
          {
            title: "An accessible real estate ecosystem",
            body:
              "Our mission with OneApp was to bridge the digital divide in real estate transactions, specifically for our 35-60 year-old target market. We aimed to deliver two integrated experiences: a simplified discovery journey for property buyers with transparent ownership options, alongside powerful yet accessible tools for realtors to manage listings and team performance.\n\nSuccess meant making complex real estate decisions intuitive for all users, regardless of technological background.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...oneappImage("approach.png"),
            alt: "OneApp approach visuals showing web and mobile product foundations",
            width: 1280,
            height: 800,
          },
        ],
      },
      {
        tag: "USER-CENTRIC WEB & MOBILE APP",
        color: "#8C62FF",
        points: [
          {
            title: "From concept to a seamless platform",
            body:
              "After an extensive period of workshops and competitor research, we saw what was missing in the market. We created web platform first and then a mobile app that serve both realtors and buyers, turning complex real estate transactions into a simple and accessible process that solves users challenges.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...oneappImage("web-mobile-platform.png"),
            alt: "OneApp web and mobile platform onboarding and dashboard screens",
            width: 1344,
            height: 1668,
          },
        ],
      },
      {
        tag: "KEY FEATURES",
        color: "#2CBDF2",
        points: [
          {
            title: "Personalized Analytics Dashboard",
            body:
              "Both realtors and customers get their own command center with real-time insights. Realtors track sales performance, revenue streams and tier level progress, while customers monitor their property investments and market opportunities. The platform adapts to your role, showing exactly what matters.",
          },
          {
            title: "Comprehensive Property Marketplace",
            body:
              "Browse the complete property ecosystem in one streamlined interface. Whether you're looking for land, homes, or fractional ownership in premium estates, the marketplace presents all options with tailored payment plans that align with your financial timeline.",
          },
          {
            title: "Integrated Financial Hub",
            body:
              "The wallet system eliminates payment friction, allowing seamless in-app transactions. Customers can fund their account for future purchases, while realtors enjoy immediate access to commission earnings with straightforward withdrawal options.",
          },
          {
            title: "Realtor Performance Center",
            body:
              "Track your downlines' performance, manage customer activities, and monitor prospects. The system visualizes your progress toward higher commission tiers, making growth tangible and achievable.",
          },
          {
            title: "Subscription management",
            body:
              "Stay in control of all your property investments through the subscription tracking system. Monitor payment schedules, payment history, upcoming deposits, and payment milestones along the way.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...oneappImage("key-features.png"),
            alt: "OneApp property marketplace and financial hub feature screens",
            width: 1280,
            height: 1640,
          },
        ],
      },
      {
        tag: "MOBILE APP DESIGN",
        color: "#F6517F",
        points: [
          {
            title: "Creating our native mobile solution",
            body:
              "After our web app's success, we saw the need for a mobile solution. We built a native mobile app with simple, intuitive design to make it easy for realtors and buyers to use our platform on the go.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...oneappImage("mobile-app.png"),
            alt: "OneApp native mobile app screen gallery",
            width: 1049,
            height: 4096,
          },
        ],
      },
      {
        tag: "WEBSITE DESIGN",
        color: "#FFB31F",
        points: [
          {
            title: "An immersive digital presence",
            body:
              "After launching our feature-rich web application, I tackled OneApp's digital front door - designing an immersive brand website that would tell our story while driving measurable business results. The result was a significant increases in both click-through rates and final conversions.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...oneappImage("website-design.png"),
            alt: "OneApp marketing website design screens",
            width: 1280,
            height: 3320,
          },
        ],
      },
      {
        tag: "THE ADMIN SYSTEM",
        color: "#375EFB",
        points: [
          {
            title: "Backbone of OneApp operations",
            body:
              "Behind OneApp's seamless user experience lies a powerful admin system that serves as OneApp's control room. This centralized dashboard manages everything - products, locations, payments, and user accounts - with customized access levels for different administrative roles.\n\nThe results speak volumes: operations run without developer intervention, support requests decreased significantly, and the system maintains stability even during peak periods. This behind-the-scenes engine ensures both realtors and customers enjoy a frictionless experience.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...oneappImage("admin-system.png"),
            alt: "OneApp admin system dashboard and operations screens",
            width: 1280,
            height: 3320,
          },
        ],
      },
      {
        tag: "APP SHOTS",
        color: "#2CBDF2",
        points: [
          {
            title: "Telling the OneApp story across devices",
            body:
              "App shots were created for iPhone, iPad, and Android to share the story of Oneapp as the leading real estate solution, inspiring confidence, boosting conversions, and strengthening its market presence.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...oneappImage("app-shots.png"),
            alt: "OneApp promotional app shots across devices",
            width: 1280,
            height: 960,
          },
        ],
      },
    ],
    conclusionColor: "#1DD78D",
    conclusionPoints: [
      {
        title: "Catering to a diverse demographic",
        body:
          "We balanced simplicity with function for our older demographic (35-60). By showing information gradually, we helped less tech-savvy users confidently navigate complex property decisions.",
      },
      {
        title: "Dual-interface architecture success",
        body:
          "Our parallel-experience approach served realtors and customers in one system. This increased realtor retention by 83% while simplifying customer journeys through tailored yet cohesive interfaces.",
      },
      {
        title: "Realtor achievement systems",
        body:
          "Gamifying realtor performance metrics created healthy competition, with top performers generating 4.5x more transactions than average.",
      },
      {
        title: "Simplified Payments",
        body:
          "Our integrated wallet eliminated barriers in the purchase journey with flexible payment plans and instant transfers. This addressed major pain points for our elder demographic, resulting in 37% fewer abandoned transactions.",
      },
      {
        title: "Feedback-driven process",
        body:
          "Success stemmed from genuine collaboration with stakeholders throughout product creation. Features underwent multiple refinement cycles based on direct feedback, creating exceptional buy-in and advocacy from all parties.",
      },
      {
        title: "Real results",
        body:
          "Our validation: 10,000+ users and $120,000 revenue shortly after launch. These metrics confirmed our design created real value for both property buyers and realtors.",
      },
    ],
    otherProjects: ["lyvads", "realvest"],
  },
  icheta: {
    title: "Icheta",
    intro:
      "Picture a world where your social feed isn't just for scrolling - it's your gateway to discovery and shopping. That's Icheta. Think of it as your favorite social platform meets neighborhood marketplace, powered by the communities you care about. Working closely with the founder and key stakeholders, this vision was brought to life as a web application that puts users first, naturally blending social interaction with shopping discovery.",
    heroImage: "/assets/dark mode images/case-studies/icheta/hero.png",
    heroImages: [ichetaImage("hero.png")],
    heroWidth: 3296,
    heroHeight: 2048,
    challengeColor: "#FD6A6A",
    meta: [
      {
        label: "Services",
        values: ["Web App Design"],
      },
      {
        label: "Duration",
        values: ["6 months"],
      },
      {
        label: "Industry",
        values: ["E-commerce", "Social media"],
      },
      {
        label: "Tools",
        values: ["Figma", "Notion", "Google meet"],
      },
    ],
    challenge: [
      {
        title: "Social vs Shopping dilemma",
        body:
          "When people get caught up chatting with friends, they often forget to buy things. Finding the sweet spot between shopping and socializing became a key challenge - too much of either, and the platform loses its unique value.",
      },
      {
        title: "Different players, different goals",
        body:
          "Shoppers want to browse and connect, vendors need to manage their stores, and businesses want to track growth. Each group has distinct needs, yet they all need to work together smoothly on one platform.",
      },
      {
        title: "All-in-one platform",
        body:
          "Combining social networking, shopping, and payments is like building a digital ecosystem. While users love having everything in one spot, there's a real risk of them feeling lost in too many options.",
      },
      {
        title: "Trust & connection balance",
        body:
          "People want to build real connections, but businesses need protection. It's a delicate balance between fostering relationships and ensuring sales happen on the platform, not in private messages.",
      },
      {
        title: "Multi-business complexity",
        body:
          "Each business type needs different tools - restaurants need bookings, craft shops need inventory management. Supporting these varied business models while maintaining simplicity became crucial.",
      },
      {
        title: "Building platform trust",
        body:
          "Users need to trust the businesses they're buying from. Ensuring business legitimacy without creating complex barriers to entry became essential for platform credibility.",
      },
    ],
    visuals: [
      {
        type: "image",
        ...ichetaImage("style-guide.png"),
        alt: "Icheta visual identity and typography style guide",
        width: 2560,
        height: 1600,
      },
    ],
    sections: [
      {
        tag: "THE SOLUTION",
        color: "#1DD78D",
        points: [
          {
            title: "Community-powered shopping experience",
            body:
              "We designed a unified platform where shopping feels as natural as chatting with friends. Think of it as your local marketplace brought to life in the digital world - where you discover great finds through community connections, shop with confidence from verified businesses, and build real relationships along the way.\n\nEach business gets its own set of specialized features while being part of a larger community, creating a space where restaurants, craft shops, event venues and much more can all thrive in their own way. The result is a platform that turns social browsing into seamless shopping, while keeping everything secure and trustworthy.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("solution-overview.png"),
            alt: "Icheta community-powered shopping experience overview",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "WEB APP DESIGN",
        color: "#8C62FF",
        points: [
          {
            title: "Blending social & shopping: The best of both worlds",
            body:
              "After intensive team brainstorming and exploring insights from market leaders like eBay, Facebook Marketplace, and TikTok, etc. I identified the critical intersection between social engagement and e-commerce. By extracting the best from both worlds, I created an intuitive web application that keeps users engaged whether they're connecting with others or making purchases.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("web-app-design.png"),
            alt: "Icheta web app screens blending social and shopping flows",
            width: 2560,
            height: 3280,
          },
        ],
      },
      {
        tag: "BUSINESS DASHBOARD",
        color: "#2CBDF2",
        points: [
          {
            title: "Performance pulse: Your business metrics unified",
            body:
              "I designed a comprehensive business dashboard that gives vendors and merchants full visibility into their performance metrics. In one unified view, business owners can track their revenue streams, monitor incoming orders, manage product inventory, and understand customer behavior patterns.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("business-dashboard.png"),
            alt: "Icheta business dashboard performance metrics screens",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "PRODUCT INVENTORY",
        color: "#FFB31F",
        points: [
          {
            title: "Product management center",
            body:
              "A streamlined system that gives businesses full control over their inventory was created. Vendors can easily track products, update details, and manage availability - with all changes instantly appearing on the customer-facing storefront, ensuring shoppers always see accurate information.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("product-inventory.png"),
            alt: "Icheta product inventory management screens",
            width: 2560,
            height: 3280,
          },
        ],
      },
      {
        tag: "THE MARKETPLACE",
        color: "#F6517F",
        points: [
          {
            title: "Digital marketplace hub",
            body:
              "The vibrant section blends social elements with shopping opportunities. This dynamic marketplace features real-time vendor updates, trending categories, community highlights, and top-rated merchants. The interface creates an engaging welcome that immediately connects users to our unique social-commerce ecosystem, making everyone feel part of something special from their first visit.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("marketplace.png"),
            alt: "Icheta digital marketplace hub screens",
            width: 2560,
            height: 3280,
          },
        ],
      },
      {
        tag: "EXPLORE SERVICES",
        color: "#1DD78D",
        points: [
          {
            title: "Multi-service ecosystem",
            body:
              "The platform extends far beyond traditional e-commerce, offering specialized services that transform it into a complete lifestyle hub. Each service area creates unique experiences tailored to specific user needs, while still maintaining the platform's social-commerce foundation.",
          },
          {
            title: "Event & ticketing",
            body:
              "Beyond just a marketplace, the platform features a robust event booking system where users can grab tickets to concerts, movies, theater shows, and more. This service also connects fans with creators through a follow feature.",
          },
          {
            title: "Restaurants",
            body:
              "The restaurant service puts local dining options at users' fingertips. Each restaurant displays its unique menu, allowing for seamless ordering and delivery tracking.",
          },
          {
            title: "Bulk buy direct",
            body:
              "This service connects users directly with manufacturers for wholesale purchases. Perfect for businesses and event planners, it eliminates middlemen while offering bulk buying options across diverse product categories.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("explore-services.png"),
            alt: "Icheta multi-service ecosystem screens",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "ORDER TRACKING",
        color: "#8C62FF",
        points: [
          {
            title: "Order mission control",
            body:
              "The platform includes a tracking system that shows users exactly where their purchases are at all times. Customers can monitor active orders, view past purchases, and get updates at each delivery stage.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("order-tracking.png"),
            alt: "Icheta order tracking screens",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "EXPLORE VENDORS",
        color: "#2CBDF2",
        points: [
          {
            title: "Vendor Spotlight",
            body:
              "The platform features a discovery system showcasing merchants with their products, ratings, and community connections. Users can explore new vendors, follow their favorites, and build a personalized list of preferred sellers - creating a transparent shopping experience built on trust.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("explore-vendors.png"),
            alt: "Icheta vendor discovery and spotlight screens",
            width: 2560,
            height: 3280,
          },
        ],
      },
      {
        tag: "THE COMMUNITY",
        color: "#FFB31F",
        points: [
          {
            title: "Interactive community square",
            body:
              "This vibrant social space allows vendors and customers to interact naturally. Merchants showcase their products while users engage with their content, fostering relationships that transcend mere transactions and transform shopping into a community-driven experience.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("community.png"),
            alt: "Icheta interactive community screens",
            width: 2560,
            height: 2920,
          },
        ],
      },
      {
        tag: "WISHLISTS",
        color: "#F6517F",
        points: [
          {
            title: "Collaborative wishlist circle",
            body:
              "Save products you love and share your curated lists with friends and family anywhere online. They can purchase gifts directly from your wishlist, or you can return when you're ready to buy. This tool transforms solo browsing into a collaborative shopping experience within your circle.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("wishlists.png"),
            alt: "Icheta collaborative wishlist screens",
            width: 2560,
            height: 3120,
          },
        ],
      },
      {
        tag: "WALLET SYSTEM",
        color: "#375EFB",
        points: [
          {
            title: "Universal digital wallet",
            body:
              "Fund instantly, shop seamlessly. This smart wallet lets customers preload for future purchases while vendors both fund for shopping and withdraw earnings from sales. The sleek, intuitive design makes money management effortless.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...ichetaImage("wallet-system.png"),
            alt: "Icheta universal digital wallet screens",
            width: 2560,
            height: 3280,
          },
        ],
      },
    ],
    conclusionColor: "#1DD78D",
    conclusionPoints: [
      {
        title: "The Connected Marketplace",
        body:
          "Icheta redefined e-commerce by blending shopping with social engagement. Our key findings:",
      },
      {
        title: "Community-driven commerce",
        body:
          "Users want connections, not just transactions. Our social shopping features boosted engagement metrics significantly - session time increased 43% and return visits doubled. Business revenue grew organically as users invited their networks to this new shopping experience.",
      },
      {
        title: "Trust through verification",
        body:
          "Our vendor verification system built marketplace trust through multi-stage authentication and quality control. This created a secure environment that reduced fraud complaints and increased purchase completion rates across all demographics.",
      },
      {
        title: "Frictionless financial flows",
        body:
          "The integrated wallet system removed purchasing barriers. Users could quickly fund accounts and complete transactions while vendors gained immediate access to earnings. This reduced cart abandonment by 37% and accelerated vendor onboarding from days to hours.",
      },
      {
        title: "Entertainment drives retention",
        body:
          "Interactive elements like merchant streams and community discussions kept users engaged beyond initial purchase intent. This entertainment factor increased product discovery by 52% and lifted unplanned purchases by 28%.",
      },
      {
        title: "Community validation boosts conversions",
        body:
          "The effect of shared experiences created powerful purchase influence. When shoppers saw friends interacting with products through comments, wishlist additions, and visible purchases, trust barriers dissolved naturally. This drove product credibility without paid promotion.",
      },
    ],
    otherProjects: ["lyvads", "oneapp"],
  },
  ppl: {
    title: "Pertinence Properties",
    intro:
      "PPL, a leader in Nigeria's real estate landscape, needed to transform their digital presence into a powerful conversion engine.\n\nBy reimagining their website from the ground up, I created an intuitive experience and compelling property storytelling that resonated with investors. The result? A platform that generated over $100k in revenue while boosting user retention by 30%.",
    heroImage: "/assets/dark mode images/case-studies/ppl/hero.png",
    heroImages: [pplImage("hero.png")],
    meta: [
      {
        label: "Services",
        values: ["Website Design"],
      },
      {
        label: "Duration",
        values: ["1 month"],
      },
      {
        label: "Industry",
        values: ["Real estate", "Proptech"],
      },
      {
        label: "Tools",
        values: ["Figma", "Asana"],
      },
    ],
    challenge: [
      {
        title: "Digital experience gap",
        body:
          "The existing website had fallen behind modern design standards, with a dated interface that didn't reflect PPL's market leadership. The platform's aging design was hurting user engagement and making it harder for potential investors to connect with the brand.",
      },
      {
        title: "Poor visual experience",
        body:
          "Property showcases lacked the visual impact needed to drive conversions. The platform wasn't doing justice to PPL's premium properties, with low-quality images and basic presentation that failed to capture the attention of potential investors.",
      },
      {
        title: "Fragmented property discovery",
        body:
          "The diverse range of properties and investment options weren't organized intuitively, making it difficult for users to explore and compare options. The complex portfolio needed a more streamlined approach to help users find exactly what they're looking for.",
      },
      {
        title: "Accessibility barriers",
        body:
          "Critical information was often buried in complex navigation structures, frustrating users trying to make investment decisions. The mobile experience wasn't optimized for modern browsing habits, potentially losing opportunities with on-the-go investors.",
      },
    ],
    visuals: [
      {
        type: "image",
        ...pplImage("style-guide.png"),
        alt: "Pertinence Properties visual identity, typography, and color style guide",
        width: 2560,
        height: 1600,
      },
    ],
    sections: [
      {
        tag: "THE SOLUTION",
        color: "#1DD78D",
        points: [
          {
            title: "Building better: Transforming PPL's digital experience",
            body:
              "Leveraging key research insights and stakeholder input, I reimagined PPL's digital presence to deliver exactly what modern investors need. The new platform combines lightning-fast property discovery with immersive visual storytelling, creating an engaging experience that guides users naturally from browsing to decision-making. Every design element was carefully crafted to strengthen PPL's brand while ensuring users can effortlessly find and explore their ideal investment opportunities.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...pplImage("solution.png"),
            alt: "Pertinence Properties redesigned website experience overview",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "WEBSITE DESIGN",
        color: "#8C62FF",
        points: [
          {
            title: "Property discovery redesigned",
            body:
              "Transforming property discovery through intuitive design, immersive storytelling, and seamless experiences that connect investors with their ideal opportunities.",
          },
          {
            title: "Visual enhancement and storytelling",
            body:
              "Enhanced the platform's visual identity with high-impact property showcases, dynamic galleries, and immersive imagery. Each property listing now tells a compelling story through strategic content placement and premium visuals that resonate with investors.",
          },
          {
            title: "Intuitive navigation system",
            body:
              "Implemented a smart categorization system that makes property discovery effortless. Users can now quickly filter and find specific investment opportunities through streamlined search functionality and clear property categorization, reducing the time from interest to action.",
          },
          {
            title: "Performance-driven architecture",
            body:
              "Built a robust platform that not only looks great but performs exceptionally. Quick load times, smooth transitions, and optimized property showcases create an engaging user experience that maintains visitor interest and drives conversions.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...pplImage("website-gallery-1.png"),
            alt: "Pertinence Properties website landing page design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pplImage("website-gallery-2.png"),
            alt: "Pertinence Properties website property discovery page design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pplImage("website-gallery-3.png"),
            alt: "Pertinence Properties website property listing page design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pplImage("website-gallery-4.png"),
            alt: "Pertinence Properties website realtor experience design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pplImage("website-gallery-5.png"),
            alt: "Pertinence Properties website final content section design",
            width: 2560,
            height: 1600,
          },
        ],
      },
    ],
    conclusionColor: "#1DD78D",
    conclusionTag: "IMPACT & KEY TAKEAWAY",
    conclusionPoints: [
      {
        title: "Design impact: Reimagining PPL's digital presence",
        body:
          "Working on PPL's transformation challenged me to rethink how users interact with real estate platforms. I focused on turning a traditional website into a modern, conversion-focused experience through intuitive navigation and compelling visual storytelling.\n\nThe results were exciting - seeing a 30% increase in user retention and over $100k in revenue validated our approach to user-centered design. I'm particularly proud of how we simplified property discovery while maintaining the premium feel investors expect.\n\nThrough this journey, I learned that early user research reveals crucial insights that shape better solutions. I discovered that simple, intuitive design can drive significant business results, and that visual storytelling is key to engaging property investors. Most importantly, this project reinforced that good design isn't just about aesthetics - it's about solving real problems while driving measurable impact.",
      },
    ],
    otherProjects: ["icheta", "lyvads"],
  },
  fitfam: {
    title: "Fitfam",
    intro:
      "Fitfam breaks away from typical cookie-cutter fitness apps by turning lonely workouts into shared experiences, combining smart personalization with the natural motivation that comes from being part of a community.\n\nI created a mobile app that adapts to each user's fitness journey while keeping them connected. Through personalized workouts, community features, and health tracking, Fitfam transforms fitness from a solo task into a shared adventure.",
    heroImage: "/assets/dark mode images/case-studies/fitfam/hero.png",
    heroImages: [fitfamImage("hero.png")],
    meta: [
      {
        label: "Services",
        values: ["Mobile App Design"],
      },
      {
        label: "Duration",
        values: ["3 months"],
      },
      {
        label: "Industry",
        values: ["Fitness", "Health", "Social media"],
      },
      {
        label: "Tools",
        values: ["Figma", "Claude", "Google meet"],
      },
    ],
    challengeColor: "#FD6A6A",
    challenge: [
      {
        title: "Too much all at once",
        body:
          "How do we pack multiple features into one app without making it feel overwhelming? Users need access to workouts, community, and health tracking - but too many options can paralyze them.",
      },
      {
        title: "Diverse peculiar needs",
        body:
          "Every person has unique physical attributes, health conditions, and behavioral patterns. Creating a universal platform that accommodates different body types, fitness levels, and health requirements presents a significant design challenge.",
      },
      {
        title: "Market distinction",
        body:
          "Standing out in the crowded fitness app market while keeping things simple. Users want something fresh and innovative, but they don't want to learn a complicated new system.",
      },
    ],
    visuals: [
      {
        type: "image",
        ...fitfamImage("style-guide.png"),
        alt: "Fitfam visual identity, typography, colors, and mobile UI foundations",
        width: 2560,
        height: 3280,
      },
    ],
    sections: [
      {
        tag: "THE APPROACH",
        color: "#1DD78D",
        points: [
          {
            title: "Creating a smarter fitness journey",
            body:
              "I kicked off by putting users at the heart of every decision, working closely with stakeholders to validate our direction. Through research and iteration, we discovered that success wasn't about cramming in features - it was about creating moments of delight that make fitness feel natural. The result? A platform that combines smart personalization with intuitive design, making workouts, tracking, and community feel effortless.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...fitfamImage("approach.png"),
            alt: "Fitfam onboarding and health setup screens",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "MOBILE APP DESIGN",
        color: "#8C62FF",
        points: [
          {
            title: "Smart flow & accessibility",
            body:
              "From the moment you open Fitfam to starting your first workout, everything flows naturally. We eliminated unnecessary steps and put the most important features right at your fingertips, making your fitness journey feel seamless.",
          },
          {
            title: "Progress at a glance",
            body:
              "Your fitness story unfolds through easy-to-read progress metrics and achievement milestones. We designed the dashboard to showcase your journey in a way that naturally motivates you to push further - no guilt trips, just genuine progress tracking.",
          },
          {
            title: "Visual identity & engagement",
            body:
              "Rather than generic stock photos, we crafted a distinctive visual language through custom illustrations and thoughtful imagery. Each screen was designed to both guide and delight, creating moments of engagement throughout your fitness journey.",
          },
          {
            title: "Connected experience",
            body:
              "Your fitness data shouldn't be trapped in one place. Fitfam syncs effortlessly with your other health devices and apps, giving you a complete picture of your wellness journey whenever and wherever you need it.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...fitfamImage("mobile-app-design.png"),
            alt: "Fitfam mobile app onboarding, activity, routine, and tracking screens",
            width: 2560,
            height: 3280,
          },
        ],
      },
      {
        tag: "INFORMATIVE HOMESCREEN",
        color: "#2CBDF2",
        points: [
          {
            title: "Health hub: Your fitness command center",
            body:
              "The home screen serves as your wellness command center, intelligently surfacing key health metrics and behavioral patterns in one view. Instead of drowning users in data, we prioritized visualization that tells a story - turning complex health tracking into actionable insights that keep you moving toward your goals.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...fitfamImage("home-screen.png"),
            alt: "Fitfam home screen and health metrics dashboard flows",
            width: 2560,
            height: 4960,
          },
        ],
      },
      {
        tag: "WORKOUT STUDIO",
        color: "#FFB31F",
        points: [
          {
            title: "Dynamic workout guide",
            body:
              "The workout experience was reimagined to be your personal training companion. The carefully crafted exercise module delivers targeted routines based on your fitness level and goals, whether you're working out at home or outdoors. It's not just a collection of videos - it's a structured training system that guides you through proper form and progressively challenges you with tailored exercises for full-body results.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...fitfamImage("workout-studio.png"),
            alt: "Fitfam workout studio and exercise guide screens",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "COMMUNITY & CONNECTION SPACE",
        color: "#F6517F",
        points: [
          {
            title: "Social fitness experience",
            body:
              "Think of it as your digital gym community, but better. Beyond just tracking workouts, this space lets you connect with fellow fitness enthusiasts, share victories big and small, swap healthy living tips, and access quality wellness resources. It's where personal goals meet collective motivation, creating a supportive ecosystem that makes the fitness journey feel less lonely and more achievable.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...fitfamImage("community.png"),
            alt: "Fitfam community, discussion, and social fitness screens",
            width: 2560,
            height: 3280,
          },
        ],
      },
      {
        tag: "HEALTH JOURNAL",
        color: "#375EFB",
        points: [
          {
            title: "Tracking your health and lifestyle",
            body:
              "Your personal health companion that tracks vital signs, symptoms, and medications, turning daily data into simple, actionable insights. It keeps your wellness journey on track with timely reminders and personalized tips that actually make sense for your routine.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...fitfamImage("health-journal.png"),
            alt: "Fitfam health journal, symptom tracking, and lifestyle screens",
            width: 2560,
            height: 1600,
          },
        ],
      },
    ],
    conclusionColor: "#1DD78D",
    conclusionPoints: [
      {
        title: "The human side of fitness tech",
        body:
          "We turned the typical fitness app formula on its head by focusing on what actually keeps people motivated: personalization that feels natural and a community that feels real.\n\nBy making fitness both smarter and more social, we've created a platform where users don't just track workouts - they build lasting healthy habits alongside others who share their goals. It's this blend of personal touch and community spirit that transforms Fitfam from just another app into a daily wellness companion people actually want to use.",
      },
    ],
    otherProjects: ["ppl", "lyvads"],
  },
  pettysave: {
    title: "Pettysave MFB",
    intro:
      "Pettysave is revolutionizing digital banking as a premier microfinance platform. Going beyond traditional banking, and offering seamless transfers, bill payments, and intelligent financial management tools.\n\nI partnered with the product owner to design a platform that turns complex fintech solutions into an engaging experience, showcasing their innovation while improving conversion metrics.",
    heroImage: "/assets/dark mode images/case-studies/pettysave/hero.png",
    heroImages: [pettysaveImage("hero.png")],
    meta: [
      {
        label: "Services",
        values: ["Web Design"],
      },
      {
        label: "Duration",
        values: ["1 week"],
      },
      {
        label: "Industry",
        values: ["Finance"],
      },
      {
        label: "Tools",
        values: ["Figma", "Google meet"],
      },
    ],
    challengeColor: "#FD6A6A",
    challenge: [
      {
        title: "Product vision gaps",
        body:
          "We began with fragments instead of a complete strategy. Stakeholders offered aspirations but not specifications, forcing us to define requirements while designing - essentially building the blueprint during construction.",
      },
      {
        title: "Brand identity weakness",
        body:
          "Inconsistent branding undermined PettySave's market position. Without established guidelines, we struggled to create interfaces that felt both trustworthy and innovative in the financial space.",
      },
      {
        title: "Visual direction conflicts",
        body:
          "Creating a unified design system required navigating conflicting stakeholder perspectives. Multiple decision-makers had different aesthetic visions, complicating our efforts to establish consistent interface elements.",
      },
      {
        title: "Market differentiation",
        body:
          "The saturated microfinance sector required distinctive positioning. We needed to identify unique experience elements while balancing familiar financial patterns with innovations users would actually embrace.",
      },
    ],
    visuals: [
      {
        type: "image",
        ...pettysaveImage("brand-foundation.png"),
        alt: "Pettysave MFB brand foundation and website design direction",
        width: 2560,
        height: 1600,
      },
    ],
    sections: [
      {
        tag: "THE SOLUTION",
        color: "#2CE77B",
        points: [
          {
            title: "Strategic Market Repositioning",
            body:
              "After analyzing top fintech competitors, I created a unified digital strategy that transformed PettySave's fragmented concepts into a cohesive platform. The redesign established a distinctive visual identity while highlighting unique value propositions through targeted user flows.\n\nThis balanced approach delivered both financial credibility and innovation - effectively differentiating PettySave in the saturated microfinance market.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...pettysaveImage("solution.png"),
            alt: "Pettysave MFB digital banking interface solution design",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "THE WEBSITE DESIGN",
        color: "#375EFB",
        points: [
          {
            title: "Digital simplicity, maximum impact",
            body:
              "Pettysave's landing page strips away complexity to spotlight its innovative financial tools. Strategic interaction moments let visitors experience the platform's unique approach rather than just reading about it. This minimalist design embodies the brand's promise - a financial experience that's intuitive, elegant, and refreshingly simple.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...pettysaveImage("website-gallery-1.png"),
            alt: "Pettysave MFB website homepage banking hero design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pettysaveImage("website-gallery-2.png"),
            alt: "Pettysave MFB website product and business banking section design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pettysaveImage("website-gallery-3.png"),
            alt: "Pettysave MFB website contact and about page design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pettysaveImage("website-gallery-4.png"),
            alt: "Pettysave MFB website financial tools and service detail design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...pettysaveImage("website-gallery-5.png"),
            alt: "Pettysave MFB website final content and conversion section design",
            width: 2560,
            height: 1600,
          },
        ],
      },
    ],
    conclusionColor: "#1DD78D",
    conclusionPoints: [
      {
        title: "From Concept to Market Validation",
        body:
          "How Pettysave's strategic design approach transformed fragmented ideas into fintech success",
      },
      {
        title: "Exceeding Adoption Metrics",
        body:
          "Pettysave's launch outperformed targets, with analytics confirming users follow our designed pathways perfectly. Early data shows stronger retention than comparable fintech products at similar stages.",
      },
      {
        title: "Stakeholder Input Filtration",
        body:
          "Success came from distilling actionable insights from complex feedback. By separating signal from noise, we transformed fragmented ideas into a cohesive vision addressing real market gaps.",
      },
      {
        title: "Evolving Product Ecosystem",
        body:
          "Pettysave's successful launch is just the beginning. Our team is already developing the next wave of innovative tools that will continue transforming how users experience financial services.",
      },
    ],
    otherProjects: ["fitfam", "realvest"],
  },
  realvest: {
    title: "Realvest",
    intro:
      "Realvest is your go-to real estate investment platform, making property allocation and investment a breeze. With Realvest, you can count on a secure investment for your home and apartments, all backed by cutting-edge technology.\n\nI transformed Realvest's initial v1 platform into a modern, intuitive experience that resonates with today's digital-first property investors.",
    heroImage: "/assets/dark mode images/case-studies/realvest/hero.png",
    heroImages: [realvestImage("hero.png")],
    meta: [
      {
        label: "Services",
        values: ["Web App Design", "Web Design"],
      },
      {
        label: "Duration",
        values: ["3 months"],
      },
      {
        label: "Industry",
        values: ["Real estate", "SaaS"],
      },
      {
        label: "Tools",
        values: ["Figma", "Clickup", "Google meet"],
      },
    ],
    challengeColor: "#FD6A6A",
    challenge: [
      {
        title: "Navigating the Digital Divide",
        body:
          "Despite Realvest's market success, their digital platform had fallen behind user expectations. Our challenge was modernizing both the interface and feature set to match how today's property investors prefer to interact with investment tools.",
      },
      {
        title: "Brand Mismatch",
        body:
          "Realvest's market success wasn't reflected in its interface. The platform's dated design undermined brand perception among design-conscious users who expect digital experiences to match a company's market position.",
      },
      {
        title: "Unclear Returns",
        body:
          "Users couldn't visualize potential investment outcomes. Without transparent projections and progress tracking, potential investors hesitated to commit funds - creating a critical conversion barrier at the decision point.",
      },
      {
        title: "Product Direction",
        body:
          "We had a functional MVP but lacked vision for evolution. Feature prioritization happened reactively without a framework for evaluating which capabilities would deliver the greatest value as we scaled beyond basics.",
      },
      {
        title: "Stakeholder Balance",
        body:
          "Stakeholders pushed for complex features to match competitors, while our research showed new users needed simplified onboarding and clearer value propositions before engaging with advanced capabilities.",
      },
      {
        title: "Age-Inclusive Design",
        body:
          "Our demographic included many older users who approach digital products differently. This required rethinking interaction patterns to accommodate varying levels of digital fluency while still delivering a modern experience.",
      },
    ],
    visuals: [
      {
        type: "image",
        ...realvestImage("style-guide.png"),
        alt: "Realvest visual identity, typography, color, and UI foundations",
        width: 2560,
        height: 1600,
      },
    ],
    sections: [
      {
        tag: "THE APPROACH",
        color: "#1DD78D",
        points: [
          {
            title: "Strategic product evolution",
            body:
              "We identified critical experience gaps undermining user conversion and retention across the investment journey. Our dual approach focused on completing essential but unfinished features while simultaneously modernizing the interface design. This balanced strategy - enhancing both functionality and visual identity - created a cohesive platform experience that could support Realvest's expansion to a broader investor audience.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...realvestImage("approach.png"),
            alt: "Realvest product evolution and investment experience approach",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "WEB APP EVOLUTION",
        color: "#2CBDF2",
        points: [
          {
            title: "Intelligent Dashboard",
            body:
              "Your personal command center shows trending properties, your recent activities, active subscriptions, and wallet balance - all in one glance without switching between screens.",
          },
          {
            title: "Property Marketplace",
            body:
              "Filter properties by price, location, and type to find exactly what you're looking for. Each listing offers multiple investment plans so you can choose terms that fit your financial goal.",
          },
          {
            title: "Subscription Tracker",
            body:
              "Monitor all your active investments. See payment progress, make installments when needed, and view clear timelines to completion for each property.",
          },
          {
            title: "Referral System",
            body:
              "Realtors can build and monitor their entire network of referrals. Track team performance and commission earnings easily.",
          },
          {
            title: "Wallet",
            body:
              "Your complete financial hub handles everything from funding your account to making purchases and withdrawing commissions.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...realvestImage("web-app-evolution-1.png"),
            alt: "Realvest web app dashboard and property marketplace design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...realvestImage("web-app-evolution-2.png"),
            alt: "Realvest web app investment listing and detail design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...realvestImage("web-app-evolution-3.png"),
            alt: "Realvest web app subscription tracking and wallet design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...realvestImage("web-app-evolution-4.png"),
            alt: "Realvest web app referral and commission management design",
            width: 2560,
            height: 1600,
          },
        ],
      },
      {
        tag: "WEBSITE DESIGN",
        color: "#1DD78D",
        points: [
          {
            title: "Creating the Platform Entry Experience",
            body:
              "Once we completed the platform, we needed a way to introduce it to potential users. We developed a streamlined marketing website that showcases our premier properties and communicates our value proposition through visual storytelling.",
          },
        ],
        visuals: [
          {
            type: "image",
            ...realvestImage("website-design-1.png"),
            alt: "Realvest marketing website homepage and property storytelling design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...realvestImage("website-design-2.png"),
            alt: "Realvest marketing website property discovery section design",
            width: 2560,
            height: 1600,
          },
          {
            type: "image",
            ...realvestImage("website-design-3.png"),
            alt: "Realvest marketing website footer and conversion section design",
            width: 2560,
            height: 1600,
          },
        ],
      },
    ],
    conclusionColor: "#1DD78D",
    conclusionPoints: [
      {
        title: "Trust Drives Investment Decisions",
        body:
          "Investment platforms live or die on trust signals. By designing transparent processes and secure transaction flows, we removed the psychological barriers preventing users from committing their capital.",
      },
      {
        title: "Global Market Accessibility",
        body:
          "Our platform unexpectedly gained traction in Canada, teaching us that thoughtful UX transcends geographical boundaries when addressing universal investment needs.",
      },
      {
        title: "User Feedback Value",
        body:
          "Our most valuable improvements came directly from user feedback. Implementing structured listening mechanisms created remarkably strong product-market fit in a traditionally slow-moving industry.",
      },
      {
        title: "Experience Equals Revenue",
        body:
          "We confirmed the direct link between experience quality and business growth. Each friction point eliminated in the investment journey translated to measurable conversion improvements.",
      },
    ],
    otherProjects: ["pettysave", "emmanuel"],
  },
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);
