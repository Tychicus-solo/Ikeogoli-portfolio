# OneApp dark-mode images

Verified against Figma file `5F1Jzjtm02hBtKrxNBmHOd`, frame `2995:270522` on 2026-09-07.

Seventeen panels match the light design and reuse its 2560px-wide WebP files. Dark mobile panels 5 and 6 match light panels 3 and 4. Sharing their URLs avoids duplicate downloads on theme changes.

These panels are specific to the dark design. The mobile panels preserve the native 1280px-wide Figma exports, encoded as WebP (quality 90, alpha quality 100, effort 6). On 2026-09-13, `admin-system-4-3x.webp` (3840 × 2400) and `app-shots-3x.webp` (3840 × 2880) were freshly exported from the source nodes below at 3× and encoded as WebP (quality 95, alpha quality 100, effort 6). These replace the 1280px versions in the page; their new URLs avoid stale image caches. Each is rendered independently with lazy loading, responsive sizing, and no CSS crop or surrounding card background.

Dark design source nodes:

```json
{
  "system-overview": "2995:270589",
  "approach": "2995:270605",
  "web-mobile-platform-1": "7371:398017",
  "web-mobile-platform-2": "7371:398062",
  "key-features-1": "7367:398015",
  "key-features-2": "7511:398570",
  "mobile-app-1": "2995:270623",
  "mobile-app-2": "7571:415476",
  "mobile-app-3": "7571:418837",
  "mobile-app-4": "7579:429998",
  "mobile-app-5": "7571:419296",
  "mobile-app-6": "7571:419740",
  "website-design-1": "2995:270642",
  "website-design-2": "2995:270643",
  "website-design-3": "7636:416997",
  "website-design-4": "7636:421773",
  "admin-system-1": "2995:270662",
  "admin-system-2": "7678:424614",
  "admin-system-3": "7678:423625",
  "admin-system-4": "7678:427860",
  "app-shots": "7681:425335"
}
```
