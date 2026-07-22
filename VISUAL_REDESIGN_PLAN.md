# Bazaar-E-Hunar 2027 — Visual Redesign & Experience Upgrade Plan

## Information Gathered

### Current Architecture
- **Stack**: React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + Framer Motion 12 + Lucide React
- **Routing**: React Router v7 with nested routes via `<Outlet>` in `MainLayout.tsx`
- **Current Theme**: Dark cyber theme with `#050816` (background), `#00E5FF` (cyan accent), `#3B82F6` (blue), `#8B5CF6` (purple)
- **Brand Name**: "SkillVerse 2027" throughout the site
- **Team**: 5 members with flat grid layout using `MeetTheTeam.tsx` + `TeamMemberCard.tsx`
- **Pages**: Home, About, Register, Stalls, EventMap, Gallery, Rules, FAQ, Contact
- **Components**: PageWrapper, LoadingScreen, TopBanner, EventAbout, EventMemories, FeaturedHighlights, PromoPosters, PromoVideo, MeetTheTeam, TeamMemberCard

### What to Preserve (DO NOT TOUCH)
- ✅ All routing structure (BrowserRouter, Routes, Route paths)
- ✅ MainLayout layout structure (header nav, outlet, footer)
- ✅ All page routes and their components
- ✅ Backend/API logic (none exists — purely frontend)
- ✅ All existing functionality (forms, QR codes, maps, accordions, etc.)
- ✅ PageWrapper component
- ✅ LoadingScreen component

### What to Enhance
- **Color Palette**: Richer cyber-festival palette with multiple accent colors
- **Motion Graphics**: Floating particles, ambient orbs, aurora effects, geometric shapes
- **Home Page → Hero Banner**: Full-width promotional banner below nav
- **Section Dividers**: Curved waves, gradient fades between sections
- **Global UI**: Glassmorphism, gradient borders, soft glow, hover effects
- **Team Section**: Complete redesign with hierarchical layout and role groups

---

## Plan

### Phase 1: Color Palette & CSS Foundation
**File: `src/index.css`**
- Update `@theme` with fuller palette:
  - Backgrounds: Midnight Navy (#081224), Deep Indigo (#111827), Soft Dark Purple (#1A1633)
  - Accents: Electric Cyan (#00E5FF), Royal Blue (#3B82F6), Neon Purple (#8B5CF6), Festival Orange (#FF8A00), Emerald Green (#10B981), Gold (#FFD166), Magenta (#FF4FCB)
- Add new animation keyframes:
  - `particle-float`: For floating particles
  - `aurora-shift`: For aurora gradient mesh movement
  - `orb-pulse`: For glowing orbs
  - `sparkle`: For sparkle effects
  - `confetti-fall`: For decorative confetti
  - `light-ray-sweep`: For slow-moving light rays
  - `geometric-rotate`: For floating geometric shapes
  - `gradient-mesh`: For animated gradient background
- Add new utility classes:
  - `.gradient-border-card`: Card with animated gradient border
  - `.section-divider-wave`: Curved wave divider
  - `.section-divider-blob`: Abstract blob divider
  - `.particle-container`: For particle backgrounds
  - `.aurora-bg`: For aurora effect backgrounds
- Add `@media (prefers-reduced-motion)` rules to respect user settings

**File: `tailwind.config.js`**
- Sync new colors and animations (compatible with v4's new approach)

### Phase 2: Motion Graphics Background System
**File: `src/layouts/MainLayout.tsx`**
- Add `FloatingParticles` component:
  - Canvas-based or CSS-based floating particles
  - GPU-accelerated transforms
  - Respects prefers-reduced-motion
- Add `AmbientOrbs` component:
  - Slow-moving gradient orbs with different accent colors
  - Blur effects for soft glow
- Add `AuroraBackground` component:
  - Animated gradient mesh overlay
  - Subtle movement using CSS/Framer Motion
- Add `GeometricShapes` component:
  - Floating triangles, hexagons, circles
  - Subtle rotate and float animations
- Integrate these into the global background (fixed position, z-index 0)

### Phase 3: Home Page Hero Banner
**File: `src/pages/Home.tsx`**
- Add `PromotionalBanner` section at the very top of Home (after PageWrapper opens, before HeroSection):
  - Full-width container
  - Large landscape image with `object-cover`
  - Soft gradient overlay (dark to transparent)
  - Rounded bottom corners
  - Elegant shadow
  - Glass overlay panel (for optional future content)
  - Responsive (different heights for mobile/tablet/desktop)
  - Lazy-loaded image
- Keep existing HeroSection but the new banner goes ABOVE it

### Phase 4: Section Dividers
**File: `src/pages/Home.tsx`**
- Add divider components between each section:
  - `WaveDivider` - SVG curved wave (inverted/alternating directions)
  - `GradientFade` - Simple gradient bar
  - `BlobDivider` - Abstract SVG blob shape
- Insert dividers between:
  - HeroSection → HighlightsSection
  - HighlightsSection → CategoriesSection
  - CategoriesSection → FeaturedStalls
  - FeaturedStalls → AboutPreview
  - AboutPreview → TestimonialsSection
  - TestimonialsSection → GallerySection
  - GallerySection → FooterTransition

### Phase 5: Global UI Enhancements
**File: `src/index.css`**
- Enhance `.glass-card` with:
  - Stronger gradient borders
  - Enhanced glow on hover
  - Subtle tilt on hover (using framer-motion or CSS)
  
**File: `src/layouts/MainLayout.tsx`**
- Enhance navigation with:
  - Gradient border bottom on scroll
  - Animated badge for "Register" CTA
  - Glassmorphism on mobile menu

### Phase 6: Team Section Redesign
**File: `src/data/team.ts`**
- Expand team data to 10+ members with hierarchy roles:
  - Event Head (1 person)
  - Managers (2 people)
  - Creative & Design (Designer, Graphics Lead)
  - Development Team (Developer)
  - Marketing & Media (Marketing Lead)
  - Operations & Volunteers (Operations, Volunteer Lead, Content Lead)
- Add `hierarchy` field to `TeamMember` interface
- Add `socials` optional field

**File: `src/components/MeetTheTeam.tsx`**
- Complete redesign with:
  - Hierarchical layout instead of flat grid
  - Section headings per role group (👑 Event Leadership, ⚙️ Management Team, 🎨 Creative & Design, 💻 Development Team, 📢 Marketing & Media, 🤝 Operations & Volunteers)
  - Featured card for Event Head (larger, centered)
  - Two-column layout for Managers
  - Grid for remaining roles
  - Framer Motion staggered entrance animations
  - Statistics counters with animated values
  - Premium glassmorphism throughout

**File: `src/components/TeamMemberCard.tsx`**
- Redesign with:
  - Premium glassmorphism card
  - Gradient border (animated on hover)
  - Glow effect on hover
  - Equal heights across rows
  - Elegant spacing
  - Smooth lift animation
  - Image zoom on hover
  - Circular profile photo with gradient ring
  - Role-based color coding
  - Social/contact icon placeholders

### Phase 7: Responsiveness & Performance
- Verify layouts at all breakpoints (320px → 1920px)
- Ensure no overflow, perfect spacing at all sizes
- Use responsive typography (clamp, vw units)
- Touch-friendly interactions (proper tap targets)
- Lazy load images
- GPU-accelerated transforms (will-change, translate3d)
- Pause off-screen animations using IntersectionObserver

---

## Files to Edit

| File | Changes |
|------|---------|
| `src/index.css` | Color palette update, new animations, utility classes, reduced-motion |
| `tailwind.config.js` | Sync colors and animation configs |
| `src/layouts/MainLayout.tsx` | Add particle background, ambient orbs, aurora effect, geometric shapes, enhanced nav |
| `src/pages/Home.tsx` | Add PromotionalBanner, Section dividers between all sections |
| `src/data/team.ts` | Expand team data with hierarchy, social fields, new members |
| `src/components/MeetTheTeam.tsx` | Complete hierarchical redesign |
| `src/components/TeamMemberCard.tsx` | Premium redesign with gradient borders, glow, hover effects |

## Files to Create

| File | Description |
|------|-------------|
| `src/components/FloatingParticles.tsx` | GPU-friendly particle system |
| `src/components/SectionDivider.tsx` | Reusable section divider (wave, blob, fade variants) |
| `src/components/PromotionalBanner.tsx` | Hero banner component for Home page |

## Follow-up Steps

1. Run `npm run dev` to verify no build errors
2. Test responsive layout at all specified breakpoints
3. Verify animations respect `prefers-reduced-motion`
4. Check performance with Lighthouse
5. Test interactive elements (accordions, modals, QR code, etc.)

