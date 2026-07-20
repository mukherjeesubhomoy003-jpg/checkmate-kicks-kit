// Embroidery collection — upcoming premium editions.
import rmFront from "@/assets/embroidery/rm-front.jpg.asset.json";
import rmSide from "@/assets/embroidery/rm-side.jpg.asset.json";
import rmBack from "@/assets/embroidery/rm-back.jpg.asset.json";

export type Embroidery = {
  id: string;
  team: string;
  tag: string;
  season: string;
  image: string;
  gallery: string[];
};

export const EMBROIDERY_PRICE = 499;
export const EMBROIDERY_MRP = 1499;

export const EMBROIDERY: Embroidery[] = [
  {
    id: "emb01",
    team: "Real Madrid",
    tag: "Home · Embroidery",
    season: "26/27 Edition",
    image: rmFront.url,
    gallery: [rmFront.url, rmSide.url, rmBack.url],
  },
];
