# Hero Video Integration — Implementation Steps

## Step 1: Create `src/components/HeroVideo.tsx`
- [x] Import video from `../assets/Sacs_Back_Vid.mp4`
- [x] Build fullscreen video container with responsive heights
- [x] Dark gradient overlay (black 70% → transparent → black 60%)
- [x] Subtle orange/cyan glow overlays + aurora mesh
- [x] Video element with autoplay, muted, loop, playsInline, preload="metadata"
- [x] `object-fit: cover` for no black bars
- [x] Accept children prop for hero content
- [x] prefers-reduced-motion support
- [x] Framer Motion fade-in for video
- [x] GPU acceleration with will-change

## Step 2: Edit `src/pages/Home.tsx`
- [x] Import `HeroVideo`
- [x] Wrap `<HeroSection />` inside `<HeroVideo>...</HeroVideo>`

## Step 3: Verification
- [ ] `npm run build` passes
- [ ] No TypeScript errors

