// Full Sleeves Retro & New — premium embroidery, retro + latest club/country kits.
import f1 from "@/assets/fsretro/fsr1.jpg.asset.json";
import f2 from "@/assets/fsretro/fsr2.jpg.asset.json";
import f3 from "@/assets/fsretro/fsr3.jpg.asset.json";
import f4 from "@/assets/fsretro/fsr4.jpg.asset.json";
import f5 from "@/assets/fsretro/fsr5.jpg.asset.json";
import f6 from "@/assets/fsretro/fsr6.jpg.asset.json";
import f7 from "@/assets/fsretro/fsr7.jpg.asset.json";
import f8 from "@/assets/fsretro/fsr8.jpg.asset.json";
import f9 from "@/assets/fsretro/fsr9.jpg.asset.json";
import f10 from "@/assets/fsretro/fsr10.jpg.asset.json";
import f11 from "@/assets/fsretro/fsr11.jpg.asset.json";
import f12 from "@/assets/fsretro/fsr12.jpg.asset.json";
import f13 from "@/assets/fsretro/fsr13.jpg.asset.json";
import f14 from "@/assets/fsretro/fsr14.jpg.asset.json";
import f15 from "@/assets/fsretro/fsr15.jpg.asset.json";
import f16 from "@/assets/fsretro/fsr16.jpg.asset.json";
import f17 from "@/assets/fsretro/fsr17.jpg.asset.json";
import f18 from "@/assets/fsretro/fsr18.jpg.asset.json";

export type FsRetro = {
  id: string;
  team: string;
  tag: string;
  image: string;
  gallery: string[];
  era: "Retro" | "Latest";
};

export const FS_RETRO_PRICE = 950;
export const FS_RETRO_MRP = 1999;

export const FS_RETRO: FsRetro[] = [
  {
    id: "fsr1",
    team: "Real Madrid",
    tag: "Home Full Sleeve · Mbappé #10",
    image: f1.url,
    gallery: [f1.url, f2.url, f3.url],
    era: "Latest",
  },
  {
    id: "fsr2",
    team: "Portugal",
    tag: "Away Teal Full Sleeve · Ronaldo #7",
    image: f4.url,
    gallery: [f4.url, f5.url, f6.url],
    era: "Latest",
  },
  {
    id: "fsr3",
    team: "Real Madrid",
    tag: "Retro Purple Full Sleeve · Ronaldo #7",
    image: f7.url,
    gallery: [f7.url, f8.url],
    era: "Retro",
  },
  {
    id: "fsr4",
    team: "Barcelona",
    tag: "Retro 14/15 Full Sleeve · Neymar #11",
    image: f9.url,
    gallery: [f9.url, f10.url],
    era: "Retro",
  },
  {
    id: "fsr5",
    team: "Santos",
    tag: "Retro Full Sleeve · Neymar #11",
    image: f11.url,
    gallery: [f11.url, f12.url],
    era: "Retro",
  },
  {
    id: "fsr6",
    team: "Manchester United",
    tag: "Retro AIG Full Sleeve · Ronaldo #7",
    image: f14.url,
    gallery: [f14.url, f13.url],
    era: "Retro",
  },
  {
    id: "fsr7",
    team: "Arsenal",
    tag: "Home Full Sleeve · Plain",
    image: f15.url,
    gallery: [f15.url, f16.url],
    era: "Latest",
  },
  {
    id: "fsr8",
    team: "Arsenal",
    tag: "Home Full Sleeve · Saka #7",
    image: f18.url,
    gallery: [f18.url, f17.url],
    era: "Latest",
  },
];
