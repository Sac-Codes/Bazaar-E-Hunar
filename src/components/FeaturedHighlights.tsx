import { motion } from 'framer-motion';
import { Sparkles, Users, Zap, Trophy, Lightbulb, Palette, Gamepad2, Music } from 'lucide-react';

export const FeaturedHighlights = () => {
  const highlights = [
    { icon: Sparkles, title: '50+ Student Stalls', desc: 'Creative marketplace' },
    { icon: Users, title: 'Food Court', desc: 'Culinary delights' },
    { icon: Gamepad2, title: 'Games Arena', desc: 'Fun & entertainment' },
    { icon: Lightbulb, title: 'Innovation Zone', desc: 'Tech & ideas' },
    { icon: Palette, title: 'Art & Craft', desc: 'Creative expressions' },
    { icon: Music, title: 'Live Performances', desc: 'Entertainment' },
    { icon: Trophy, title: 'Awards & Prizes', desc: 'Recognition' },
    { icon: Zap, title: 'Special Attractions', desc: 'Surprises' },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Featured Highlights
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Experience the diverse attractions of SkillVerse 2026
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, idx) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-xl text-center">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-500"
                  >
                    <Icon size={32} className="text-primary group-hover:text-primary transition-colors" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 font-light">
                    {highlight.desc}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHighlights;
