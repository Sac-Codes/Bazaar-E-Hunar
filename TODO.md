# Hunar Bazaar 2026 — Final Production Update TODO

## Phase 1: Stall Data ✅
- [x] Audit existing dataset (100 stalls, no duplicates)
- [x] 1 new valid stall found: "The craft corner" by Shreshtha
- [x] 3 invalid/spam entries rejected
- [x] 117 Excel rows analyzed, 103 existing matches, 10 duplicates removed

## Phase 2: Add S-101 Stall
- [ ] Append "The craft corner" as S-101 to stalls.ts

## Phase 3: Registration Closed
- [ ] Register.tsx — Replace with Registration Closed page
- [ ] Home.tsx — Hero badge, CTA buttons, CTA section
- [ ] MainLayout.tsx — Navbar, mobile menu, footer
- [ ] PromotionalBanner.tsx — Update timing text
- [ ] Stalls.tsx — Remove "Register Your Stall" from expanded card
- [ ] StallStatistics.tsx — Update "Registration Open" status
- [ ] Contact.tsx — Update bottom CTA
- [ ] FAQ.tsx — Update registration Q&A
- [ ] PromoPosters.tsx — Update "Registrations Open" text

## Phase 4: Stall Icons
- [ ] Verify icons fit (~85% badge, centered, no overflow) — VERIFIED OK

## Phase 5: Performance Optimization
- [ ] AuroraBackground.tsx — Add prefers-reduced-motion
- [ ] LoadingScreen.tsx — Add memo + useCallback
- [ ] StallStatistics.tsx — memoize components
- [ ] Gallery.tsx — Arrow functions, memo
- [ ] PageWrapper.tsx — Add memo

## Phase 6: Fix Broken Assets
- [ ] EventAbout.tsx — Fix Wecome_Hunar_bazaar.jpg → welcome_hunar_bazaar.jpg
- [ ] EventMemories.tsx — Fix case + missing images
- [ ] team.ts — Replace missing .JPG with dicebear avatars

## Phase 7: Build Verification
- [ ] npm run build (zero errors)

## Phase 8: Git Push
- [ ] Commit and push to bazaar/main
