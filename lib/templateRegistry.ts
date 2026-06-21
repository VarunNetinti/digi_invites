/**
 * TEMPLATE REGISTRY
 * -----------------
 * Add a new entry here when you drop a new TemplateN.tsx into
 * /components/templates/. The admin dashboard reads this list
 * automatically — no other file needs to change.
 *
 * Fields:
 *  id      — must match the filename stem, e.g. "template6" → Template6.tsx
 *  name    — display name shown in the admin picker
 *  desc    — short style description
 *  emoji   — single emoji shown as the icon
 *  colors  — 3 hex swatches shown as a colour strip preview
 */

export interface TemplateEntry {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  colors: [string, string, string];
}

export const TEMPLATE_REGISTRY: TemplateEntry[] = [
  { id: "template1",  name: "Royal Elegance",      desc: "Gold & ivory, ornate",           emoji: "🏛️",  colors: ["#1a0a2e", "#c9a84c", "#faf6f0"] },
  { id: "template2",  name: "Blush Romance",        desc: "Pink florals, soft",             emoji: "🌸",  colors: ["#f9e4e4", "#c17b7b", "#fff"]    },
  { id: "template3",  name: "Modern Noir",          desc: "Black & white, bold",            emoji: "🖤",  colors: ["#0d0d0d", "#fff",    "#444"]    },
  { id: "template4",  name: "Rustic Garden",        desc: "Sage green, earthy",             emoji: "🌿",  colors: ["#4a5e3a", "#f5e6c8", "#eee5d3"] },
  { id: "template5",  name: "Art Deco",             desc: "Navy & gold, luxury",            emoji: "⭐",  colors: ["#0d1b3e", "#c9a84c", "#e8d5a3"] },
  { id: "template6",  name: "Japanese Zen",         desc: "Ink wash, crimson & white",      emoji: "🍃",  colors: ["#fdfaf6", "#dc322f", "#b5937a"] },
  { id: "template7",  name: "Tropical Paradise",    desc: "Lush greens, coral & gold",      emoji: "🌴",  colors: ["#1a4731", "#f9c74f", "#fffef9"] },
  { id: "template8",  name: "Celestial Night Sky",  desc: "Deep indigo, silver stars",      emoji: "✨",  colors: ["#020712", "#c8d8f0", "#0a1628"] },
  { id: "template9",  name: "Indian Festive",       desc: "Marigold, magenta, mandala",     emoji: "🪔",  colors: ["#c0392b", "#e67e22", "#fffbf0"] },
  { id: "template10", name: "Gatsby Glamour",       desc: "Champagne, black & geometric",   emoji: "🥂",  colors: ["#0a0a0a", "#d4af37", "#f7e7a0"] },
  { id: "template11", name: "Lavender Fields",      desc: "Soft purple, silver, romantic",  emoji: "💜",  colors: ["#4a3568", "#c8b4e8", "#faf8ff"] },
  { id: "template12", name: "Coastal Beach",        desc: "Ocean blue, sandy beige",        emoji: "🌊",  colors: ["#2e7da8", "#f8f4ec", "#5ba3c9"] },
  { id: "template13", name: "Boho Terracotta",      desc: "Terracotta, pampas & earth",     emoji: "🏺",  colors: ["#b5451b", "#d4835a", "#fdf8f3"] },
  { id: "template14", name: "Emerald & Copper",     desc: "Jewel green, copper accents",    emoji: "💚",  colors: ["#1a4a2e", "#b87333", "#d4956a"] },
  { id: "template15", name: "Butterfly Garden",     desc: "Animated butterfly, sage & gold", emoji: "🦋",  colors: ["#4a6741", "#c9a84c", "#fdf9f4"] },
  // ── Drop new templates below this line ──
];

