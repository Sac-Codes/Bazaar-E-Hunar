import { motion } from 'framer-motion';

type DividerVariant = 'wave' | 'wave-reverse' | 'blob' | 'fade' | 'glow' | 'curve';

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
}

const SectionDivider = ({ variant = 'wave', className = '' }: SectionDividerProps) => {
  const renderSVG = () => {
    switch (variant) {
      case 'wave':
        return (
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="section-divider-svg">
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        );
      case 'wave-reverse':
        return (
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="section-divider-svg">
            <path d="M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60 L1440,120 L0,120 Z" />
          </svg>
        );
      case 'blob':
        return (
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="section-divider-svg">
            <path d="M0,80 C360,0 720,160 1440,40 L1440,120 L0,120 Z" />
            <path d="M0,95 C240,60 600,130 1440,70 L1440,120 L0,120 Z" fill="rgba(0,229,255,0.03)" />
          </svg>
        );
      case 'curve':
        return (
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="section-divider-svg">
            <path d="M0,80 Q360,160 720,80 Q1080,0 1440,80 L1440,120 L0,120 Z" />
          </svg>
        );
      case 'fade':
        return (
          <div className="w-full h-full bg-gradient-to-b from-transparent via-[#081020]/50 to-[#081020]" />
        );
      case 'glow':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent rounded-full" />
            <div className="absolute w-16 h-4 bg-[#00E5FF]/20 blur-xl rounded-full" />
          </div>
        );
      default:
        return (
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="section-divider-svg">
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        );
    }
  };

  // SVG-based dividers get the section-divider wrapper
  if (variant === 'fade' || variant === 'glow') {
    return (
      <div className={`relative w-full h-24 md:h-32 overflow-hidden pointer-events-none ${className}`}>
        {renderSVG()}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-20 md:h-28 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, scaleY: 0.8 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
      >
        {renderSVG()}
      </motion.div>
    </div>
  );
};

export default SectionDivider;

