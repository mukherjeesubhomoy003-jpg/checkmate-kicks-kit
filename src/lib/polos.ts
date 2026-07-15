// Polo T-Shirt catalogue — ₹1200 flat.
import germanyBlack from "@/assets/polos/germany-black.jpg.asset.json";
import germanyWhite from "@/assets/polos/germany-white.jpg.asset.json";
import arsenal from "@/assets/polos/arsenal.jpg.asset.json";
import spainWhite from "@/assets/polos/spain-white.jpg.asset.json";
import alNassr from "@/assets/polos/al-nassr.jpg.asset.json";
import franceNavy from "@/assets/polos/france-navy.jpg.asset.json";
import spainBlue from "@/assets/polos/spain-blue.jpg.asset.json";
import portugalGreen from "@/assets/polos/portugal-green.jpg.asset.json";

export type Polo = { id: string; team: string; tag: string; image: string };

export const POLO_PRICE = 1200;
export const POLO_MRP = 1999;

export const POLOS: Polo[] = [
  { id: "po01", team: "Germany", tag: "Adidas Black", image: germanyBlack.url },
  { id: "po02", team: "Germany", tag: "Adidas White", image: germanyWhite.url },
  { id: "po03", team: "Arsenal", tag: "Emirates", image: arsenal.url },
  { id: "po04", team: "Spain", tag: "Adidas White", image: spainWhite.url },
  { id: "po05", team: "Al Nassr", tag: "Nike Black", image: alNassr.url },
  { id: "po06", team: "France", tag: "Nike Navy", image: franceNavy.url },
  { id: "po07", team: "Spain", tag: "Adidas Blue", image: spainBlue.url },
  { id: "po08", team: "Portugal", tag: "Nike Green", image: portugalGreen.url },
];
