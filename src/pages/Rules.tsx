import { Shield, Droplets, Zap, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const Rules = () => {
  const rules = [
    {
      icon: Clock,
      title: 'Timings & Setup',
      desc: 'All nodes must be online by 8:00 AM on both days for system setup. Connections must remain active until 5:00 PM. Early disconnection is not permitted.',
      color: 'text-[#3B82F6]',
      bg: 'bg-[#111827]',
      border: 'border-[#3B82F6]/20',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    },
    {
      icon: Trash2,
      title: 'Data Hygiene',
      desc: 'You are responsible for the cleanliness of your server area. A trash bin must be present at every node. A penalty of ₹500 will be imposed for data corruption (littering).',
      color: 'text-[#10B981]',
      bg: 'bg-[#111827]',
      border: 'border-[#10B981]/20',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    },
    {
      icon: Zap,
      title: 'Power Draw',
      desc: 'Only one 5A plug point is provided per node. High-draw appliances like microwaves are strictly prohibited. Only basic LED lighting and low-power cooktops are allowed.',
      color: 'text-[#FFD166]',
      bg: 'bg-[#111827]',
      border: 'border-[#FFD166]/20',
      glow: 'shadow-[0_0_20px_rgba(255,209,102,0.2)] hover:shadow-[0_0_30px_rgba(255,209,102,0.4)]',
    },
    {
      icon: Droplets,
      title: 'Organic Matter Safety',
      desc: 'All food nodes must maintain strict protocol. Hairnets and gloves are mandatory. Open flame cooking is strictly prohibited (only induction arrays allowed).',
      color: 'text-[#FF8A00]',
      bg: 'bg-[#111827]',
      border: 'border-[#FF8A00]/20',
      glow: 'shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_30px_rgba(255,138,0,0.4)]',
    },
    {
      icon: Shield,
      title: 'Network Conduct',
      desc: 'Maintain decorum within the grid. Aggressive spam marketing, loud frequencies, or disrupting neighboring nodes will lead to immediate banishment.',
      color: 'text-[#8B5CF6]',
      bg: 'bg-[#111827]',
      border: 'border-[#8B5CF6]/20',
      glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]',
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Assets',
      desc: 'Distribution of weapons, hazardous elements, adult content, or anything violating the system firewall is strictly forbidden.',
      color: 'text-[#FF4FCB]',
      bg: 'bg-[#111827]',
      border: 'border-[#FF4FCB]/20',
      glow: 'shadow-[0_0_20px_rgba(255,79,203,0.2)] hover:shadow-[0_0_30px_rgba(255,79,203,0.4)]',
    }
  ];

  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-[#1A233A] rounded-2xl flex items-center justify-center text-[#FF4FCB] mx-auto mb-6 border border-[#FF4FCB]/30 shadow-[0_0_30px_rgba(255,79,203,0.3)]"
          >
            <Shield size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,79,203,0.2)]"
          >
            System Protocols
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto"
          >
            To ensure a secure and stabilized network for everyone, all users must strictly adhere to these firewall guidelines.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 max-w-7xl mt-12 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rules.map((rule, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 border hover:-translate-y-2 transition-all duration-500 group ${rule.border} ${rule.bg} ${rule.glow}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110 bg-[#050816] ${rule.color}`}>
                <rule.icon size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white tracking-tight group-hover:text-gray-200 transition-colors">{rule.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed text-lg">
                {rule.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#1A0B1A] border border-[#FF4FCB]/30 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_40px_rgba(255,79,203,0.15)] relative overflow-hidden"
        >
          {/* Animated Warning Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,79,203,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] pointer-events-none"></div>

          <div className="w-24 h-24 shrink-0 bg-[#FF4FCB]/10 rounded-2xl flex items-center justify-center text-[#FF4FCB] border border-[#FF4FCB]/40 shadow-[0_0_20px_rgba(255,79,203,0.4)] relative z-10">
            <AlertTriangle size={48} className="animate-pulse" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-3 flex items-center gap-4">
              Zero Tolerance Directive
              <span className="text-[10px] bg-[#FF4FCB]/20 text-[#FF4FCB] px-3 py-1 rounded-full uppercase tracking-widest border border-[#FF4FCB]/50 font-bold">Priority Red</span>
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed text-lg">
              The system administrators reserve the right to immediately sever connection to any node and expel users found violating these protocols. No refunds will be provided for terminated connections.
            </p>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Rules;
