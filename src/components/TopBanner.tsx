import { motion } from 'framer-motion';
import bannerImage from '../assets/sant-atulanand-convent-school_banner.jpg';

export const TopBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Banner background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-96 md:h-[500px] w-full overflow-hidden"
      >
        {/* School campus background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300">
          <img
            src={bannerImage}
            alt="Sant Atulanand Convent School — Hunar Bazaar 2026"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            loading="lazy"
          />
        </div>

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>

        {/* Branding section - positioned in banner */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-8"
          >
            {/* Logo section */}
            <div className="flex items-center justify-center gap-6 md:gap-12">
              {/* School Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl">🏫</div>
              </motion.div>

              {/* Student Council Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl">👥</div>
              </motion.div>

              {/* SkillVerse Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <span className="font-heading font-black text-white text-2xl md:text-3xl">SV</span>
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4 tracking-tight">
                Hunar Bazaar 2026
              </h1>
              <p className="text-lg md:text-2xl text-white/90 font-light tracking-wide">
                Create • Innovate • Celebrate
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <div className="text-sm font-semibold uppercase tracking-widest mb-2">Scroll to explore</div>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent mx-auto"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TopBanner;
