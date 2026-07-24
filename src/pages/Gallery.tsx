import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import suyashImage from '../assets/suyash_ds.JPG';

const Gallery = () => {
  const images = [
    { id: 1, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Event Hall', size: 'large', glow: 'hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]' },
    { id: 2, url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Food Stall', size: 'small', glow: 'hover:shadow-[0_0_30px_rgba(255,138,0,0.4)]' },
    { id: 3, url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Students interacting', size: 'small', glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]' },
    { id: 4, url: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Presentation', size: 'medium', glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]' },
    { id: 5, url: 'https://images.unsplash.com/photo-1523580494112-071dcb851aa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Crowd', size: 'medium', glow: 'hover:shadow-[0_0_30px_rgba(255,79,203,0.4)]' },
  ];

  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Header */}
      <section className="pt-32 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4FCB]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,79,203,0.3)]"
          >
            Visual Data Archives
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl font-medium max-w-2xl mx-auto"
          >
            Encrypted memories from previous cycles and sneak peeks of what's to come.
          </motion.p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="container mx-auto px-4 md:px-8 -mt-16 relative z-20 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] group cursor-pointer max-w-5xl mx-auto border-[2px] border-white/10 hover:border-[#00E5FF]/50 transition-colors duration-500"
        >
          <div className="aspect-video bg-[#050816] relative">
            {/* Cyber Overlay effect */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 z-10 pointer-events-none mix-blend-overlay"></div>
            
            <img 
              scr = "../assets/suyash_ds.JPG"
              alt="SkillVerse Aftermovie" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/20 to-transparent z-10"></div>
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00E5FF]/10 transition-all duration-500 border border-white/20 group-hover:border-[#00E5FF]/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="w-16 h-16 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#050816] shadow-[0_0_30px_rgba(0,229,255,0.6)]">
                  <Play size={24} className="ml-2 font-black" />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 left-10 text-white z-20">
              <h3 className="text-3xl font-black mb-2 tracking-tight group-hover:text-[#00E5FF] transition-colors">SkillVerse 2026 Simulation Log</h3>
              <p className="text-gray-400 font-medium">Relive the raw energy of the previous cycle.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Masonry Image Grid */}
      <section className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
          {images.map((img, index) => {
            const colSpan = img.size === 'large' ? 'md:col-span-8' : img.size === 'medium' ? 'md:col-span-6' : 'md:col-span-4';
            const rowSpan = img.size === 'large' ? 'row-span-2' : 'row-span-1';
            
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${colSpan} ${rowSpan} rounded-3xl overflow-hidden relative group border border-white/5 hover:border-transparent transition-all duration-500 ${img.glow} hover:-translate-y-2`}
              >
                <div className="absolute inset-0 bg-[#050816]/40 group-hover:bg-transparent transition-colors z-10 duration-500 mix-blend-multiply"></div>
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Cyber Scanline effect on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer z-20 pointer-events-none bg-[length:100%_200%]"></div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Gallery;
