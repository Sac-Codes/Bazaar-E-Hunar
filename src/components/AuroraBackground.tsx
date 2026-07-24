import { motion } from 'framer-motion';

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
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
        {/* Soft Gradient Mesh — Festival Palette */}
      {gradientMesh && (
        <motion.div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 30%, #FF8A00 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 80% 60%, #8A5CFF 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 40% 80%, #00E5FF 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 60% 20%, #FFD54A 0%, transparent 60%)
            `,
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: [
              '0% 50%', '50% 0%', '100% 50%', '50% 100%', '0% 50%',
            ],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Ambient Glowing Orbs — Festival Colors */}
      {orbs && (
        <>
          <motion.div
            className="absolute -top-[15%] -left-[10%] w-[45vw] h-[45vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,138,0,0.06) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              scale: [1, 1.1, 0.95, 1.05, 1],
              translateX: [0, 20, -15, 15, 0],
              translateY: [0, -15, 20, -10, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(138,92,255,0.05) 0%, transparent 70%)',
              filter: 'blur(120px)',
            }}
            animate={{
              scale: [1, 0.95, 1.1, 0.95, 1],
              translateX: [0, -30, 15, -15, 0],
              translateY: [0, 20, -20, 15, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          <motion.div
            className="absolute -bottom-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,213,74,0.04) 0%, transparent 70%)',
              filter: 'blur(120px)',
            }}
            animate={{
              scale: [1, 1.05, 0.9, 1.1, 1],
              translateX: [0, 20, -20, 10, 0],
              translateY: [0, -20, 15, -15, 0],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />

          <motion.div
            className="absolute top-[50%] left-[40%] w-[40vw] h-[40vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              scale: [1, 1.08, 0.92, 1.05, 1],
              translateX: [0, 15, -25, 10, 0],
              translateY: [0, -25, 15, -10, 0],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          />
        </>
      )}
    </div>
  );
};

export default AuroraBackground;

