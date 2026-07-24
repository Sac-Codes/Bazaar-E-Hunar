import { Link } from 'react-router-dom';
import { 
  ArrowRight, Users, Lightbulb, Sparkles, Rocket, Target, 
  Pizza, Palette, Gamepad2, Bot, ShoppingBag, Music, Trophy, 
  Play, Star, Zap
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import PromotionalBanner from '../components/PromotionalBanner';
import SectionDivider from '../components/SectionDivider';
// import MeetTheTeam from '../components/MeetTheTeam'; // Hidden as per requirement

const CATEGORIES = [
  { id: 1, name: 'Food & Beverage', icon: Pizza, color: 'from-[#FF8A00] to-[#FFD54A]' },
  { id: 2, name: 'Art & Craft', icon: Palette, color: 'from-[#8A5CFF] to-[#FF4D9D]' },
  { id: 3, name: 'Gaming', icon: Gamepad2, color: 'from-[#00E5FF] to-[#8A5CFF]' },
  { id: 4, name: 'Tech & AI', icon: Bot, color: 'from-[#2DEB9B] to-[#00E5FF]' },
  { id: 5, name: 'Fashion', icon: ShoppingBag, color: 'from-[#8A5CFF] to-[#FF8A00]' },
  { id: 6, name: 'Music', icon: Music, color: 'from-[#FF4D9D] to-[#00E5FF]' },
];

const HIGHLIGHTS = [
  { value: '50+', label: 'Innovative Stalls', icon: Target, color: '#FF8A00', desc: 'Showcasing the best ideas' },
  { value: '200+', label: 'Visitors Expected', icon: Users, color: '#00E5FF', desc: 'A massive vibrant crowd' },
  { value: 'Awards', label: 'Prizes & Recognition', icon: Trophy, color: '#FFD54A', desc: 'Celebrating excellence' },
  { value: '20+', label: 'Workshops', icon: Lightbulb, color: '#8A5CFF', desc: 'Learn from industry experts' },
];

/* ── Hero Section ── */
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Hero Background — Aurora + Particles + Light Rays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Orange-Cyan aurora mesh */}
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 30%, #FF8A00 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 80% 60%, #00E5FF 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 40% 80%, #FFD54A 0%, transparent 70%)
            `,
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '50% 0%', '100% 50%', '50% 100%', '0% 50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating geometric shapes */}
        <motion.div style={{ y: y1 }} className="absolute top-[12%] left-[8%] opacity-10">
          <svg width="40" height="40" viewBox="0 0 40 40" className="animate-geometric-rotate">
            <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#FF8A00" strokeWidth="1" />
          </svg>
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[22%] right-[12%] opacity-10">
          <svg width="30" height="30" viewBox="0 0 30 30" className="animate-geometric-rotate animation-delay-2000">
            <circle cx="15" cy="15" r="12" fill="none" stroke="#00E5FF" strokeWidth="1" />
          </svg>
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-[18%] left-[15%] opacity-8">
          <svg width="24" height="24" viewBox="0 0 24 24" className="animate-geometric-rotate animation-delay-4000">
            <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#FFD54A" strokeWidth="1" />
          </svg>
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-[25%] right-[8%] opacity-10">
          <svg width="35" height="35" viewBox="0 0 35 35" className="animate-geometric-rotate animation-delay-1000">
            <path d="M17.5 2L22 13L34 14L25 22L27 34L17.5 28L8 34L10 22L1 14L13 13Z" fill="none" stroke="#FF4D9D" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Light rays */}
        <motion.div
          className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#FF8A00]/10 to-transparent"
          animate={{ x: ['-20%', '20%'], opacity: [0, 0.12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00E5FF]/8 to-transparent"
          animate={{ x: ['15%', '-15%'], opacity: [0, 0.08, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Floating icons */}
        <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[10%] opacity-12"><Star size={32} className="text-[#FFD54A] animate-float-slow" /></motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[20%] right-[15%] opacity-10"><Zap size={40} className="text-[#FF8A00] animate-float" /></motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-[20%] left-[20%] opacity-10"><Rocket size={36} className="text-[#00E5FF] animate-float" style={{ animationDelay: '1s' }} /></motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-[30%] right-[10%] opacity-10"><Sparkles size={28} className="text-[#FF4D9D] animate-pulse-slow" /></motion.div>
        <motion.div style={{ y: y1 }} className="absolute top-[40%] left-[5%] opacity-8"><ShoppingBag size={28} className="text-[#FFD54A] animate-float" /></motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[50%] right-[5%] opacity-8"><Music size={28} className="text-[#8A5CFF] animate-float" style={{ animationDelay: '2s' }} /></motion.div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,138,0,0.06) 0%, transparent 70%)', filter: 'blur(100px)' }}
          animate={{ scale: [1, 1.1, 0.95, 1.05, 1], translateX: [0, 20, -15, 15, 0], translateY: [0, -15, 20, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)', filter: 'blur(120px)' }}
          animate={{ scale: [1, 0.95, 1.1, 0.95, 1], translateX: [0, -30, 15, -15, 0], translateY: [0, 20, -20, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }} className="flex flex-col items-center">
          
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="badge-premium mb-10"
          >
            <Sparkles size={14} className="text-[#FFD54A]" />
            Registrations Now Open
          </motion.div>
          
          {/* Bilingual Hero Heading */}
          <div className="mb-6 space-y-3">
            {/* Hindi Title — Main visual identity */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-hindi text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[1.1] tracking-wide drop-shadow-[0_0_30px_rgba(255,138,0,0.3)]"
            >
              बाज़ार-ए-हुनर
            </motion.h1>

            {/* English Subtitle — uppercase, gradient, smaller */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-black uppercase tracking-[0.15em] text-gradient-warm"
            >
              Bazaar-E-Hunar 2026
            </motion.p>
          </div>

          {/* Festival Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium tracking-wide"
          >
            Celebrating Innovation <span className="text-[#FFD54A]">•</span> Creativity <span className="text-[#FFD54A]">•</span> Entrepreneurship
          </motion.p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/register" className="btn-premium text-lg px-10 py-4 w-full sm:w-auto shadow-lg group">
              Register Your Stall
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-outline text-lg px-10 py-4 w-full sm:w-auto">
              <Play size={20} /> Explore More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-5 h-9 rounded-full border-2 border-white/10 flex items-start justify-center p-2">
          <motion.div className="w-1 h-2 bg-[#FF8A00]/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ── Highlights Section (Cyan Accent) ── */
const HighlightsSection = () => {
  return (
    <section className="py-24 md:py-32 relative bg-section-orange-cyan">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="badge-premium mx-auto mb-6 w-fit"
          >
            <Zap size={14} className="text-[#00E5FF]" />
            Event Statistics
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            By the <span className="text-gradient-primary">Numbers</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            The scale and impact of Bazaar-E-Hunar 2026
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 group cursor-default relative overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
              />
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}08)`,
                  border: `1px solid ${item.color}30`,
                  boxShadow: `0 0 15px ${item.color}20`,
                }}
              >
                <item.icon size={28} style={{ color: item.color }} />
              </div>
              <h3
                className="text-4xl md:text-5xl font-black mb-2 transition-colors tracking-tight"
                style={{ color: item.color }}
              >
                {item.value}
              </h3>
              <p className="text-lg font-bold text-white mb-1">{item.label}</p>
              <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Categories Section (Purple Accent) ── */
const CategoriesSection = () => {
  return (
    <section className="py-24 md:py-32 relative bg-section-purple-cyan">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="badge-premium mx-auto mb-6 w-fit"
            style={{ borderColor: 'rgba(138,92,255,0.25)', color: '#8A5CFF' }}
          >
            <Sparkles size={14} />
            Explore Sectors
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Choose Your <span className="text-gradient-accent">Category</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Discover what excites you in the marketplace
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card p-6 md:p-8 flex flex-col items-center justify-center group cursor-default transition-all duration-300"
            >
              <div
                className={'w-16 h-16 rounded-2xl mb-5 flex items-center justify-center bg-gradient-to-br ' + cat.color + ' text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300'}
              >
                <cat.icon size={30} />
              </div>
              <span className="font-bold text-white text-center group-hover:text-white/90 transition-colors text-sm md:text-base">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── CTA Section (Gold+Magenta Accent) ── */
const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative bg-section-gold-orange">
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br from-[#FF8A00] to-[#FFD54A] flex items-center justify-center shadow-lg shadow-[#FF8A00]/30"
          >
            <Rocket size={36} className="text-[#07111F]" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Ready to Showcase{' '}
            <span className="text-gradient-warm">Your Talent</span>?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Join the festival and turn your creative ideas into reality. Register your stall today and become part of something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-premium text-lg px-10 py-4 shadow-xl shadow-[#FF8A00]/25 group">
              Register Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-outline text-lg px-10 py-4">
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-10 -right-10 opacity-10 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#FFD54A" strokeWidth="0.5">
            <circle cx="60" cy="60" r="55" strokeDasharray="10 10" />
            <circle cx="60" cy="60" r="40" strokeDasharray="5 15" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Home Page Layout ── */
const Home = () => {
  return (
    <PageWrapper>
      <PromotionalBanner />
      <HeroSection />
      <SectionDivider variant="wave" />
      <HighlightsSection />
      <SectionDivider variant="blob" />
      <CategoriesSection />
      <SectionDivider variant="wave-reverse" />
      <CTASection />
      <SectionDivider variant="glow" />
      {/* <MeetTheTeam />  Hidden as per requirement */}
    </PageWrapper>
  );
};

export default Home;
