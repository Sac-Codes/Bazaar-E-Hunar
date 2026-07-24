import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, Heart, Clock, Target, Star } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';
import { teamMembers } from '../data/team';

// ── Department color config ──
const DEPT_COLORS: Record<string, { primary: string; bg: string; glow: string }> = {
  gold:    { primary: '#FFD166', bg: 'rgba(255,209,102,0.08)', glow: 'rgba(255,209,102,0.2)' },
  blue:    { primary: '#3B82F6', bg: 'rgba(59,130,246,0.08)', glow: 'rgba(59,130,246,0.2)' },
  purple:  { primary: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', glow: 'rgba(139,92,246,0.2)' },
  cyan:    { primary: '#00E5FF', bg: 'rgba(0,229,255,0.08)',  glow: 'rgba(0,229,255,0.2)' },
  orange:  { primary: '#FF8A00', bg: 'rgba(255,138,0,0.08)',  glow: 'rgba(255,138,0,0.2)' },
  emerald: { primary: '#10B981', bg: 'rgba(16,185,129,0.08)', glow: 'rgba(16,185,129,0.2)' },
};

// ── Stats config with unique identities ──
const STATS_CONFIG = [
  { target: 15, label: 'Team Members', suffix: '', icon: Users,    color: '#3B82F6', gradient: 'from-[#3B82F6] to-[#00E5FF]', desc: 'Dedicated & diverse' },
  { target: 200, label: 'Hours of Work', suffix: '+', icon: Clock,  color: '#8B5CF6', gradient: 'from-[#8B5CF6] to-[#FF4FCB]', desc: 'Commitment & passion' },
  { target: 45, label: 'Days of Planning', suffix: '', icon: Target, color: '#00E5FF', gradient: 'from-[#00E5FF] to-[#3B82F6]', desc: 'Meticulous preparation' },
  { target: 1, label: 'Shared Vision', suffix: '', icon: Heart,     color: '#FF8A00', gradient: 'from-[#FF8A00] to-[#FF4FCB]', desc: 'One team, one dream' },
];

// ── Animated Counter with unique identity ──
const AnimatedCounter = ({ stat, index }: { stat: typeof STATS_CONFIG[0]; index: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = stat.target / 30;
    const interval = setInterval(() => {
      start += increment;
      if (start >= stat.target) {
        setCount(stat.target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [stat.target]);

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:border-white/[0.12] hover:shadow-2xl overflow-hidden">
        {/* Gradient top accent */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient} opacity-60`} />
        
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${stat.color}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}08)`,
              border: `1px solid ${stat.color}30`,
            }}
          >
            <Icon size={22} style={{ color: stat.color }} />
          </div>

          {/* Counter */}
          <div
            className="text-4xl md:text-5xl font-black mb-1 transition-colors duration-300"
            style={{
              background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {count}{stat.suffix}
          </div>

          {/* Label */}
          <p className="text-white font-bold text-sm uppercase tracking-wider mb-1">{stat.label}</p>

          {/* Description */}
          <p className="text-gray-500 text-xs font-medium">{stat.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ── Group Config with accent-specific colors ──
const GROUP_CONFIG: Record<string, { emoji: string; title: string; subtitle: string; badgeGradient: string; accentKey: string }> = {
  leadership: {
    emoji: '👑',
    title: 'Event Leadership',
    subtitle: 'The visionaries steering the ship',
    badgeGradient: 'from-[#FFD166] to-[#FF8A00]',
    accentKey: 'gold',
  },
  management: {
    emoji: '⚙️',
    title: 'Management Team',
    subtitle: 'Keeping everything running smoothly',
    badgeGradient: 'from-[#3B82F6] to-[#1D4ED8]',
    accentKey: 'blue',
  },
  creative: {
    emoji: '🎨',
    title: 'Creative & Design',
    subtitle: 'The artists behind the aesthetic',
    badgeGradient: 'from-[#8B5CF6] to-[#6D28D9]',
    accentKey: 'purple',
  },
  marketing: {
    emoji: '📢',
    title: 'Marketing & Media',
    subtitle: 'Spreading the word far and wide',
    badgeGradient: 'from-[#FF8A00] to-[#EA580C]',
    accentKey: 'orange',
  },
  operations: {
    emoji: '🤝',
    title: 'Operations & Volunteers',
    subtitle: 'The backbone of the event',
    badgeGradient: 'from-[#10B981] to-[#047857]',
    accentKey: 'emerald',
  },
};

// ── Group order for display ──
const GROUP_ORDER = ['leadership', 'management', 'creative', 'marketing', 'operations'];

// ── Memoized grouped members ──
function useGroupedMembers() {
  return useMemo(() => {
    const map = new Map<string, typeof teamMembers>();
    for (const key of GROUP_ORDER) {
      map.set(key, teamMembers.filter((m) => m.group === key));
    }
    return map;
  }, []);
}

export const MeetTheTeam = () => {
  const groupedMembers = useGroupedMembers();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* ── Premium Animated Background ── */}
      <div className="absolute inset-0 -z-10">
        {/* Aurora gradient mesh */}
        <div
          className="absolute inset-0 animate-gradient-mesh opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(0,229,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse 70% 40% at 50% 80%, rgba(255,138,0,0.05) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Floating colored blobs */}
        <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-[#00E5FF]/10 rounded-full blur-[120px] animate-blob opacity-50" />
        <div className="absolute top-[25%] right-[10%] w-[350px] h-[350px] bg-[#8B5CF6]/10 rounded-full blur-[100px] animate-blob animation-delay-2000 opacity-50" />
        <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-[#FF8A00]/8 rounded-full blur-[130px] animate-blob animation-delay-4000 opacity-40" />
        <div className="absolute bottom-[25%] right-[15%] w-[300px] h-[300px] bg-[#FF4FCB]/8 rounded-full blur-[110px] animate-blob animation-delay-1000 opacity-30" />
        <div className="absolute top-[50%] left-[40%] w-[250px] h-[250px] bg-[#3B82F6]/8 rounded-full blur-[90px] animate-blob animation-delay-3000 opacity-30" />

        {/* Subtle cyber grid */}
        <div className="absolute inset-0 bg-cyber-grid opacity-8" />

        {/* Geometric decorative elements */}
        <div className="absolute top-[30%] left-[5%] opacity-15">
          <svg width="50" height="50" viewBox="0 0 50 50" className="animate-geometric-rotate">
            <polygon points="25,5 45,25 25,45 5,25" fill="none" stroke="#00E5FF" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-[30%] right-[8%] opacity-15">
          <svg width="40" height="40" viewBox="0 0 40 40" className="animate-geometric-rotate animation-delay-2000">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#8B5CF6" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute top-[60%] left-[3%] opacity-12">
          <svg width="30" height="30" viewBox="0 0 30 30" className="animate-geometric-rotate animation-delay-4000">
            <rect x="3" y="3" width="24" height="24" rx="2" fill="none" stroke="#FF8A00" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br from-[#00E5FF] via-[#8B5CF6] to-[#FF4FCB] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20"
          >
            <Users size={36} className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight"
          >
            Meet the Team{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF4FCB]">
              Behind Bazaar-E-Hunar
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Behind every successful event is a dedicated team. Bazaar-E-Hunar 2026 is the result of creativity, 
            teamwork, planning, and countless hours of effort by our Student Council members. Together, we are 
            building an experience that inspires innovation, entrepreneurship, and leadership.
          </motion.p>
        </motion.div>

        {/* ── Statistics Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {STATS_CONFIG.map((stat, idx) => (
              <AnimatedCounter key={stat.label} stat={stat} index={idx} />
            ))}
          </div>
        </motion.div>

        {/* ── Hierarchical Team Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-24"
        >
          {GROUP_ORDER.map((groupKey) => {
            const groupConfig = GROUP_CONFIG[groupKey];
            const members = groupedMembers.get(groupKey) || [];
            if (members.length === 0) return null;

            const accent = DEPT_COLORS[groupConfig.accentKey];
            const isLeadership = groupKey === 'leadership';
            const gridCols = 'md:grid-cols-3';

            return (
              <div key={groupKey}>
                {/* ── Group Heading ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-12 text-center md:text-left"
                >
                  {/* Accent badge */}
                  <div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md border mb-4 transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: accent.bg,
                      borderColor: `${accent.primary}30`,
                      boxShadow: `0 0 20px ${accent.glow}`,
                    }}
                  >
                    <span className="text-2xl">{groupConfig.emoji}</span>
                    <span
                      className="font-black text-lg tracking-tight"
                      style={{
                        background: `linear-gradient(135deg, ${accent.primary}, ${accent.primary}dd)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {groupConfig.title}
                    </span>
                  </div>

                  <p className="text-gray-500 font-medium text-lg ml-2">{groupConfig.subtitle}</p>

                  {/* Animated decorative divider */}
                  <div className="mt-4 flex items-center gap-3 ml-2">
                    <div className="h-[2px] w-12 rounded-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent.primary}60, transparent)` }} />
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent.primary }} />
                    <div className="h-[2px] w-24 rounded-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent.primary}40, transparent)` }} />
                  </div>
                </motion.div>

                {/* ── Group Grid ── */}
                <div className={`grid grid-cols-1 ${gridCols} gap-6 md:gap-8`}>
                  {members.map((member, idx) => (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      index={idx}
                      featured={isLeadership}
                    />
                  ))}
                </div>

                {/* ── Connector between groups ── */}
                {groupKey !== GROUP_ORDER[GROUP_ORDER.length - 1] && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center mt-16"
                  >
                    <div className="flex flex-col items-center gap-2">
                      {/* Glowing dot nodes */}
                      <div className="flex items-center gap-6">
                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#00E5FF', boxShadow: '0 0 10px rgba(0,229,255,0.5)' }} />
                        <div className="w-2 h-2 rounded-full animate-pulse animation-delay-200" style={{ backgroundColor: '#8B5CF6', boxShadow: '0 0 8px rgba(139,92,246,0.4)' }} />
                        <div className="w-3 h-3 rounded-full animate-pulse animation-delay-500" style={{ backgroundColor: '#FF4FCB', boxShadow: '0 0 10px rgba(255,79,203,0.5)' }} />
                      </div>
                      {/* Gradient connecting line */}
                      <div className="w-32 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), rgba(139,92,246,0.3), rgba(255,79,203,0.3), transparent)' }} />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ── Closing Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-32"
        >
          <div className="relative group">
            {/* Premium glass card */}
            <div className="relative p-12 md:p-16 text-center rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-2xl">
              {/* Animated gradient border glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(139,92,246,0.06), rgba(255,79,203,0.08))' }} />
              
              {/* Decorative quote marks */}
              <div className="absolute top-6 left-8 text-7xl font-serif leading-none opacity-20" style={{ color: '#00E5FF' }}>"</div>
              <div className="absolute bottom-6 right-8 text-7xl font-serif leading-none opacity-20" style={{ color: '#FF4FCB' }}>"</div>

              {/* Sparkle decoration */}
              <div className="absolute top-8 right-12 opacity-30">
                <Star size={16} className="animate-sparkle" style={{ color: '#FFD166' }} />
              </div>
              <div className="absolute bottom-8 left-12 opacity-30">
                <Sparkles size={14} className="animate-sparkle animation-delay-1000" style={{ color: '#00E5FF' }} />
              </div>

              {/* Quote content */}
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed max-w-3xl mx-auto">
                  Great events are not created by individuals—they are built by passionate teams working together with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF4FCB]">
                    dedication, creativity, and purpose
                  </span>
                  .
                </p>

                {/* Attribution line */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
                  <span className="text-gray-600 text-sm font-medium tracking-widest uppercase">Bazaar-E-Hunar 2026</span>
                  <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheTeam;

