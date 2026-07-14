// Football shorts catalogue.
import portugalRed from "@/assets/shorts/portugal-red.jpg.asset.json";
import brasilBlack from "@/assets/shorts/brasil-black.jpg.asset.json";
import franceBlueStriped from "@/assets/shorts/france-blue-striped.jpg.asset.json";
import franceWhite from "@/assets/shorts/france-white.jpg.asset.json";
import brasilBlue from "@/assets/shorts/brasil-blue.jpg.asset.json";
import portugalWine from "@/assets/shorts/portugal-wine.jpg.asset.json";
import portugalBlack from "@/assets/shorts/portugal-black.jpg.asset.json";
import germanyAwayBlack from "@/assets/shorts/germany-away-black.jpg.asset.json";
import brasilGreen from "@/assets/shorts/brasil-green.jpg.asset.json";
import germanyBlackRed from "@/assets/shorts/germany-black-red.jpg.asset.json";
import psgBlue from "@/assets/shorts/psg-blue.jpg.asset.json";
import argentinaNavy from "@/assets/shorts/argentina-navy.jpg.asset.json";
import argentinaBlack from "@/assets/shorts/argentina-black.jpg.asset.json";
import englandNavy from "@/assets/shorts/england-navy.jpg.asset.json";
import mexicoGreen from "@/assets/shorts/mexico-green.jpg.asset.json";
import franceMint from "@/assets/shorts/france-mint.jpg.asset.json";
import spainMaroon from "@/assets/shorts/spain-maroon.jpg.asset.json";
import portugalWhite from "@/assets/shorts/portugal-white.jpg.asset.json";

export type Short = { id: string; team: string; colour: string; image: string };

export const SHORTS_PRICE = 250;
export const SHORTS_SHIPPING = 50;
export const SHORTS_MRP = 499;

export const SHORTS: Short[] = [
  { id: "s01", team: "Portugal", colour: "Red", image: portugalRed.url },
  { id: "s02", team: "Brasil", colour: "Black", image: brasilBlack.url },
  { id: "s03", team: "France", colour: "Blue Striped", image: franceBlueStriped.url },
  { id: "s04", team: "France", colour: "White", image: franceWhite.url },
  { id: "s05", team: "Brasil", colour: "Blue", image: brasilBlue.url },
  { id: "s06", team: "Portugal", colour: "Wine", image: portugalWine.url },
  { id: "s07", team: "Portugal", colour: "Black", image: portugalBlack.url },
  { id: "s08", team: "Germany", colour: "Away Black", image: germanyAwayBlack.url },
  { id: "s09", team: "Brasil", colour: "Green", image: brasilGreen.url },
  { id: "s10", team: "Germany", colour: "Black Red", image: germanyBlackRed.url },
  { id: "s11", team: "PSG", colour: "Blue", image: psgBlue.url },
  { id: "s12", team: "Argentina", colour: "Navy", image: argentinaNavy.url },
  { id: "s13", team: "Argentina", colour: "Black", image: argentinaBlack.url },
  { id: "s14", team: "England", colour: "Navy", image: englandNavy.url },
  { id: "s15", team: "Mexico", colour: "Green", image: mexicoGreen.url },
  { id: "s16", team: "France", colour: "Mint", image: franceMint.url },
  { id: "s17", team: "Spain", colour: "Maroon", image: spainMaroon.url },
  { id: "s18", team: "Portugal", colour: "White", image: portugalWhite.url },
];
