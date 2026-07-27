import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { stallsData } from '../data/stalls';
import { getCategoryIcon } from '../data/stallIcons';

// ── Configurable ──
const MAX_STALLS = 100;

// ── Types ──
interface CategoryStat {
  name: string;
  count: number;
  icon: string;
  label: string;
  gradient: string;
  glowColor: string;
}

interface StallStats {
  total: number;
  categoryCount: number;
  categoryStats: CategoryStat[];
  mostPopular: CategoryStat | null;
  progress: number; // 0–100
  isFull: boolean;
}

// ── Animated Counter ──
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    setDisplay(0);
    let start = 0;
    const duration = 1200;
    const steps = 60;
    const stepSize = Math.max(1, Math.floor(value / steps));
    const intervalMs = duration / steps;

    const interval = setInterval(() => {
      start += stepSize;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(start);
      }
    }, intervalMs);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <span>
      {display}{suffix}
    </span>
  );
}

// ── Progress Bar ──
function ProgressBar({ percent }: { percent: number }) {
  const [, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    const timer = setTimeout(() => setWidth(percent), 300);
    return () => clearTimeout(timer);
  }, [percent]);

  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full h-2.5 bg-[#1A233A] rounded-full overflow-hidden border border-white/5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className={`h-full rounded-full ${
          clamped >= 90
            ? 'bg-gradient-to-r from-[#FF4D9D] to-[#FF8A00]'
            : clamped >= 60
            ? 'bg-gradient-to-r from-[#FF8A00] to-[#FFD54A]'
            : 'bg-gradient-to-r from-[#00E5FF] to-[#10B981]'
        }`}
        style={{ boxShadow: `0 0 12px ${clamped >= 90 ? 'rgba(255,77,157,0.4)' : clamped >= 60 ? 'rgba(255,138,0,0.4)' : 'rgba(0,229,255,0.4)'}` }}
      />
    </div>
  );
}

// ── Main Component ──
const StallStatistics = () => {
  const stats = useMemo<StallStats>(() => {
    const total = stallsData.length;

    // Count per category
    const countMap = new Map<string, number>();
    stallsData.forEach((s) => {
      countMap.set(s.category, (countMap.get(s.category) || 0) + 1);
    });

    // Build category stat entries with icons
    const categoryStats: CategoryStat[] = Array.from(countMap.entries())
      .map(([name, count]) => {
        const iconData = getCategoryIcon(name);
        return {
          name,
          count,
          icon: iconData.icon,
          label: iconData.label,
          gradient: iconData.gradient,
          glowColor: iconData.glowColor,
        };
      })
      .sort((a, b) => b.count - a.count); // most popular first

    // Most popular
    const mostPopular = categoryStats.length > 0 ? categoryStats[0] : null;

    // Progress
    const progress = Math.round((total / MAX_STALLS) * 100);

    return {
      total,
      categoryCount: categoryStats.length,
      categoryStats,
      mostPopular,
      progress,
      isFull: total >= MAX_STALLS,
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mb-12"
    >
      {/* Dashboard Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <span className="text-[#FFD54A]">📊</span>
          Stall Statistics Dashboard
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] rounded-full mt-2" />
      </motion.div>

      {/* Top Row: Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Card 1: Total Stalls (Large) */}
        <motion.div
          variants={itemVariants}
          className="relative group bg-[#1A233A]/60 backdrop-blur-sm rounded-2xl overflow-hidden p-6 md:p-8 border border-white/5 hover:border-[#00E5FF]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#00E5FF]/10"
        >
          {/* Gradient border on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              border: '1.5px solid transparent',
              background: 'linear-gradient(135deg, rgba(0,229,255,0.3), rgba(139,92,246,0.3)) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00E5FF]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-start gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center text-3xl md:text-4xl shadow-lg shrink-0">
              🏪
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">
                Total Registered Stalls
              </p>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter value={stats.total} />
              </p>
              <p className="text-gray-500 text-sm mt-1.5 font-medium">
                Students showcasing their ideas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Categories (Large) */}
        <motion.div
          variants={itemVariants}
          className="relative group bg-[#1A233A]/60 backdrop-blur-sm rounded-2xl overflow-hidden p-6 md:p-8 border border-white/5 hover:border-[#8B5CF6]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#8B5CF6]/10"
        >
          {/* Gradient border on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              border: '1.5px solid transparent',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(255,77,157,0.3)) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          {/* Glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#8B5CF6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-start gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF4D9D] flex items-center justify-center text-3xl md:text-4xl shadow-lg shrink-0">
              📂
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">
                Categories
              </p>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter value={stats.categoryCount} />
              </p>
              <p className="text-gray-500 text-sm mt-1.5 font-medium">
                Unique stall categories available.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Extra Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Most Popular Category */}
        {stats.mostPopular && (
          <motion.div
            variants={itemVariants}
            className="relative group bg-[#1A233A]/60 backdrop-blur-sm rounded-2xl overflow-hidden p-5 md:p-6 border border-white/5 hover:border-[#FFD54A]/40 transition-all duration-500 shadow-lg"
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                border: '1.5px solid transparent',
                background: 'linear-gradient(135deg, rgba(255,213,74,0.3), rgba(255,138,0,0.3)) border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div className="relative z-10 flex items-center gap-4">
              <div className="text-2xl">⭐</div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-0.5">
                  Most Popular Category
                </p>
                <p className="text-lg md:text-xl font-black text-[#FFD54A]">
                  {stats.mostPopular.name}
                </p>
                <p className="text-gray-500 text-sm mt-0.5">
                  {stats.mostPopular.count} Stall{stats.mostPopular.count !== 1 ? 's' : ''}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${stats.mostPopular.gradient} flex items-center justify-center text-base shrink-0 shadow-lg`}
                style={{ boxShadow: `0 0 16px ${stats.mostPopular.glowColor}` }}
              >
                <img
                  src={stats.mostPopular.icon}
                  alt={stats.mostPopular.name}
                  className="w-5 h-5 object-contain select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Participation Progress */}
        <motion.div
          variants={itemVariants}
          className="relative group bg-[#1A233A]/60 backdrop-blur-sm rounded-2xl overflow-hidden p-5 md:p-6 border border-white/5 hover:border-[#10B981]/40 transition-all duration-500 shadow-lg"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              border: '1.5px solid transparent',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(0,229,255,0.3)) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">📈</span>
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                    Participation Progress
                  </p>
                  <p className="text-white font-bold text-sm mt-0.5">
                    {stats.total} / {MAX_STALLS} Registered
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                stats.isFull
                  ? 'bg-[#FF4D9D]/20 text-[#FF4D9D] border border-[#FF4D9D]/30'
                  : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
              }`}>
                {stats.progress}%
              </span>
            </div>
            <ProgressBar percent={stats.progress} />
            {/* Registration Status Badge */}
            <div className="mt-3 flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${
                stats.isFull ? 'bg-[#FF4D9D] animate-pulse' : 'bg-[#10B981] animate-pulse'
              }`} />
              <span className={`text-xs font-bold ${
                stats.isFull ? 'text-[#FF4D9D]' : 'text-[#10B981]'
              }`}>
                {stats.isFull ? '🔴 Registration Full' : '🟢 Registration Open'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
          Category Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stats.categoryStats.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ y: -3, scale: 1.01 }}
              className="relative group bg-[#1A233A]/40 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-white/20 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Hover glow */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${cat.glowColor}, transparent)` }}
              />
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  style={{ boxShadow: `0 0 12px ${cat.glowColor}` }}
                >
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-5 h-5 object-contain select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold leading-tight truncate">
                    {cat.label} {cat.name}
                  </p>
                  <p className="text-gray-500 text-xs font-medium mt-0.5">
                    {cat.count} Stall{cat.count !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-white font-black text-lg">{cat.count}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StallStatistics;

