# Event Map Enhancement — Implementation Checklist

## Task
Enhance the existing Hunar Bazaar 2026 custom 2D Event Map (premium look, interactivity, search, legend, mobile) while preserving ALL map accuracy.

## Steps
- [x] 1. Analyze existing EventMap.tsx, eventMap.css, stalls.ts, analytics.ts + confirm plan
- [x] 2. Add `trackMapStallSelect` analytics helper (reuse trackEvent)
- [ ] 3. Enhance `src/components/EventMap/EventMap.tsx`:
       - [ ] Preserve entire SVG map geometry/zones/paths/gates/buildings unchanged
       - [ ] Premium header (EVENT MAP + description)
       - [ ] Search toolbar (by name/code) -> info card + zoom/highlight
       - [ ] Stall markers overlay anchored to real zone regions (grid), color-coded by category
       - [ ] Important-location pins (Main Entrance/Gates, Stage, Basketball Court, Ground, Hostel, Baal Vatika, A/B-Block)
       - [ ] Category legend (emojis) + collapsible on mobile
       - [ ] Info card (glassmorphism) with verified stall data only
       - [ ] Improved zoom/pan controls + zoom-to-stall
       - [ ] Framer Motion entrance + transitions, respects prefers-reduced-motion
       - [ ] useMemo/useCallback/React.memo for marker performance
- [ ] 4. Enhance `src/components/EventMap/eventMap.css`:
       - [ ] Toolbar, search dropdown, markers, pins, info card, legend, mobile fixes
- [ ] 5. Run `npm run build` — fix all TS/Vite errors, unused imports, broken assets
- [ ] 6. Verify desktop + mobile, search (name/code), marker selection, zoom/pan, reset, legend, pins, no overflow, no console errors
- [ ] 7. Provide summary report (no GitHub push unless requested)
