import { ClipboardList, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe9WPDc7yCk2_f9vZARRNekRsIeGNHdI_FHAgm8h1bzJGJMQg/viewform?usp=publish-editor';

const Register = () => {
  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Header */}
      <section className="pt-32 pb-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10B981]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00E5FF]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            Initialize Node
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl font-medium max-w-2xl mx-auto"
          >
            Turn your digital blueprint into reality. Complete the official registration sequence below.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Info Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 flex flex-col gap-6"
          >
            <div className="glass-card p-8 md:p-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-[#10B981]/30 bg-[#111827]/80">
              <div className="w-16 h-16 bg-[#050816] rounded-2xl flex items-center justify-center text-[#10B981] mb-8 border border-white/5 shadow-inner">
                <ClipboardList size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6 text-white tracking-tight">Regsitration Procedure</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4 group">
                  <span className="w-8 h-8 rounded-xl bg-[#050816] flex items-center justify-center font-bold text-[#10B981] shrink-0 border border-[#10B981]/30 group-hover:bg-[#10B981] group-hover:text-[#050816] transition-colors shadow-inner">1</span>
                  <p className="text-gray-400 font-medium leading-relaxed">Input all required parameters in the Google Form securely.</p>
                </li>
                <li className="flex gap-4 group">
                  <span className="w-8 h-8 rounded-xl bg-[#050816] flex items-center justify-center font-bold text-[#10B981] shrink-0 border border-[#10B981]/30 group-hover:bg-[#10B981] group-hover:text-[#050816] transition-colors shadow-inner">2</span>
                  <p className="text-gray-400 font-medium leading-relaxed">Await authorization message from the team within 48 hours.</p>
                </li>
                <li className="flex gap-4 group">
                  <span className="w-8 h-8 rounded-xl bg-[#050816] flex items-center justify-center font-bold text-[#10B981] shrink-0 border border-[#10B981]/30 group-hover:bg-[#10B981] group-hover:text-[#050816] transition-colors shadow-inner">3</span>
                  <p className="text-gray-400 font-medium leading-relaxed">Clear any doubts or mention if there would be any updates.</p>
                </li>
                <li className="flex gap-4 group">
                  <span className="w-8 h-8 rounded-xl bg-[#050816] flex items-center justify-center font-bold text-[#10B981] shrink-0 border border-[#10B981]/30 group-hover:bg-[#10B981] group-hover:text-[#050816] transition-colors shadow-inner">4</span>
                  <p className="text-gray-400 font-medium leading-relaxed">Receive your team ID and further instructions.</p>
                </li>
              </ul>

              <div className="mt-10 p-6 bg-[#FF4FCB]/10 rounded-2xl border border-[#FF4FCB]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyber-grid opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="flex gap-3 text-[#FF4FCB] font-bold mb-2 relative z-10 items-center">
                  <AlertCircle size={20} className="animate-pulse" />
                  <span className="uppercase tracking-widest text-xs">System Warning</span>
                </div>
                <p className="text-gray-300 text-sm font-medium relative z-10 leading-relaxed">
                  Requests submitted without a valid business logic outline will be automatically terminated by the system.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Google Form Embed */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="glass-card p-4 md:p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)] border border-[#10B981]/20 bg-[#1A233A]/60 h-full min-h-[800px] flex flex-col relative">
              <div className="flex justify-between items-center mb-6 px-4 relative z-10">
                <h3 className="text-2xl font-black tracking-tight text-white uppercase tracking-widest">Initialization Form</h3>
                <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#10B981] hover:text-white transition-colors flex items-center gap-2 group uppercase tracking-widest">
                  [ New Tab ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl overflow-hidden border-[4px] border-[#10B981] relative z-10 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <iframe 
                  src={`${googleFormUrl}&embedded=true`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  className="w-full h-full min-h-[800px]"
                  title="Stall Registration Form"
                >
                  Loading form interface...
                </iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </PageWrapper>
  );
};

export default Register;
