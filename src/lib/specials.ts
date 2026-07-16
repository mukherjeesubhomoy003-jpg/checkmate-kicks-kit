// Special Edition drops — shared between the home showcase and stock admin.
import argFs from "@/assets/specials/argentina-fs.jpg.asset.json";
import porFs from "@/assets/specials/portugal-fs.jpg.asset.json";
import argPractice from "@/assets/specials/argentina-practice.jpg.asset.json";
import brasilAway from "@/assets/specials/brazil-away-se.jpg.asset.json";
import manUtdPv from "@/assets/specials/man-united-pv.jpg.asset.json";
import realMadridPv from "@/assets/specials/real-madrid-pv.jpg.asset.json";

export type SpecialSize = "S" | "M" | "L" | "XL" | "XXL";

export type Special = {
  id: string;
  key: string;
  team: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  image: string;
  price: number;
  mrp: number;
  sizes: SpecialSize[];
  badge?: string;
};

export const SPECIALS: Special[] = [
  {
    id: "arg-fs",
    key: "arg-fs",
    team: "Argentina · Home Full Sleeve",
    title: "Argentina Home",
    subtitle: "Full-Sleeve · Champions Badge · Player Edition",
    eyebrow: "Full Sleeve · Player",
    image: argFs.url,
    price: 1800, mrp: 2499,
    sizes: ["M", "L", "XL"],
    badge: "Ltd",
  },
  {
    id: "por-fs",
    key: "por-fs",
    team: "Portugal · Blackout Full Sleeve",
    title: "Portugal Blackout",
    subtitle: "Full-Sleeve · Ultraweave · Special Edition Collar",
    eyebrow: "Full Sleeve · Player",
    image: porFs.url,
    price: 1200, mrp: 1799,
    sizes: ["L", "XL"],
    badge: "Ltd",
  },
  {
    id: "arg-practice",
    key: "arg-practice",
    team: "Argentina · Pre-Match Practice PV",
    title: "Argentina Practice",
    subtitle: "Sunburst Pre-Match · Player Version",
    eyebrow: "Player Version · New",
    image: argPractice.url,
    price: 999, mrp: 1599,
    sizes: ["M", "L"],
    badge: "New",
  },
  {
    id: "brasil-away-se",
    key: "brasil-away-se",
    team: "Brasil · Away Player Version",
    title: "Brasil Away",
    subtitle: "Jordan Silhouette · Player Version",
    eyebrow: "Special · Player",
    image: brasilAway.url,
    price: 800, mrp: 1499,
    sizes: ["S", "M", "L", "XL"],
    badge: "Deal",
  },
  {
    id: "man-utd-pv",
    key: "man-utd-pv",
    team: "Manchester United · Home PV",
    title: "Man United Home",
    subtitle: "Snapdragon · Player Version",
    eyebrow: "Player Version",
    image: manUtdPv.url,
    price: 899, mrp: 1599,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
  },
  {
    id: "real-madrid-pv",
    key: "real-madrid-pv",
    team: "Real Madrid · Away PV",
    title: "Real Madrid Away",
    subtitle: "Emirates Fly Better · Player Version",
    eyebrow: "Player Version",
    image: realMadridPv.url,
    price: 899, mrp: 1599,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
  },
];
