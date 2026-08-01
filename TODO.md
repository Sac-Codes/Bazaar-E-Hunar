# TS6133 Build Fix — Current Task

## Step 1: Fix EventTimeline.tsx
- [x] Remove unused `isUpcoming` local variable in TimelineNode
- [x] Integrate `prefersReducedMotion` into connector/node animations
- [x] Apply reduced-motion handling to remaining animations

## Step 2: Fix Register.tsx
- [x] Remove unused `ArrowRight` and `Mail` imports

## Step 3: Build Verification
- [x] npm run build (zero TS errors, zero Vite errors)

## Step 4: Git Push
- [ ] git add, commit, push to bazaar/main

---

# Verification Portal — Implementation Checklist

## Phase 1: Event Progress Timeline
- [ ] Create src/components/EventTimeline.tsx

## Phase 2: Analytics
- [ ] Add verification tracking functions to analytics.ts

## Phase 3: Register Page → Verification Portal
- [ ] Rewrite src/pages/Register.tsx

## Phase 4: Workflow Update
- [ ] Update Home.tsx (hero badge, CTAs, CTASection)
- [ ] Update MainLayout.tsx (navbar, mobile menu, footer)
- [ ] Update PromotionalBanner.tsx
- [ ] Update PromoPosters.tsx
- [ ] Update Contact.tsx
- [ ] Update FAQ.tsx
- [ ] Update Stalls.tsx

## Phase 5: Build Verification
- [ ] npm run build (zero errors)

## Phase 6: Git Push
- [ ] git add, commit, push to bazaar/main
