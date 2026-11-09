// Generate smaller assets without changing any decoded RGBA pixels.
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
async function main() {
  const sources = [
    'public/assets/background-noise.png',
    'public/assets/background-noise-light.png',
    'public/assets/selected-works/oneapp-dashboard.png',
    'public/assets/selected-works/oneapp-marketplace-4x.png',
    ...['emmanuel', 'ppl', 'pettysave', 'realvest'].map(slug => `public/assets/dark mode images/case-studies/${slug}/hero-carousel/${slug}-website-full-2x.png`),
  ];
  for (const source of sources) {
    const metadata = await sharp(source).metadata();
    const usePng = metadata.width > 16383 || metadata.height > 16383;
    const target = source.replace(/\.png$/, usePng ? '.lossless.png' : '.lossless.webp');
    const original = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    // Preserve RGB values beneath transparent pixels too.
    const pipeline = sharp(source);
    const encoded = await (usePng ? pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }) : pipeline.webp({ lossless: true, effort: 6, alphaQuality: 100 })).toBuffer();
    const decoded = await sharp(encoded).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    if (!original.data.equals(decoded.data)) throw new Error(`Pixel mismatch: ${source}`);
    const before = (await fs.stat(source)).size;
    if (encoded.length >= before) { console.log(`Keep original: ${path.basename(source)}`); continue; }
    await fs.writeFile(target, encoded);
    console.log(`${path.basename(target)}: ${before} -> ${encoded.length} bytes; identical pixels`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
