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
import j47 from "@/assets/jerseys/j47.jpg.asset.json";

import j49 from "@/assets/jerseys/j49.jpg.asset.json";
import j50 from "@/assets/jerseys/j50.jpg.asset.json";
import j51 from "@/assets/jerseys/j51.jpg.asset.json";
import j52 from "@/assets/jerseys/j52.jpg.asset.json";
import j53 from "@/assets/jerseys/j53.jpg.asset.json";

export type Jersey = { id: string; team: string; tag: "Home" | "Away"; image: string };

const RAW: [string, "Home" | "Away", string][] = [
  ["Argentina", "Away", j01.url],
  ["Argentina", "Home", j02.url],
  ["Brasil", "Away", j03.url],
  ["Spain", "Away", j04.url],
  ["Uruguay", "Away", j05.url],
  ["Norway", "Away", j06.url],
  ["South Africa", "Home", j07.url],
  ["Croatia", "Home", j08.url],
  ["England", "Away", j09.url],
  ["Italy", "Away", j10.url],
  ["Japan", "Home", j11.url],
  ["France", "Home", j12.url],
  ["Portugal", "Away", j13.url],
  ["France", "Away", j14.url],
  ["Brasil", "Home", j15.url],
  ["Belgium", "Away", j16.url],
  ["Portugal", "Home", j17.url],
  ["Belgium", "Home", j18.url],
  ["England", "Home", j19.url],
  ["Germany", "Away", j20.url],
  ["Portugal", "Away", j21.url],
  ["Spain", "Home", j22.url],
  ["Japan", "Away", j23.url],
  ["Nigeria", "Home", j24.url],
  ["Nigeria", "Away", j25.url],
  ["Italy", "Home", j26.url],
  ["USA", "Away", j27.url],
  ["Korea", "Away", j28.url],
  ["Canada", "Away", j29.url],
  ["Argentina", "Away", j30.url],
  ["Uruguay", "Home", j31.url],
  ["France", "Away", j32.url],
  ["Brasil", "Away", j33.url],
  ["Portugal", "Away", j34.url],
  ["Brasil", "Away", j35.url],
  ["Brasil", "Home", j36.url],
  ["Korea", "Home", j37.url],
  ["Mexico", "Away", j38.url],
  ["Colombia", "Away", j39.url],
  ["South Africa", "Away", j40.url],
  ["Netherlands", "Away", j41.url],
  ["Brasil", "Away", j42.url],
  ["Colombia", "Home", j43.url],
  ["Mexico", "Home", j44.url],
  ["Netherlands", "Home", j45.url],
  ["Germany", "Home", j46.url],
  ["Portugal", "Away", j47.url],
  
  ["Germany", "Away", j49.url],
  ["Germany", "Home", j50.url],
  ["Belgium", "Home", j51.url],
  ["Portugal", "Home", j52.url],
  ["France", "Away", j53.url],
];

export const ALL_JERSEYS: Jersey[] = RAW.map(([team, tag, image], i) => ({
  id: `j${String(i + 1).padStart(2, "0")}`,
  team,
  tag,
  image,
}));

// Show every jersey on the Player Version page — no dedup, no hiding.
export const JERSEYS: Jersey[] = ALL_JERSEYS;
