import { motion } from 'framer-motion';
import { useState } from 'react';

import games1 from '../assets/Games_1.jpg';
import games2 from '../assets/Games_2.jpg';
import diy1 from '../assets/diy_stall_image1.jpg';
import diy2 from '../assets/diy_stall_image2.jpg';
import diy3 from '../assets/diy_stall_image3.jpg';
import stallArea from '../assets/welcome_to_stall_Area.jpg';
import entryWelcome from '../assets/Wecome_Hunar_bazaar.jpg';

const memoryImages = [
  { src: games1, title: 'Game Zone — Fun & Entertainment' },
  { src: diy1, title: 'DIY Creations — Student Showcase' },
  { src: stallArea, title: 'Stall Area — Bustling Marketplace' },
  { src: diy2, title: 'Creative Workshops — Hands-on Learning' },
  { src: entryWelcome, title: 'Welcome Experience — Grand Entrance' },
  { src: diy3, title: 'Handmade Crafts — Art & Creativity' },
  { src: games2, title: 'Gaming Arena — Friendly Competition' },
];

export const EventMemories = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

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
            Relive the excitement and energy from Hunar Bazaar events past
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memoryImages.map((memory, idx) => {
            const isLoaded = loadedImages.has(idx);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Shimmer placeholder */}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}

                {/* Actual event image */}
                <img
                  src={memory.src}
                  alt={memory.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(idx)}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg drop-shadow-lg">{memory.title}</h3>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventMemories;
