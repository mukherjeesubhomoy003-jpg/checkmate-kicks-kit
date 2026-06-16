// Centralised jersey catalogue — imported by home preview & full collection page.
import j01 from "@/assets/jerseys/j01.jpg.asset.json";
import j02 from "@/assets/jerseys/j02.jpg.asset.json";
import j03 from "@/assets/jerseys/j03.jpg.asset.json";
import j04 from "@/assets/jerseys/j04.jpg.asset.json";
import j05 from "@/assets/jerseys/j05.jpg.asset.json";
import j06 from "@/assets/jerseys/j06.jpg.asset.json";
import j07 from "@/assets/jerseys/j07.jpg.asset.json";
import j08 from "@/assets/jerseys/j08.jpg.asset.json";
import j09 from "@/assets/jerseys/j09.jpg.asset.json";
import j10 from "@/assets/jerseys/j10.jpg.asset.json";
import j11 from "@/assets/jerseys/j11.jpg.asset.json";
import j12 from "@/assets/jerseys/j12.jpg.asset.json";
import j13 from "@/assets/jerseys/j13.jpg.asset.json";
import j14 from "@/assets/jerseys/j14.jpg.asset.json";
import j15 from "@/assets/jerseys/j15.jpg.asset.json";
import j16 from "@/assets/jerseys/j16.jpg.asset.json";
import j17 from "@/assets/jerseys/j17.jpg.asset.json";
import j18 from "@/assets/jerseys/j18.jpg.asset.json";
import j19 from "@/assets/jerseys/j19.jpg.asset.json";
import j20 from "@/assets/jerseys/j20.jpg.asset.json";
import j21 from "@/assets/jerseys/j21.jpg.asset.json";
import j22 from "@/assets/jerseys/j22.jpg.asset.json";
import j23 from "@/assets/jerseys/j23.jpg.asset.json";
import j24 from "@/assets/jerseys/j24.jpg.asset.json";
import j25 from "@/assets/jerseys/j25.jpg.asset.json";
import j26 from "@/assets/jerseys/j26.jpg.asset.json";
import j27 from "@/assets/jerseys/j27.jpg.asset.json";
import j28 from "@/assets/jerseys/j28.jpg.asset.json";
import j29 from "@/assets/jerseys/j29.jpg.asset.json";
import j30 from "@/assets/jerseys/j30.jpg.asset.json";
import j31 from "@/assets/jerseys/j31.jpg.asset.json";
import j32 from "@/assets/jerseys/j32.jpg.asset.json";
import j33 from "@/assets/jerseys/j33.jpg.asset.json";
import j34 from "@/assets/jerseys/j34.jpg.asset.json";
import j35 from "@/assets/jerseys/j35.jpg.asset.json";
import j36 from "@/assets/jerseys/j36.jpg.asset.json";
import j37 from "@/assets/jerseys/j37.jpg.asset.json";
import j38 from "@/assets/jerseys/j38.jpg.asset.json";
import j39 from "@/assets/jerseys/j39.jpg.asset.json";
import j40 from "@/assets/jerseys/j40.jpg.asset.json";
import j41 from "@/assets/jerseys/j41.jpg.asset.json";
import j42 from "@/assets/jerseys/j42.jpg.asset.json";
import j43 from "@/assets/jerseys/j43.jpg.asset.json";
import j44 from "@/assets/jerseys/j44.jpg.asset.json";
import j45 from "@/assets/jerseys/j45.jpg.asset.json";
import j46 from "@/assets/jerseys/j46.jpg.asset.json";

export type Jersey = { id: string; team: string; tag: "Home" | "Away"; image: string };

const RAW: [string, "Home" | "Away", string][] = [
  ["Argentina", "Home", j01.url],
  ["Argentina", "Away", j02.url],
  ["France", "Away", j03.url],
  ["Germany", "Home", j04.url],
  ["Portugal", "Home", j05.url],
  ["Portugal", "Away", j06.url],
  ["Spain", "Home", j07.url],
  ["Spain", "Away", j08.url],
  ["England", "Home", j09.url],
  ["Italy", "Home", j10.url],
  ["Netherlands", "Home", j11.url],
  ["Netherlands", "Away", j12.url],
  ["Belgium", "Home", j13.url],
  ["Belgium", "Away", j14.url],
  ["Brasil", "Home", j15.url],
  ["Croatia", "Away", j16.url],
  ["Croatia", "Home", j17.url],
  ["Uruguay", "Away", j18.url],
  ["England", "Away", j19.url],
  ["Switzerland", "Home", j20.url],
  ["Switzerland", "Away", j21.url],
  ["Denmark", "Home", j22.url],
  ["Japan", "Home", j23.url],
  ["Japan", "Away", j24.url],
  ["Nigeria", "Home", j25.url],
  ["Italy", "Away", j26.url],
  ["USA", "Home", j27.url],
  ["Korea", "Home", j28.url],
  ["Senegal", "Away", j29.url],
  ["Morocco", "Home", j30.url],
  ["Morocco", "Away", j31.url],
  ["Poland", "Home", j32.url],
  ["Brasil", "Away", j33.url],
  ["Ghana", "Home", j34.url],
  ["Brasil", "Home", j35.url],
  ["Brasil", "Away", j36.url],
  ["Korea", "Away", j37.url],
  ["Mexico", "Home", j38.url],
  ["Colombia", "Home", j39.url],
  ["South Africa", "Home", j40.url],
  ["Ecuador", "Away", j41.url],
  ["Brasil", "Home", j42.url],
  ["France", "Home", j43.url],
  ["Mexico", "Away", j44.url],
  ["Australia", "Home", j45.url],
  ["Saudi Arabia", "Away", j46.url],
];

export const JERSEYS: Jersey[] = RAW.map(([team, tag, image], i) => ({
  id: `j${String(i + 1).padStart(2, "0")}`,
  team,
  tag,
  image,
}));
