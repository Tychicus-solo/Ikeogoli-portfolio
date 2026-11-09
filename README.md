This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## SEO configuration

Until a public production domain is configured, pages emit `noindex, nofollow`
and the sitemap is empty. This keeps the staging portfolio out of search results.
Set these build-time environment variables on the hosting service, then rebuild:

- `SITE_URL`: the final public origin (for example `https://your-domain.com`).
  This enables absolute canonical URLs, the sitemap, and Person/WebSite structured data.
- `SITE_NOINDEX=true`: keep a staging deployment out of search results even when
  `SITE_URL` is configured. Vercel preview deployments also stay non-indexable.
  Omit this variable for the production deployment.

The `/opengraph-image` route generates the social sharing image locally.
Legacy section URLs redirect to the homepage or the matching section.

## Image quality and accessibility

Run `node scripts/optimize-lossless-images.cjs` to regenerate the optimized assets.
The script checks every decoded RGBA pixel against the original before writing,
keeps the original dimensions, and uses PNG for images exceeding WebP size limits.
Original assets are retained. Existing image quality settings are unchanged.

Keyboard users can Tab to “Skip to content” and “Pause automatic motion”.
These controls appear on focus without changing the resting layout. Automatic
carousels wait for their next image to load, and pause offscreen, in hidden tabs,
with reduced motion, or when automatic motion is paused.
