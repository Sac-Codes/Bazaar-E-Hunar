import { useRef, useEffect, useState, useCallback, memo, type ReactNode } from 'react';
import heroVideo from '../assets/Sacs_Back_Vid.mp4';
import posterImage from '../assets/hero.png';

interface HeroVideoProps {
  children: ReactNode;
}

/**
 * HeroVideo — GPU-accelerated fullscreen background video wrapper.
 *
 * Optimizations:
 * - GPU-accelerated rendering via `translate3d` + `will-change` on parent
 * - Preloads video metadata instantly, loads full video on mount
 * - Autoplays immediately with muted + playsInline for mobile
 * - Never restarts on navigation (persists via ref)
 * - Detects prefers-reduced-motion; shows static poster instead
 * - Memoized to prevent unnecessary re-renders
 */
const HeroVideo = memo(({ children }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Attempt autoplay immediately
  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (video && !reducedMotion && video.readyState >= 2) {
      video.play().catch(() => {
        // Autoplay blocked — poster visible until user interaction
      });
    }
  }, [reducedMotion]);

  // Start playing as soon as enough data is buffered
  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    tryPlay();
  }, [tryPlay]);

  // Retry play on mount if video already has data
  useEffect(() => {
    if (!reducedMotion && videoRef.current) {
      if (videoRef.current.readyState >= 2) {
        setVideoReady(true);
        tryPlay();
      }
    }
  }, [reducedMotion, tryPlay]);

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#050816] will-change-transform">
      {/* ── GPU-Accelerated Video / Poster Background ── */}
      <div className="absolute inset-0 z-0" style={{ transform: 'translate3d(0,0,0)' }}>
        {!reducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterImage}
            className={`absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-300 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            onCanPlay={handleCanPlay}
            onLoadedMetadata={handleCanPlay}
            onError={tryPlay}
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : null}

        {/* Static poster image (always visible as fallback) */}
        <img
          src={posterImage}
          alt="Hunar Bazaar 2026 — Student Innovation Festival"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoReady && !reducedMotion ? 'opacity-0' : 'opacity-100'}`}
          loading="eager"
          decoding="async"
        />

        {/* ── Layer 1: Dark Gradient Overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,10,20,0.70)] via-transparent to-[rgba(5,10,20,0.60)] pointer-events-none" />

        {/* ── Layer 2: Subtle Orange Glow (top-left) ── */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[rgba(255,138,0,0.08)] to-transparent pointer-events-none" />

        {/* ── Layer 3: Cyan Glow (bottom-right) ── */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[rgba(0,229,255,0.06)] to-transparent pointer-events-none" />

        {/* ── Layer 4: Cyber Grid — subtle, GPU-friendly ── */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10 mix-blend-overlay pointer-events-none" style={{ transform: 'translate3d(0,0,0)' }} />

        {/* ── Bottom fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
      </div>

      {/* ── Hero Content (rendered above video) ── */}
      <div className="relative z-10 min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen">
        {children}
      </div>
    </section>
  );
});

HeroVideo.displayName = 'HeroVideo';

export default HeroVideo;
