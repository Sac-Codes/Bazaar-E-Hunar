# Hunar Bazaar 2026 — Final Production Update Plan

## Information Gathered

**Project**: React 19 + Vite + TypeScript + Tailwind CSS + Framer Motion + Firebase + GA4  
**Current stalls**: 92 stalls in `stalls.ts` (IDs S-001 to S-092)  
**Stall categories**: Arts & Crafts, Bakery & Desserts, Books & Stationery, Food & Beverages, Games & Activities, Handmade Accessories, Others  
**Excel file**: `src/assets/Hunar Bazaar 2026 (Responses).xlsx` — contains all registration data  
**Existing verification scripts**: Multiple `.cjs` files in root that analyzed previous Excel files

## Plan

### Phase 1: Final Student Response Verification
- Write comprehensive verification script to parse the existing `Hunar Bazaar 2026 (Responses).xlsx`
- Compare all entries against the 92 current stalls
- Apply validation rules: spam detection, duplicate detection, latest timestamp rule
- Only append genuinely new stalls, update existing stalls with latest valid info
- Preserve stall IDs, categories, and all UI features

### Phase 2: Registration Closed Implementation
- Update all registration UI elements across the site:
  - Home.tsx: Hero badge, CTA buttons, text
  - Register.tsx: Full page replacement with Registration Closed notice
  - MainLayout.tsx: Navbar "Register Stall" button, mobile menu, footer CTA
  - PromotionalBanner.tsx: Update timing text
  - Stalls.tsx: Remove "Register Your Stall" from expanded details
  - StallStatistics.tsx: Update "Registration Open" status
  - Contact.tsx: Update CTA at bottom
- Show professional "Registration Closed" notice with organizing committee message

### Phase 3: Stall Icon Polish
- Fix icon rendering in circular badges in Stalls.tsx
- Ensure icons stay within container (80-90% occupancy)
- No clipping, no overflow, no stretching
- Consistent across all categories

### Phase 4: Performance Optimization
- Add React.memo to appropriate components
- Use useMemo/useCallback where beneficial
- Optimize animations: FloatingParticles, FloatingOrbs, AuroraBackground
- HeroVideo optimizations
- Mobile responsiveness improvements
- Respect prefers-reduced-motion

### Phase 5: Production Audit
- Verify all pages: Home, About, Gallery, Stalls, Register, Rules, FAQ, Contact, EventMap
- Verify components: HeroVideo, LoadingScreen, Navbar, Footer, Firebase, GA, SEO
- Check for broken imports, missing assets, console errors, TypeScript errors

### Phase 6: Production Build & Git Push
- Run `npm run build` — zero errors
- Push to GitHub repo `Sac-Codes/Bazaar-E-Hunar`

## Files to Modify
1. `src/data/stalls.ts` — Update with verified data
2. `src/pages/Home.tsx` — Registration closed UI
3. `src/pages/Register.tsx` — Full registration closed page
4. `src/layouts/MainLayout.tsx` — Navbar/footer CTA updates
5. `src/components/PromotionalBanner.tsx` — Text update
6. `src/components/StallStatistics.tsx` — Status update
7. `src/pages/Stalls.tsx` — Icon fix + remove register CTA
8. `src/pages/Contact.tsx` — CTA update
9. `src/pages/FAQ.tsx` — Registration reference update
10. `src/components/FloatingParticles.tsx` — Performance optimization
11. `src/components/FloatingOrbs.tsx` — Performance optimization
12. `src/components/AuroraBackground.tsx` — Performance optimization
13. `src/components/HeroVideo.tsx` — Performance optimization
14. `src/components/LoadingScreen.tsx` — Performance optimization

