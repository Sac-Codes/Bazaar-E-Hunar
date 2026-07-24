import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';

export const EventMemories = () => {
  const memories = [
    { id: 1, title: 'Student Stall Showcase', color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Creative Marketplace', color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Food Court Highlights', color: 'from-orange-500 to-red-500' },
    { id: 4, title: 'Gaming Arena', color: 'from-green-500 to-emerald-500' },
    { id: 5, title: 'Art Installations', color: 'from-pink-500 to-rose-500' },
    { id: 6, title: 'Tech Innovation Zone', color: 'from-indigo-500 to-blue-500' },
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
            Moments From Previous Editions
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Relive the excitement and energy from SkillVerse events past
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, idx) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Placeholder gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${memory.color} opacity-80`}></div>

              {/* Image placeholder with icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-500">
                <ImageOff size={48} className="text-white/60 mb-4" />
                <p className="text-white/80 text-center text-sm font-semibold px-4">Photo placeholder</p>
              </div>

              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-lg">{memory.title}</h3>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventMemories;
