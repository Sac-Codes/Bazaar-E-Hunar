# 🎯 Visual Redesign — Implementation TODO

## Phase 1: Design System (`src/index.css`) ✅ DONE
- [x] Research current colors and animations
- [x] Update color palette (70% deep navy, 20% orange+gold, 10% cyan+purple)
- [x] Add Noto Sans Devanagari & Space Grotesk font imports in `index.html`
- [x] Add `animate-gradient-text` keyframe (slow, elegant)
- [x] Enhance `.glass-card` with festival-colored border glow
- [x] Add `.btn-premium` with orange→gold gradient + glow + shimmer
- [x] Add new gradient text utilities (festival palette)
- [x] Add section background classes with alternating colors
- [x] Reduce animation keyframes — remove redundant ones

## Phase 2: Home Hero & Branding (`src/pages/Home.tsx`) ✅ DONE
- [x] Bilingual heading: बाज़ार-ए-हुनर (Hindi) + Bazaar-E-Hunar 2027 (English)
- [x] Subtitle: Celebrating Innovation • Creativity • Entrepreneurship
- [x] Animated multi-color gradient text
- [x] Enhanced hero background (aurora + particles + light rays)
- [x] Premium CTA buttons (btn-premium with orange→gold gradient)
- [x] New section accent colors (Highlights→Cyan, Categories→Purple, CTA→Gold+Orange)

## Phase 3: Navigation & Global Theme (`src/layouts/MainLayout.tsx`) ✅ DONE
- [x] Nav bar with new palette accents (orange/gold)
- [x] Footer with festival gradients & bilingual brand
- [x] Custom cursor color update (orange ring + gold dot)

## Phase 4: Homepage Section Restructuring (`src/pages/Home.tsx`) ✅ DONE
- [x] Story flow: Hero → Highlights → Categories → CTA
- [x] Each section gets distinct accent color (Highlights→Cyan, Categories→Purple, CTA→Gold+Orange)
- [x] Enhanced feature cards with section-specific top accent lines
- [x] Improved statistics display with colored icons & gradients

## Phase 5: Motion Graphics & Particles ✅ DONE
- [x] `AuroraBackground.tsx` — richer colors (orange, gold, magenta, purple)
- [x] `FloatingParticles.tsx` — festival color additions (orange, gold, violet, magenta, cyan, emerald)
- [x] `FloatingOrbs.tsx` — festival theme updates (gold, violet, orange, magenta, emerald, cyan)
- [x] `SectionDivider.tsx` — multi-color gradient variants (glow accent → orange)

## Phase 6: About Page Redesign (`src/pages/About.tsx`) ⬅️ CURRENT
- [ ] Bilingual page title
- [ ] Premium section transitions
- [ ] Enhanced timeline styling
- [ ] Section-specific gradient backgrounds

## Phase 7: Polish & Performance
- [ ] Lighthouse check (Performance ≥95, Accessibility ≥100)
- [ ] `prefers-reduced-motion` support (already done in index.css)
- [ ] GPU transform optimization
- [ ] Final responsiveness pass

---

## Color Ratio
- 70% Deep Navy (#07111F, #0B132B, #12172A, #151B34)
- 20% Orange + Gold (#FF8A00, #FFD54A)
- 10% Cyan + Purple (#00E5FF, #8A5CFF)

## Section Accent Map
- Hero → Orange + Gold
- Highlights → Cyan
- Categories → Purple
- Team → Gold
- About Vision → Purple
- About Timeline → Cyan
- Contact → Orange
- Footer → Deep Navy

