# Hunar Bazaar 2026 — Final Production Update TODO

## Phase 1: Final Stall Verification ✅
- [x] S-101 "The craft corner" added to stalls.ts
- [x] 101 total stalls (S-001 to S-101)
- [x] Duplicates removed, spam-filtered

## Phase 2: Registration Closed ✅
- [x] Home.tsx — Updated badge, CTA buttons, CTASection
- [x] Register.tsx — Replaced with Registration Closed page
- [x] MainLayout.tsx — Updated navbar, mobile menu, footer
- [x] Stalls.tsx — Removed "Register Your Stall", added "Registration Closed"
- [x] StallStatistics.tsx — Updated to "🔴 Registration Closed — Under Verification"
- [x] Contact.tsx — Updated bottom CTA section
- [x] PromotionalBanner.tsx — "Coming Soon" is about event, not registration

## Phase 3: Performance Optimization
- [ ] AuroraBackground.tsx — Add prefers-reduced-motion
- [ ] LoadingScreen.tsx — Add React.memo + useCallback
- [ ] StallStatistics.tsx — Memoize AnimatedCounter/ProgressBar

## Phase 4: Build Verification
- [ ] npm run build (zero errors)

## Phase 5: Git Push
- [ ] Push to Sac-Codes/Bazaar-E-Hunar
