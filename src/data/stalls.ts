export interface Stall {
  id: string;
  name: string;
  category: string;
  owner: string;
  classStr: string;
  products: string[];
  location: string;
}

export const stallsData: Stall[] = [
  {
    id: "S-101",
    name: "Burger Bytes",
    category: "Food",
    owner: "Rahul Sharma",
    classStr: "12-A",
    products: ["Smash Burgers", "Loaded Fries", "Mojitos"],
    location: "Food Zone - A1",
  },
  {
    id: "S-102",
    name: "Tech Fix",
    category: "Technology",
    owner: "Arjun Patel",
    classStr: "11-C",
    products: ["Custom Keychains", "PC Cleaning", "Tech Support"],
    location: "Tech Zone - T3",
  },
  {
    id: "S-103",
    name: "Artisanal Aura",
    category: "Art",
    owner: "Priya Singh",
    classStr: "12-B",
    products: ["Canvas Paintings", "Resin Art", "Custom Portraits"],
    location: "Art Zone - B2",
  },
  {
    id: "S-104",
    name: "VR Adventures",
    category: "Games",
    owner: "Kabir Das",
    classStr: "10-A",
    products: ["VR Rollercoaster", "Beat Saber 5mins", "Racing Sim"],
    location: "Game Zone - G1",
  },
  {
    id: "S-105",
    name: "The Bookworm's Nook",
    category: "Books",
    owner: "Ananya Gupta",
    classStr: "11-A",
    products: ["Used Novels", "Custom Bookmarks", "Stationery"],
    location: "Quiet Zone - Q2",
  },
  {
    id: "S-106",
    name: "Bake My Day",
    category: "Food",
    owner: "Neha Verma",
    classStr: "9-D",
    products: ["Cupcakes", "Brownies", "Cookies"],
    location: "Food Zone - A2",
  }
];

export const categories = ["All", "Food", "Technology", "Art", "Games", "Books", "DIY", "Craft"];
