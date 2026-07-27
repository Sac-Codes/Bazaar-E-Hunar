import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { trackGalleryImageOpen, trackGalleryNavigation } from '../services/analytics';

// ── Image Imports ──
// Only using actual files available in src/assets/
import entryWelcome from '../assets/Wecome_Hunar_bazaar.jpg';
import stallArea from '../assets/welcome_to_stall_Area.jpg';

import diy1 from '../assets/diy_stall_image1.jpg';
import diy2 from '../assets/diy_stall_image2.jpg';
import diy3 from '../assets/diy_stall_image3.jpg';
import diyExtra from '../assets/DIY_3.jpg';

import games1 from '../assets/Games_1.jpg';
import games2 from '../assets/Games_2.jpg';

import place1 from '../assets/place_1.jpg';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  section: string;
  sectionOrder: number;
  span: 'square' | 'tall' | 'wide' | 'large';
}

// ── Gallery Sections (Narrative Flow) ──
const sections = [
  { key: 'entry', label: '🎉 Event Entry', order: 1 },
  { key: 'stall', label: '🏪 Stall Area', order: 2 },
  { key: 'creative', label: '🎨 Creative & DIY', order: 3 },
  { key: 'games', label: '🎮 Games & Activities', order: 4 },
  { key: 'highlights', label: '📸 Event Highlights', order: 5 },
];

const galleryImages: GalleryImage[] = [
  // ── 🎉 Event Entry ── (Hero intro)
  { 
    id: 1, src: entryWelcome, alt: 'Welcome to Hunar Bazaar 2026 — Grand Entrance', 
    section: 'entry', sectionOrder: 1, span: 'large' 
  },
  { 
    id: 2, src: stallArea, alt: 'Stall Area — Bustling marketplace at Hunar Bazaar', 
    section: 'entry', sectionOrder: 2, span: 'square' 
  },

  // ── 🏪 Stall Area ── (Medium feature)
  { 
    id: 3, src: place1, alt: 'Event venue decoration and stall atmosphere', 
    section: 'stall', sectionOrder: 1, span: 'wide' 
  },

  // ── 🎨 Creative & DIY ── (Hero + rhythm)
  { 
    id: 4, src: diy1, alt: 'DIY Stall showcasing student craft creations', 
    section: 'creative', sectionOrder: 1, span: 'tall' 
  },
  { 
    id: 5, src: diy2, alt: 'Creative DIY workshop in progress', 
    section: 'creative', sectionOrder: 2, span: 'wide' 
  },
  { 
    id: 6, src: diy3, alt: 'Handmade items at the DIY stall', 
    section: 'creative', sectionOrder: 3, span: 'square' 
  },
  { 
    id: 7, src: diyExtra, alt: 'DIY project display at Hunar Bazaar', 
    section: 'creative', sectionOrder: 4, span: 'square' 
  },

  // ── 🎮 Games & Activities ──
  { 
    id: 8, src: games1, alt: 'Game Zone — Students enjoying fun activities', 
    section: 'games', sectionOrder: 1, span: 'large' 
  },
  { 
    id: 9, src: games2, alt: 'Exciting game stall at the festival', 
    section: 'games', sectionOrder: 2, span: 'square' 
  },
];

// ── Category filter order ──
const categoryOrder = ['All', ...sections.map(s => s.label)];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const lightboxRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => {
        const section = sections.find(s => s.key === img.section);
        return section && section.label === selectedCategory;
      });

  const openLightbox = (index: number) => {
    const globalIndex = galleryImages.indexOf(filteredImages[index]);
    setLightboxIndex(globalIndex);
    trackGalleryImageOpen();
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsFullscreen(false);
  };

  const goNext = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % galleryImages.length : null);
    trackGalleryNavigation('next');
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);
    trackGalleryNavigation('prev');
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  // Touch swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const getCategoryCount = (catLabel: string) => {
    if (catLabel === 'All') return galleryImages.length;
    const section = sections.find(s => s.label === catLabel);
    if (!section) return 0;
    return galleryImages.filter(i => i.section === section.key).length;
  };

  const getSectionLabel = (sectionKey: string) => {
    const section = sections.find(s => s.key === sectionKey);
    return section ? section.label : sectionKey;
  };

  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Header */}
      <section className="pt-32 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF8A00]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,138,0,0.3)]"
          >
            Event Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl font-medium max-w-2xl mx-auto"
          >
            Take a visual journey through Hunar Bazaar 2026 — from the grand entrance to the prize ceremony
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 md:px-8 -mt-8 relative z-20 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categoryOrder.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF8A00] to-[#FFD54A] text-[#07111F] shadow-lg shadow-[#FF8A00]/30'
                  : 'bg-[#111827]/60 text-gray-400 border border-white/10 hover:border-[#FF8A00]/40 hover:text-white'
              }`}
            >
              {cat} {cat !== 'All' && `(${getCategoryCount(cat)})`}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Gallery Sections */}
      <section className="container mx-auto px-4 md:px-8 max-w-7xl">
        {selectedCategory === 'All' ? (
          /* ── Full Narrative View: Show all sections with headers ── */
          sections.map((section) => {
            const sectionImages = galleryImages.filter(img => img.section === section.key);
            if (sectionImages.length === 0) return null;

            return (
              <div key={section.key} className="mb-16 last:mb-0">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                    {section.label}
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#FF8A00] to-[#FFD54A] rounded-full" />
                </motion.div>

                {/* Section Grid — masonry with equal-height aspect-ratio cards */}
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
                >
                  <AnimatePresence mode="popLayout">
                    {sectionImages.map((img) => {
                      let colSpan = '';
                      let rowSpan = '';
                      let aspectClass = 'aspect-[4/3]';
                      if (img.span === 'wide') { colSpan = 'sm:col-span-2'; aspectClass = 'aspect-video'; }
                      else if (img.span === 'tall') { rowSpan = 'sm:row-span-2'; aspectClass = 'aspect-[3/4]'; }
                      else if (img.span === 'large') { colSpan = 'sm:col-span-2'; rowSpan = 'sm:row-span-2'; aspectClass = 'aspect-square'; }

                      const isLoaded = loadedImages.has(img.id);

                      return (
                        <motion.div
                          key={img.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className={`relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#FF8A00]/10 ${colSpan} ${rowSpan} ${aspectClass}`}
                          onClick={() => openLightbox(galleryImages.indexOf(img))}
                        >
                          {/* Premium gradient border on hover */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                            style={{
                              border: '1.5px solid transparent',
                              background: 'linear-gradient(135deg, rgba(255,138,0,0.4), rgba(0,229,255,0.4)) border-box',
                              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              maskComposite: 'exclude',
                            }}
                          />
                          {/* Shimmer */}
                          {!isLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1A233A] to-[#111827] animate-pulse rounded-2xl" />
                          )}
                          
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            onLoad={() => handleImageLoad(img.id)}
                            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
                              isLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                          
                          {/* Glass overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          
                          {/* Category badge */}
                          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-20">
                            <span className="inline-flex px-3 py-1 rounded-full bg-[#050816]/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wide">
                              {section.label}
                            </span>
                          </div>

                          {/* Image title — caption fade animation */}
                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-20">
                            <p className="text-white text-xs font-medium leading-tight drop-shadow-lg line-clamp-2">
                              {img.alt}
                            </p>
                          </div>

                          {/* Zoom indicator */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl hover:bg-[#FF8A00]/30 transition-colors">
                              <Maximize2 size={18} />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })
        ) : (
          /* ── Single Category View ── */
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => {
                let colSpan = '';
                let rowSpan = '';
                let aspectClass = 'aspect-[4/3]';
                if (img.span === 'wide') { colSpan = 'sm:col-span-2'; aspectClass = 'aspect-video'; }
                else if (img.span === 'tall') { rowSpan = 'sm:row-span-2'; aspectClass = 'aspect-[3/4]'; }
                else if (img.span === 'large') { colSpan = 'sm:col-span-2'; rowSpan = 'sm:row-span-2'; aspectClass = 'aspect-square'; }

                const isLoaded = loadedImages.has(img.id);

                return (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#FF8A00]/10 ${colSpan} ${rowSpan} ${aspectClass}`}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Premium gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                      style={{
                        border: '1.5px solid transparent',
                        background: 'linear-gradient(135deg, rgba(255,138,0,0.4), rgba(0,229,255,0.4)) border-box',
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />
                    {/* Shimmer */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1A233A] to-[#111827] animate-pulse rounded-2xl" />
                    )}
                    
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      onLoad={() => handleImageLoad(img.id)}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    
                    {/* Glass overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-20">
                      <span className="inline-flex px-3 py-1 rounded-full bg-[#050816]/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wide">
                        {getSectionLabel(img.section)}
                      </span>
                    </div>

                    {/* Image title */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-20">
                      <p className="text-white text-xs font-medium leading-tight drop-shadow-lg line-clamp-2">
                        {img.alt}
                      </p>
                    </div>

                    {/* Zoom indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl hover:bg-[#FF8A00]/30 transition-colors">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Premium Lightbox — Redesigned with floating bottom panel */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]/95 backdrop-blur-2xl"
            ref={lightboxRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FF4D9D] hover:border-[#FF4D9D] transition-all duration-300 shadow-xl"
            >
              <X size={18} />
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-16 md:top-6 md:right-24 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#00E5FF] hover:text-[#050816] hover:border-[#00E5FF] transition-all duration-300 shadow-xl"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FF8A00] hover:border-[#FF8A00] transition-all duration-300 shadow-xl group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FF8A00] hover:border-[#FF8A00] transition-all duration-300 shadow-xl group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Image counter (top-left) */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs md:text-sm font-bold">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Image container — nearly full viewport, image fills almost entire screen */}
            <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl md:rounded-2xl shadow-2xl select-none"
                  style={{ 
                    maxHeight: isFullscreen ? '100vh' : 'calc(100vh - 40px)',
                    maxWidth: '100%'
                  }}
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Floating bottom panel — ultra-minimal, covers <10% of viewport */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[70vw] md:max-w-lg"
            >
              <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-[#050816]/60 backdrop-blur-md border border-white/5 shadow-lg">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-white/90 text-[10px] md:text-xs font-medium leading-tight text-center line-clamp-1">
                    {galleryImages[lightboxIndex].alt}
                  </span>
                  <span className="text-[8px] md:text-[10px] font-bold text-[#FFD54A] bg-[#FF8A00]/10 px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    {getSectionLabel(galleryImages[lightboxIndex].section)}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Gallery;
