// Embroidery collection — premium stitched crests & sponsors. ₹450 flat, no shipping.
import rmFront from "@/assets/embroidery/rm-front.jpg.asset.json";
import rmSide from "@/assets/embroidery/rm-side.jpg.asset.json";
import rmBack from "@/assets/embroidery/rm-back.jpg.asset.json";

import e1 from "@/assets/emb2/e1.jpg.asset.json";
import e2 from "@/assets/emb2/e2.jpg.asset.json";
import e3 from "@/assets/emb2/e3.jpg.asset.json";
import e4 from "@/assets/emb2/e4.jpg.asset.json";
import e5 from "@/assets/emb2/e5.jpg.asset.json";
import e6 from "@/assets/emb2/e6.jpg.asset.json";
import e7 from "@/assets/emb2/e7.jpg.asset.json";
import e8 from "@/assets/emb2/e8.jpg.asset.json";
import e9 from "@/assets/emb2/e9.jpg.asset.json";
import e10 from "@/assets/emb2/e10.jpg.asset.json";
import e11 from "@/assets/emb2/e11.jpg.asset.json";
import e12 from "@/assets/emb2/e12.jpg.asset.json";
import e13 from "@/assets/emb2/e13.jpg.asset.json";
import e14 from "@/assets/emb2/e14.jpg.asset.json";
import e15 from "@/assets/emb2/e15.jpg.asset.json";
import e16 from "@/assets/emb2/e16.jpg.asset.json";
import e17 from "@/assets/emb2/e17.jpg.asset.json";
import e18 from "@/assets/emb2/e18.jpg.asset.json";
import e19 from "@/assets/emb2/e19.jpg.asset.json";
import e20 from "@/assets/emb2/e20.jpg.asset.json";
import e21 from "@/assets/emb2/e21.jpg.asset.json";
import e22 from "@/assets/emb2/e22.jpg.asset.json";
import e23 from "@/assets/emb2/e23.jpg.asset.json";
import e24 from "@/assets/emb2/e24.jpg.asset.json";
import e25 from "@/assets/emb2/e25.jpg.asset.json";
import e26 from "@/assets/emb2/e26.jpg.asset.json";
import e27 from "@/assets/emb2/e27.jpg.asset.json";
import e28 from "@/assets/emb2/e28.jpg.asset.json";
import e29 from "@/assets/emb2/e29.jpg.asset.json";
import e30 from "@/assets/emb2/e30.jpg.asset.json";
import e31 from "@/assets/emb2/e31.jpg.asset.json";
import e32 from "@/assets/emb2/e32.jpg.asset.json";
import e33 from "@/assets/emb2/e33.jpg.asset.json";
import e34 from "@/assets/emb2/e34.jpg.asset.json";
import e35 from "@/assets/emb2/e35.jpg.asset.json";
import e36 from "@/assets/emb2/e36.jpg.asset.json";
import e37 from "@/assets/emb2/e37.jpg.asset.json";
import e38 from "@/assets/emb2/e38.jpg.asset.json";
import e39 from "@/assets/emb2/e39.jpg.asset.json";
import e40 from "@/assets/emb2/e40.jpg.asset.json";
import e41 from "@/assets/emb2/e41.jpg.asset.json";
import e42 from "@/assets/emb2/e42.jpg.asset.json";
import e43 from "@/assets/emb2/e43.jpg.asset.json";
import e44 from "@/assets/emb2/e44.jpg.asset.json";
import e45 from "@/assets/emb2/e45.jpg.asset.json";
import e46 from "@/assets/emb2/e46.jpg.asset.json";
import e47 from "@/assets/emb2/e47.jpg.asset.json";
import e48 from "@/assets/emb2/e48.jpg.asset.json";
import e49 from "@/assets/emb2/e49.jpg.asset.json";
import e50 from "@/assets/emb2/e50.jpg.asset.json";
import e51 from "@/assets/emb2/e51.jpg.asset.json";
import e52 from "@/assets/emb2/e52.jpg.asset.json";
import e53 from "@/assets/emb2/e53.jpg.asset.json";

export type Embroidery = {
  id: string;
  team: string;
  tag: string;
  season: string;
  image: string;
  gallery: string[];
};

export const EMBROIDERY_PRICE = 450;
export const EMBROIDERY_MRP = 1499;

export const EMBROIDERY: Embroidery[] = [
  {
    id: "emb01",
    team: "Real Madrid",
    tag: "Home · Embroidery",
    season: "Upcoming Season",
    image: rmFront.url,
    gallery: [rmFront.url, rmSide.url, rmBack.url],
  },
  {
    id: "emb02",
    team: "France",
    tag: "Away Retro White · Zidane #10",
    season: "Retro",
    image: e3.url,
    gallery: [e3.url, e4.url, e1.url, e2.url],
  },
  {
    id: "emb03",
    team: "France",
    tag: "Home Blue · Mbappé #10",
    season: "Latest",
    image: e5.url,
    gallery: [e5.url, e6.url, e7.url],
  },
  {
    id: "emb04",
    team: "Portugal",
    tag: "Away Pink · Ronaldo #7",
    season: "Latest",
    image: e8.url,
    gallery: [e8.url, e9.url, e10.url, e11.url],
  },
  {
    id: "emb05",
    team: "Manchester United",
    tag: "Retro Vodafone · Beckham #7",
    season: "Retro",
    image: e12.url,
    gallery: [e12.url, e15.url, e13.url, e14.url],
  },
  {
    id: "emb06",
    team: "PSG",
    tag: "Home · O. Dembélé #10",
    season: "Latest",
    image: e16.url,
    gallery: [e16.url, e18.url, e17.url],
  },
  {
    id: "emb07",
    team: "Bayern Munich",
    tag: "Home Red · Kane #9",
    season: "Latest",
    image: e19.url,
    gallery: [e19.url, e22.url, e20.url, e21.url],
  },
  {
    id: "emb08",
    team: "Germany",
    tag: "Home White · Musiala #10",
    season: "Latest",
    image: e25.url,
    gallery: [e25.url, e26.url, e23.url, e24.url],
  },
  {
    id: "emb09",
    team: "Brasil",
    tag: "Away Blue · Neymar Jr #10",
    season: "Latest",
    image: e29.url,
    gallery: [e29.url, e30.url, e27.url, e28.url],
  },
  {
    id: "emb10",
    team: "Portugal",
    tag: "Away White · C. Ronaldo #17",
    season: "Latest",
    image: e33.url,
    gallery: [e33.url, e34.url, e31.url, e32.url],
  },
  {
    id: "emb11",
    team: "Argentina",
    tag: "Special Blue Swirl · Messi #10",
    season: "Special",
    image: e35.url,
    gallery: [e35.url, e36.url],
  },
  {
    id: "emb12",
    team: "Real Madrid",
    tag: "Home · Bellingham #5",
    season: "Latest",
    image: e37.url,
    gallery: [e37.url, e38.url, e39.url, e41.url],
  },
  {
    id: "emb13",
    team: "Real Madrid",
    tag: "Home · Mbappé #10",
    season: "Latest",
    image: e37.url,
    gallery: [e37.url, e42.url, e40.url],
  },
  {
    id: "emb14",
    team: "Real Madrid",
    tag: "Home · Vini Jr #7",
    season: "Latest",
    image: e37.url,
    gallery: [e37.url, e43.url],
  },
  {
    id: "emb15",
    team: "AC Milan",
    tag: "Home · Rafa Leão #10",
    season: "Latest",
    image: e44.url,
    gallery: [e44.url, e45.url],
  },
  {
    id: "emb16",
    team: "Juventus",
    tag: "Retro Jeep · Ronaldo #7",
    season: "Retro",
    image: e46.url,
    gallery: [e46.url, e47.url],
  },
  {
    id: "emb17",
    team: "Real Madrid",
    tag: "Retro Black BenQ · Beckham #23",
    season: "Retro",
    image: e48.url,
    gallery: [e48.url, e49.url],
  },
  {
    id: "emb18",
    team: "Manchester United",
    tag: "Retro AIG · Ronaldo #7",
    season: "Retro",
    image: e50.url,
    gallery: [e50.url, e51.url],
  },
  {
    id: "emb19",
    team: "Belgium",
    tag: "Home Red · De Bruyne #7",
    season: "Latest",
    image: e52.url,
    gallery: [e52.url, e53.url],
  },
];
