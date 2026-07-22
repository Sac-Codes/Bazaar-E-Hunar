import { Link } from 'react-router-dom';
import { 
  ArrowRight, Users, Lightbulb, Sparkles, Rocket, Target, 
  Pizza, Palette, Gamepad2, Bot, ShoppingBag, Music, Trophy, 
  Play
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import PromotionalBanner from '../components/PromotionalBanner';
import SectionDivider from '../components/SectionDivider';
import MeetTheTeam from '../components/MeetTheTeam';

const CATEGORIES = [
  { id: 1, name: 'Food & Beverage', icon: Pizza, color: 'from-[#FF8A00] to-[#FF4FCB]' },
  { id: 2, name: 'Art & Craft', icon: Palette, color: 'from-[#8B5CF6] to-[#FF4FCB]' },
  { id: 3, name: 'Gaming', icon: Gamepad2, color: 'from-[#3B82F6] to-[#00E5FF]' },
  { id: 4, name: 'Tech & AI', icon: Bot, color: 'from-[#10B981] to-[#00E5FF]' },
  { id: 5, name: 'Fashion', icon: ShoppingBag, color: 'from-[#8B5CF6] to-[#FF8A00]' },
  { id: 6, name: 'Music', icon: Music, color: 'from-[#00E5FF] to-[#3B82F6]' },
];

const HIGHLIGHTS = [
  { value: '50+', label: 'Innovative Stalls', icon: Target, desc: 'Showcasing the best ideas' },
  { value: '200+', label: 'Visitors', icon: Users, desc: 'A massive vibrant crowd' },
  { value: 'Awards', label: 'Prizes', icon: Trophy, desc: 'Rewards for the top teams' },
  { value: '20+', label: 'Workshops', icon: Lightbulb, desc: 'Learn from industry experts' },
];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[10%] opacity-15"><Pizza size={48} className="text-[#FF8A00] animate-float-slow"/></motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[20%] right-[15%] opacity-15"><Gamepad2 size={64} className="text-[#3B82F6] animate-float"/></motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-[20%] left-[20%] opacity-15"><Palette size={56} className="text-[#FF4FCB] animate-float" style={{ animationDelay: '1s' }}/></motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-[30%] right-[10%] opacity-15"><Rocket size={48} className="text-[#8B5CF6] animate-pulse-slow"/></motion.div>
        <motion.div style={{ y: y1 }} className="absolute top-[40%] left-[5%] opacity-10"><ShoppingBag size={40} className="text-[#10B981] animate-float"/></motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[50%] right-[5%] opacity-10"><Music size={40} className="text-[#00E5FF] animate-float" style={{ animationDelay: '2s' }}/></motion.div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }} className="flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-bold text-sm mb-8 shadow-lg">
            <Sparkles size={16} className="text-[#FFD166]" />
            <span className="text-white font-semibold">Registrations Now Open</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-none">
            Bazaar-E-Hunar <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="absolute -inset-2 bg-gradient-to-r from-[#FF8A00] via-[#FF4FCB] to-[#8B5CF6] blur-[40px] opacity-30"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] via-[#FF4FCB] to-[#8B5CF6]"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-medium">
            The ultimate student <span className="text-white font-bold">Innovation Festival</span>.<br className="hidden md:block" />
            Create your stall. Showcase your talent. Celebrate creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/register" className="btn-festival text-lg px-10 py-4 w-full sm:w-auto shadow-lg group">
              Register Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-outline text-lg px-10 py-4 w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50">
              <Play size={20} /> Explore More
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const CategoriesSection = () => {
  return (
    <section className="py-24 relative bg-section-festival">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Explore Sectors</h2>
          <p className="text-xl text-gray-600">Discover what excites you in the marketplace.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -10, scale: 1.05 }} className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg hover:shadow-xl flex flex-col items-center justify-center p-6 cursor-pointer group transition-all duration-300">
              <div className={'w-16 h-16 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br ' + cat.color + ' text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300'}>
                <cat.icon size={32} className="group-hover:animate-bounce" />
              </div>
              <span className="font-bold text-gray-700 text-center group-hover:text-gray-900 transition-colors">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HighlightsSection = () => {
  return (
    <section className="py-24 relative bg-section-premium-dark">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">By the Numbers</h2>
          <p className="text-xl text-gray-400">The scale of Bazaar-E-Hunar 2026 </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring' }} whileHover={{ y: -10 }} className="glass-card p-8 group cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF8A00] to-[#FF4FCB] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,138,0,0.3)]">
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="text-5xl font-black mb-2 text-white group-hover:text-[#FF8A00] transition-colors">{item.value}</h3>
              <p className="text-xl font-bold text-gray-300 mb-1">{item.label}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
      <SectionDivider variant="curve" />
      <SectionDivider variant="fade" />
      <MeetTheTeam />
      <SectionDivider variant="glow" />
      <SectionDivider variant="wave" />
    </PageWrapper>
  );
};

export default Home;
