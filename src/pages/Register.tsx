import { ShieldCheck, ClipboardCheck, HelpCircle, ExternalLink, CheckCircle, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import EventTimeline from '../components/EventTimeline';
import { trackVerificationFormOpen, trackVerificationCTA } from '../services/analytics';

const VERIFICATION_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdswH0Q_CUdEJzsJco3B8BWMCz8ZBjmzh9v-YWFEvVb3ZuPjA/viewform?usp=dialog';

const VERIFICATION_ITEMS = [
  'Participation Confirmation',
  'Product / Service Details',
  'Product Quantity',
  'Investment Details',
  'Pricing Range',
  'Stall Requirements',
  'Final Verification',
  'Stall Allotment Information',
];

const Register = () => {
  const handleVerificationFormOpen = () => {
    trackVerificationFormOpen('register_page');
    window.open(VERIFICATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-[#FF8A00]/10 via-[#FFD54A]/8 to-transparent rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-[#8B5CF6]/10 via-[#FF4FCB]/8 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FF8A00]/5 via-[#FFD54A]/5 to-[#8B5CF6]/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <section className="pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8A00]/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFD54A]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br from-[#FF8A00] to-[#FFD54A] flex items-center justify-center shadow-lg shadow-[#FF8A00]/30"
          >
            <ShieldCheck size={40} className="text-[#07111F]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,138,0,0.4)]"
          >
            Verification Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl font-medium max-w-2xl mx-auto"
          >
            Stall allotment & team verification for Hunar Bazaar 2026
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ── Event Status Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-premium p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#111827]/80 via-[#1A233A]/60 to-[#111827]/80 border border-[#FF8A00]/30"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF8A00]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFD54A]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/30 text-[#FFD54A] text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
                Verification & Stall Allotment Phase
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Current Event Status
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                Registrations for Hunar Bazaar 2026 have successfully concluded.
                All registered teams are now requested to complete the{' '}
                <span className="text-[#FFD54A] font-semibold">Verification Form</span> to confirm
                their participation and receive their official stall allotment.
              </p>

              {/* Verification Includes Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {VERIFICATION_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2.5 bg-[#050816]/60 rounded-lg border border-white/5"
                  >
                    <CheckCircle size={14} className="text-[#10B981] shrink-0" />
                    <span className="text-gray-300 text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Event Progress Timeline ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <EventTimeline />
          </motion.div>

          {/* ── Verification Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-premium p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br from-[#111827]/80 via-[#1A233A]/60 to-[#111827]/80 border border-[#FF8A00]/30"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD54A] to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD54A]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF8A00]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#FF8A00]/20 to-[#FFD54A]/20 border border-[#FF8A00]/30 flex items-center justify-center">
                <ClipboardCheck size={48} className="text-[#FFD54A]" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                Verification & Stall Allotment Portal
              </h2>

              <div className="text-gray-400 text-lg leading-relaxed space-y-4 max-w-xl mx-auto mb-8">
                <p>
                  Registrations for Hunar Bazaar 2026 are now officially closed.
                </p>
                <p className="text-gray-500">
                  If your team has already registered, you must complete the{' '}
                  <span className="text-[#FFD54A] font-semibold">Verification Form</span> to
                  confirm your participation and receive your official stall allotment.
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleVerificationFormOpen}
                className="btn-premium text-lg px-10 py-4 shadow-xl shadow-[#FF8A00]/25 group inline-flex items-center gap-3"
              >
                Complete Verification Form
                <ExternalLink
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <p className="text-gray-500 text-sm mt-4 font-medium">
                Only already registered teams are eligible to submit this form.
              </p>

              {/* Success Message */}
              <div className="mt-8 p-5 bg-[#10B981]/10 rounded-2xl border border-[#10B981]/20 max-w-lg mx-auto">
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-[#10B981] font-bold text-sm">
                      Verification Timeline
                    </p>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      Verification generally takes 24–48 hours after submission. Once verified,
                      your team will receive stall allocation details from the organizing
                      committee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Help Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card-premium p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#111827]/80 via-[#1A233A]/60 to-[#111827]/80 border border-white/5"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                <HelpCircle size={32} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                  Need Help?
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Contact the Event Coordinators for assistance regarding verification or stall
                  allotment.
                </p>
              </div>
              <Link
                to="/contact"
                onClick={() => trackVerificationCTA('help_card')}
                className="btn-outline text-base px-6 py-3 shrink-0"
              >
                <Phone size={16} />
                Contact Coordinators
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Register;
