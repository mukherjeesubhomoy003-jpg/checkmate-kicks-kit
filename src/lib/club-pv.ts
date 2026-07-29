// Player Version — Club Edition 25/26 drop. ₹899 flat, no shipping.
import c1 from "@/assets/club-pv/cpv1.jpg.asset.json";
import c2 from "@/assets/club-pv/cpv2.jpg.asset.json";
import c3 from "@/assets/club-pv/cpv3.jpg.asset.json";
import c4 from "@/assets/club-pv/cpv4.jpg.asset.json";
import c5 from "@/assets/club-pv/cpv5.jpg.asset.json";
import c6 from "@/assets/club-pv/cpv6.jpg.asset.json";
import c7 from "@/assets/club-pv/cpv7.jpg.asset.json";
import c8 from "@/assets/club-pv/cpv8.jpg.asset.json";
import c9 from "@/assets/club-pv/cpv9.jpg.asset.json";
import c10 from "@/assets/club-pv/cpv10.jpg.asset.json";
import c11 from "@/assets/club-pv/cpv11.jpg.asset.json";
import c12 from "@/assets/club-pv/cpv12.jpg.asset.json";
import c13 from "@/assets/club-pv/cpv13.jpg.asset.json";
import c14 from "@/assets/club-pv/cpv14.jpg.asset.json";
import c15 from "@/assets/club-pv/cpv15.jpg.asset.json";
import c16 from "@/assets/club-pv/cpv16.jpg.asset.json";
import c17 from "@/assets/club-pv/cpv17.jpg.asset.json";
import c18 from "@/assets/club-pv/cpv18.jpg.asset.json";
import c19 from "@/assets/club-pv/cpv19.jpg.asset.json";
import c20 from "@/assets/club-pv/cpv20.jpg.asset.json";
import c21 from "@/assets/club-pv/cpv21.jpg.asset.json";
import c22 from "@/assets/club-pv/cpv22.jpg.asset.json";

export type ClubPv = { id: string; team: string; tag: string; image: string };

export const CLUB_PV: ClubPv[] = [
  { id: "cpv1",  team: "AC Milan",         tag: "Away · Puma",           image: c1.url },
  { id: "cpv2",  team: "Real Madrid",      tag: "Away · LV Black",       image: c2.url },
  { id: "cpv3",  team: "Real Madrid",      tag: "Home · 25/26",          image: c3.url },
  { id: "cpv4",  team: "Barcelona",        tag: "Away · Purple Spotify", image: c4.url },
  { id: "cpv5",  team: "Barcelona",        tag: "Home · Blaugrana",      image: c5.url },
  { id: "cpv6",  team: "AC Milan",         tag: "Third · Black Red",     image: c6.url },
  { id: "cpv7",  team: "Argentina",        tag: "Home · 3-Star",         image: c7.url },
  { id: "cpv8",  team: "Newcastle",        tag: "Home · Sela Stripes",   image: c8.url },
  { id: "cpv9",  team: "PSG",              tag: "Away · White",          image: c9.url },
  { id: "cpv10", team: "Tottenham",        tag: "Home · AIA White",      image: c10.url },
  { id: "cpv11", team: "Liverpool",        tag: "Away · White",          image: c11.url },
  { id: "cpv12", team: "Manchester City",  tag: "Away · Etihad White",   image: c12.url },
  { id: "cpv13", team: "Liverpool",        tag: "Home · Red 25/26",      image: c13.url },
  { id: "cpv14", team: "Arsenal",          tag: "Away · Navy",           image: c14.url },
  { id: "cpv15", team: "Barcelona",        tag: "Retro · Collared",      image: c15.url },
  { id: "cpv16", team: "Bayern Munich",    tag: "Home · Red",            image: c16.url },
  { id: "cpv17", team: "Arsenal",          tag: "Home · Red 25/26",      image: c17.url },
  { id: "cpv18", team: "Dortmund",         tag: "Home · Yellow",         image: c18.url },
  { id: "cpv19", team: "Arsenal",          tag: "Away · Gold",           image: c19.url },
  { id: "cpv20", team: "Juventus",         tag: "Home · Jeep",           image: c20.url },
  { id: "cpv21", team: "Manchester City",  tag: "Away · Black Gold",     image: c21.url },
  { id: "cpv22", team: "Manchester United",tag: "Away · White",          image: c22.url },
];

export const CLUB_PV_PRICE = 899;
export const CLUB_PV_MRP = 1799;
