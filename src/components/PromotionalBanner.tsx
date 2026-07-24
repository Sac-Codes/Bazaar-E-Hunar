import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import bannerImage from '../assets/sant-atulanand-convent-school_banner.jpg';

interface PromotionalBannerProps {
  imageUrl?: string;
  className?: string;
}

const PromotionalBanner = ({ 
  imageUrl = bannerImage,
  className = '' 
}: PromotionalBannerProps) => {
  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[40vh] md:h-[55vh] lg:h-[65vh] min-h-[280px] max-h-[650px] overflow-hidden"
      >
        {/* Background Image */}
        <img
          src={imageUrl}
          alt="SkillVerse 2026 — Bazaar-E-Hunar"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/60 via-transparent to-[#050816]/30" />
        
        {/* Cyber grid overlay */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20 mix-blend-overlay" />

        {/* Aurora color wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#8B5CF6]/10" />

        {/* Bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent" />

        {/* Glass Content Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16 z-10"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-4">
              <Calendar size={14} className="text-[#00E5FF]" />
              Coming Soon — 2026 Edition
              <MapPin size={14} className="text-[#FF8A00] ml-2" />
              Main Campus
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl">
              The Ultimate{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF4FCB]">
                Student Fair
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-300 mt-3 max-w-2xl font-medium">
              Where innovation meets celebration — 50+ stalls, live performances, tech showcases, and endless creativity.
            </p>
          </div>
        </motion.div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#00E5FF]/20 to-transparent" />
          <div className="absolute top-4 right-4 w-2 h-2 bg-[#00E5FF] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
        </div>

        {/* Top glass accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default PromotionalBanner;

