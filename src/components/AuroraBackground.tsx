import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AuroraBackgroundProps {
  orbs?: boolean;
  gradientMesh?: boolean;
  className?: string;
}

const AuroraBackground = ({ 
  orbs = true, 
  gradientMesh = true,
  className = '' 
}: AuroraBackgroundProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div 
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-[#FF8A00] via-[#8A5CFF] to-[#00E5FF]" />
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Soft Gradient Mesh — Premium Festival Palette */}
      {gradientMesh && (
        <motion.div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 15% 25%, #FF8A00 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 80% 65%, #8A5CFF 0%, transparent 65%),
              radial-gradient(ellipse 55% 45% at 45% 80%, #00E5FF 0%, transparent 65%),
              radial-gradient(ellipse 45% 35% at 70% 30%, #FFD54A 0%, transparent 55%),
              radial-gradient(ellipse 50% 40% at 30% 70%, #FF4D9D 0%, transparent 60%)
            `,
            backgroundSize: '250% 250%',
          }}
          animate={{
            backgroundPosition: [
              '0% 50%', '50% 0%', '100% 50%', '50% 100%', '0% 50%',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Ambient Glowing Orbs — Premium Festival Colors */}
      {orbs && (
        <>
          <motion.div
            className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,138,0,0.08) 0%, transparent 70%)',
              filter: 'blur(120px)',
            }}
            animate={{
              scale: [1, 1.12, 0.95, 1.08, 1],
              translateX: [0, 25, -18, 18, 0],
              translateY: [0, -18, 22, -12, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute top-[25%] -right-[15%] w-[55vw] h-[55vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(138,92,255,0.06) 0%, transparent 70%)',
              filter: 'blur(130px)',
            }}
            animate={{
              scale: [1, 0.95, 1.12, 0.95, 1],
              translateX: [0, -35, 18, -20, 0],
              translateY: [0, 25, -22, 18, 0],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          <motion.div
            className="absolute -bottom-[20%] left-[5%] w-[55vw] h-[55vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,213,74,0.05) 0%, transparent 70%)',
              filter: 'blur(130px)',
            }}
            animate={{
              scale: [1, 1.08, 0.9, 1.12, 1],
              translateX: [0, 25, -25, 15, 0],
              translateY: [0, -25, 18, -18, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />

          <motion.div
            className="absolute top-[55%] left-[35%] w-[45vw] h-[45vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
              filter: 'blur(110px)',
            }}
            animate={{
              scale: [1, 1.1, 0.92, 1.06, 1],
              translateX: [0, 20, -28, 12, 0],
              translateY: [0, -28, 18, -12, 0],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          />

          <motion.div
            className="absolute top-[10%] left-[55%] w-[30vw] h-[30vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,77,157,0.04) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
            animate={{
              scale: [1, 0.9, 1.1, 0.95, 1],
              translateX: [0, 30, -15, 20, 0],
              translateY: [0, 15, -25, 10, 0],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
          />
        </>
      )}
    </div>
  );
};

export default AuroraBackground;

