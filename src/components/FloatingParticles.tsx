import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
  shape: 'circle' | 'dot' | 'sparkle';
}

const COLORS = [
  'rgba(255, 138, 0, 0.6)',   // Festival Orange
  'rgba(255, 213, 74, 0.5)',  // Warm Gold
  'rgba(138, 92, 255, 0.5)',  // Soft Violet
  'rgba(255, 77, 157, 0.5)',  // Magenta
  'rgba(0, 229, 255, 0.5)',   // Electric Cyan
  'rgba(45, 235, 155, 0.4)',  // Emerald
];

const FloatingParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const generateParticles = useCallback(() => {
    const { innerWidth: w, innerHeight: h } = window;
    const isMobile = w < 768;
    const particles: Particle[] = [];
    // Reduce particles on mobile and lower-powered devices
    const density = isMobile ? 30000 : 15000;
    const maxParticles = isMobile ? 12 : 45;
    const count = Math.min(Math.floor((w * h) / density), maxParticles);
    
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 2 : 3) + 1.5,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: !isMobile && Math.random() > 0.7 ? 'sparkle' : Math.random() > 0.5 ? 'dot' : 'circle',
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    generateParticles();
    
    const handleResize = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(generateParticles);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [generateParticles, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.shape === 'sparkle' ? particle.size * 3 : particle.size,
            height: particle.shape === 'sparkle' ? particle.size * 3 : particle.size,
          }}
          animate={{
            y: [0, -20, -40, -20, 0],
            x: [0, 10, 0, -10, 0],
            opacity: [0, particle.opacity, particle.opacity * 0.5, particle.opacity, 0],
            scale: particle.shape === 'sparkle' ? [0, 1, 0.5, 1, 0] : [1, 1.1, 1, 0.9, 1],
            rotate: particle.shape === 'sparkle' ? [0, 180, 360] : [0, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {particle.shape === 'sparkle' ? (
            <svg viewBox="0 0 24 24" fill={particle.color} className="w-full h-full">
              <path d="M12 0l1.5 9.5L23 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
            </svg>
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: particle.color,
                filter: 'blur(0.5px)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;

