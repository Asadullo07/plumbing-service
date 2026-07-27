# AquaPro Plumbing — Portfolio Website

Premium, production-quality plumbing company website built with vanilla HTML5, CSS3, and JavaScript. No frameworks, no dependencies beyond Font Awesome and Google Fonts.

## Project Structure

```
/
├── index.html              # Main HTML — all sections, SEO meta, Schema.org
├── css/
│   ├── style.css           # Core styles — design system, all components
│   ├── animations.css      # Scroll reveal, typing cursor, shimmer
│   └── responsive.css      # Breakpoints: 320 / 375 / 425 / 768 / 1024 / 1440 / 4K
├── js/
│   ├── main.js             # Navbar, cursor, typing, counters, slider, filters, FAQ
│   ├── modal.js            # Modal open/close, service modal data, ESC/overlay handling
│   ├── animations.js       # Parallax, ripple, keyboard accessibility
│   └── validation.js       # Contact form validation, toast notifications
├── assets/
│   ├── images/             # Replace placeholders with real photos
│   └── icons/              # Favicon, app icons
├── sitemap.xml
├── robots.txt
└── README.md
```

## Features

- **Glassmorphism / Liquid Glass UI** — backdrop-filter, transparent panels, soft shadows
- **Floating sticky navbar** — auto-hide on scroll, active section indicator, mobile hamburger
- **Typing headline animation** — cycles through service targets
- **Animated number counters** — triggered on scroll via IntersectionObserver
- **Animated progress bars** — smooth fill on reveal
- **Testimonial slider** — auto-play, swipe support, dot navigation, responsive card count
- **Portfolio filter** — category filter with smooth show/hide
- **FAQ accordion** — keyboard accessible, ARIA-compliant
- **8 service modals** — rich detail with CTA linking to quote modal
- **Lightbox** — project gallery with prev/next navigation
- **Contact form** — live validation with error states and success feedback
- **Quote & Emergency modals** — one-click from nav or hero
- **Privacy & Terms modals** — inline, no separate pages
- **Cursor follower** — subtle liquid glass, hover-device only
- **Light parallax** — hero orbs follow mouse, GPU-friendly
- **Button ripple** — touch-feedback on primary buttons
- **Loading screen** — branded, 1.4s, fades out
- **Back to top** — appears after 600px scroll
- **Toast notifications** — for async form submissions
- **SEO** — semantic HTML5, single H1, Open Graph, Twitter Cards, Schema.org LocalBusiness + FAQ + Breadcrumb, canonical URL placeholder

## Deployment

1. Replace all placeholder content (company name, phone, address, images)
2. Update `canonical` URL and Open Graph URLs in `<head>`
3. Update `sitemap.xml` with the correct domain
4. Add a real `og-image.jpg` (1200×630px) to `assets/images/`
5. Deploy to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages)

## Customisation

All colors are CSS custom properties in `:root` inside `css/style.css`. Change the palette in one place to re-theme the entire site.

```css
:root {
  --color-deep-blue:  #0a1628;
  --color-cyan:       #00bfff;
  /* ... */
}
```

## Browser Support

Chrome 90+, Firefox 90+, Safari 14+, Edge 90+. Graceful degradation for older browsers (backdrop-filter falls back to solid backgrounds).

## Performance Notes

- All scroll effects use `IntersectionObserver` (no scroll event listeners for animations)
- `requestAnimationFrame` used for cursor and counter animations
- All event listeners on scroll/resize use `{ passive: true }`
- Images should be served as WebP with `loading="lazy"` once real photos are added
