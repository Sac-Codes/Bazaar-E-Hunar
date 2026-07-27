// ── Stall Category Icon Mapping ──
// Maps stall categories to their corresponding icon images in src/assets/Stall Icons/
// Using explicit Vite-compatible imports for reliable dev & production builds

import foodIcon from '../assets/Stall Icons/food_icon.png';
import diyIcon from '../assets/Stall Icons/diy_icon.png';
import gameZoneIcon from '../assets/Stall Icons/game_zone_icon.png';
import paintIcon from '../assets/Stall Icons/paint_icon.png';
import accessoriesIcon from '../assets/Stall Icons/accessories_icon.png';
import techIcon from '../assets/Stall Icons/Tech_Stall_Icon.png';

// ── Inline SVG Default Stall Icon (fallback when no icon file matches) ──
const DEFAULT_STALL_ICON =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="20" fill="url(#g)" />
      <defs><linearGradient id="g" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stop-color="#8B5CF6"/>
        <stop offset="100%" stop-color="#FF4D9D"/>
      </linearGradient></defs>
      <text x="50" y="68" font-size="50" text-anchor="middle" fill="white">🏪</text>
    </svg>`
  );

export interface CategoryIconMapping {
  category: string;
  icon: string;
  label: string;
  gradient: string;
  glowColor: string;
}

// ── Comprehensive Icon Lookup Map ──
// Keys are normalised (lowercase, no spaces/hyphens/underscores).
// Each key maps to one of the 6 imported icons or the default SVG.
const iconMap: Record<string, string> = {
  food: foodIcon,
  foods: foodIcon,
  foodbeverages: foodIcon,
  bakery: foodIcon,
  bakerydesserts: foodIcon,
  dessert: foodIcon,
  desserts: foodIcon,

  diy: diyIcon,
  diycrafts: diyIcon,

  game: gameZoneIcon,
  games: gameZoneIcon,
  gaming: gameZoneIcon,
  gamezone: gameZoneIcon,
  gamesactivities: gameZoneIcon,
  entertainment: gameZoneIcon,
  arcade: gameZoneIcon,

  paint: paintIcon,
  painting: paintIcon,
  craft: paintIcon,
  crafts: paintIcon,
  artscrafts: paintIcon,
  art: paintIcon,
  arts: paintIcon,

  accessories: accessoriesIcon,
  accessory: accessoriesIcon,
  handmade: accessoriesIcon,
  handmadeaccessories: accessoriesIcon,
  books: accessoriesIcon,
  stationery: accessoriesIcon,
  booksstationery: accessoriesIcon,

  tech: techIcon,
  technology: techIcon,
  innovation: techIcon,
  robotics: techIcon,
  robot: techIcon,
  business: techIcon,
  education: techIcon,
  edtech: techIcon,
  science: techIcon,
};

/** Normalises a category string so it can be looked up in iconMap. */
function normalize(key: string): string {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // strip everything except letters & digits
    .replace(/^(stall|the|a)\s*/, ''); // remove leading noise words
}

/** Try every keyword variation for the given category and return the best icon match. */
function findIcon(category: string): string {
  const normalized = normalize(category);
  if (!normalized) return DEFAULT_STALL_ICON;

  // 1. Exact match
  if (iconMap[normalized]) return iconMap[normalized];

  // 2. Substring match: does the normalised category contain a map key?
  for (const [key, icon] of Object.entries(iconMap)) {
    if (normalized.includes(key)) return icon;
  }

  // 3. Substring match (inverse): does a map key contain the normalised category?
  for (const [key, icon] of Object.entries(iconMap)) {
    if (key.includes(normalized)) return icon;
  }

  // 4. Attempt word-level token matching
  const words = normalized.split(/(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])/).flatMap(w => w.match(/[a-z]+/g) ?? []);
  for (const word of words) {
    if (iconMap[word]) return iconMap[word];
    for (const [key, icon] of Object.entries(iconMap)) {
      if (key.includes(word) || word.includes(key)) return icon;
    }
  }

  // 5. Ultimate fallback
  return DEFAULT_STALL_ICON;
}

// ── Exported category configurations ──
// These are used by the stall card UI for consistent visual theming.
export const categoryIcons: CategoryIconMapping[] = [
  // Food & Beverages
  {
    category: 'Food & Beverages',
    icon: findIcon('Food & Beverages'),
    label: '🍔',
    gradient: 'from-[#FF8A00] to-[#FFD54A]',
    glowColor: 'rgba(255,138,0,0.3)',
  },
  {
    category: 'Bakery & Desserts',
    icon: findIcon('Bakery & Desserts'),
    label: '🧁',
    gradient: 'from-[#FF8A00] to-[#FF4D9D]',
    glowColor: 'rgba(255,77,157,0.3)',
  },
  {
    category: 'Food',
    icon: findIcon('Food'),
    label: '🍔',
    gradient: 'from-[#FF8A00] to-[#FFD54A]',
    glowColor: 'rgba(255,138,0,0.3)',
  },

  // Games
  {
    category: 'Games & Activities',
    icon: findIcon('Games & Activities'),
    label: '🎮',
    gradient: 'from-[#3B82F6] to-[#00E5FF]',
    glowColor: 'rgba(0,229,255,0.3)',
  },
  {
    category: 'Games',
    icon: findIcon('Games'),
    label: '🎮',
    gradient: 'from-[#3B82F6] to-[#00E5FF]',
    glowColor: 'rgba(0,229,255,0.3)',
  },
  {
    category: 'Entertainment',
    icon: findIcon('Entertainment'),
    label: '🎪',
    gradient: 'from-[#FF4D9D] to-[#FF8A00]',
    glowColor: 'rgba(255,77,157,0.3)',
  },

  // Arts & Crafts
  {
    category: 'Arts & Crafts',
    icon: findIcon('Arts & Crafts'),
    label: '🎨',
    gradient: 'from-[#8B5CF6] to-[#FF4D9D]',
    glowColor: 'rgba(139,92,246,0.3)',
  },
  {
    category: 'Crafts',
    icon: findIcon('Crafts'),
    label: '🧵',
    gradient: 'from-[#8B5CF6] to-[#FF4D9D]',
    glowColor: 'rgba(139,92,246,0.3)',
  },
  {
    category: 'Art',
    icon: findIcon('Art'),
    label: '🎨',
    gradient: 'from-[#FF4D9D] to-[#8B5CF6]',
    glowColor: 'rgba(255,77,157,0.3)',
  },
  {
    category: 'Painting',
    icon: findIcon('Painting'),
    label: '🖌',
    gradient: 'from-[#FF4D9D] to-[#8B5CF6]',
    glowColor: 'rgba(255,77,157,0.3)',
  },

  // DIY
  {
    category: 'DIY & Crafts',
    icon: findIcon('DIY & Crafts'),
    label: '🛍',
    gradient: 'from-[#8B5CF6] to-[#00E5FF]',
    glowColor: 'rgba(139,92,246,0.3)',
  },
  {
    category: 'DIY',
    icon: findIcon('DIY'),
    label: '🛍',
    gradient: 'from-[#8B5CF6] to-[#FF4D9D]',
    glowColor: 'rgba(139,92,246,0.3)',
  },

  // Accessories
  {
    category: 'Handmade Accessories',
    icon: findIcon('Handmade Accessories'),
    label: '🎁',
    gradient: 'from-[#10B981] to-[#2DEB9B]',
    glowColor: 'rgba(16,185,129,0.3)',
  },
  {
    category: 'Accessories',
    icon: findIcon('Accessories'),
    label: '🎁',
    gradient: 'from-[#10B981] to-[#2DEB9B]',
    glowColor: 'rgba(16,185,129,0.3)',
  },
  {
    category: 'Handmade',
    icon: findIcon('Handmade'),
    label: '🎁',
    gradient: 'from-[#10B981] to-[#2DEB9B]',
    glowColor: 'rgba(16,185,129,0.3)',
  },

  // Books & Stationery
  {
    category: 'Books & Stationery',
    icon: findIcon('Books & Stationery'),
    label: '📚',
    gradient: 'from-[#3B82F6] to-[#8B5CF6]',
    glowColor: 'rgba(59,130,246,0.3)',
  },

  // Others / Misc
  {
    category: 'Others',
    icon: findIcon('Others'),
    label: '✨',
    gradient: 'from-[#8B5CF6] to-[#FF4D9D]',
    glowColor: 'rgba(139,92,246,0.3)',
  },

  // Technology / Innovation / Robotics
  {
    category: 'Technology',
    icon: findIcon('Technology'),
    label: '💻',
    gradient: 'from-[#00E5FF] to-[#8B5CF6]',
    glowColor: 'rgba(0,229,255,0.3)',
  },
  {
    category: 'Innovation',
    icon: findIcon('Innovation'),
    label: '💡',
    gradient: 'from-[#FFD54A] to-[#FF8A00]',
    glowColor: 'rgba(255,213,74,0.3)',
  },
  {
    category: 'Robotics',
    icon: findIcon('Robotics'),
    label: '🤖',
    gradient: 'from-[#00E5FF] to-[#3B82F6]',
    glowColor: 'rgba(0,229,255,0.3)',
  },
  {
    category: 'Education',
    icon: findIcon('Education'),
    label: '📚',
    gradient: 'from-[#3B82F6] to-[#8B5CF6]',
    glowColor: 'rgba(59,130,246,0.3)',
  },
  {
    category: 'Business',
    icon: findIcon('Business'),
    label: '💼',
    gradient: 'from-[#3B82F6] to-[#10B981]',
    glowColor: 'rgba(59,130,246,0.3)',
  },
];

/**
 * Returns the best CategoryIconMapping for a given category string.
 * Falls back to a graceful default with the emoji label if nothing matches.
 */
export function getCategoryIcon(category: string): CategoryIconMapping {
  // Exact match on stored category name (case-insensitive)
  const exact = categoryIcons.find(
    (ci) => ci.category.toLowerCase() === category.toLowerCase()
  );
  if (exact) return exact;

  // Token-level partial match
  const normalizedInput = normalize(category);
  const partial = categoryIcons.find((ci) => {
    const ciNorm = normalize(ci.category);
    return (
      ciNorm.includes(normalizedInput) ||
      normalizedInput.includes(ciNorm) ||
      normalizedInput.split(/(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])/).some((token: string) => {
        const t = token.replace(/[^a-z]/g, '');
        return t.length > 2 && (ciNorm.includes(t) || t.includes(ciNorm));
      })
    );
  });
  if (partial) return partial;

  // Graceful fallback – shows a stall-themed icon
  return {
    category,
    icon: DEFAULT_STALL_ICON,
    label: '✨',
    gradient: 'from-[#8B5CF6] to-[#FF4D9D]',
    glowColor: 'rgba(139,92,246,0.3)',
  };
}

