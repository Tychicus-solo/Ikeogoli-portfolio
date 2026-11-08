export const RAANAA_CASE_STUDY = {
  "title": "Raanaa",
  "intro": "Raanaa is the design system behind MTN’s digital products, giving designers and developers one shared foundation of tokens, components and templates, so products from different teams feel like one brand.\n\nI assisted in building and championing it, creating scalable components and guidelines that cut design inconsistencies by 72% and improved efficiency, accessibility and consistency.",
  "liveSite": null,
  "hideLiveSite": true,
  "heroImage": {
    "src": "/assets/case-studies/raanaa/hero.webp"
  },
  "heroImages": [
    { "src": "/assets/case-studies/raanaa/hero.webp", "alt": "Raanaa design system overview" },
    { "src": "/assets/case-studies/raanaa/hero-dashboard.png", "alt": "Raanaa dashboard designs for MTN products" },
    { "src": "/assets/case-studies/raanaa/hero-phone.png", "alt": "Raanaa mobile account design on a yellow phone mockup" }
  ],
  "heroQuality": 95,
  "meta": [
    {
      "label": "Services",
      "values": [
        "Design System",
        "Tokens",
        "Documentation"
      ]
    },
    {
      "label": "Duration",
      "values": [
        "2025 – Present"
      ]
    },
    {
      "label": "Industry",
      "values": [
        "Design Systems"
      ]
    },
    {
      "label": "Tools",
      "values": [
        "Figma",
        "Figma Variables",
        "Jira"
      ]
    }
  ],
  "challenge": [
    {
      "title": "One brand, many versions of it",
      "body": "Products grew in separate teams, so the same company showed up with different colours, shapes and behaviours. The same button, form and table were redesigned and recoded product after product, and values chosen in Figma were retyped into code, drifting a little at every handoff. Some products, like partner brands, also needed their own look, and accessibility was often checked after the build."
    }
  ],
  "visuals": [
    {
      "type": "raanaa",
      "kind": "audit",
      "src": "raanaa-audit"
    }
  ],
  "sections": [
    {
      "tag": "THE APPROACH",
      "color": "#1dd78d",
      "points": [
        {
          "title": "Build on foundations people already know",
          "body": "We started with an audit to see where products differed and what was rebuilt most, then built in layers teams could adopt one piece at a time: tokens first, then components, then templates and documentation. Raanaa sits on the open-source shadcn/ui library with Radix Colors and Remix Icons, so every component follows properties developers already know."
        }
      ],
      "visuals": [
        {
          "type": "raanaa",
          "kind": "tokens",
          "src": "raanaa-tokens"
        }
      ]
    },
    {
      "tag": "FOUNDATIONS",
      "color": "#8c62ff",
      "points": [
        {
          "title": "The raw material, with names",
          "body": "More than 500 colours across five families (Raven for neutrals, Sunshine for MTN’s yellows, Red, Green, Blue), each with 12-step light and dark scales. Type runs on a 13-step scale from 0.75rem to 8rem, spacing from 0 to 384px, alongside radius, shadow and focus-ring scales and an icon library of 19 categories. Colours are named by purpose, as background and foreground pairs, so text stays readable by default."
        }
      ],
      "visuals": [
        {
          "type": "raanaa",
          "kind": "foundations",
          "src": "raanaa-foundations"
        }
      ]
    },
    {
      "tag": "COMPONENT LIBRARY",
      "color": "#375efb",
      "points": [
        {
          "title": "Everything a product needs, ready to use",
          "body": "More than 50 components, from buttons, inputs and tabs to data tables, date pickers, command menus and charts, each with variants, states and light and dark versions. Newer additions include chips, input OTP, search, modals and a step navigator."
        }
      ],
      "visuals": [
        {
          "type": "raanaa",
          "kind": "components",
          "src": "raanaa-components"
        }
      ]
    },
    {
      "tag": "DOCS & ACCESSIBILITY",
      "color": "#ff3489",
      "points": [
        {
          "title": "Every component explains itself",
          "body": "Each component has a page in one format, with guidance on when to use it and when not to, and an accessibility layer mapped to WCAG, so contrast, focus and keyboard use are considered before the build, not after. Releases are versioned with notes on what’s new, improved and fixed, most recently a step navigator, slot-ready table cells and responsive charts."
        }
      ],
      "visuals": [
        {
          "type": "raanaa",
          "kind": "playground",
          "src": "raanaa-playground"
        }
      ]
    },
    {
      "tag": "PATTERNS & REAL PRODUCT",
      "color": "#ffb31f",
      "points": [
        {
          "title": "From parts to whole pages",
          "body": "Beyond single components, the library holds page templates and tested patterns: sidebar and no-sidebar layouts, announcement banners, and table states from loading to multi-select, plus empty states for no results, no data and errors. Showcase pages prove them in real flows such as sign-in, payments and a dark-mode device dashboard."
        }
      ],
      "visuals": [
        {
          "type": "raanaa",
          "kind": "products",
          "src": "raanaa-products"
        }
      ]
    }
  ],
  "conclusionPoints": [
    {
      "title": "Shared names beat shared styles",
      "body": "Design inconsistencies fell by 72% because designers and developers spoke one vocabulary, from tokens to components."
    },
    {
      "title": "Build on what people know",
      "body": "Starting from open-source foundations made the system faster to build and easier to adopt, since developers recognised the components from day one."
    },
    {
      "title": "Accessibility works best up front",
      "body": "Putting guidance beside every component meant issues around contrast, focus and keyboard use were caught before building, when fixes are cheapest."
    },
    {
      "title": "A system is a product",
      "body": "Releases, documentation and a playground took as much care as the components, and they are what kept teams using the system instead of designing one-offs."
    }
  ],
  "otherProjects": [
    "oneapp",
    "icheta"
  ]
};
