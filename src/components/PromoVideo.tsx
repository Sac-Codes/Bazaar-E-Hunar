import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const PromoVideo = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Experience SkillVerse
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Watch how SkillVerse transforms ideas into reality
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          {/* Video placeholder */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Gradient background for video placeholder */}
            <div className="aspect-video bg-gradient-to-br from-gray-900 via-primary/40 to-secondary/40 flex items-center justify-center relative">
              {/* Video background image simulation */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop')] bg-cover bg-center opacity-30"></div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500"></div>

              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110">
                  <Play size={40} className="text-white fill-white ml-1" />
                </div>
              </motion.div>

              {/* Play text */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Click to watch promotional video
              </div>
            </div>

            {/* Glowing border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-primary/50 transition-all duration-500"></div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 -z-10"></div>
          </div>

          {/* YouTube embed placeholder (can be replaced with actual iframe) */}
          <div className="hidden">
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="SkillVerse Promotional Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Info text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Discover the magic of SkillVerse 2026 and get inspired to showcase your creativity and entrepreneurial spirit.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoVideo;
