import { useState, useRef, useCallback } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import StallStatistics from '../components/StallStatistics';
import { stallsData, categories } from '../data/stalls';
import { getCategoryIcon } from '../data/stallIcons';
import { trackStallSearch, trackCategoryFilter, trackStallView, trackRegisterClick } from '../services/analytics';

const Stalls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedStall, setExpandedStall] = useState<string | null>(null);
  const [, setForceUpdate] = useState(0);
  const iconFallbackMap = useRef<Record<string, string>>({});

  const handleIconError = useCallback((stallId: string, fallbackEmoji: string) => {
    if (!iconFallbackMap.current[stallId]) {
      iconFallbackMap.current[stallId] = fallbackEmoji;
      setForceUpdate(prev => prev + 1);
    }
  }, []);

  const filteredStalls = stallsData.filter((stall) => {
    const matchesSearch = 
      stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stall.description && stall.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || stall.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
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
            Explore {stallsData.length}+ student-led innovation hubs. Find your favorite food, games, arts, and handcrafted products.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 -mt-12 relative z-20">
        {/* ── Stall Statistics Dashboard ── */}
        <StallStatistics />

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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value.length > 0) trackStallSearch();
              }}
            />
          </div>
          
          <div className="relative md:w-72 group">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8B5CF6] transition-colors" size={20} />
            <select
              className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 pl-14 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] transition-all text-white font-medium cursor-pointer shadow-inner"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                trackCategoryFilter(e.target.value);
              }}
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
            filteredStalls.map((stall) => {
              const iconData = getCategoryIcon(stall.category);
              const showEmojiFallback = iconFallbackMap.current[stall.id];
              return (
              <motion.div 
                  key={stall.id} 
                  variants={item}
                  className={`relative group flex flex-col bg-[#1A233A]/60 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${stall.id === 'S-050' ? 'principal-stall' : ''}`}
                  style={{
                    border: stall.id === 'S-050' ? '2px solid rgba(220,38,38,0.6)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: stall.id === 'S-050' ? '0 4px 30px rgba(220,38,38,0.3), 0 0 60px rgba(220,38,38,0.15)' : '0 4px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      border: '1.5px solid transparent',
                      background: stall.id === 'S-050'
                        ? 'linear-gradient(135deg, rgba(220,38,38,0.5), rgba(239,68,68,0.3)) border-box'
                        : 'linear-gradient(135deg, rgba(0,229,255,0.3), rgba(255,138,0,0.3), rgba(139,92,246,0.3)) border-box',
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Glow effects */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#FF8A00]/10 to-[#FFD54A]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-[#00E5FF]/10 to-[#8B5CF6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Principal's Stall premium red glow */}
                  {stall.id === 'S-050' && (
                    <>
                      <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#DC2626]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
                      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#EF4444]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                    </>
                  )}

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-1 relative z-10">
                    {/* Top Row: Category Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      {/* Category Icon */}
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${stall.id === 'S-050' ? 'from-[#DC2626] to-[#EF4444]' : iconData.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}
                        style={{ 
                          boxShadow: stall.id === 'S-050' ? '0 0 20px rgba(220,38,38,0.4)' : `0 0 20px ${iconData.glowColor}`,
                          transform: 'translateZ(0)',
                        }}
                      >
                        {showEmojiFallback ? (
                          <span className="text-2xl select-none pointer-events-none">{showEmojiFallback}</span>
                        ) : (
<img
                            src={iconData.icon}
                            alt={stall.category}
                            className="w-10 h-10 object-cover select-none pointer-events-none"
                            loading="lazy"
                            onError={() => handleIconError(stall.id, iconData.label)}
                          />
                        )}
                      </div>

                      {/* Category Badge */}
                      <div className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                        stall.id === 'S-050'
                          ? 'bg-[#DC2626]/20 border border-[#DC2626]/50 text-[#EF4444] shadow-[0_0_12px_rgba(220,38,38,0.3)]'
                          : 'bg-[#050816]/80 border border-white/10 text-gray-300 group-hover:border-[#FF8A00]/40 group-hover:text-[#FFD54A]'
                      }`}>
                        {stall.id === 'S-050' ? '👑 Principal\'s Stall' : stall.category}
                      </div>
                    </div>

                      {/* Stall Name */}
                    <h3 className={`text-2xl font-black mb-2 tracking-tight transition-colors duration-300 ${
                      stall.id === 'S-050'
                        ? 'text-[#EF4444] drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                        : 'text-white group-hover:text-[#FFD54A]'
                    }`}>
                      {stall.name}
                    </h3>

                    {/* Student Name & Class */}
                    <p className="text-sm text-gray-400 mb-4 flex items-center gap-2 font-medium flex-wrap">
                      By <span className="text-gray-300 font-semibold">{stall.owner}</span>
                      {stall.classStr && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] shrink-0" />
                          <span className="text-gray-500">{stall.classStr}</span>
                        </>
                      )}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0" />
                      <span className="font-mono text-[10px] text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-2 py-0.5 rounded-md tracking-widest">{stall.id}</span>
                    </p>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3 relative z-10 flex-1">
                      {stall.description?.length > 120 ? stall.description.substring(0, 120) + '...' : stall.description}
                    </p>

                    {/* Price Range */}
                    {stall.priceRange && (
                      <div className="mb-5 relative z-10">
                        <span className="inline-flex items-center gap-1.5 bg-[#111827]/80 text-[#FFD54A] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#FFD54A]/20 backdrop-blur-sm">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500">Price: </span>
                          {stall.priceRange}
                        </span>
                      </div>
                    )}

                    {/* View Details Button */}
                    <div className="pt-5 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
                      <button
                        onClick={() => {
                          const nextState = expandedStall === stall.id ? null : stall.id;
                          setExpandedStall(nextState);
                          if (nextState) trackStallView(stall.name);
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs hover:shadow-lg transition-all duration-300 ${
                          stall.id === 'S-050'
                            ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white hover:shadow-[#DC2626]/30'
                            : 'bg-gradient-to-r from-[#FF8A00] to-[#FFD54A] text-[#07111F] hover:shadow-[#FF8A00]/30'
                        }`}
                      >
                        {expandedStall === stall.id ? 'Show Less' : 'View Details'}
                        {expandedStall === stall.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details — no contact info */}
                  {expandedStall === stall.id && (
                    <div className="border-t border-white/10 p-8 pt-6 bg-[#111827]/40 backdrop-blur-sm space-y-4">
                      {stall.description && (
                        <p className="text-gray-300 text-sm leading-relaxed">{stall.description}</p>
                      )}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {stall.priceRange && (
                          <div className="bg-[#0D1525]/60 rounded-xl p-4 border border-white/5">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Price Range</span>
                            <p className="text-[#FFD54A] font-bold mt-1.5 text-base">{stall.priceRange}</p>
                          </div>
                        )}
                        {stall.investment && (
                          <div className="bg-[#0D1525]/60 rounded-xl p-4 border border-white/5">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Investment</span>
                            <p className="text-[#10B981] font-bold mt-1.5 text-base">{stall.investment}</p>
                          </div>
                        )}
                        {stall.team && (
                          <div className="bg-[#0D1525]/60 rounded-xl p-4 border border-white/5 col-span-2">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Team</span>
                            <p className="text-gray-300 font-medium mt-1.5 text-sm">{stall.team}</p>
                          </div>
                        )}
                        {stall.location && (
                          <div className="bg-[#0D1525]/60 rounded-xl p-4 border border-white/5 col-span-2">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Location</span>
                            <p className="text-[#00E5FF] font-bold mt-1.5 text-sm flex items-center gap-2">
                              <MapPin size={14} />
                              {stall.location}
                            </p>
                          </div>
                        )}
                        {stall.requirements && stall.requirements !== 'None' && (
                          <div className="bg-[#0D1525]/60 rounded-xl p-4 border border-white/5 col-span-2">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Requirements</span>
                            <p className="text-gray-300 font-medium mt-1.5 text-sm">{stall.requirements}</p>
                          </div>
                        )}
                      </div>

                      <Link
                        to="/register"
                        onClick={() => trackRegisterClick('stall_card')}
                        className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#00E5FF] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#8B5CF6]/30 transition-all duration-300"
                      >
                        Register Your Stall
                      </Link>
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center"
            >
              <div className="w-24 h-24 bg-[#111827] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-500 shadow-inner">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">No stalls found</h3>
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
    </PageWrapper>
  );
};

export default Stalls;

