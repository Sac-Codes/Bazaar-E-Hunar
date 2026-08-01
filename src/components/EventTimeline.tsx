import { useState, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Settings, Calendar, Award, Clock } from 'lucide-react';

// ── Types ──
interface TimelineStage {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
  icon: typeof CheckCircle;
  date: string;
}

// ── Stage Config ──
const STAGES: TimelineStage[] = [
  {
    id: 'registrations',
    label: 'Registrations',
    status: 'completed',
    icon: CheckCircle,
    date: 'Completed',
  },
  {
    id: 'verification',
    label: 'Verification & Stall Allotment',
    status: 'active',
    icon: Shield,
    date: 'In Progress',
  },
  {
    id: 'setup',
    label: 'Stall Setup',
    status: 'upcoming',
    icon: Settings,
    date: 'Upcoming',
  },
  {
    id: 'event',
    label: 'Event Day',
    status: 'upcoming',
    icon: Calendar,
    date: 'Upcoming',
  },
  {
    id: 'results',
    label: 'Results & Certificates',
    status: 'upcoming',
    icon: Award,
    date: 'Upcoming',
  },
];

// ── Progress Calculation ──
const COMPLETED_STAGES = STAGES.filter((s) => s.status === 'completed').length;
const ACTIVE_STAGES = STAGES.filter((s) => s.status === 'active').length;
const PROGRESS_PERCENT = Math.round(
  ((COMPLETED_STAGES + ACTIVE_STAGES * 0.5) / STAGES.length) * 100
);

// ── Single Node Component ──
const TimelineNode = memo(
  ({
    stage,
    index,
    isLast,
    prefersReducedMotion,
  }: {
    stage: TimelineStage;
    index: number;
    isLast: boolean;
    prefersReducedMotion: boolean;
  }) => {
    const isCompleted = stage.status === 'completed';
    const isActive = stage.status === 'active';
    const isUpcoming = stage.status === 'upcoming';

const nodeVariants = {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { delay: index * 0.15, duration: 0.5, ease: 'easeOut' as const },
      },
    };

    const Icon = stage.icon;

    return (
      <motion.div
        variants={nodeVariants}
        initial="hidden"
        animate="visible"
        className={`flex flex-col items-center relative ${
          isLast ? '' : 'flex-1'
        } min-w-0`}
      >
        {/* Node Circle */}
        <div className="relative z-10">
          <motion.div
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-500 ${
              isCompleted
                ? 'bg-[#10B981] border-[#10B981] shadow-[#10B981]/30'
                : isActive
                ? 'bg-[#FF8A00] border-[#FFD54A] shadow-[#FF8A00]/40'
                : 'bg-[#1A233A] border-[#2A3A5A] shadow-none'
            }`}
            animate={
              isActive && !prefersReducedMotion
                ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 0px rgba(255,138,0,0.3)',
                      '0 0 25px rgba(255,138,0,0.6)',
                      '0 0 0px rgba(255,138,0,0.3)',
                    ],
                  }
                : { scale: 1 }
            }
            transition={
              isActive && !prefersReducedMotion
                ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                : {}
            }
          >
            {isCompleted ? (
              <CheckCircle size={24} className="text-white" />
            ) : (
              <Icon
                size={24}
                className={
                  isActive
                    ? 'text-white'
                    : 'text-gray-600'
                }
              />
            )}
          </motion.div>

          {/* Active Badge */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#FF8A00] text-white text-[8px] font-bold uppercase tracking-widest shadow-lg shadow-[#FF8A00]/30"
            >
              Active
            </motion.div>
          )}
        </div>

        {/* Label */}
        <div className="mt-4 text-center max-w-[140px]">
          <p
            className={`text-xs font-bold leading-tight transition-colors duration-300 ${
              isCompleted
                ? 'text-[#10B981]'
                : isActive
                ? 'text-[#FFD54A]'
                : 'text-gray-500'
            }`}
          >
            {stage.label}
          </p>
          <p
            className={`text-[10px] font-medium mt-1 ${
              isCompleted
                ? 'text-[#10B981]/70'
                : isActive
                ? 'text-[#FF8A00]/70'
                : 'text-gray-600'
            }`}
          >
            {stage.date}
          </p>
        </div>
      </motion.div>
    );
  }
);

TimelineNode.displayName = 'TimelineNode';

// ── Connector Line ──
const ConnectorLine = memo(
  ({
    status,
    index,
    prefersReducedMotion,
  }: {
    status: 'completed' | 'active' | 'upcoming';
    index: number;
    prefersReducedMotion: boolean;
  }) => {
    const isCompleted = status === 'completed';
    const isActive = status === 'active';

    return (
      <div className="flex-1 flex items-center justify-center px-0 md:px-2">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: index * 0.15 + 0.3,
            duration: 0.6,
            ease: 'easeOut',
          }}
          className={`h-1 w-full rounded-full origin-left ${
            isCompleted
              ? 'bg-gradient-to-r from-[#10B981] to-[#10B981]'
              : isActive
              ? 'bg-gradient-to-r from-[#10B981] to-[#FF8A00]'
              : 'bg-gradient-to-r from-[#2A3A5A] to-[#1A233A] border-t border-dashed border-[#2A3A5A] bg-transparent'
          }`}
          style={isUpcoming(status) ? { height: 0, borderTopWidth: 2 } : {}}
        />
      </div>
    );
  }
);

ConnectorLine.displayName = 'ConnectorLine';

function isUpcoming(status: string): boolean {
  return status === 'upcoming';
}

// ── Event Progress Bar ──
const EventProgressBar = memo(
  ({ prefersReducedMotion }: { prefersReducedMotion: boolean }) => {
    return (
      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#FFD54A]" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Event Progress
            </span>
          </div>
          <span className="text-sm font-black text-[#FFD54A]">
            {PROGRESS_PERCENT}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-[#1A233A] rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${PROGRESS_PERCENT}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1.5, ease: 'easeOut' }
            }
            className="h-full rounded-full bg-gradient-to-r from-[#10B981] via-[#FFD54A] to-[#FF8A00]"
            style={{
              boxShadow: '0 0 12px rgba(255,138,0,0.4)',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-gray-500 font-medium">
            Registrations ✔
          </span>
          <span className="text-[10px] text-[#FF8A00] font-medium">
            Verification (current)
          </span>
          <span className="text-[10px] text-gray-600 font-medium">
            Event Day
          </span>
        </div>
      </div>
    );
  }
);

EventProgressBar.displayName = 'EventProgressBar';

// ── Main Component ──
interface EventTimelineProps {
  showProgress?: boolean;
  className?: string;
}

const EventTimeline = memo(
  ({ showProgress = true, className = '' }: EventTimelineProps) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) =>
        setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }, []);

    const containerVariants = useMemo(
      () => ({
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }),
      []
    );

    return (
      <div className={`w-full ${className}`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card-premium p-6 md:p-8 bg-[#111827]/80 border border-[#FF8A00]/20"
          style={{
            background:
              'linear-gradient(135deg, rgba(17,24,39,0.8), rgba(26,35,58,0.6))',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8A00] to-[#FFD54A] flex items-center justify-center shadow-lg shadow-[#FF8A00]/30">
              <Clock size={20} className="text-[#07111F]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Event Progress Timeline
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Hunar Bazaar 2026 — Journey
              </p>
            </div>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="flex items-center">
              {STAGES.map((stage, index) => (
                <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                  <TimelineNode
                    stage={stage}
                    index={index}
                    isLast={index === STAGES.length - 1}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  {index < STAGES.length - 1 && (
                    <ConnectorLine
                      status={stage.status}
                      index={index}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="flex flex-col gap-0">
              {STAGES.map((stage, index) => (
                <div key={stage.id} className="flex gap-4">
                  {/* Vertical line + node */}
                  <div className="flex flex-col items-center">
                    <TimelineNode
                      stage={stage}
                      index={index}
                      isLast={index === STAGES.length - 1}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                    {index < STAGES.length - 1 && (
                      <div className="w-0.5 h-8 my-1">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            delay: index * 0.15 + 0.3,
                            duration: 0.6,
                            ease: 'easeOut',
                          }}
                          className={`w-full h-full origin-top rounded-full ${
                            stage.status === 'completed'
                              ? 'bg-[#10B981]'
                              : stage.status === 'active'
                              ? 'bg-gradient-to-b from-[#10B981] to-[#FF8A00]'
                              : 'border-l-2 border-dashed border-[#2A3A5A] bg-transparent'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                  {/* Label on mobile */}
                  <div className="flex-1 pt-3">
                    <p
                      className={`text-sm font-bold ${
                        stage.status === 'completed'
                          ? 'text-[#10B981]'
                          : stage.status === 'active'
                          ? 'text-[#FFD54A]'
                          : 'text-gray-500'
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p
                      className={`text-xs font-medium mt-0.5 ${
                        stage.status === 'completed'
                          ? 'text-[#10B981]/70'
                          : stage.status === 'active'
                          ? 'text-[#FF8A00]/70'
                          : 'text-gray-600'
                      }`}
                    >
                      {stage.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <EventProgressBar prefersReducedMotion={prefersReducedMotion} />
          )}
        </motion.div>
      </div>
    );
  }
);

EventTimeline.displayName = 'EventTimeline';

export default EventTimeline;
