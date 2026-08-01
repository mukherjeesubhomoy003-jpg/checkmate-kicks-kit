// Special Edition drops — shared between the home showcase and stock admin.
import argFs from "@/assets/specials/argentina-fs.jpg.asset.json";
import porFs from "@/assets/specials/portugal-fs.jpg.asset.json";
import argPractice from "@/assets/specials/argentina-practice.jpg.asset.json";

import manUtdPv from "@/assets/specials/man-united-pv.jpg.asset.json";
import realMadridPv from "@/assets/specials/real-madrid-pv.jpg.asset.json";
import spain2Star from "@/assets/specials/spain-2star-fan.jpg.asset.json";

import milan1 from "@/assets/specials/milan1.jpg.asset.json";
import milan2 from "@/assets/specials/milan2.jpg.asset.json";
import spy1 from "@/assets/specials/spy1.jpg.asset.json";
import spy2 from "@/assets/specials/spy2.jpg.asset.json";
import spy3 from "@/assets/specials/spy3.jpg.asset.json";
import spy4 from "@/assets/specials/spy4.jpg.asset.json";
import spwc1 from "@/assets/specials/spwc1.jpg.asset.json";
import spwc2 from "@/assets/specials/spwc2.jpg.asset.json";
import spwc3 from "@/assets/specials/spwc3.jpg.asset.json";
import spwc4 from "@/assets/specials/spwc4.jpg.asset.json";

export type SpecialSize = "S" | "M" | "L" | "XL" | "XXL";

export type Special = {
  id: string;
  key: string;
  team: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  image: string;
  /** Optional multi-photo rotation (front / back / detail shots). */
  gallery?: string[];
  price: number;
  mrp: number;
  sizes: SpecialSize[];
  badge?: string;
  /** Optional bullet highlights shown on the card. */
  highlights?: string[];
};

export const SPECIALS: Special[] = [
  {
    id: "ac-milan-retro-0607",
    key: "ac-milan-retro-0607",
    team: "AC Milan · Retro 2006/07 Away",
    title: "AC Milan Retro 06/07",
    subtitle: "Away · Embroidery Logos · Maldini Edition",
    eyebrow: "Retro · Embroidery",
    image: milan1.url,
    gallery: [milan1.url, milan2.url],
    price: 550, mrp: 1299,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    highlights: ["❤️ Embroidery logos", "❤️ Legendary Maldini edition", "❤️ Full sleeve retro cut"],
  },
  {
    id: "spain-yamal-embroidery",
    key: "spain-yamal-embroidery",
    team: "Spain · 2-Star Home Embroidery",
    title: "Spain 2⭐ Home Embroidery",
    subtitle: "Yamal #19 · Premium Embroidery",
    eyebrow: "Embroidery · New",
    image: spy3.url,
    gallery: [spy3.url, spy4.url, spy1.url, spy2.url],
    price: 450, mrp: 1299,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    highlights: ["❤️ Premium embroidery quality", "❤️ Official 2-star home edition", "❤️ Yamal #19 print"],
  },
  {
    id: "spain-2star-worldcup",
    key: "spain-2star-worldcup",
    team: "Spain · 2-Star World Cup",
    title: "Spain 2⭐ World Cup",
    subtitle: "Home & Away · Full Sublimation · Dotnet",
    eyebrow: "World Cup Stock",
    image: spwc1.url,
    gallery: [spwc1.url, spwc2.url, spwc3.url, spwc4.url],
    price: 400, mrp: 1199,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    highlights: ["❤️ Home & away available", "❤️ Full sublimation quality", "❤️ Dotnet material"],
  },
  {
    id: "spain-2star-fan",
    key: "spain-2star-fan",
    team: "Spain · 2-Star Fan Version",
    title: "Spain 2-Star",
    subtitle: "Fan Version · Cream & Maroon · New Launch",
    eyebrow: "New Launch · Fan Version",
    image: spain2Star.url,
    price: 850, mrp: 1699,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
  },

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
    price: 1200, mrp: 1799,
    sizes: ["M", "L"],
    badge: "New",
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
