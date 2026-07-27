import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import heroVideo from '../assets/Sacs_Back_Vid.mp4';
import posterImage from '../assets/hero.png';

interface HeroVideoProps {
  children: ReactNode;
}

/**
 * HeroVideo — Fullscreen background video wrapper.
 *
 * Wraps existing hero content above a cinematic autoplay video.
 * The video is always rendered and visible on mount — no opacity gating
 * that would prevent the browser's autoplay from firing.
 *
 * Responsive:
 * - Desktop: 100vh
 * - Tablet:  90vh
 * - Mobile:  80vh
 *
 * Accessibility:
 * - Detects prefers-reduced-motion; shows static poster instead
 */
const HeroVideo = ({ children }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Attempt autoplay immediately on mount (called from onLoadedData and useEffect)
  const tryPlay = useCallback(() => {
    if (videoRef.current && !reducedMotion) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — this is expected on some browsers.
        // The poster image will be visible until user interaction.
      });
    }
  }, [reducedMotion]);

  // Retry play on mount in case onLoadedData already fired
  useEffect(() => {
    if (!reducedMotion && videoRef.current) {
      // If the video already has enough data, play immediately
      const readyState = videoRef.current.readyState;
      if (readyState >= 2) {
        // HAVE_CURRENT_DATA or higher
        tryPlay();
      }
    }
  }, [reducedMotion, tryPlay]);

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#050816]">
      {/* ── Video / Poster Background ── */}
      <div className="absolute inset-0 z-0">
        {!reducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterImage}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            onLoadedData={tryPlay}
            onError={tryPlay} // fallback: still try to play
          >
            <source src={heroVideo} type="video/mp4" />
            <img
              src={posterImage}
              alt="Hunar Bazaar 2026"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
        ) : (
          <img
            src={posterImage}
            alt="Hunar Bazaar 2026 — Student Innovation Festival"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* ── Layer 1: Dark Gradient Overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,10,20,0.70)] via-transparent to-[rgba(5,10,20,0.60)] pointer-events-none" />

        {/* ── Layer 2: Subtle Orange Glow (top-left) ── */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[rgba(255,138,0,0.08)] to-transparent pointer-events-none" />

        {/* ── Layer 3: Cyan Glow (bottom-right) ── */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[rgba(0,229,255,0.06)] to-transparent pointer-events-none" />

        {/* ── Layer 4: Cyber Grid ── */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10 mix-blend-overlay pointer-events-none" />

        {/* ── Bottom fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
      </div>

      {/* ── Hero Content (rendered above video) ── */}
      <div className="relative z-10 min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen">
        {children}
      </div>
    </section>
  );
};

export default HeroVideo;
