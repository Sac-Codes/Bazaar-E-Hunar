import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Globe, MessageCircle, Share2, Mail, Terminal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from '../components/FloatingParticles';
import AuroraBackground from '../components/AuroraBackground';
import FloatingOrbs from '../components/FloatingOrbs';

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' || 
          target.closest('a') || 
          target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
    
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#00E5FF] pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#00E5FF] rounded-full pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 28, mass: 0.1 }}
      />
    </>
  );
};

// --- SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Stalls', path: '/stalls' },
    { name: 'Map', path: '/map' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Rules', path: '/rules' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050816] text-[#F3F4F6] relative overflow-hidden font-sans">
      
      {/* Scroll To Top on Route Change */}
      <ScrollToTop />

      {/* Global Custom Cursor (hidden on mobile) */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Global Motion Graphics */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-cyber-grid opacity-10"></div>
      <AuroraBackground />
      <div className="hidden lg:block">
        <FloatingParticles />
        <FloatingOrbs />
      </div>

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'py-3 glass-nav shadow-lg shadow-[#00E5FF]/10 border-b border-[#00E5FF]/20 backdrop-blur-xl' 
            : 'py-5 bg-transparent'
        }`}
      >
        {/* Animated gradient border on scroll */}
        {scrolled && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF] via-[#8B5CF6] to-transparent"
          />
        )}
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-[#00E5FF]/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#00E5FF]/40 bg-[#111827] flex items-center justify-center border border-[#00E5FF]/30">
                <Terminal size={24} className="text-[#00E5FF] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl leading-none tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00E5FF] group-hover:to-[#3B82F6] transition-all">Bazaar-E-Hunar</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#00E5FF] font-bold mt-1">2026</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="relative py-2 text-sm font-bold transition-colors group text-gray-400 hover:text-white"
                      >
                        {link.name}
                        {isActive && (
                          <motion.div 
                            layoutId="nav-indicator"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00E5FF] rounded-full shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                          />
                        )}
                        <div className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8B5CF6] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive ? 'hidden' : 'block'}`}></div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link to="/register" className="btn-primary text-sm group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#FFD166]" />
                  Register Stall
                </span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center text-white bg-[#111827]/80 backdrop-blur-md rounded-xl border border-[#00E5FF]/20 hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X size={24} className="text-[#FF4FCB]" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} className="text-[#00E5FF]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-2xl flex flex-col pt-28 px-6 pb-6 overflow-y-auto border-b border-[#00E5FF]/20"
            >
              <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>
              
              <nav className="flex flex-col gap-4 mb-10 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, type: 'spring' }}
                    key={link.path}
                  >
                    <Link
                      to={link.path}
                      className={`block text-3xl font-heading font-black py-4 border-b border-white/5 transition-colors flex items-center justify-between ${
                        location.pathname === link.path ? 'text-[#00E5FF] text-glow' : 'text-gray-400'
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                      {location.pathname === link.path && <ArrowRight size={24} className="text-[#00E5FF]" />}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto relative z-10"
              >
                <Link
                  to="/register"
                  className="btn-primary w-full justify-center text-lg py-4 mb-8"
                  onClick={closeMenu}
                >
                  Register Your Stall
                </Link>
                
                <div className="flex gap-4 justify-center">
                  {[Globe, MessageCircle, Share2].map((Icon, idx) => (
                    <div key={idx} className="w-12 h-12 rounded-full bg-[#111827] border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                      <Icon size={20} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full relative z-10 pt-24 lg:pt-0">
        <Outlet />
      </main>

      {/* Footer - Festival Theme */}
      <footer className="bg-[#0F172A] border-t border-white/10 pt-24 pb-12 relative overflow-hidden z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/10 pb-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                  <Sparkles size={24} className="text-[#FFD166]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF8A00] group-hover:to-[#FF4FCB] transition-all">Bazaar-E-Hunar</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#FFD166] font-bold mt-1">2026</span>
                </div>
              </Link>
              <p className="text-gray-400 text-lg max-w-sm mb-8 leading-relaxed font-medium">
                The ultimate student innovation festival. Where creativity meets entrepreneurship and every idea finds its marketplace.
              </p>
              <div className="flex gap-4">
                {[Globe, MessageCircle, Share2, Mail].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FF8A00] hover:text-white hover:border-[#FF8A00] transition-all duration-300 hover:-translate-y-1">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="lg:col-span-2 lg:col-start-7">
              <h3 className="font-heading font-bold text-lg mb-6 text-white tracking-wider uppercase text-sm">Explore</h3>
              <ul className="flex flex-col gap-4">
                {['Home', 'About', 'Stalls', 'Gallery'].map((link) => (
                  <li key={link}>
                    <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-gray-400 hover:text-[#FFD166] hover:translate-x-2 transition-all inline-block font-semibold">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div className="lg:col-span-2">
              <h3 className="font-heading font-bold text-lg mb-6 text-white tracking-wider uppercase text-sm">Info</h3>
              <ul className="flex flex-col gap-4">
                {['Map', 'Rules', 'FAQ', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-[#FF8A00] hover:translate-x-2 transition-all inline-block font-semibold">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <div className="lg:col-span-3">
              <h3 className="font-heading font-bold text-lg mb-6 text-white tracking-wider uppercase text-sm">Engage</h3>
              <p className="text-gray-400 mb-6 font-medium">Ready to showcase your talent? Register your stall today.</p>
              <Link to="/register" className="btn-festival w-full justify-between group py-4">
                Register Now
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
              &copy; 2026 Bazaar-E-Hunar. All rights reserved.
            </p>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                Built by <span className="text-[#FFD166]">Student Council</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
