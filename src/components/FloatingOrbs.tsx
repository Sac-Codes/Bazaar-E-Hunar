import { motion } from 'framer-motion';

interface FloatingOrbsProps {
  className?: string;
}

const FloatingOrbs = ({ className = '' }: FloatingOrbsProps) => {
  const orbs = [
    {
      size: 'w-16 h-16',
      color: 'bg-gradient-to-br from-[#00E5FF]/20 to-transparent',
      border: 'border border-[#00E5FF]/30',
      glow: 'shadow-[0_0_30px_rgba(0,229,255,0.15)]',
      position: 'top-[12%] left-[8%]',
      animX: [0, 20, -15, 10, 0],
      animY: [0, -15, 20, -10, 0],
      duration: 14,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" className="opacity-40">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" />
        </svg>
      ),
    },
    {
      size: 'w-20 h-20',
      color: 'bg-gradient-to-br from-[#8B5CF6]/20 to-transparent',
      border: 'border border-[#8B5CF6]/30',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.15)]',
      position: 'top-[25%] right-[12%]',
      animX: [0, -25, 15, -10, 0],
      animY: [0, 20, -15, 25, 0],
      duration: 18,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" className="opacity-40">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      ),
    },
    {
      size: 'w-14 h-14',
      color: 'bg-gradient-to-br from-[#FF8A00]/20 to-transparent',
      border: 'border border-[#FF8A00]/30',
      glow: 'shadow-[0_0_30px_rgba(255,138,0,0.15)]',
      position: 'bottom-[20%] left-[15%]',
      animX: [0, 15, -20, 10, 0],
      animY: [0, -20, 10, -15, 0],
      duration: 16,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" strokeWidth="1.5" className="opacity-40">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      size: 'w-18 h-18',
      color: 'bg-gradient-to-br from-[#FF4FCB]/20 to-transparent',
      border: 'border border-[#FF4FCB]/30',
      glow: 'shadow-[0_0_30px_rgba(255,79,203,0.15)]',
      position: 'bottom-[30%] right-[8%]',
      animX: [0, -15, 25, -10, 0],
      animY: [0, 15, -20, 10, 0],
      duration: 20,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4FCB" strokeWidth="1.5" className="opacity-40">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
      ),
    },
    {
      size: 'w-12 h-12',
      color: 'bg-gradient-to-br from-[#10B981]/20 to-transparent',
      border: 'border border-[#10B981]/30',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      position: 'top-[45%] left-[5%]',
      animX: [0, 10, -15, 5, 0],
      animY: [0, -10, 15, -5, 0],
      duration: 12,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5" className="opacity-40">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      size: 'w-24 h-24',
      color: 'bg-gradient-to-br from-[#3B82F6]/15 to-transparent',
      border: 'border border-[#3B82F6]/20',
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.1)]',
      position: 'top-[55%] right-[5%]',
      animX: [0, -30, 15, -20, 0],
      animY: [0, 25, -30, 15, 0],
      duration: 22,
      icon: null,
    },
  ];

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.position} ${orb.size} ${orb.color} ${orb.border} ${orb.glow} rounded-full flex items-center justify-center backdrop-blur-sm`}
          animate={{
            x: orb.animX,
            y: orb.animY,
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 1.5,
          }}
        >
          {orb.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingOrbs;

