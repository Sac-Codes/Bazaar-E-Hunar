import { useState } from 'react';
import { MapPin, Navigation, Info, Utensils, Gamepad2, Palette, Trophy, HelpCircle, School, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const EventMap = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zones = [
    { id: 'food', name: 'Food Zone', icon: Utensils, color: 'border-[#FF8A00]/20 text-[#FF8A00] bg-[#111827]', active: 'bg-[#FF8A00] text-[#050816] border-[#FF8A00] shadow-[0_0_20px_rgba(255,138,0,0.6)]', desc: 'Grab delicious snacks and meals prepared by our student chefs. Stalls A1-A10.', stalls: ['Burger Bliss', 'Pizza Point', 'Mocktail Bar', 'Bake My Day', 'Samosa Junction', 'Pasta Palace', 'Waffle House', 'Juice Stop', 'Chaat Corner', 'Candy Cart'] },
    { id: 'games', name: 'Game Zone', icon: Gamepad2, color: 'border-[#3B82F6]/20 text-[#3B82F6] bg-[#111827]', active: 'bg-[#3B82F6] text-[#050816] border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.6)]', desc: 'Challenge your friends to fun games and win exciting prizes! Stalls G1-G8.', stalls: ['Ring Toss', 'Basketball Shootout', 'Spin & Win', 'Treasure Hunt', 'Quiz Challenge', 'Dart Throw', 'Bottle Knockdown', 'Photo Booth'] },
    { id: 'art', name: 'Art & Craft Zone', icon: Palette, color: 'border-[#FF4FCB]/20 text-[#FF4FCB] bg-[#111827]', active: 'bg-[#FF4FCB] text-[#050816] border-[#FF4FCB] shadow-[0_0_20px_rgba(255,79,203,0.6)]', desc: 'Explore beautiful artwork, handicrafts, and creative creations by talented students. Stalls B1-B5.', stalls: ['Canvas Paintings', 'Resin Art', 'Handmade Jewelry', 'Pottery Demo', 'Custom Portraits'] },
    { id: 'craft', name: 'DIY & Innovation Zone', icon: Trophy, color: 'border-[#10B981]/20 text-[#10B981] bg-[#111827]', active: 'bg-[#10B981] text-[#050816] border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.6)]', desc: 'Watch live demos of science projects, tech innovations, and DIY crafts. Stalls C1-C10.', stalls: ['Science Models', 'Robotics Demo', 'Eco-friendly Crafts', 'Recycled Art', 'Tech Help Desk', 'T-shirt Printing', 'Origami Workshop', 'Candle Making', 'Keychain Customization', 'Plant Pot Painting'] },
    { id: 'stage', name: 'Main Stage', icon: Trophy, color: 'border-[#00E5FF]/20 text-[#00E5FF] bg-[#111827]', active: 'bg-[#00E5FF] text-[#050816] border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.8)]', desc: 'Cultural performances, prize distribution, music, and special announcements throughout the day.', stalls: [] },
    { id: 'help', name: 'Help Desk', icon: HelpCircle, color: 'border-[#8B5CF6]/20 text-[#8B5CF6] bg-[#111827]', active: 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.6)]', desc: 'Lost something? Need directions? Our volunteers are here to help.', stalls: [] },
  ];

  const activeZoneData = zones.find((z) => z.id === activeZone) || null;

  return (
    <PageWrapper className="bg-transparent pb-24">
    
      <section className="pt-32 pb-16 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br from-[#00E5FF] via-[#8B5CF6] to-[#FF4FCB] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20">
            <MapPin size={36} className="text-white" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: 'spring' }} className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Event Map &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF4FCB]">Venue Layout</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto">
            Find your way around Bazaar-E-Hunar 2026. Tap any zone to see what is inside, or check the Google Map below for directions to our school.
          </motion.p>
        </div>
      </section>
      
      <section className="container mx-auto px-4 md:px-8 mt-12 relative z-20">
        <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Map Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex-1 glass-card p-6 md:p-10 border border-white/10 min-h-[500px] relative overflow-hidden flex flex-col bg-[#050816]/80">
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
            
            <div className="flex gap-4 md:gap-6 mb-4 md:mb-6 h-32 md:h-40 relative z-10">
              <div className={`flex-1 border-2 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${activeZone === 'food' ? zones[0].active + ' scale-[1.02]' : zones[0].color + ' hover:scale-[1.01]'}`} onClick={() => setActiveZone('food')}>
                <Utensils size={32} className="mb-2" /><span className="font-bold tracking-widest uppercase text-sm">Food Court</span>
              </div>
              <div className={`w-32 md:w-48 border-2 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${activeZone === 'help' ? zones[5].active + ' scale-[1.02]' : zones[5].color + ' hover:scale-[1.01]'}`} onClick={() => setActiveZone('help')}>
                <HelpCircle size={28} className="mb-2" /><span className="font-bold tracking-widest uppercase text-[10px] md:text-xs">Help Desk</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-6 h-64 md:h-56 relative z-10">
              <div className={`md:w-48 border-2 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${activeZone === 'games' ? zones[1].active + ' scale-[1.02]' : zones[1].color + ' hover:scale-[1.01]'}`} onClick={() => setActiveZone('games')}>
                <Gamepad2 size={36} className="mb-3" /><span className="font-bold tracking-widest uppercase text-sm text-center">Game<br/>Zone</span>
              </div>
              <div className="flex-1 rounded-3xl flex flex-col items-center justify-center pointer-events-none relative overflow-hidden bg-[#0A0F1C]/50 border border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,229,255,0.05)_50%,transparent_100%)] animate-shimmer" />
                <School size={32} className="text-gray-600 mb-2" /><span className="text-gray-500 font-bold tracking-[0.2em] uppercase text-xs">School Ground</span><span className="text-gray-700 text-[10px] mt-1">Open Area &amp; Walkway</span>
              </div>
              <div className={`md:w-56 border-2 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${activeZone === 'stage' ? zones[4].active + ' scale-[1.02]' : zones[4].color + ' hover:scale-[1.01]'}`} onClick={() => setActiveZone('stage')}>
                <Trophy size={32} className="mb-2" /><span className="font-bold tracking-widest uppercase text-sm">Main Stage</span>
              </div>
            </div>
            
            <div className="flex gap-4 md:gap-6 flex-1 relative z-10 min-h-[120px]">
              <div className={`flex-1 border-2 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${activeZone === 'art' ? zones[2].active + ' scale-[1.02]' : zones[2].color + ' hover:scale-[1.01]'}`} onClick={() => setActiveZone('art')}>
                <Palette size={32} className="mb-2" /><span className="font-bold tracking-widest uppercase text-sm">Art &amp; Craft</span>
              </div>
              <div className={`flex-[1.5] border-2 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${activeZone === 'craft' ? zones[3].active + ' scale-[1.02]' : zones[3].color + ' hover:scale-[1.01]'}`} onClick={() => setActiveZone('craft')}>
                <Trophy size={32} className="mb-2" /><span className="font-bold tracking-widest uppercase text-sm">DIY &amp; Innovation</span>
              </div>
            </div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-white px-8 py-1.5 rounded-b-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_15px_rgba(0,229,255,0.5)] z-20">ENTRANCE</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-800 border-t border-x border-white/10 text-gray-400 px-8 py-1.5 rounded-t-xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-inner z-20">BACK GATE</div>
          </motion.div>
          
          {/* Details Panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="xl:w-96 flex flex-col gap-6">
            <div className="glass-card p-8 border border-white/10 min-h-[400px] bg-[#111827]/90 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50" />
              <h2 className="text-xl font-bold font-heading mb-8 flex items-center gap-3 text-white uppercase tracking-widest text-sm">
                <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]"><Navigation size={16}/></div>Zone Details
              </h2>
              <AnimatePresence mode="wait">
                {activeZoneData ? (
                  <motion.div key={activeZoneData.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-white/10 bg-[#1A233A]"><activeZoneData.icon size={36} className={activeZoneData.color.split(' ')[1]}/></div>
                    <h3 className="text-3xl font-black font-heading text-white mb-3 tracking-tight">{activeZoneData.name}</h3>
                    <p className="text-gray-400 mb-6 text-base font-medium leading-relaxed">{activeZoneData.desc}</p>
                    {activeZoneData.stalls.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-3">Stalls in this zone:</p>
                        <div className="flex flex-wrap gap-2">{activeZoneData.stalls.map((stall, i) => (<span key={i} className="inline-flex px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300 font-medium">{stall}</span>))}</div>
                      </div>
                    )}
                    {activeZoneData.id !== 'help' && activeZoneData.id !== 'stage' && (<button className="btn-primary w-full justify-center py-4 text-sm tracking-widest uppercase">Visit {activeZoneData.name}</button>)}
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16 text-gray-500 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#0A0F1C] border border-white/5 flex items-center justify-center mb-6"><MapPin size={32} className="text-gray-600"/></div>
                    <p className="text-sm font-medium max-w-[200px] uppercase tracking-widest">Tap a zone on the map to explore stalls.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="glass-card rounded-[2rem] p-8 border border-[#00E5FF]/20 bg-gradient-to-br from-[#00E5FF]/5 to-transparent">
              <h3 className="font-bold font-heading text-sm mb-3 flex items-center gap-2 text-white uppercase tracking-widest"><Info size={16} className="text-[#00E5FF]"/> Need Help?</h3>
              <p className="text-gray-400 font-medium leading-relaxed text-sm">Look for volunteers wearing special badges, or visit the Help Desk near the Main Entrance. We are here to make your experience smooth and fun!</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 md:px-8 mt-20 relative z-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#00E5FF] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20"><School size={30} className="text-white"/></motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Find Us on the Map</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Bazaar-E-Hunar 2026 is happening at our school. Use the map below to get directions!</p>
          </div>
          <div className="glass-card p-4 border border-white/10 overflow-hidden rounded-[2rem]">
            <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden bg-gray-900">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0839501234567!2d77.2834!3d28.6711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb6b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sSarvodaya%20Bal%20Vidyalaya%20Yamuna%20Vihar!5e0!3m2!1sen!2sin!4v1" className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="School Location"/>
            </div>
            <div className="mt-6 text-center">
              <a href="https://maps.app.goo.gl/mzQcaKX9S2BkP9sd8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00E5FF] hover:text-white font-bold text-sm transition-colors duration-300"><MapPin size={16}/> Open in Google Maps <ChevronRight size={16}/></a>
            </div>
          </div>
        </motion.div>
      </section>
      
    </PageWrapper>
  );
};

export default EventMap;
