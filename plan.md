# Verification Portal & Event Progress Timeline — Implementation Plan

## Information Gathered
- **Current state**: Registration Closed phase implemented across all components
- **Verification form URL**: `https://docs.google.com/forms/d/e/1FAIpQLSdswH0Q_CUdEJzsJco3B8BWMCz8ZBjmzh9v-YWFEvVb3ZuPjA/viewform?usp=dialog`
- **Event stages**: Registrations (✅ Completed) → Verification & Stall Allotment (🟠 Active) → Stall Setup (⚪ Upcoming) → Event Day (⚪ Upcoming) → Results & Certificates (⚪ Upcoming)
- **Existing analytics**: `trackEvent`, `trackRegisterClick`, `trackHeroCTA`, `trackExternalLink` functions available

## Plan

### 1. New Component: `src/components/EventTimeline.tsx`
- Premium animated timeline component
- Desktop: Horizontal layout
- Mobile: Vertical layout
- 5 stages with visual states (completed/active/upcoming)
- Framer Motion animations (node fade-in, connector animation, pulse on active)
- Respects `prefers-reduced-motion`
- GPU-accelerated via `transform: translate3d(0,0,0)`

### 2. New Analytics: `src/services/analytics.ts`
- Add `trackVerificationFormOpen(source: string)` function
- Add `trackVerificationCTA(source: string)` function

### 3. New File: `src/pages/Register.tsx` — Complete Redesign
- Page order: Status Card → Event Timeline → Verification Card → Help Card
- Status Card: "Current Event Status — Verification & Stall Allotment Phase"
- Verification Card: "Verification & Stall Allotment Portal" with CTA button to Google Form
- Help Card: Contact coordinators
- Verification Form opens in new tab with `target="_blank"` `rel="noopener noreferrer"`
- No direct Google Form redirect

### 4. Update: `src/pages/Home.tsx`
- Hero badge: "🟠 Verification Phase Active"
- CTA buttons: "Register Now" → "Team Verification" (links to /register)
- CTASection: Update text to verification phase messaging
- Track verification CTA clicks

### 5. Update: `src/layouts/MainLayout.tsx`
- Navbar: "Registration Closed" → "Verification" (links to /register)
- Mobile menu: "Registration Closed" → "Verification" (links to /register)
- Footer: "Registration Closed" → "Verification Portal" (links to /register)

### 6. Update: `src/components/PromotionalBanner.tsx`
- Badge: "Coming Soon — 2026 Edition" → "Team Verification Now Open"
- Heading: Update to verification messaging
- Button: "Complete Verification" linking to /register

### 7. Update: `src/components/PromoPosters.tsx`
- First poster: "Registrations Open" → "Verification & Stall Allotment"
- Update icon/color to match verification phase

### 8. Update: `src/pages/Contact.tsx`
- Footer CTA: "Registrations Are Now Closed" → "Proceed to Verification"
- Link to /register

### 9. Update: `src/pages/FAQ.tsx`
- Add new FAQ items about verification phase
- Keep existing registration FAQs but note they're archived

### 10. Update: `src/pages/Stalls.tsx`
- Minor: Update the "Registration Closed" badge in expanded details to reference verification

## Dependent Files
- `src/components/EventTimeline.tsx` (NEW)
- `src/pages/Register.tsx` (REWRITE)
- `src/pages/Home.tsx` (EDIT)
- `src/layouts/MainLayout.tsx` (EDIT)
- `src/components/PromotionalBanner.tsx` (EDIT)
- `src/components/PromoPosters.tsx` (EDIT)
- `src/pages/Contact.tsx` (EDIT)
- `src/pages/FAQ.tsx` (EDIT)
- `src/pages/Stalls.tsx` (EDIT)
- `src/services/analytics.ts` (EDIT)

## Followup Steps
1. Run `npm run build` to verify zero errors
2. Git add, commit, push to bazaar/main
