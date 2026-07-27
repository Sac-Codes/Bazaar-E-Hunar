import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skillBazaarLogo from '../assets/Skill_bazaar_logo.png';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-[9999] bg-[#050816] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Premium dark background aurora */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF8A00]/8 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD54A]/8 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00E5FF]/5 rounded-full blur-[100px] animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-cyber-grid opacity-[0.03]" />
        </div>

        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Logo with Premium Animation */}
          <div className="relative w-28 h-28 mb-8">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#FF8A00]/30 to-[#FFD54A]/20 rounded-2xl rotate-6"
              animate={{ rotate: [6, 12, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#8A5CFF]/20 rounded-2xl -rotate-3"
              animate={{ rotate: [-3, -8, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
              <img 
                src={skillBazaarLogo} 
                alt="SkillVerse logo" 
                className="w-full h-full object-cover scale-110" 
              />
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-2xl" />
            
            {/* Premium glow ring */}
            <div className="absolute -inset-3 rounded-[2rem] border border-[#FF8A00]/20 animate-pulse-glow" />
          </div>

          {/* Bilingual Brand Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-heading font-black text-white mb-1 tracking-tight"
          >
            हुनर बाजार
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-[#FFD54A] uppercase tracking-[0.25em] font-bold mb-10"
          >
            Hunar Bazaar 2026
          </motion.p>

          {/* Loading Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold mb-6"
          >
            Loading Experience
          </motion.p>

          {/* Premium Progress Bar */}
          <div className="w-72 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #FF8A00, #FFD54A, #FF8A00)',
                backgroundSize: '200% 100%',
                boxShadow: '0 0 10px rgba(255,138,0,0.5), 0 0 20px rgba(255,138,0,0.2)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
            {/* Progress glow */}
            <div 
              className="absolute top-0 right-0 w-20 h-full blur-md bg-[#FF8A00]/30 rounded-full"
              style={{ 
                opacity: progress > 10 ? 0.6 : 0,
                right: `${100 - progress}%`,
                transition: 'right 0.1s linear, opacity 0.3s ease',
              }}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm font-medium text-gray-600 font-mono"
          >
            {progress}%
          </motion.div>

          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-[10px] text-gray-700 uppercase tracking-[0.4em] font-bold"
          >
            Where Creativity Meets Entrepreneurship
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
