import { useState } from 'react';
import { Search, MapPin, QrCode, Filter, X } from 'lucide-react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { stallsData, categories } from '../data/stalls';
import type { Stall } from '../data/stalls';

const Stalls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const filteredStalls = stallsData.filter((stall) => {
    const matchesSearch = 
      stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || stall.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleShowQR = (stall: Stall) => {
    setSelectedStall(stall);
    setShowQRModal(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Header */}
      <section className="pt-32 pb-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[150px] mix-blend-screen" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          >
            Stall Directory
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl font-medium max-w-2xl mx-auto"
          >
            Explore over 50+ student-led innovation hubs. Find your favorite tech, food, games, and handcrafted products.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 -mt-12 relative z-20">
        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 md:p-6 mb-16 flex flex-col md:flex-row gap-4 bg-[#111827]/80 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-[#00E5FF]/20"
        >
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00E5FF] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by stall name, student, or product..."
              className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-white placeholder-gray-500 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative md:w-72 group">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8B5CF6] transition-colors" size={20} />
            <select
              className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 pl-14 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] transition-all text-white font-medium cursor-pointer shadow-inner"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#111827] text-white">{cat}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Stalls Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredStalls.length > 0 ? (
            filteredStalls.map((stall) => (
              <motion.div 
                key={stall.id} 
                variants={item}
                className="glass-card p-8 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all duration-500 relative overflow-hidden group flex flex-col border border-white/10 hover:border-[#00E5FF]/40 bg-[#1A233A]/60"
              >
                {/* Decorative glow on hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#00E5FF]/20 to-[#8B5CF6]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 right-6 bg-[#050816] border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10 group-hover:bg-[#00E5FF] group-hover:text-[#050816] group-hover:shadow-[0_0_10px_rgba(0,229,255,0.5)] transition-all">
                  {stall.category}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 pr-24 tracking-tight group-hover:text-[#00E5FF] transition-colors">{stall.name}</h3>
                <p className="text-sm text-gray-400 mb-6 flex items-center gap-2 font-medium">
                  By {stall.owner} <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span> {stall.classStr}
                </p>
                
                <div className="mb-8 relative z-10">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Inventory</p>
                  <div className="flex flex-wrap gap-2">
                    {stall.products.map((product, idx) => (
                      <span key={idx} className="bg-[#111827] text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-[#8B5CF6]/30 transition-colors">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Node ID</span>
                    <span className="font-bold font-mono text-white text-lg group-hover:text-[#FF8A00] transition-colors">{stall.id}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="w-12 h-12 rounded-xl bg-[#111827] border border-white/10 text-gray-400 flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all" title="View Location">
                      <MapPin size={20} />
                    </button>
                    <button 
                      className="w-12 h-12 rounded-xl bg-[#111827] border border-[#00E5FF]/30 text-[#00E5FF] flex items-center justify-center hover:bg-[#00E5FF] hover:text-[#050816] hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all" 
                      title="Generate Connect Code"
                      onClick={() => handleShowQR(stall)}
                    >
                      <QrCode size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center"
            >
              <div className="w-24 h-24 bg-[#111827] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-500 shadow-inner">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">No nodes found</h3>
              <p className="text-gray-400 text-lg font-medium">Try adjusting your search parameters or category filter.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="mt-6 text-[#00E5FF] font-bold hover:text-white transition-colors"
              >
                [ Reset Filters ]
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Premium Cyber QR Modal */}
      <AnimatePresence>
        {showQRModal && selectedStall && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050816]/80"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card bg-[#111827]/90 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-[0_0_50px_rgba(0,229,255,0.2)] border border-[#00E5FF]/30"
            >
              {/* Animated scanning line effect over the modal */}
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-[#00E5FF] opacity-30 shadow-[0_0_20px_rgba(0,229,255,1)] pointer-events-none rounded-full z-50"
              />

              <button 
                className="absolute top-6 right-6 text-gray-500 hover:text-white bg-[#1A233A] hover:bg-[#FF4FCB] rounded-full p-2 transition-colors border border-white/10 hover:border-[#FF4FCB] z-10"
                onClick={() => setShowQRModal(false)}
              >
                <X size={20} />
              </button>
              
              <div className="text-center mb-8 pt-4">
                <h3 className="text-3xl font-black font-heading mb-2 tracking-tight text-white">{selectedStall.name}</h3>
                <p className="text-gray-400 font-medium flex items-center justify-center gap-2">
                  <span className="font-mono text-[10px] text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-2 py-1 rounded-md tracking-widest">{selectedStall.id}</span>
                  <span className="text-sm">{selectedStall.location}</span>
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-[2rem] shadow-[0_0_30px_rgba(255,255,255,0.1)] mx-auto w-fit mb-8 border-[4px] border-[#00E5FF] relative overflow-hidden">
                <QRCode 
                  value={`skillbazaar://stall/${selectedStall.id}`} 
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  bgColor="#ffffff"
                  fgColor="#050816"
                />
              </div>
              
              <button className="btn-primary w-full py-4 text-lg shadow-[0_0_20px_rgba(0,229,255,0.4)]" onClick={() => setShowQRModal(false)}>
                Disconnect
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Stalls;
