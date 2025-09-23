import type { MetadataRoute } from "next";
import { BRAND_WHITE, BRAND_YELLOW } from "@/app/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daily Spark",
    short_name: "Spark",
    description:
      "Daily motivation with 365 unique thoughts to brighten your day.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: BRAND_WHITE,
    theme_color: BRAND_YELLOW,
    categories: ["productivity", "lifestyle", "education"],
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Today",
        short_name: "Today",
        url: "/#today",
      },
      {
        name: "Browse",
        short_name: "Browse",
        url: "/#browse",
      },
      {
        name: "Favorites",
        short_name: "Favs",
        url: "/#favorites",
      },
    ],
  };
}