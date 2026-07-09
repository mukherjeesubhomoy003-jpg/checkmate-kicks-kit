// Fan-version jersey catalogue — ₹750 flat.
import argAway from "@/assets/fan/argentina-away.jpg.asset.json";
import argHome from "@/assets/fan/argentina-home.jpg.asset.json";
import braAway from "@/assets/fan/brasil-away.jpg.asset.json";
import engAway from "@/assets/fan/england-away.jpg.asset.json";
import gerAway from "@/assets/fan/germany-away.jpg.asset.json";
import jpnAway from "@/assets/fan/japan-away.jpg.asset.json";
import porAway from "@/assets/fan/portugal-away.jpg.asset.json";
import porHome from "@/assets/fan/portugal-home.jpg.asset.json";
import spaAway from "@/assets/fan/spain-away.jpg.asset.json";
import spaHome from "@/assets/fan/spain-home.jpg.asset.json";

export type FanJersey = { id: string; team: string; tag: "Home" | "Away"; image: string };

export const FAN_JERSEYS: FanJersey[] = [
  { id: "f01", team: "Germany", tag: "Away", image: gerAway.url },
  { id: "f02", team: "England", tag: "Away", image: engAway.url },
  { id: "f03", team: "Japan", tag: "Away", image: jpnAway.url },
  { id: "f04", team: "Spain", tag: "Home", image: spaHome.url },
  { id: "f05", team: "Brasil", tag: "Away", image: braAway.url },
  { id: "f06", team: "Argentina", tag: "Away", image: argAway.url },
  { id: "f07", team: "Spain", tag: "Away", image: spaAway.url },
  { id: "f08", team: "Portugal", tag: "Home", image: porHome.url },
  { id: "f09", team: "Portugal", tag: "Away", image: porAway.url },
  { id: "f10", team: "Argentina", tag: "Home", image: argHome.url },
];

export const FAN_PRICE = 750;
export const FAN_MRP = 1499;
