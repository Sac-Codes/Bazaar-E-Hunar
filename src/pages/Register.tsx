import { XCircle, ClipboardCheck, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const Register = () => {
  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Header */}
      <section className="pt-32 pb-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4D9D]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF8A00]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br from-[#FF4D9D] to-[#FF8A00] flex items-center justify-center shadow-lg shadow-[#FF4D9D]/30"
          >
            <XCircle size={40} className="text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,77,157,0.4)]"
          >
            Registration Closed
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl font-medium max-w-2xl mx-auto"
          >
            Stall registrations for Hunar Bazaar 2026 are now officially closed.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="max-w-3xl mx-auto">
          {/* Closed Notice Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 md:p-14 text-center relative overflow-hidden bg-gradient-to-br from-[#111827]/80 via-[#1A233A]/60 to-[#111827]/80 border border-[#FF4D9D]/30"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D9D] to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF4D9D]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF8A00]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#FF4D9D]/20 to-[#FF8A00]/20 border border-[#FF4D9D]/30 flex items-center justify-center">
                <ClipboardCheck size={48} className="text-[#FF4D9D]" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                Registrations Under Verification
              </h2>
              
              <div className="text-gray-400 text-lg leading-relaxed space-y-4 max-w-xl mx-auto mb-10">
                <p>
                  All submitted stall registrations are currently being reviewed by the organizing team. 
                  We received an overwhelming response this year and are carefully verifying each entry.
                </p>
                <p className="text-gray-500">
                  If you have any questions regarding your registration, please reach out to us through the Contact page.
                </p>
              </div>

              {/* Status Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="p-5 bg-[#050816]/60 rounded-xl border border-white/5">
                  <span className="text-[#FF4D9D] text-2xl font-black block mb-1">📝</span>
                  <p className="text-white font-bold text-sm">Submission</p>
                  <p className="text-gray-500 text-xs mt-1">Completed</p>
                </div>
                <div className="p-5 bg-[#050816]/60 rounded-xl border border-[#FF4D9D]/30">
                  <span className="text-[#FFD54A] text-2xl font-black block mb-1">🔍</span>
                  <p className="text-white font-bold text-sm">Verification</p>
                  <p className="text-[#FFD54A] text-xs mt-1">In Progress</p>
                </div>
                <div className="p-5 bg-[#050816]/60 rounded-xl border border-white/5">
                  <span className="text-gray-500 text-2xl font-black block mb-1">✅</span>
                  <p className="text-white font-bold text-sm">Confirmation</p>
                  <p className="text-gray-500 text-xs mt-1">Pending</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/stalls" className="btn-premium text-lg px-10 py-4 shadow-xl group">
                  Browse Stalls
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="btn-outline text-lg px-10 py-4">
                  <Shield size={20} /> Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Register;
