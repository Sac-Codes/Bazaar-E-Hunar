import { Target, Flag, Rocket, CheckCircle2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const About = () => {
  const timeline = [
    { time: '09:00 AM', title: 'Inauguration Ceremony', desc: 'Opening speech by the Principal and ribbon cutting.', color: 'from-[#00E5FF] to-[#3B82F6]', shadow: 'shadow-[#00E5FF]/20' },
    { time: '10:00 AM', title: 'Stalls Open', desc: 'All stalls are officially open for visitors.', color: 'from-[#3B82F6] to-[#8B5CF6]', shadow: 'shadow-[#3B82F6]/20' },
    { time: '01:00 PM', title: 'Cultural Performances', desc: 'Live music and dance performances at the main stage.', color: 'from-[#8B5CF6] to-[#FF4FCB]', shadow: 'shadow-[#8B5CF6]/20' },
    { time: '04:00 PM', title: 'Award Ceremony', desc: 'Prizes for Best Stall, Highest Sales, and Most Innovative Idea.', color: 'from-[#FF4FCB] to-[#FF8A00]', shadow: 'shadow-[#FF4FCB]/20' },
    { time: '05:00 PM', title: 'Closing', desc: 'Event wraps up.', color: 'from-[#FF8A00] to-[#10B981]', shadow: 'shadow-[#FF8A00]/20' },
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-transparent py-24 md:py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tight"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] via-[#FF4FCB] to-[#8B5CF6] drop-shadow-[0_0_15px_rgba(255,138,0,0.4)]">Bazaar-E-Hunar</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            The ultimate student innovation festival. Create your stall. Showcase your talent. Celebrate creativity.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="glass-card p-10 md:p-14 group hover:border-[#00E5FF]/40"
            >
              <div className="w-20 h-20 bg-[#111827] border border-[#00E5FF]/30 rounded-2xl flex items-center justify-center text-[#00E5FF] mb-8 shadow-[0_0_20px_rgba(0,229,255,0.2)] group-hover:bg-[#00E5FF] group-hover:text-[#050816] transition-colors duration-500">
                <Target size={40} />
              </div>
              <h2 className="text-3xl font-black mb-6 text-white tracking-tight group-hover:text-[#00E5FF] transition-colors">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed text-lg md:text-xl font-medium">
                To create a dynamic ecosystem where students can discover their entrepreneurial potential, learn practical business skills, and turn their creative ideas into tangible realities on a premium platform.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
              className="glass-card p-10 md:p-14 group hover:border-[#8B5CF6]/40"
            >
              <div className="w-20 h-20 bg-[#111827] border border-[#8B5CF6]/30 rounded-2xl flex items-center justify-center text-[#8B5CF6] mb-8 shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:bg-[#8B5CF6] group-hover:text-[#050816] transition-colors duration-500">
                <Flag size={40} />
              </div>
              <h2 className="text-3xl font-black mb-6 text-white tracking-tight group-hover:text-[#8B5CF6] transition-colors">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed text-lg md:text-xl font-medium">
                To provide a platform that bridges the gap between theoretical learning and real-world application by allowing students to manage their own micro-businesses in a highly supportive, tech-forward environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives & Benefits */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[#081020] skew-y-2 origin-top-right -z-10 border-t border-b border-[#00E5FF]/5"></div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white"
            >
              Core Skills
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-xl font-medium max-w-2xl mx-auto"
            >
              What students gain from participating in Bzaar-E-Hunar.
            </motion.p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Rocket, title: "Innovation", text: "Turning creative ideas into real-world products and services.", color: "text-[#00E5FF]", border: "group-hover:border-[#00E5FF]/50" },
              { icon: Target, title: "Marketing", text: "Learning how to attract customers and promote your stall.", color: "text-[#8B5CF6]", border: "group-hover:border-[#8B5CF6]/50" },
              { icon: CheckCircle2, title: "Finance", text: "Understanding pricing, profits, and handling transactions.", color: "text-[#10B981]", border: "group-hover:border-[#10B981]/50" },
              { icon: Flag, title: "Leadership", text: "Managing a team and taking ownership of your venture.", color: "text-[#FF8A00]", border: "group-hover:border-[#FF8A00]/50" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                whileHover={{ y: -10 }}
                className={`glass-card p-10 text-center group cursor-default transition-all duration-300 ${item.border}`}
              >
                <div className={`w-20 h-20 mx-auto bg-[#1A233A] rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-inner ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={36} />
                </div>
                <h3 className={`text-2xl font-black mb-4 ${item.color}`}>{item.title}</h3>
                <p className="text-gray-400 text-lg font-medium leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white"
            >
              Event Timeline
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-xl font-medium"
            >
              The schedule for the big day.
            </motion.p>
          </div>
          
          <div className="space-y-16 relative">
            {/* Glowing timeline line */}
            <div className="absolute left-[39px] md:left-[212px] top-0 bottom-0 w-1 bg-gradient-to-b from-[#00E5FF] via-[#8B5CF6] to-[#10B981] opacity-20 hidden md:block rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, type: 'spring' }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group relative"
              >
                <div className={`md:w-48 shrink-0 flex items-center justify-center gap-3 font-bold bg-[#1A233A] px-6 py-4 rounded-xl border border-white/10 shadow-lg relative z-10 group-hover:border-white/20 transition-colors`}>
                  <Calendar size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  <span
                    className="text-lg font-black tracking-tight"
                    style={{
                      background: `linear-gradient(135deg, ${item.color.replace('from-[', '').replace('] to-[', ', ').replace(']', '')})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {item.time}
                  </span>
                </div>
                
                {/* Timeline dot */}
                <div className={`absolute left-[35px] md:left-[208px] top-5 w-3 h-3 rounded-full bg-white hidden md:block z-20 shadow-[0_0_15px_rgba(255,255,255,1)] group-hover:scale-150 transition-transform`}></div>

                <div className="relative flex-1 glass-card p-8 group-hover:border-[#00E5FF]/30 transition-colors">
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-[#00E5FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;
