import { motion } from 'framer-motion';
import { Calendar, Award, Users, Megaphone } from 'lucide-react';

export const PromoPosters = () => {
  const posters = [
    { id: 1, title: 'Registrations Open', icon: Megaphone, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Event Schedule', icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Prize Pool', icon: Award, color: 'from-orange-500 to-red-500' },
    { id: 4, title: 'Join the Community', icon: Users, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
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
            Event Announcements
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Stay updated with the latest information about SkillVerse 2026
          </p>
        </motion.div>

        {/* Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posters.map((poster, idx) => {
            const Icon = poster.icon;
            return (
              <motion.div
                key={poster.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div className={`relative h-56 rounded-2xl bg-gradient-to-br ${poster.color} p-8 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end`}>
                  {/* Animated background blob */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="mb-6"
                  >
                    <Icon size={40} className="text-white/80 group-hover:text-white transition-colors" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-white transition-colors">
                    {poster.title}
                  </h3>

                  {/* Glass border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/50 transition-all duration-500"></div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoPosters;
