# 🎨 Visual Redesign Plan — Bazaar-E-Hunar 2026

## Objective
Upgrade the website's visual identity to feel premium, vibrant, energetic, modern, and festival-inspired — while preserving all architecture, routing, functionality, and responsiveness.

---

## Files to Modify

### 1. `src/index.css` — Core Design System
- **Color Palette Overhaul**
  - Backgrounds: `#07111F`, `#0B132B`, `#12172A`, `#151B34`
  - Accents: `#FF8A00` (Orange), `#FFD54A` (Gold), `#00E5FF` (Cyan), `#FF4D9D` (Magenta), `#8A5CFF` (Purple), `#2DEB9B` (Emerald), `#F8FAFC` (White)
  - Remove/reduce blue dominance
- **New `animate-gradient-text` keyframe** for slow elegant gradient animation on text
- **Enhanced button styles** — `btn-premium` with orange→gold gradient, glow, shimmer hover
- **Enhanced card styles** — `glass-card` with colored border glow based on section
- **Section background utility classes** with new palette (orange+cyan, purple+cyan, gold+orange, magenta+purple)

### 2. `src/pages/Home.tsx` — Hero & Visual Energy (HIGHEST PRIORITY)
- **Hero Heading Redesign**
  - Bilingual heading: `बाज़ार-ए-हुनर` (Hindi, larger, elegant, letter-spacing, glow) + `Bazaar-E-Hunar 2027` (English, Orbitron/Space Grotesk, uppercase, gradient)
  - Subtitle: `Celebrating Innovation • Creativity • Entrepreneurship`
  - Animated multi-color gradient text (Orange→Gold→Pink→Cyan)
- **Enhanced Hero Background** — more particles, aurora mesh, geometric shapes, light rays
- **Improved statistics/highlights cards** with colored borders matching section theme
- **Better call-to-action buttons** with premium gradient (orange→gold)

### 3. `src/pages/About.tsx` — Premium Storytelling
- **Bilingual page title**: `बाज़ार-ए-हुनर` + `About The Festival`
- **Premium section transitions** with gradient dividers
- **Enhanced timeline** with better interactive styling
- **Section-specific gradient backgrounds** (alternating: orange+cyan, purple+cyan, gold+orange)
- **Animated background glows** behind each section

### 4. `src/layouts/MainLayout.tsx` — Navigation & Footer Refinements
- **Navigation bar** — use new palette accents, enhanced glass effect
- **Footer** — upgraded with festival gradients and glow accents
- **Custom cursor** — use gold/orange accent instead of cyan only

### 5. `src/components/AuroraBackground.tsx` — Richer Ambient Effects
- Add more color variety (orange, gold, magenta, purple blobs)
- Increase subtlety with lower opacity but more moving elements
- Enhanced gradient mesh with new palette

### 6. `src/components/FloatingParticles.tsx` — More Visual Interest
- Add new particle colors (gold, orange, magenta)
- Increase particle count slightly
- Add more sparkle shapes

### 7. `src/components/FloatingOrbs.tsx` — Festival Theme Orbs
- Replace some icons with festival icons (sparkles, stars, gems, rockets)
- Use new color palette (gold, orange, magenta, cyan, purple)
- Enhanced glow effects

### 8. `src/components/SectionDivider.tsx` — Gradient Dividers
- Add variant for multi-color gradient dividers
- Use new festival palette (orange→cyan, purple→gold, magenta→cyan)

### 9. `src/components/PromotionalBanner.tsx` — Enhanced Visuals
- Improved gradient overlays with new palette
- Better typography with gradient text on heading

### 10. `src/components/LoadingScreen.tsx` — Premium Loading
- Use new festival colors
- Enhanced logo animation
- Bilingual brand name display

---

## Detailed Implementation Plan

### Phase 1: Core Design System (`index.css`)
- Update CSS custom properties (colors)
- Add new `@keyframes` for animated gradient text
- Enhance `.glass-card` with festival-colored border glow
- Add `.btn-premium` with orange→gold gradient, glow, and shimmer
- Add new gradient text utilities for festival palette
- Add section background classes with alternating color combinations

### Phase 2: Home Page Hero (Highest Priority)
- Replace existing heading with bilingual layout
- Add font imports for Hindi/Orbitron support
- Animated multi-color gradient text
- Enhanced hero background elements
- Improved CTA buttons with premium styling

### Phase 3: About Page & Remaining Pages
- Bilingual page titles
- Premium section transitions
- Enhanced card styling with section-specific colors
- Improved timeline styling
- Background glows per section

### Phase 4: Layout & Global Components
- Navigation refinements
- Footer upgrades
- Aurora, Particles, Orbs enhancements
- Section dividers with new palette
- Loading screen upgrade

### Phase 5: Polish & Performance
- Ensure 60 FPS with GPU transforms
- Add `prefers-reduced-motion` support
- Lazy-load decorative assets
- Verify no layout shifts

---

## Design Principles
- **No architectural changes** — routing, components, data flow, Firebase remain untouched
- **Festival energy** — orange, gold, coral, cyan, magenta, purple on deep navy backgrounds
- **Bilingual identity** — `बाज़ार-ए-हुनर` as visual centerpiece
- **Premium but performant** — GPU-friendly animations, no aggressive rainbow effects
- **Elegant gradient text** — slow animated multi-color, not aggressive

