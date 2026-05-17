import localFont from "next/font/local";

export const lastTrunkFont = localFont({
  src: "../public/fonts/THELASTTRUNKS-Personal-Use-Only.ttf",
  variable: "--font-last-trunk",
  display: "swap",
  weight: "300",
  style: "oblique",
});

export const montavieFont = localFont({
  src: "../public/fonts/Montavie.ttf",
  variable: "--font-montavie",
  display: "swap",
  weight: "700",
});
