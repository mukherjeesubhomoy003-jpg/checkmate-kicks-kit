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

// New batch (34)
import adidasBlack from "@/assets/fan/adidas-black.jpg.asset.json";
import rmTieDye from "@/assets/fan/real-madrid-tie-dye.jpg.asset.json";
import rmKroos from "@/assets/fan/real-madrid-kroos.jpg.asset.json";
import fcbSpotifyBlue from "@/assets/fan/barcelona-spotify-blue.jpg.asset.json";
import jpGoku from "@/assets/fan/japan-goku.jpg.asset.json";
import jpPokemon from "@/assets/fan/japan-pokemon.jpg.asset.json";
import adidasYellow from "@/assets/fan/adidas-yellow.jpg.asset.json";
import rmPurpleThird from "@/assets/fan/real-madrid-purple-third.jpg.asset.json";
import italyOrnate from "@/assets/fan/italy-ornate-black.jpg.asset.json";
import fcbSpotifyGreen from "@/assets/fan/barcelona-spotify-green.jpg.asset.json";
import rmTorn from "@/assets/fan/real-madrid-torn-orange.jpg.asset.json";
import munSplatter from "@/assets/fan/man-united-splatter.jpg.asset.json";
import fcbSpotifyPink from "@/assets/fan/barcelona-spotify-pink.jpg.asset.json";
import jpNaruto from "@/assets/fan/japan-naruto.jpg.asset.json";
import argStar from "@/assets/fan/argentina-black-star.jpg.asset.json";
import jpVegeta from "@/assets/fan/japan-vegeta.jpg.asset.json";
import rmDragonTeal from "@/assets/fan/real-madrid-dragon-teal.jpg.asset.json";
import jpDragonBlue from "@/assets/fan/japan-dragon-blue.jpg.asset.json";
import rmPainted from "@/assets/fan/real-madrid-painted-black.jpg.asset.json";
import rmLion from "@/assets/fan/real-madrid-lion-gold.jpg.asset.json";
import jpAnime from "@/assets/fan/japan-anime-blue.jpg.asset.json";
import bayernSplatter from "@/assets/fan/bayern-splatter.jpg.asset.json";
import jpGogeta from "@/assets/fan/japan-gogeta.jpg.asset.json";
import rmLV from "@/assets/fan/real-madrid-lv.jpg.asset.json";
import arsenalPre from "@/assets/fan/arsenal-prematch.jpg.asset.json";
import alHilalGold from "@/assets/fan/al-hilal-gold.jpg.asset.json";
import jpMtFuji from "@/assets/fan/japan-mt-fuji.jpg.asset.json";
import fcbKobe from "@/assets/fan/barcelona-kobe.jpg.asset.json";
import italyRen from "@/assets/fan/italy-renaissance.jpg.asset.json";
import chelseaRetro from "@/assets/fan/chelsea-retro-blue.jpg.asset.json";
import rmWhiteHome from "@/assets/fan/real-madrid-white-home.jpg.asset.json";
import bayernHomeRed from "@/assets/fan/bayern-home-red.jpg.asset.json";
import fcbHome from "@/assets/fan/barcelona-home.jpg.asset.json";
import juventusHome from "@/assets/fan/juventus-home.jpg.asset.json";

export type FanJersey = { id: string; team: string; tag: string; image: string };

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

  { id: "f11", team: "Adidas Originals", tag: "Black", image: adidasBlack.url },
  { id: "f12", team: "Real Madrid", tag: "Tie-Dye", image: rmTieDye.url },
  { id: "f13", team: "Real Madrid", tag: "Kroos Tribute", image: rmKroos.url },
  { id: "f14", team: "Barcelona", tag: "Spotify Blue", image: fcbSpotifyBlue.url },
  { id: "f15", team: "Japan", tag: "Goku Edition", image: jpGoku.url },
  { id: "f16", team: "Japan", tag: "Pokemon Edition", image: jpPokemon.url },
  { id: "f17", team: "Adidas Originals", tag: "Yellow", image: adidasYellow.url },
  { id: "f18", team: "Real Madrid", tag: "Purple Third", image: rmPurpleThird.url },
  { id: "f19", team: "Italy", tag: "Ornate Black", image: italyOrnate.url },
  { id: "f20", team: "Barcelona", tag: "Spotify Green", image: fcbSpotifyGreen.url },
  { id: "f21", team: "Real Madrid", tag: "Torn Pre-Match", image: rmTorn.url },
  { id: "f22", team: "Man United", tag: "Splatter", image: munSplatter.url },
  { id: "f23", team: "Barcelona", tag: "Spotify Pink", image: fcbSpotifyPink.url },
  { id: "f24", team: "Japan", tag: "Naruto Edition", image: jpNaruto.url },
  { id: "f25", team: "Argentina", tag: "Black Star", image: argStar.url },
  { id: "f26", team: "Japan", tag: "Vegeta Edition", image: jpVegeta.url },
  { id: "f27", team: "Real Madrid", tag: "Dragon Teal", image: rmDragonTeal.url },
  { id: "f28", team: "Japan", tag: "Dragon Blue", image: jpDragonBlue.url },
  { id: "f29", team: "Real Madrid", tag: "Painted Black", image: rmPainted.url },
  { id: "f30", team: "Real Madrid", tag: "Lion Gold", image: rmLion.url },
  { id: "f31", team: "Japan", tag: "Anime Blue", image: jpAnime.url },
  { id: "f32", team: "Bayern Munich", tag: "Splatter", image: bayernSplatter.url },
  { id: "f33", team: "Japan", tag: "Gogeta Edition", image: jpGogeta.url },
  { id: "f34", team: "Real Madrid", tag: "LV Edition", image: rmLV.url },
  { id: "f35", team: "Arsenal", tag: "Pre-Match", image: arsenalPre.url },
  { id: "f36", team: "Al Hilal", tag: "Gold Ornate", image: alHilalGold.url },
  { id: "f37", team: "Japan", tag: "Mt Fuji", image: jpMtFuji.url },
  { id: "f38", team: "Barcelona", tag: "Kobe Edition", image: fcbKobe.url },
  { id: "f39", team: "Italy", tag: "Renaissance", image: italyRen.url },
  { id: "f40", team: "Chelsea", tag: "Retro Blue", image: chelseaRetro.url },
  { id: "f41", team: "Real Madrid", tag: "Home", image: rmWhiteHome.url },
  { id: "f42", team: "Bayern Munich", tag: "Home", image: bayernHomeRed.url },
  { id: "f43", team: "Barcelona", tag: "Home", image: fcbHome.url },
  { id: "f44", team: "Juventus", tag: "Home", image: juventusHome.url },
];

export const FAN_PRICE = 750;
export const FAN_MRP = 1499;
