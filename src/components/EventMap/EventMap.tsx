import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Utensils, Palette, Gamepad2, Sparkles, RotateCcw } from 'lucide-react';
import './eventMap.css';

/* ─────────────────────────────────────────────────────────────
   HUNAR BAZAAR 2026 — Custom 2D Event Location Map
   React conversion of src/assets/event-map.html.html
   Preserves the original map's structure, styling, colours,
   labels, markers, legends, animations and interactions.
   Enhanced with: category navigation, zone highlighting,
   smooth zoom, important-location pins and premium UI.
   ───────────────────────────────────────────────────────────── */

interface ModalState {
  title: string;
  desc: string;
  color: string;
}

interface Category {
  id: string;
  label: string;
  icon: typeof Utensils;
  color: string;
  glow: string;
  zone: { cx: number; cy: number; scale: number };
  desc: string;
  hint: string;
}

/* ── Category config — mapped to the ACTUAL map zones ──
   Zone centers computed in the outer 1100×910 viewBox coords
   from the real layout (event-hall inner SVG at x=225,y=249,
   width=377,height=256, viewBox 0 0 1000 700). */
const CATEGORIES: Category[] = [
  {
    id: 'food',
    label: 'Food & Beverage',
    icon: Utensils,
    color: '#FF8A00',
    glow: 'rgba(255,138,0,0.5)',
    zone: { cx: 524, cy: 378, scale: 2.4 },
    desc: 'Explore the food stalls at Hunar Bazaar 2026',
    hint: 'Food stalls 1–21 & 22–26',
  },
  {
    id: 'handmade',
    label: 'Handmade Accessories',
    icon: Palette,
    color: '#FF4FCB',
    glow: 'rgba(255,79,203,0.5)',
    zone: { cx: 367, cy: 403, scale: 2.6 },
    desc: 'Discover handmade crafts, accessories & art',
    hint: 'Art & Craft zone',
  },
  {
    id: 'games',
    label: 'Games',
    icon: Gamepad2,
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.5)',
    zone: { cx: 292, cy: 379, scale: 2.6 },
    desc: 'Play fun games and win exciting prizes',
    hint: 'Game Zone',
  },
  {
    id: 'others',
    label: 'Others',
    icon: Sparkles,
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.5)',
    zone: { cx: 453, cy: 380, scale: 2.6 },
    desc: 'Explore other exhibits and stalls',
    hint: 'Others / Exhibition zone',
  },
];

const MIN = 0.55;
const MAX = 3.8;
const STEP = 0.22;

const VIEW_W = 1100;
const VIEW_H = 910;

/* ── Important locations actually present in the supplied map ── */
const IMPORTANT_LOCATIONS = [
  { id: 'main-entrance', label: 'Main Entrance', x: 383.7, y: 262 },
  { id: 'gate', label: 'Gate', x: 341.5, y: 316 },
  { id: 'gate2', label: 'Gate', x: 398, y: 492 },
  { id: 'stage', label: 'Main Stage', x: 458.5, y: 463 },
  { id: 'hostel', label: 'Boys Hostel', x: 315.5, y: 96.5 },
  { id: 'baal', label: 'Baal Vatika', x: 940.5, y: 375 },
  { id: 'ablock', label: 'A-Block', x: 235, y: 552 },
  { id: 'bblock', label: 'B-Block', x: 238, y: 827.5 },
  { id: 'ground', label: "School's Ground", x: 457.5, y: 689.5 },
  { id: 'basket', label: 'Basketball Court', x: 763.5, y: 783.5 },
];

interface EventMapProps {
  /** Optional callback invoked when a zone is clicked/tapped (for external panels). */
  onZoneClick?: (zoneId: string) => void;
}

const EventMap = ({ onZoneClick }: EventMapProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number }>({
    show: false,
    x: 0,
    y: 0,
  });

  // Refs to hold latest transform values for event handlers
  const transformRef = useRef({ scale: 1, tx: 0, ty: 0 });
  transformRef.current = { scale, tx, ty };

  const applyTransform = useCallback((s: number, x: number, y: number) => {
    if (viewportRef.current) {
      const layer = viewportRef.current.querySelector<HTMLElement>('.emap-marker-layer');
      const svg = viewportRef.current.querySelector<SVGSVGElement>('svg.emap-svg');
      if (layer) layer.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
      if (svg) svg.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    }
  }, []);

  const zoom = useCallback(
    (factor: number, cx?: number, cy?: number) => {
      const prev = transformRef.current.scale;
      const next = Math.min(MAX, Math.max(MIN, prev * factor));
      let nx = transformRef.current.tx;
      let ny = transformRef.current.ty;
      if (cx != null && cy != null && viewportRef.current) {
        const r = viewportRef.current.getBoundingClientRect();
        const mx = cx - r.left;
        const my = cy - r.top;
        nx = mx - (mx - nx) * (next / prev);
        ny = my - (my - ny) * (next / prev);
      }
      setScale(next);
      setTx(nx);
      setTy(ny);
      applyTransform(next, nx, ny);
    },
    [applyTransform]
  );

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
    applyTransform(1, 0, 0);
  }, [applyTransform]);

  // Wheel zoom (desktop)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX, e.clientY);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoom]);

  // Mouse panning (ignore interactive buttons/pins)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let panning = false;
    let sx = 0;
    let sy = 0;
    let stx = 0;
    let sty = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest('button, .emap-location-pin')) return;
      panning = true;
      sx = e.clientX;
      sy = e.clientY;
      stx = transformRef.current.tx;
      sty = transformRef.current.ty;
      setDragging(true);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!panning) return;
      const nx = stx + (e.clientX - sx);
      const ny = sty + (e.clientY - sy);
      setTx(nx);
      setTy(ny);
      applyTransform(transformRef.current.scale, nx, ny);
    };
    const onMouseUp = () => {
      panning = false;
      setDragging(false);
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [applyTransform]);

  // Touch panning
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let tStart: { x: number; y: number; tx: number; ty: number } | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        tStart = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          tx: transformRef.current.tx,
          ty: transformRef.current.ty,
        };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!tStart || e.touches.length !== 1) return;
      const nx = tStart.tx + (e.touches[0].clientX - tStart.x);
      const ny = tStart.ty + (e.touches[0].clientY - tStart.y);
      setTx(nx);
      setTy(ny);
      applyTransform(transformRef.current.scale, nx, ny);
    };
    const onTouchEnd = () => {
      tStart = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [applyTransform]);

  // Escape key closes modal / clears category
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModal(null);
        setSelectedCategory(null);
        reset();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [reset]);

  // Prevent SVG drag default
  useEffect(() => {
    const el = viewportRef.current?.querySelector('svg.emap-svg');
    if (!el) return;
    const onDrag = (e: Event) => e.preventDefault();
    el.addEventListener('dragstart', onDrag as EventListener);
    return () => el.removeEventListener('dragstart', onDrag as EventListener);
  }, []);

  // ── Category selection ──
  const selectCategory = useCallback(
    (cat: Category) => {
      setSelectedCategory(cat);
      const vp = viewportRef.current;
      if (!vp) return;
      const r = vp.getBoundingClientRect();
      const S = cat.zone.scale;
      const px = (cat.zone.cx / VIEW_W) * r.width;
      const py = (cat.zone.cy / VIEW_H) * r.height;
      const nx = r.width / 2 - px * S;
      const ny = r.height / 2 - py * S;
      setScale(S);
      setTx(nx);
      setTy(ny);
      applyTransform(S, nx, ny);
    },
    [applyTransform]
  );

  const resetMap = useCallback(() => {
    setSelectedCategory(null);
    reset();
  }, [reset]);

  // Gate tooltip handler (works for mouse + focus events)
  const handleGateEnter = (e: React.SyntheticEvent<SVGCircleElement>) => {
    const r = (e.currentTarget as SVGCircleElement).getBoundingClientRect();
    setTooltip({
      show: true,
      x: r.left + r.width / 2 - 22,
      y: r.top - 28,
    });
  };
  const handleGateLeave = () => setTooltip({ show: false, x: 0, y: 0 });

  const openModal = (title: string, desc: string, color: string) => {
    setModal({ title, desc, color });
  };

  // zoneProps: category = which category this zone belongs to (null = campus landmark)
  const zoneProps = (
    cat: string | null,
    zoneId: string,
    title: string,
    desc: string,
    color: string,
    glow: string
  ) => {
    const active = selectedCategory?.id === cat;
    return {
      className: `zone zone-pop${active ? ' is-active' : ''}`,
      style: active ? ({ '--zone-glow': glow } as React.CSSProperties) : undefined,
      role: 'button',
      tabIndex: 0,
      'data-title': title,
      'data-desc': desc,
      'data-color': color,
      onClick: () => {
        openModal(title, desc, color);
        onZoneClick?.(zoneId);
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(title, desc, color);
          onZoneClick?.(zoneId);
        }
      },
    };
  };

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <div className={`hunar-emap${selectedCategory ? ' has-category' : ''}`}>
      <motion.div
        className="emap-header"
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="emap-eyebrow">Hunar Bazaar 2026 · Live Wayfinding</div>
        <h1 className="emap-title">Event Map</h1>
        <p>Pick a category to explore, or tap any zone to see what's there.</p>
      </motion.div>

      {/* Category selector */}
      <div className="emap-cat-controls" role="group" aria-label="Map categories">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = selectedCategory?.id === cat.id;
          return (
            <motion.button
              key={cat.id}
              type="button"
              className={`emap-cat-btn${active ? ' active' : ''}`}
              style={{ '--cat': cat.color, '--glow': cat.glow } as React.CSSProperties}
              onClick={() => (active ? resetMap() : selectCategory(cat))}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              whileHover={reducedMotion ? undefined : { y: -3 }}
              aria-pressed={active}
            >
              <span className="emap-cat-ico">
                <Icon size={20} />
              </span>
              <span className="emap-cat-label">{cat.label}</span>
              {active && <span className="emap-cat-active-dot" aria-hidden="true" />}
            </motion.button>
          );
        })}
      </div>

      <div className={`emap-shell ${dragging ? 'emap-dragging' : ''}`}>
        <div className="emap-viewport" ref={viewportRef}>
          <svg
            ref={(node) => {
              if (node) node.classList.add('emap-svg');
            }}
            className="emap-svg"
            viewBox="0 0 1100 910"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Campus map with Event Hall"
            style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }}
          >
            <defs>
              <pattern id="floorDots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1.4" cy="1.4" r="1" fill="var(--floor-dot)" opacity="0.6" />
              </pattern>

              <linearGradient id="gameGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0102f" />
                <stop offset="100%" stopColor="#ff6b83" />
              </linearGradient>
              <linearGradient id="redstallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3131" />
                <stop offset="100%" stopColor="#ff7a7a" />
              </linearGradient>
              <linearGradient id="othersGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c5cff" />
                <stop offset="100%" stopColor="#c2b2ff" />
              </linearGradient>
              <linearGradient id="artGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e94bb8" />
                <stop offset="100%" stopColor="#ff9de3" />
              </linearGradient>
              <linearGradient id="stageGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#7ff0e4" />
              </linearGradient>
              <linearGradient id="hostelGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0102f" />
                <stop offset="100%" stopColor="#ff6b83" />
              </linearGradient>
              <linearGradient id="baalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3f5ce0" />
                <stop offset="100%" stopColor="#8fa2ff" />
              </linearGradient>
              <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8f1620" />
                <stop offset="100%" stopColor="#d94b56" />
              </linearGradient>
              <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4bc95d" />
                <stop offset="100%" stopColor="#8fe89b" />
              </linearGradient>
              <radialGradient id="gateGrad" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#c8ffd9" />
                <stop offset="100%" stopColor="#2fbf5f" />
              </radialGradient>
              <radialGradient id="spotGrad" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.35" />
              </filter>
              <filter id="gateGlow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* CAMPUS BACKGROUND */}
            <rect x="0" y="0" width="1100" height="910" fill="var(--bg)" />
            <rect x="0" y="0" width="1100" height="910" fill="url(#floorDots)" opacity="0.5" />

            {/* ROAD */}
            <g className="zone-pop" style={{ animationDelay: '.15s' }}>
              <g fill="none" stroke="var(--road)" strokeWidth="22" strokeLinejoin="round" strokeLinecap="round">
                <path d="M43,199 L851,199 L840,551 L288,551 L840,551 L840,579 L650,579 L650,827 L292,827" />
              </g>
              <g className="flow-path" fill="none" stroke="var(--road-l)" strokeWidth="2" strokeDasharray="1 13" opacity="0.8">
                <path d="M43,199 L851,199 L840,551 L288,551 L840,551 L840,579 L650,579 L650,827 L292,827" />
              </g>
              <text x="220" y="190" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontStyle="italic" fontSize="15" fill="var(--paper)" letterSpacing="2">ROAD</text>
              <path d="M760,193 L774,199 L760,205 Z" fill="var(--paper)" />
              <path d="M470,545 L456,551 L470,557 Z" fill="var(--paper)" />
              <path d="M470,821 L456,827 L470,833 Z" fill="var(--paper)" />
            </g>

            {/* BOYS HOSTEL (campus landmark) */}
            <g
              {...zoneProps(null, 'hostel', 'Boys Hostel', 'Boys hostel block, north of the event hall across the road.', 'var(--game)', '')}
              style={{ animationDelay: '.2s' }}
              filter="url(#softShadow)"
            >
              <rect x="118" y="18" width="395" height="157" rx="6" fill="url(#hostelGrad)" />
              <text x="315.5" y="102" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="19" fill="var(--ink)" letterSpacing="0.5">BOYS HOSTEL</text>
            </g>

            {/* BAAL VATIKA */}
            <g
              {...zoneProps(null, 'baal', 'Baal Vatika', 'Baal Vatika, east of the hall along the main road.', 'var(--baal)', '')}
              style={{ animationDelay: '.27s' }}
              filter="url(#softShadow)"
            >
              <rect x="870" y="290" width="141" height="170" rx="6" fill="url(#baalGrad)" />
              <text x="940.5" y="380" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="15" fill="var(--ink)" letterSpacing="0.3">
                <tspan x="940.5" dy="0">BAAL</tspan>
                <tspan x="940.5" dy="19">VATIKA</tspan>
              </text>
            </g>

            {/* A-BLOCK */}
            <g
              {...zoneProps(null, 'ablock', 'A-Block', 'A-Block, southwest of the hall.', 'var(--block)', '')}
              style={{ animationDelay: '.34s' }}
              filter="url(#softShadow)"
            >
              <rect x="183" y="525" width="104" height="54" rx="6" fill="url(#blockGrad)" />
              <text x="235" y="557" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="14" fill="var(--paper)">A-BLOCK</text>
            </g>

            {/* B-BLOCK */}
            <g
              {...zoneProps(null, 'bblock', 'B-Block', 'B-Block, south of the school ground.', 'var(--block)', '')}
              style={{ animationDelay: '.41s' }}
              filter="url(#softShadow)"
            >
              <rect x="186" y="802" width="104" height="51" rx="6" fill="url(#blockGrad)" />
              <text x="238" y="833" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="14" fill="var(--paper)">B-BLOCK</text>
            </g>

            {/* SCHOOL GROUND */}
            <g
              {...zoneProps(null, 'ground', "School's Ground", "The school's playing ground, south of the hall.", 'var(--ground)', '')}
              style={{ animationDelay: '.48s' }}
              filter="url(#softShadow)"
            >
              <rect x="313" y="591" width="289" height="197" rx="8" fill="url(#groundGrad)" />
              <text x="457.5" y="695" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="16" fill="var(--ink)" letterSpacing="0.3">SCHOOL'S GROUND</text>
            </g>

            {/* BASKETBALL COURT */}
            <g
              {...zoneProps(null, 'basketball', 'Basketball Court', 'Basketball court, southeast of the hall near Baal Vatika.', 'var(--redstall)', '')}
              style={{ animationDelay: '.55s' }}
              filter="url(#softShadow)"
            >
              <rect x="688" y="740" width="151" height="87" rx="6" fill="url(#redstallGrad)" />
              <text x="763.5" y="778" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="14" fill="var(--ink)" letterSpacing="0.2">
                <tspan x="763.5" dy="0">BASKETBALL</tspan>
                <tspan x="763.5" dy="18">COURT</tspan>
              </text>
            </g>

            {/* campus-to-gate wayfinding connectors */}
            <g fill="none" stroke="var(--gate-l)" strokeWidth="2" strokeLinecap="round">
              <path className="flow-path" d="M400,209 C392,229 386,246 383.7,262" />
              <path className="flow-path" d="M398,551 L398,492" />
            </g>

            {/* ─────── EVENT HALL (inner) ─────── */}
            <svg x="225" y="249" width="377" height="256" viewBox="0 0 1000 700" preserveAspectRatio="none">
              {/* FLOOR */}
              <rect x="36" y="36" width="928" height="628" fill="var(--floor)" />
              <rect x="36" y="36" width="928" height="628" fill="url(#floorDots)" />

              {/* ambient wandering visitor dots */}
              <g fill="var(--paper)" opacity="0.7">
                <circle className="wander" cx="190" cy="250" r="2.6" style={{ animationDuration: '8s', animationDelay: '.2s' }} />
                <circle className="wander" cx="220" cy="480" r="2.2" style={{ animationDuration: '9.5s', animationDelay: '1.4s' }} />
                <circle className="wander" cx="460" cy="180" r="2.6" style={{ animationDuration: '7.2s', animationDelay: '.6s' }} />
                <circle className="wander" cx="470" cy="610" r="2.2" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                <circle className="wander" cx="710" cy="250" r="2.4" style={{ animationDuration: '8.6s', animationDelay: '1s' }} />
                <circle className="wander" cx="725" cy="480" r="2.2" style={{ animationDuration: '9s', animationDelay: '.4s' }} />
              </g>

              {/* gate flow paths */}
              <g fill="none" stroke="var(--gate-l)" strokeWidth="2" strokeLinecap="round">
                <path className="flow-path" d="M421,53 C421,120 350,150 324,183 C333,200 420,215 460,260 C460,350 459,500 459,647" />
              </g>

              {/* OUTER WALLS with gate openings */}
              <g id="hall" stroke="var(--wall)" strokeWidth="3.4" fill="none" strokeLinecap="square">
                <line className="draw-line" strokeDasharray="355" strokeDashoffset={355} x1="36" y1="36" x2="391" y2="36" />
                <line className="draw-line" strokeDasharray="513" strokeDashoffset={513} style={{ animationDelay: '.1s' }} x1="451" y1="36" x2="964" y2="36" />
                <line className="draw-line" strokeDasharray="628" strokeDashoffset={628} style={{ animationDelay: '.15s' }} x1="964" y1="36" x2="964" y2="664" />
                <line className="draw-line" strokeDasharray="393" strokeDashoffset={393} style={{ animationDelay: '.2s' }} x1="36" y1="664" x2="429" y2="664" />
                <line className="draw-line" strokeDasharray="475" strokeDashoffset={475} style={{ animationDelay: '.25s' }} x1="489" y1="664" x2="964" y2="664" />
                <line className="draw-line" strokeDasharray="628" strokeDashoffset={628} x1="36" y1="36" x2="36" y2="664" />
              </g>

              {/* INTERNAL PARTITION with Gate 2 opening */}
              <g id="partition" stroke="var(--wall)" strokeWidth="3.4" fill="none">
                <line className="draw-line" strokeDasharray="117" strokeDashoffset={117} style={{ animationDelay: '.35s' }} x1="309" y1="36" x2="309" y2="153" />
                <line className="draw-line" strokeDasharray="451" strokeDashoffset={451} style={{ animationDelay: '.4s' }} x1="309" y1="213" x2="309" y2="664" />
              </g>

              {/* GAME ZONE → games */}
              <g
                {...zoneProps('games', 'games', 'Game Zone', 'Games, arcade booths and entertainment for all ages.', 'var(--game)', CATEGORIES[2].glow)}
                style={{ animationDelay: '.55s' }}
                filter="url(#softShadow)"
              >
                <rect x="106" y="92" width="36" height="528" rx="4" fill="url(#gameGrad)" />
                <rect x="106" y="92" width="144" height="38" rx="4" fill="url(#gameGrad)" />
                <rect x="106" y="582" width="144" height="38" rx="4" fill="url(#gameGrad)" />
                <text x="124" y="260" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="14" fill="var(--ink)" letterSpacing="0.5">
                  <tspan x="124" dy="0">G</tspan><tspan x="124" dy="24">A</tspan><tspan x="124" dy="24">M</tspan><tspan x="124" dy="24">E</tspan>
                  <tspan x="124" dy="24">–</tspan>
                  <tspan x="124" dy="24">Z</tspan><tspan x="124" dy="24">O</tspan><tspan x="124" dy="24">N</tspan><tspan x="124" dy="24">E</tspan>
                </text>
              </g>

              {/* ART & CRAFT → handmade */}
              <g
                {...zoneProps('handmade', 'art', 'Art & Craft', 'Handmade art and craft displays and stalls.', 'var(--art)', CATEGORIES[1].glow)}
                style={{ animationDelay: '.62s' }}
                filter="url(#softShadow)"
              >
                <rect x="358" y="252" width="38" height="338" rx="5" fill="url(#artGrad)" />
                <text x="377" y="329" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="14" fill="var(--ink)" letterSpacing="0.5">
                  <tspan x="377" dy="0">A</tspan><tspan x="377" dy="22">R</tspan><tspan x="377" dy="22">T</tspan>
                  <tspan x="377" dy="26">&amp;</tspan>
                  <tspan x="377" dy="26">C</tspan><tspan x="377" dy="22">R</tspan><tspan x="377" dy="22">A</tspan><tspan x="377" dy="22">F</tspan><tspan x="377" dy="22">T</tspan>
                </text>
              </g>

              {/* OTHERS → others */}
              <g
                {...zoneProps('others', 'others', 'Others', 'Other participating stalls and exhibits.', 'var(--others)', CATEGORIES[3].glow)}
                style={{ animationDelay: '.69s' }}
                filter="url(#softShadow)"
              >
                <rect x="540" y="307" width="127" height="100" rx="8" fill="url(#othersGrad)" />
                <text x="603.5" y="363" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="600" fontStyle="italic" fontSize="16.5" fill="var(--ink)">Others</text>
              </g>

              {/* STALL 22-26 → food */}
              <g
                {...zoneProps('food', 'stall22', 'Stall 22–26', 'Stalls numbered 22 to 26.', 'var(--redstall)', CATEGORIES[0].glow)}
                style={{ animationDelay: '.76s' }}
                filter="url(#softShadow)"
              >
                <rect x="589" y="92" width="178" height="38" rx="6" fill="url(#redstallGrad)" />
                <text x="678" y="116" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontStyle="italic" fontSize="15" fill="var(--ink)">STALL 22-26</text>
              </g>

              {/* FOOD STALL 1-21 → food */}
              <g
                {...zoneProps('food', 'food', 'Food Stall 1–21', 'Food stalls numbered 1 to 21.', 'var(--redstall)', CATEGORIES[0].glow)}
                style={{ animationDelay: '.83s' }}
                filter="url(#softShadow)"
              >
                <rect x="769" y="132" width="50" height="440" rx="6" fill="url(#redstallGrad)" />
                <text x="794" y="332" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="600" fontSize="12" fill="var(--ink)" letterSpacing="0.3">
                  <tspan x="794" dy="0">FOOD</tspan>
                  <tspan x="794" dy="15">STALL</tspan>
                  <tspan x="794" dy="22" fontSize="13.5" fontWeight="700">1 – 21</tspan>
                </text>
              </g>

              {/* STAGE (landmark — stays visible) */}
              <g
                {...zoneProps(null, 'stage', 'Stage', 'Main event stage for performances and announcements.', 'var(--stage)', '')}
                style={{ animationDelay: '.9s' }}
                filter="url(#softShadow)"
              >
                <rect x="552" y="553" width="135" height="67" rx="8" fill="url(#stageGrad)" />
                <ellipse className="spotlight" cx="619.5" cy="580" rx="52" ry="24" fill="url(#spotGrad)" />
                <text x="619.5" y="592" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="600" fontStyle="italic" fontSize="17" fill="var(--ink)">Stage</text>
              </g>

              {/* GATES */}
              <g id="gates">
                <g className="gate-pop" style={{ animationDelay: '1.05s' }}>
                  <circle className="ring" cx="421" cy="36" r="15.5" fill="none" stroke="var(--gate-l)" strokeWidth="2" />
                  <circle className="ring" cx="421" cy="36" r="15.5" fill="none" stroke="var(--gate-l)" strokeWidth="2" style={{ animationDelay: '1.3s' }} />
                  <circle
                    className="gate-circle zone"
                    tabIndex={0}
                    role="button"
                    aria-label="Main Entrance"
                    data-title="Main Entrance"
                    data-desc="Main entrance to the venue hall."
                    data-color="var(--gate)"
                    cx="421" cy="36" r="15.5" fill="url(#gateGrad)" stroke="var(--paper)" strokeWidth="2" filter="url(#gateGlow)"
                    onClick={() => openModal('Main Entrance', 'Main entrance to the venue hall.', 'var(--gate)')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal('Main Entrance', 'Main entrance to the venue hall.', 'var(--gate)'); } }}
                    onMouseEnter={handleGateEnter}
                    onMouseLeave={handleGateLeave}
                    onFocus={handleGateEnter}
                    onBlur={handleGateLeave}
                  />
                </g>
                <g className="gate-pop" style={{ animationDelay: '1.12s' }}>
                  <circle className="ring" cx="309" cy="183" r="15.5" fill="none" stroke="var(--gate-l)" strokeWidth="2" style={{ animationDelay: '.5s' }} />
                  <circle className="ring" cx="309" cy="183" r="15.5" fill="none" stroke="var(--gate-l)" strokeWidth="2" style={{ animationDelay: '1.8s' }} />
                  <circle
                    className="gate-circle zone"
                    tabIndex={0}
                    role="button"
                    aria-label="Gate"
                    data-title="Gate"
                    data-desc="Venue access point."
                    data-color="var(--gate)"
                    cx="309" cy="183" r="15.5" fill="url(#gateGrad)" stroke="var(--paper)" strokeWidth="2" filter="url(#gateGlow)"
                    onClick={() => openModal('Gate', 'Venue access point.', 'var(--gate)')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal('Gate', 'Venue access point.', 'var(--gate)'); } }}
                    onMouseEnter={handleGateEnter}
                    onMouseLeave={handleGateLeave}
                    onFocus={handleGateEnter}
                    onBlur={handleGateLeave}
                  />
                </g>
                <g className="gate-pop" style={{ animationDelay: '1.19s' }}>
                  <circle className="ring" cx="459" cy="664" r="15.5" fill="none" stroke="var(--gate-l)" strokeWidth="2" style={{ animationDelay: '.9s' }} />
                  <circle className="ring" cx="459" cy="664" r="15.5" fill="none" stroke="var(--gate-l)" strokeWidth="2" style={{ animationDelay: '2.2s' }} />
                  <circle
                    className="gate-circle zone"
                    tabIndex={0}
                    role="button"
                    aria-label="Gate"
                    data-title="Gate"
                    data-desc="Venue access point."
                    data-color="var(--gate)"
                    cx="459" cy="664" r="15.5" fill="url(#gateGrad)" stroke="var(--paper)" strokeWidth="2" filter="url(#gateGlow)"
                    onClick={() => openModal('Gate', 'Venue access point.', 'var(--gate)')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal('Gate', 'Venue access point.', 'var(--gate)'); } }}
                    onMouseEnter={handleGateEnter}
                    onMouseLeave={handleGateLeave}
                    onFocus={handleGateEnter}
                    onBlur={handleGateLeave}
                  />
                </g>
              </g>
            </svg>
          </svg>

          {/* Interactive marker layer — important locations only (in sync with SVG transform) */}
          <div className="emap-marker-layer">
            {IMPORTANT_LOCATIONS.map((loc) => (
              <div key={loc.id} className="emap-location-pin" style={{ left: `${(loc.x / VIEW_W) * 100}%`, top: `${(loc.y / VIEW_H) * 100}%` }} title={loc.label}>
                <span className="emap-location-ico"><MapPin size={12} /></span>
                <span className="emap-location-label">{loc.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="emap-zoom">
          <button type="button" onClick={() => zoom(1 + STEP)} title="Zoom in" aria-label="Zoom in">+</button>
          <button type="button" onClick={() => zoom(1 / (1 + STEP))} title="Zoom out" aria-label="Zoom out">−</button>
          <button type="button" className="reset-btn" onClick={resetMap} title="Reset view" aria-label="Reset">RESET</button>
        </div>
      </div>

      {/* Selected category panel */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            className="emap-cat-panel"
            style={{ '--cat': selectedCategory.color, '--glow': selectedCategory.glow } as React.CSSProperties}
            initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="emap-cat-panel-ico">
              <selectedCategory.icon size={22} />
            </div>
            <div className="emap-cat-panel-body">
              <h3>{selectedCategory.label}</h3>
              <p>{selectedCategory.desc}</p>
              <span className="emap-cat-panel-hint">{selectedCategory.hint}</span>
            </div>
            <button type="button" className="emap-cat-panel-reset" onClick={resetMap}>
              <RotateCcw size={13} /> View All
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="emap-legend" aria-label="Map legend">
        <div className="legend-item"><span className="legend-swatch game" /> Game Zone</div>
        <div className="legend-item"><span className="legend-swatch art" /> Art &amp; Craft</div>
        <div className="legend-item"><span className="legend-swatch others" /> Others / Exhibition</div>
        <div className="legend-item"><span className="legend-swatch stall" /> Food Stall</div>
        <div className="legend-item"><span className="legend-swatch stage" /> Stage</div>
        <div className="legend-item"><span className="legend-swatch gate" /> Gate / Entrance</div>
        <div className="legend-item"><span className="legend-swatch road" /> Road</div>
        <div className="legend-item"><span className="legend-swatch baal" /> Baal Vatika</div>
        <div className="legend-item"><span className="legend-swatch block" /> A-Block / B-Block</div>
        <div className="legend-item"><span className="legend-swatch ground" /> School's Ground</div>
        <div className="legend-item"><span className="legend-swatch stall" /> Basketball Court</div>
      </div>

      {/* Zone modal */}
      <div
        className={`emap-modal-overlay ${modal ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal(null);
        }}
      >
        <div className="emap-modal" style={{ ['--emap-accent' as string]: modal?.color || 'var(--gate)' }}>
          <button className="emap-modal-close" aria-label="Close" onClick={() => setModal(null)}>×</button>
          <h3>{modal ? modal.title : ''}</h3>
          <p>{modal ? modal.desc : ''}</p>
        </div>
      </div>

      {/* Gate tooltip */}
      <div
        className={`emap-tooltip ${tooltip.show ? 'show' : ''}`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        GATE
      </div>
    </div>
  );
};

export default EventMap;
