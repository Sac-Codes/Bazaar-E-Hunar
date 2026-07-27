import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import entryImage from '../assets/Wecome_Hunar_bazaar.jpg';

export const EventAbout = () => {
  return (
    <section className="py-20 md:py-32 bg-section-purple-cyan relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Event image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96 md:h-full min-h-[400px] border border-white/5">
              <img
                src={entryImage}
                alt="Hunar Bazaar 2026 — Welcome"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A00]/20 via-[#8A5CFF]/20 to-[#FF4D9D]/20"></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/50 to-transparent group-hover:from-[#050816]/40 transition-all duration-500"></div>

              {/* Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm">
                Since 2024
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#FF8A00] via-[#8A5CFF] to-[#FF4D9D] rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10"></div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FF8A00] font-semibold text-sm mb-6"
            >
              <Sparkles size={16} />
              About Hunar Bazaar
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
            >
              Where Creativity Meets <span className="text-gradient-warm">Entrepreneurship</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 font-medium mb-8 leading-relaxed"
            >
              Hunar Bazaar is the annual student entrepreneurship festival where creativity, innovation, leadership, and business come together to transform ideas into reality. Our mission is to empower students to showcase their talents, learn real-world business skills, and build lasting connections with peers and mentors.
            </motion.p>

            {/* Key points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-4 mb-10"
            >
              {[
                'Create your own business stall',
                'Learn real entrepreneurial skills',
                'Earn profits from your venture',
                'Network with fellow innovators'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8A00] to-[#FFD54A] flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight size={14} className="text-[#07111F]" />
                  </div>
                  <p className="text-gray-300 font-medium">{point}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button className="btn-premium text-lg px-8 py-4 group">
                Learn More
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventAbout;
