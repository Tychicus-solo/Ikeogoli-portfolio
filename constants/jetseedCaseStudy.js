// Jetseed copy and image panels follow the supplied Figma case study.
const asset = (name) => `/assets/case-studies/jetseed/${name}.webp`;

const panels = (names, alt) => {
  const images = names.map((name) => ({
    src: asset(name),
    width: name === "brand" ? 3264 : 3840,
    height: name === "brand" ? 2478 : 2400,
    quality: 95,
  }));
  return [{ type: "image", src: images[0].src, alt, darkPanels: images, lightPanels: images }];
};

export const JETSEED_CASE_STUDY = {
  title: "Jetseed",
  liveSite: "https://www.jetseed.com/",
  showBackLink: true,
  intro: "Jetseed is a fintech platform that makes investing and saving simple for everyday Nigerians. It brings investments, goal-based savings and a wallet into one app, with an AI-guided path for people who don’t know where to start.\n\nI led the end-to-end redesign across the mobile app, web app and admin back office, cutting drop-off and keeping users coming back.",
  heroImage: { src: asset("hero-1") },
  heroImages: [1, 2, 3, 4, 5].map((number) => ({ src: asset(`hero-${number}`) })),
  heroQuality: 95,
  heroScrollPreview: {
    src: asset("website-full"),
    width: 2800,
    height: 15995,
    duration: 20000,
    backgroundColor: "#F7F8FA",
    optimized: true,
    quality: 95,
  },
  meta: [
    { label: "Services", values: ["Mobile App Design", "Web App Design", "Web Design"] },
    { label: "Duration", values: ["3 months"] },
    { label: "Industry", values: ["Fintech"] },
    { label: "Tools", values: ["Figma", "Jira", "Google meet"] },
  ],
  challenge: [
  {
    "title": "Making Investing Feel Safe",
    "body": "For many first-time investors, putting money into an app is a leap of faith. The old experience didn’t do enough to build confidence, which showed up as bounce and drop-off in the earliest steps of the journey."
  },
  {
    "title": "Too Many Options, Not Enough Guidance",
    "body": "Jetseed offers investments, target savings and a wallet. Without clear direction, new users couldn’t tell where to start or what each product actually did for them."
  },
  {
    "title": "Serving Beginners and Self-Directed Investors",
    "body": "Some users wanted to be guided. Others wanted full control over how and where they invest. The product had to serve both without overwhelming either."
  },
  {
    "title": "Onboarding That Asks a Lot",
    "body": "Setting up BVN, phone number, bank account and wallet funding is necessary in fintech, but each step is a chance for users to leave. The challenge was collecting what compliance requires without losing people along the way."
  }
],
  visuals: panels(["style-guide"], "Jetseed design system: typography, colors and components"),
  sections: [
    {
      tag: "THE APPROACH",
      color: "#1dd78d",
      points: [
  {
    "title": "Guidance first, then control",
    "body": "I started with UX audits, usability testing and stakeholder workshops to turn complex fintech requirements into a product people could follow. The goal was simple: new users know their next step within seconds, confident investors never feel slowed down, and every screen feels safe enough to handle real money."
  }
],
      visuals: panels(["approach"], "Jetseed the approach"),
    },
    {
      tag: "MOBILE & WEB APP EXPERIENCE",
      color: "#8c62ff",
      points: [
  {
    "title": "Your money, wherever you open it",
    "body": "Jetseed works the same whether you’re on your phone or at your desk. I designed the mobile and web apps as one connected experience, so users can invest, save and manage their wallet on either screen without relearning anything."
  }
],
      visuals: panels(["mobile-web"], "Jetseed mobile & web app experience"),
    },
    {
      tag: "KEY FEATURES",
      color: "#375efb",
      points: [
  {
    "title": "Invest Your Way",
    "body": "Users can invest with Jet AI, a guided path that recommends where to put their money, or go self-directed and choose exactly how they invest. One entry point serves both beginners and experienced investors, and investment portfolios, balances and categories stay visible in one place."
  },
  {
    "title": "Target Savings",
    "body": "Savings become tangible when they’re tied to a goal. Users set a target such as a new car, house rent or school fees, and see progress, amount saved and days left on a clear progress bar. Returns and earnings show up directly on the balance card, so users can see their money working."
  },
  {
    "title": "Explore Savings Categories",
    "body": "Different goals need different plans. A browsable set of savings categories, each with its own visual identity, makes the choices easier to understand and more engaging to explore."
  },
  {
    "title": "Wallet",
    "body": "The wallet is the hub of the experience. Users fund it, invest from it, withdraw from it and review recent transactions in one place, which removes friction between deciding to invest and actually doing it."
  },
  {
    "title": "Profile & Security",
    "body": "Trust is built in the details. I designed PIN setup and change flows, email and phone verification, account locking, logout confirmation and account deletion, so users are always in control of their account and their data."
  }
],
      visuals: panels(["features-1","features-2","features-3","features-4","features-5"], "Jetseed key features"),
    },
    {
      tag: "WEB APP DESIGN",
      color: "#ff3489",
      points: [
  {
    "title": "Your portfolio, on a bigger canvas",
    "body": "I designed the customer-facing web app so users can invest, save and manage their wallet from a desktop too. It keeps the same flows and identity as mobile, with the extra space used for richer dashboards, easier comparisons and a clearer view of savings and wallet activity."
  }
],
      visuals: panels(["web-app-1","web-app-2","web-app-3","web-app-4"], "Jetseed web app design"),
    },
    {
      tag: "THE ADMIN",
      color: "#ffb31f",
      points: [
  {
    "title": "The console behind the app",
    "body": "Running a financial product takes more than a good app. I designed the admin console from scratch to handle payments, transactions, investments, savings, user accounts, access control, settings and activity logs. Permissions are role-based, so each team member sees only what their job requires."
  }
],
      visuals: panels(["admin-1","admin-2","admin-3"], "Jetseed the admin"),
    },
    {
      tag: "WEBSITE DESIGN",
      color: "#2cbdf2",
      points: [
  {
    "title": "The front door to Jetseed",
    "body": "After the app, I designed the marketing website to tell the Jetseed story and move visitors toward download. It carries the same visual language as the product, so the brand feels consistent from first impression to first investment."
  }
],
      visuals: panels(["website-1","website-2","website-3"], "Jetseed website design"),
    },
    {
      tag: "BRAND & APP SHOTS",
      color: "#8c62ff",
      points: [
  {
    "title": "One identity, from icon to app store",
    "body": "I refreshed Jetseed’s logo and icon, then designed app store visuals for iPhone, Android and iPad. Each one sells a single idea, so people get it before they download it."
  }
],
      visuals: panels(["brand"], "Jetseed brand & app shots"),
      visualWidth: 1088,
    },
  ],
  conclusionPoints: [
  {
    "title": "Fixing the journey, not just the look",
    "body": "A clear first move and shorter onboarding cut bounce and drop-off by 31.5%. Goal-based savings and a connected wallet gave users reasons to return, lifting retention by 25%."
  },
  {
    "title": "Knowing where to start",
    "body": "The Start Guide and Jet AI answered the question that stops most first-time investors: “What do I do first?” A checklist and a guided path replaced a list of products, which cut hesitation where many people used to leave."
  },
  {
    "title": "Savings that mean something",
    "body": "Tying savings to goals like a car or rent made the product feel personal rather than financial. Seeing progress and days left on each goal gave people a reason to check in, which supported the rise in retention."
  },
  {
    "title": "Trust lives in the small moments",
    "body": "PIN setup, confirmations and account controls are easy to overlook. Giving them the same care as the main flows, backed by one design system across mobile, web and admin, made the whole product feel consistent and safe."
  }
],
  otherProjects: ["oneapp", "icheta"],
};

