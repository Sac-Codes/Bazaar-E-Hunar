# Implementation Plan — Hunar Bazaar 2026 Updates

## Information Gathered

### Current State
- **Stalls**: 50 stalls (S-001 to S-050) in `src/data/stalls.ts`
- **Gallery**: Broken imports referencing non-existent files (`Wecome_Hunar_bazaar.jpg` typo, missing diy/Games images)
- **Contact**: Sneha Ma'am (Teacher), Sachin (Student) — need Jitendra Sir & Krishna Sir
- **Hero Video**: `Sacs_Back_Vid.mp4` — needs performance fixes
- **New Excel**: `Hunar Bazaar 2026 (Responses) (3).xlsx` with 86 raw responses, 25 in "Valid Responses" sheet
- **New Gallery Images**: `photo-collage.png.png`, `photo-collage.png (1).png`, `photo-collage.png (2).png`, `welcome_hunar_bazaar.jpg`
- **Performance**: Code splitting already in App.tsx, but animations and renders can be optimized

### Key Findings
1. Gallery.tsx imports images that don't exist on disk — needs complete rebuild with available collage images
2. The "Valid Responses" sheet (25 entries) contains pre-filtered data — most are existing stalls
3. Several new stalls exist in the Form Responses that aren't in the current dataset
4. Phone numbers for teachers are partially hidden ("-") — need to add with proper formatting

---

## Plan

### Step 1: Write a stall comparison script
- Parse the new Excel, extract Valid Responses (25 entries)
- Compare each entry against existing `stallsData` (50 stalls)
- Detect duplicates by: Team name, Stall title, Phone, Members, Category
- Merge duplicates using earliest timestamp
- Flag invalid entries (random, spam, incomplete, testing, etc.)
- Generate only genuinely new stalls

### Step 2: Update `src/data/stalls.ts` with new stalls
- Append only new valid stalls with next available IDs (S-051 onwards)
- Preserve existing IDs and data
- Update the auto-generated comment header

### Step 3: Update Contact page (`src/pages/Contact.tsx`)
- Add Jitendra Sir and Krishna Sir as Teacher Incharges
- Same design pattern as existing teacher card
- Use `Phone`, `User` icons from lucide-react
- Maintain spacing, responsive layout

### Step 4: Rebuild Gallery (`src/pages/Gallery.tsx`)
- Replace all old image imports with new collage images
- `welcome_hunar_bazaar.jpg` as first/featured/largest image
- Collage images: `photo-collage.png.png`, `photo-collage.png (1).png`, `photo-collage.png (2).png`
- Premium masonry layout with balanced sizes
- Hover zoom, lazy loading, fade animations
- Improved lightbox with minimal overlay

### Step 5: Optimize Hero Video (`src/components/HeroVideo.tsx`)
- Ensure correct preload, autoplay, muted, loop, playsInline
- GPU acceleration with `will-change-transform`
- Prevent video restart on navigation using mounted state tracking
- Optimize mobile playback

### Step 6: Performance Optimization (across components)
- **React.memo** on StallStatistics, TeamMemberCard, FeaturedHighlights
- **useMemo/useCallback** for expensive computations in Stalls.tsx
- **Lazy-load** Gallery, EventMap pages (already done in App.tsx)
- **Framer Motion**: Replace layout-heavy animations with transform/opacity
- **Images**: Add `loading="lazy"`, `decoding="async"` to all local images
- **Reduce re-renders**: Memoize filtered stalls, statistics calculations
- **Optimize FloatingParticles**: Reduce particle count on mobile, use `will-change`
- **Optimize FloatingOrbs**: Reduce orbs count on mobile

### Step 7: Responsive Fixes & Code Quality
- Review layouts for all breakpoints (320px-1920px)
- Remove console logs, unused imports
- Ensure TypeScript strictness
- Clean up temp script files

### Step 8: Build Verification
- Run `npm run build`
- Fix any TS errors, Vite errors, broken imports

### Dependent Files to Edit:
1. `src/data/stalls.ts` — Add new stalls
2. `src/pages/Contact.tsx` — Add teacher incharges
3. `src/pages/Gallery.tsx` — Rebuild with new images
4. `src/components/HeroVideo.tsx` — Performance optimization
5. `src/components/StallStatistics.tsx` — Memo optimization
6. `src/components/FloatingParticles.tsx` — Mobile optimization
7. `src/components/FloatingOrbs.tsx` — Mobile optimization
8. `src/components/FeaturedHighlights.tsx` — Memo optimization (check if exists)

### Follow-up Steps:
1. Clean up temporary scripts (parse-new-excel-temp.cjs, check-valid-sheet.cjs)
2. Build & verify
3. Test all existing features

