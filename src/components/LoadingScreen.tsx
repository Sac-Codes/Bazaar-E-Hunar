import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skillBazaarLogo from '../assets/Skill_bazaar_logo.png';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds minimum loading time
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
        }, 400); // Wait a bit after reaching 100%
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background blobs for premium feel */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Logo Animation */}
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl rotate-6 animate-pulse-slow"></div>
            <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden">
              <img src={skillBazaarLogo} alt="SkillVerse logo" className="w-full h-full object-cover" />
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 tracking-tight">
            Bazaar-E-Hunar 2026
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-12">
            Loading Experience
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          
          <div className="mt-4 text-sm font-medium text-gray-400 font-mono">
            {progress}%
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
