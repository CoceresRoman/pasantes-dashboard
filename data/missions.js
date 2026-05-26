// Misiones del pasaporte. `xp: 0` = tutorial sin XP.
// `unlocks`: id de la misión previa requerida (null = disponible desde el inicio).
export const missions = [
  { id: "t0a", code: "T.0A", titulo: "Deploy a Vercel", acto: "Tutorial", xp: 0, dificultad: "tutorial", badge: "🚀", emoji: "🛫", unlocks: null },
  { id: "t0b", code: "T.0B", titulo: "Conventional Commits", acto: "Tutorial", xp: 0, dificultad: "tutorial", badge: "📝", emoji: "📐", unlocks: "t0a" },

  { id: "m1", code: "M1", titulo: "Saludo dinámico", acto: "Acto 1 — JS Browser", xp: 10, dificultad: "facil", badge: "🟢", emoji: "👋", unlocks: "t0b" },
  { id: "m2", code: "M2", titulo: "Calculadora de propina", acto: "Acto 1 — JS Browser", xp: 10, dificultad: "facil", badge: "🟢", emoji: "🧮", unlocks: "m1" },
  { id: "m3", code: "M3", titulo: "Lista de tareas en memoria", acto: "Acto 1 — JS Browser", xp: 25, dificultad: "media", badge: "🔵", emoji: "📋", unlocks: "m2" },
  { id: "boss1", code: "BOSS 1", titulo: "Generador de memes", acto: "Acto 1 — JS Browser", xp: 100, dificultad: "boss", badge: "🏆", emoji: "🎭", unlocks: "m3" },

  { id: "m4", code: "M4", titulo: "Hola Next", acto: "Acto 2 — React + Next", xp: 10, dificultad: "facil", badge: "🟢", emoji: "⚛️", unlocks: "boss1" },
  { id: "m5", code: "M5", titulo: "Contador con useState", acto: "Acto 2 — React + Next", xp: 25, dificultad: "media", badge: "🔵", emoji: "🔢", unlocks: "m4" },
  { id: "m6", code: "M6", titulo: "Fetch a Pokémon API", acto: "Acto 2 — React + Next", xp: 25, dificultad: "media", badge: "🔵", emoji: "🌐", unlocks: "m5" },
  { id: "m7", code: "M7", titulo: "Lista filtrable", acto: "Acto 2 — React + Next", xp: 25, dificultad: "media", badge: "🔵", emoji: "🔍", unlocks: "m6" },
  { id: "boss2", code: "BOSS 2", titulo: "Mini-Pokédex", acto: "Acto 2 — React + Next", xp: 100, dificultad: "boss", badge: "🏆", emoji: "🎮", unlocks: "m7" },

  { id: "m8", code: "M8", titulo: "Bug hunt", acto: "Acto 3 — Git pro", xp: 25, dificultad: "media", badge: "🔵", emoji: "🐛", unlocks: "boss2" },
  { id: "m9", code: "M9", titulo: "Code review cruzado", acto: "Acto 3 — Git pro", xp: 25, dificultad: "media", badge: "🔵", emoji: "👀", unlocks: "m8" },
  { id: "m10", code: "M10", titulo: "Refactor sin romper", acto: "Acto 3 — Git pro", xp: 50, dificultad: "dificil", badge: "🟣", emoji: "🧹", unlocks: "m9" },

  { id: "m11", code: "M11", titulo: "App propia: diseño", acto: "Acto 4 — App propia", xp: 25, dificultad: "media", badge: "🔵", emoji: "🎨", unlocks: "m10" },
  { id: "m12", code: "M12", titulo: "App propia: setup", acto: "Acto 4 — App propia", xp: 25, dificultad: "media", badge: "🔵", emoji: "🏗️", unlocks: "m11" },
  { id: "m13", code: "M13", titulo: "App propia: feature core", acto: "Acto 4 — App propia", xp: 50, dificultad: "dificil", badge: "🟣", emoji: "⚙️", unlocks: "m12" },
  { id: "m14", code: "M14", titulo: "App propia: persistencia", acto: "Acto 4 — App propia", xp: 50, dificultad: "dificil", badge: "🟣", emoji: "💾", unlocks: "m13" },
  { id: "boss3", code: "BOSS 3", titulo: "Deploy + README + Demo", acto: "Acto 4 — App propia", xp: 100, dificultad: "boss", badge: "🏆", emoji: "🚢", unlocks: "m14" },

  { id: "m15", code: "M15", titulo: "PR a repo real", acto: "Acto 5 — Final", xp: 200, dificultad: "bossfinal", badge: "🥇", emoji: "🌟", unlocks: "boss3" },
  { id: "m16", code: "M16", titulo: "Blog post final", acto: "Acto 5 — Final", xp: 50, dificultad: "dificil", badge: "🟣", emoji: "📰", unlocks: "m15" },
];

export const totalXP = missions.reduce((s, m) => s + m.xp, 0);

export const dificultadColor = {
  tutorial: "border-zinc-500 text-zinc-300",
  facil: "border-emerald-500 text-emerald-300",
  media: "border-sky-500 text-sky-300",
  dificil: "border-fuchsia-500 text-fuchsia-300",
  boss: "border-amber-500 text-amber-300 glow",
  bossfinal: "border-yellow-400 text-yellow-200 glow-gold",
};

// Niveles de avatar según XP. Estilo evolución Pokémon.
export const avatarTiers = [
  { min: 0, label: "Huevo", emoji: "🥚" },
  { min: 50, label: "Bebé", emoji: "🐣" },
  { min: 150, label: "Junior", emoji: "🐥" },
  { min: 300, label: "Cazador", emoji: "🦅" },
  { min: 500, label: "Maestro", emoji: "🐉" },
  { min: 800, label: "Leyenda", emoji: "🔥🐉" },
];

export function getTier(xp) {
  return [...avatarTiers].reverse().find((t) => xp >= t.min);
}

export function nextTier(xp) {
  return avatarTiers.find((t) => xp < t.min);
}
