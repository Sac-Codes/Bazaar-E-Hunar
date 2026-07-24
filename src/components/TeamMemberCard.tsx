import { motion } from 'framer-motion';
import type { TeamMember } from '../data/team';
import { Globe, MessageCircle, ExternalLink } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  featured?: boolean;
}

const profileGradients: Record<string, { badge: string; glow: string; ring: string; socialBg: string }> = {
  gold:    { badge: 'from-[#FFD166] to-[#FF8A00]', glow: 'rgba(255,209,102,0.25)',  ring: 'ring-[#FFD166]/30', socialBg: 'hover:bg-[#FFD166]/15 hover:text-[#FFD166] hover:border-[#FFD166]/30' },
  blue:    { badge: 'from-[#3B82F6] to-[#1D4ED8]', glow: 'rgba(59,130,246,0.25)',  ring: 'ring-[#3B82F6]/30', socialBg: 'hover:bg-[#3B82F6]/15 hover:text-[#3B82F6] hover:border-[#3B82F6]/30' },
  purple:  { badge: 'from-[#8B5CF6] to-[#6D28D9]', glow: 'rgba(139,92,246,0.25)', ring: 'ring-[#8B5CF6]/30', socialBg: 'hover:bg-[#8B5CF6]/15 hover:text-[#8B5CF6] hover:border-[#8B5CF6]/30' },
  cyan:    { badge: 'from-[#00E5FF] to-[#0284C7]', glow: 'rgba(0,229,255,0.25)',  ring: 'ring-[#00E5FF]/30', socialBg: 'hover:bg-[#00E5FF]/15 hover:text-[#00E5FF] hover:border-[#00E5FF]/30' },
  orange:  { badge: 'from-[#FF8A00] to-[#EA580C]', glow: 'rgba(255,138,0,0.25)',  ring: 'ring-[#FF8A00]/30', socialBg: 'hover:bg-[#FF8A00]/15 hover:text-[#FF8A00] hover:border-[#FF8A00]/30' },
  emerald: { badge: 'from-[#10B981] to-[#047857]', glow: 'rgba(16,185,129,0.25)', ring: 'ring-[#10B981]/30', socialBg: 'hover:bg-[#10B981]/15 hover:text-[#10B981] hover:border-[#10B981]/30' },
};

export const TeamMemberCard = ({ member, index, featured = false }: TeamMemberCardProps) => {
  const colors = profileGradients[member.accent] || profileGradients.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: featured ? -8 : -10 }}
      className={`group ${featured ? 'md:col-span-1' : ''}`}
    >
      <div className="relative h-full rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-8 transition-all duration-500 group-hover:border-white/[0.15] group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden">
        {/* Gradient border strip - left side accent */}
        <div
          className="absolute top-4 bottom-4 left-0 w-[3px] rounded-r-full transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:shadow-lg"
          style={{ background: `linear-gradient(180deg, ${colors.badge.replace('from-', '').replace('to-', '').trim().split(' ').map(c => c.replace('[', '').replace(']', '')).join(', ')})` }}
        />

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${colors.glow} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center h-full">
          {/* ── Profile Image with Gradient Ring ── */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className={`relative mb-6 ${featured ? 'w-36 h-36' : 'w-28 h-28'}`}
          >
            {/* Outer gradient ring */}
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br ${member.color} p-[3px] ring-2 ${colors.ring} transition-all duration-500 group-hover:ring-opacity-100 group-hover:shadow-xl`}
              style={{ boxShadow: `0 0 0px ${colors.glow}` }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Hover glow aura behind image */}
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-30 -z-10 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)` }}
            />
          </motion.div>

          {/* ── Name ── */}
          <h3
            className={`font-bold text-white mb-1 tracking-tight transition-all duration-300 ${featured ? 'text-2xl' : 'text-lg'}`}
          >
            {member.name}
          </h3>

          {/* ── Position ── */}
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
            {member.position}
          </p>

          {/* ── Role Badge ── */}
          <div
            className="inline-flex px-3 py-1.5 rounded-full text-white font-bold text-[10px] uppercase tracking-widest shadow-lg mb-5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
            style={{ background: `linear-gradient(135deg, ${colors.badge.replace('from-', '').replace('to-', '').trim()})` }}
          >
            {member.role}
          </div>

          {/* ── Contribution ── */}
          <p className={`text-gray-400 leading-relaxed font-medium flex-1 ${featured ? 'text-base' : 'text-sm'}`}>
            {member.contribution}
          </p>

          {/* ── Social Icons ── */}
          <div className="flex gap-3 mt-6 pt-5 w-full justify-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {[Globe, MessageCircle, ExternalLink].map((Icon, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.15 }}
                className={`w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 cursor-pointer transition-all duration-300 ${colors.socialBg}`}
              >
                <Icon size={15} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;

