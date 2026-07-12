// Jacket catalogue — ₹1750 flat.
import dortmund from "@/assets/jackets/dortmund.jpg.asset.json";
import psgBlue from "@/assets/jackets/psg-blue.jpg.asset.json";
import psgJordan from "@/assets/jackets/psg-jordan.jpg.asset.json";
import mexico from "@/assets/jackets/mexico.jpg.asset.json";
import arsenalRetro from "@/assets/jackets/arsenal-retro.jpg.asset.json";
import manUnited from "@/assets/jackets/man-united.jpg.asset.json";
import germany from "@/assets/jackets/germany.jpg.asset.json";
import realMadrid from "@/assets/jackets/real-madrid.jpg.asset.json";
import arsenal from "@/assets/jackets/arsenal.jpg.asset.json";
import portugal from "@/assets/jackets/portugal.jpg.asset.json";

export type Jacket = { id: string; team: string; tag: string; image: string };

export const JACKETS: Jacket[] = [
  { id: "jk01", team: "Dortmund", tag: "Puma", image: dortmund.url },
  { id: "jk02", team: "PSG", tag: "Nike Blue", image: psgBlue.url },
  { id: "jk03", team: "PSG", tag: "Jordan Red", image: psgJordan.url },
  { id: "jk04", team: "Mexico", tag: "Adidas Black", image: mexico.url },
  { id: "jk05", team: "Arsenal", tag: "Retro 90s", image: arsenalRetro.url },
  { id: "jk06", team: "Manchester United", tag: "Adidas Blue", image: manUnited.url },
  { id: "jk07", team: "Germany", tag: "Retro White", image: germany.url },
  { id: "jk08", team: "Real Madrid", tag: "Navy Anthem", image: realMadrid.url },
  { id: "jk09", team: "Arsenal", tag: "Red Anthem", image: arsenal.url },
  { id: "jk10", team: "Portugal", tag: "Puma Navy", image: portugal.url },
];

export const JACKET_PRICE = 1750;
export const JACKET_MRP = 2999;
