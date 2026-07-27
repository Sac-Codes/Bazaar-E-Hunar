// ── Vite-imported local images ──
import savImage from '../assets/sav_hb.JPG';
import meghaImage from '../assets/megha_convenor.JPG';
import samImage from '../assets/sam_cs.JPG';
import nitinImage from '../assets/nitin_vbh.JPG';
import suyashImage from '../assets/suyash_ds.JPG';
import gurudevImage from '../assets/gurudev_cus.JPG';
import rajlaxmiImage from '../assets/rajlaxmi_vhg.JPG';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role: string;
  group: 'leadership' | 'management' | 'creative' | 'marketing' | 'operations';
  contribution: string;
  image: string;
  color: string;
  accent: string;
}

// Department Colors per spec:
// Leadership = Gold (#FFD166)
// Management = Royal Blue (#3B82F6)
// Creative = Purple (#8B5CF6)
// Marketing = Festival Orange (#FF8A00)
// Operations = Emerald (#10B981)

export const teamMembers: TeamMember[] = [
  // ── 👑 Event Leadership (Gold) ──
  {
    id: '1',
    name: 'Sachin Yadav',
    position: 'Head Boy',
    role: 'Project Lead & Developer',
    group: 'leadership',
    contribution: 'Led the complete planning, development, and single-handedly coded the entire Bazaar-E-Hunar digital platform from scratch.',
    image: savImage,
    color: 'from-[#FFD166] to-[#FF8A00]',
    accent: 'gold'
  },
  {
    id: '12',
    name: 'Megha',
    position: 'Convenor',
    role: 'Coordinator',
    group: 'leadership',
    contribution: 'Guides the student team, ensures academic alignment, and provides mentorship throughout the event planning.',
    image: meghaImage,
    color: 'from-[#FFD166] to-[#FF8A00]',
    accent: 'gold'
  },
  {
    id: '13',
    name: 'Samriddhi Singh',
    position: 'Event Coordinator',
    role: 'Coordinator',
    group: 'leadership',
    contribution: 'Coordinates between all departments, manages schedules, and ensures seamless event execution.',
    image: samImage,
    color: 'from-[#FFD166] to-[#FF8A00]',
    accent: 'gold'
  },

  // ── ⚙️ Management Team (Royal Blue) ──
  {
    id: '6',
    name: 'Nitin Kr. Dubey',
    position: 'Vice Head Boy',
    role: 'Management',
    group: 'management',
    contribution: 'Oversees event logistics, vendor coordination, and ensures smooth operations across all zones.',
    image: nitinImage,
    color: 'from-[#3B82F6] to-[#1D4ED8]',
    accent: 'blue'
  },
  {
    id: '7',
    name: 'Suyash',
    position: 'Finance Manager',
    role: 'Management',
    group: 'management',
    contribution: 'Manages the prize pool, stall fees, budget allocation, and financial reconciliation.',
    image: suyashImage,
    color: 'from-[#3B82F6] to-[#1D4ED8]',
    accent: 'blue'
  },
  {
    id: '14',
    name: 'Gurudev Tiwari',
    position: 'Registration Manager',
    role: 'Management',
    group: 'management',
    contribution: 'Handles stall registrations, participant data management, and communication with stall owners.',
    image: gurudevImage,
    color: 'from-[#3B82F6] to-[#1D4ED8]',
    accent: 'blue'
  },

  // ── 🎨 Creative & Design (Purple) ──
  {
    id: '3',
    name: 'Rajlaxmi Singh',
    position: 'Vice Head Girl',
    role: 'Designer',
    group: 'creative',
    contribution: 'Crafted the visual identity, branding, and created all promotional materials for the event.',
    image: rajlaxmiImage,
    color: 'from-[#8B5CF6] to-[#6D28D9]',
    accent: 'purple'
  },
  {
    id: '8',
    name: '-',
    position: 'UI/UX Designer',
    role: 'Graphics',
    group: 'creative',
    contribution: 'Designed all digital assets, banners, posters, and social media creatives for the festival.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    color: 'from-[#8B5CF6] to-[#6D28D9]',
    accent: 'purple'
  },
  {
    id: '15',
    name: '-',
    position: 'Content Designer',
    role: 'Creative',
    group: 'creative',
    contribution: 'Creates engaging written content, event descriptions, and manages the tone of all communications.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanya',
    color: 'from-[#8B5CF6] to-[#6D28D9]',
    accent: 'purple'
  },

  // ── 📢 Marketing & Media (Festival Orange) ──
  {
    id: '4',
    name: '-',
    position: 'Marketing Lead',
    role: 'Marketing',
    group: 'marketing',
    contribution: 'Managed publicity, social media campaigns, and coordinated all announcements.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
    color: 'from-[#FF8A00] to-[#EA580C]',
    accent: 'orange'
  },
  {
    id: '10',
    name: '-',
    position: 'Social Media Manager',
    role: 'Coordinator',
    group: 'marketing',
    contribution: 'Creates engaging content for social media, writes event copy, and manages communications.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karan',
    color: 'from-[#FF8A00] to-[#EA580C]',
    accent: 'orange'
  },
  {
    id: '9',
    name: '-',
    position: 'Photography Lead',
    role: 'Creative',
    group: 'marketing',
    contribution: 'Captures event moments through professional photography and video documentation.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    color: 'from-[#FF8A00] to-[#EA580C]',
    accent: 'orange'
  },

  // ── 🤝 Operations & Volunteers (Emerald) ──
  {
    id: '5',
    name: '-',
    position: 'Logistics Manager',
    role: 'Operations',
    group: 'operations',
    contribution: 'Coordinated registrations, managed participant communications, and event logistics.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    color: 'from-[#10B981] to-[#047857]',
    accent: 'emerald'
  },
  {
    id: '11',
    name: '-',
    position: 'Volunteer Lead',
    role: 'Coordinator',
    group: 'operations',
    contribution: 'Recruits, trains, and manages the volunteer team to ensure flawless event execution.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isha',
    color: 'from-[#10B981] to-[#047857]',
    accent: 'emerald'
  },
  {
    id: '18',
    name: '-',
    position: 'Hospitality Lead',
    role: 'Operations',
    group: 'operations',
    contribution: 'Manages guest hospitality, refreshments, and ensures a welcoming environment for all visitors.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya',
    color: 'from-[#10B981] to-[#047857]',
    accent: 'emerald'
  },
];

