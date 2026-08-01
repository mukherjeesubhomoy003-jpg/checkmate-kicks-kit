// Club Embroidery — latest 2026/27 club season, premium embroidery quality.
// ₹450 flat, no shipping. Each drop rotates front / back / detail photos.
import ce1 from "@/assets/club-emb/ce1.jpg.asset.json";
import ce2 from "@/assets/club-emb/ce2.jpg.asset.json";
import ce3 from "@/assets/club-emb/ce3.jpg.asset.json";
import ce4 from "@/assets/club-emb/ce4.jpg.asset.json";
import ce5 from "@/assets/club-emb/ce5.jpg.asset.json";
import ce6 from "@/assets/club-emb/ce6.jpg.asset.json";
import ce7 from "@/assets/club-emb/ce7.jpg.asset.json";
import ce8 from "@/assets/club-emb/ce8.jpg.asset.json";
import ce9 from "@/assets/club-emb/ce9.jpg.asset.json";
import ce10 from "@/assets/club-emb/ce10.jpg.asset.json";
import ce11 from "@/assets/club-emb/ce11.jpg.asset.json";
import ce12 from "@/assets/club-emb/ce12.jpg.asset.json";
import ce13 from "@/assets/club-emb/ce13.jpg.asset.json";
import ce14 from "@/assets/club-emb/ce14.jpg.asset.json";
import ce15 from "@/assets/club-emb/ce15.jpg.asset.json";
import ce16 from "@/assets/club-emb/ce16.jpg.asset.json";

export type ClubEmb = {
  id: string;
  team: string;
  tag: string;
  image: string;
  gallery: string[];
};

export const CLUB_EMB_PRICE = 450;
export const CLUB_EMB_MRP = 1299;

export const CLUB_EMB: ClubEmb[] = [
  {
    id: "cemb1",
    team: "Real Madrid",
    tag: "Away White · Mbappé #10",
    image: ce1.url,
    gallery: [ce1.url, ce2.url],
  },
  {
    id: "cemb2",
    team: "Barcelona",
    tag: "Home · Lamine Yamal #10",
    image: ce3.url,
    gallery: [ce3.url, ce4.url, ce8.url],
  },
  {
    id: "cemb3",
    team: "Barcelona",
    tag: "Home · Raphinha #11",
    image: ce5.url,
    gallery: [ce5.url, ce6.url],
  },
  {
    id: "cemb4",
    team: "Barcelona",
    tag: "Home · Pedri #8",
    image: ce5.url,
    gallery: [ce5.url, ce7.url],
  },
  {
    id: "cemb5",
    team: "Liverpool",
    tag: "Home · Szoboszlai #8",
    image: ce9.url,
    gallery: [ce9.url, ce10.url],
  },
  {
    id: "cemb6",
    team: "Manchester City",
    tag: "Home · Haaland #9",
    image: ce11.url,
    gallery: [ce11.url, ce13.url],
  },
  {
    id: "cemb7",
    team: "Liverpool",
    tag: "Home · Wirtz #7",
    image: ce12.url,
    gallery: [ce12.url, ce14.url],
  },
  {
    id: "cemb8",
    team: "Manchester United",
    tag: "Home · B. Fernandes #8",
    image: ce15.url,
    gallery: [ce15.url, ce16.url],
  },
];
