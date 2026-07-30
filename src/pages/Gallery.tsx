import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { trackGalleryImageOpen, trackGalleryNavigation } from '../services/analytics';

import entryWelcome from '../assets/welcome_hunar_bazaar.jpg';
import collage1 from '../assets/photo-collage.png.png';
import collage2 from '../assets/photo-collage.png (1).png';
import collage3 from '../assets/photo-collage.png (2).png';
import diyImage from '../assets/diy_stall_image3.jpg';
import gamesImage from '../assets/Games_1.jpg';
import placeImage from '../assets/place_1.jpg';
import prizesImage from '../assets/prizes_1.jpg';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: entryWelcome, alt: 'Welcome to Hunar Bazaar 2026 Grand Entrance' },
  { id: 2, src: placeImage, alt: 'Event venue decoration and stall atmosphere' },
  { id: 3, src: collage1, alt: 'Photo collage showcasing student creativity' },
  { id: 4, src: collage2, alt: 'Creative moments captured at Hunar Bazaar' },
  { id: 5, src: collage3, alt: 'More creative exhibits at the festival' },
  { id: 6, src: diyImage, alt: 'DIY project display at Hunar Bazaar' },
  { id: 7, src: gamesImage, alt: 'Game Zone Students enjoying fun activities' },
  { id: 8, src: prizesImage, alt: 'Prizes and awards ceremony' },
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const lightboxRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    trackGalleryImageOpen();
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goNext = useCallback(() => {
    setLightboxIndex(function(prev) {
      return prev !== null ? (prev + 1) % galleryImages.length : null;
    });
    trackGalleryNavigation('next');
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex(function(prev) {
      return prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null;
    });
    trackGalleryNavigation('prev');
  }, []);

  useEffect(() => {
    const handleKeyDown = function(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return function() { window.removeEventListener('keydown', handleKeyDown); };
  }, [lightboxIndex, goNext, goPrev]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return function() { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const handleTouchStart = function(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = function(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = function() {
    var diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const handleImageLoad = function(id: number) {
    setLoadedImages(function(prev) {
      var next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  var currentImage = lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  return (
    <PageWrapper className="bg-transparent pb-24">
      <section className="pt-32 pb-16 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF8A00]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            A visual journey through Hunar Bazaar 2026
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 max-w-7xl -mt-8 relative z-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
          {galleryImages.map(function(img, index) {
            var isLoaded = loadedImages.has(img.id);
            return (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#FF8A00]/10 break-inside-avoid mb-4 md:mb-5"
                onClick={function() { openLightbox(index); }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    border: '1.5px solid transparent',
                    background: 'linear-gradient(135deg, rgba(255,138,0,0.4), rgba(0,229,255,0.4)) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                {!isLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1A233A] to-[#111827] animate-pulse rounded-2xl" />
                )}

                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  onLoad={function() { handleImageLoad(img.id); }}
                  className={'w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ' + (isLoaded ? 'opacity-100' : 'opacity-0')}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-20">
                  <p className="text-white text-xs font-medium leading-tight drop-shadow-lg line-clamp-2">
                    {img.alt}
                  </p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl hover:bg-[#FF8A00]/30 transition-colors">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
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
            onClick={closeLightbox}
          >
            {/* Close Button - always visible */}
            <button
              onClick={function(e: React.MouseEvent) { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#FF4D9D] hover:border-[#FF4D9D] transition-all duration-300 shadow-xl"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Previous Button */}
            <button
              onClick={function(e: React.MouseEvent) { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 md:left-8 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#FF8A00] hover:border-[#FF8A00] transition-all duration-300 shadow-xl group"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Next Button */}
            <button
              onClick={function(e: React.MouseEvent) { e.stopPropagation(); goNext(); }}
              className="absolute right-2 md:right-8 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#FF8A00] hover:border-[#FF8A00] transition-all duration-300 shadow-xl group"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs md:text-sm font-bold pointer-events-none">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Image Container — occupies ~90% of viewport with proper aspect-ratio handling */}
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12" onClick={function(e: React.MouseEvent) { e.stopPropagation(); }}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.90 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.90 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center w-full h-full"
              >
                <img
                  ref={imgRef}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-[95%] max-h-[88vh] w-auto h-auto object-contain rounded-xl md:rounded-2xl shadow-2xl select-none"
                  draggable={false}
                  onLoad={function(e: React.SyntheticEvent<HTMLImageElement>) {
                    const img = e.currentTarget;
                    const isLandscape = img.naturalWidth > img.naturalHeight;
                    const isPortrait = img.naturalHeight > img.naturalWidth;
                    // Adjust object-fit based on aspect ratio for optimal display
                    if (isLandscape) {
                      img.style.maxHeight = '85vh';
                      img.style.maxWidth = '95%';
                    } else if (isPortrait) {
                      img.style.maxHeight = '90vh';
                      img.style.maxWidth = '85%';
                    } else {
                      img.style.maxHeight = '85vh';
                      img.style.maxWidth = '85%';
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Small Info Panel — compact, does not obstruct image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            >
              <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 shadow-lg">
                <p className="text-white/80 text-xs font-medium leading-tight text-center line-clamp-1 max-w-[70vw] md:max-w-md">
                  {currentImage.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Gallery;
