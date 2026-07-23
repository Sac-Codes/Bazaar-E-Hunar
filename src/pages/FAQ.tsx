import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const faqs = [
    {
      q: "Who can initialize a node (register a stall)?",
      a: "Any active user (student) of the network from Grade 8 to 12 can register. You can initialize individually or form a squad of up to 4 operators."
    },
    {
      q: "What is the network connection fee?",
      a: "The node registration fee is ₹500. This allocates server space (table), two operator stations (chairs), and a basic power relay."
    },
    {
      q: "Do I retain the data (profits)?",
      a: "Affirmative! 100% of the crypto-cash generated from your transactions belongs to your squad. This simulation is designed to teach real-world resource management."
    },
    {
      q: "What protocols are restricted?",
      a: "You cannot execute processes requiring open flame/gas cooking (induction arrays are allowed), sharp assets, hazardous algorithms, or anything violating the system firewall (code of conduct)."
    },
    {
      q: "How does the transaction system work?",
      a: "Guest users will purchase 'Cyber Credits' from the central Support Deck. You can only accept these credits at your node, not physical currency. Credits will be exchanged for fiat cash at the end of the simulation."
    }
  ];

  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8A00]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-[#1A233A] rounded-2xl flex items-center justify-center text-[#FF8A00] mx-auto mb-6 border border-[#FF8A00]/30 shadow-[0_0_30px_rgba(255,138,0,0.3)]"
          >
            <MessageCircleQuestion size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,138,0,0.2)]"
          >
            Knowledge Base
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 font-medium"
          >
            Query the system. Retrieve answers.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 max-w-4xl mt-12 relative z-20">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className={`glass-card overflow-hidden border transition-all duration-300 ${isOpen ? 'border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,229,255,0.2)] bg-[#111827]' : 'border-white/10 hover:border-[#00E5FF]/30 bg-[#0A0F1C]'}`}
              >
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`font-bold font-heading text-lg md:text-xl pr-8 transition-colors ${isOpen ? 'text-[#00E5FF]' : 'text-gray-200'}`}>
                    <span className="text-gray-500 font-mono text-sm mr-4">[{index + 1 > 9 ? index + 1 : `0${index + 1}`}]</span>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.4)] border border-[#00E5FF]/50' : 'bg-[#1A233A] text-gray-400 border border-white/10'}`}>
                    <ChevronDown 
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      size={20}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-400 text-lg font-medium leading-relaxed pl-16">
                        <div className="pl-4 border-l-2 border-[#8B5CF6]/40">
                          {faq.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-[#050816] rounded-3xl p-10 text-center text-white relative overflow-hidden border border-[#FF8A00]/20 shadow-[0_0_30px_rgba(255,138,0,0.1)]"
        >
          {/* Cyber scanline bg */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8A00]/20 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black font-heading mb-4 text-[#FF8A00]">Data not found?</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto font-medium">If your query is outside the standard parameters, establish a direct link with the administrators.</p>
            <a href="/contact" className="btn-outline border-[#FF8A00]/40 text-[#FF8A00] hover:bg-[#FF8A00]/10 hover:border-[#FF8A00] hover:shadow-[0_0_20px_rgba(255,138,0,0.3)] py-3 px-8 text-lg inline-block">
              Open Comm Channel
            </a>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default FAQ;
