// Fan Version — Full Sleeve Club Edition. ₹950 flat, no shipping.
import f1 from "@/assets/fan-fs/ffs1.jpg.asset.json";
import f2 from "@/assets/fan-fs/ffs2.jpg.asset.json";
import f3 from "@/assets/fan-fs/ffs3.jpg.asset.json";
import f4 from "@/assets/fan-fs/ffs4.jpg.asset.json";
import f5 from "@/assets/fan-fs/ffs5.jpg.asset.json";
import f6 from "@/assets/fan-fs/ffs6.jpg.asset.json";
import f7 from "@/assets/fan-fs/ffs7.jpg.asset.json";
import f8 from "@/assets/fan-fs/ffs8.jpg.asset.json";

export type FanFs = { id: string; team: string; tag: string; image: string };

export const FAN_FS: FanFs[] = [
  { id: "ffs1", team: "Juventus",        tag: "Home · Jeep",           image: f1.url },
  { id: "ffs2", team: "Arsenal",         tag: "Home · Red",            image: f2.url },
  { id: "ffs3", team: "Arsenal",         tag: "Away · Navy",           image: f3.url },
  { id: "ffs4", team: "Liverpool",       tag: "Away · Red",            image: f4.url },
  { id: "ffs5", team: "Manchester United",tag: "Home · Snapdragon",    image: f5.url },
  { id: "ffs6", team: "Real Madrid",     tag: "Home · White",          image: f6.url },
  { id: "ffs7", team: "Real Madrid",     tag: "Away · Pink",           image: f7.url },
  { id: "ffs8", team: "Barcelona",       tag: "Away · Kobe Purple",    image: f8.url },
];

export const FAN_FS_PRICE = 950;
export const FAN_FS_MRP = 1899;
