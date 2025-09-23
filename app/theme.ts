// Centralized theme colors for the app. If you want to override these via env, set NEXT_PUBLIC_BRAND_YELLOW and NEXT_PUBLIC_BRAND_WHITE.
export const BRAND_YELLOW: string = process.env.NEXT_PUBLIC_BRAND_YELLOW || "#F59E0B"; // default amber-500
export const BRAND_WHITE: string = process.env.NEXT_PUBLIC_BRAND_WHITE || "#FFFFFF";
export const APP_ICON_URL: string = process.env.NEXT_PUBLIC_APP_ICON_URL || "https://storage.googleapis.com/cosmic-project-image-assets/images/c14a2256-a303-4bac-a5fb-bb9e62cd4f1a/favicon.png";

function clamp(n: number, min: number, max: number): number { return Math.min(Math.max(n, min), max); }

export function hexToRgba(hex: string, alpha: number): string {
  let c = hex.trim();
  if (c.startsWith('#')) c = c.slice(1);
  if (c.length === 3) c = c.split('').map((ch) => ch + ch).join('');
  const bigint = parseInt(c, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

export function lighten(hex: string, percent: number): string {
  const amt = clamp(percent, -1, 1);
  let c = hex.trim();
  if (c.startsWith('#')) c = c.slice(1);
  if (c.length === 3) c = c.split('').map((ch) => ch + ch).join('');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const toHex = (v: number) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
  const nr = r + (255 - r) * amt;
  const ng = g + (255 - g) * amt;
  const nb = b + (255 - b) * amt;
  return `#${toHex(nr)}${toHex(ng)}${toHex(nb)}`;
}
