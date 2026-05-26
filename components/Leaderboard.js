"use client";

import { getCompletedXP } from "@/lib/storage";

export default function Leaderboard({ state, interns, missions, activeId, onSelect }) {
  const ranking = [...interns]
    .map((i) => ({ ...i, xp: getCompletedXP(state[i.id], missions) }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className="card p-5">
      <div className="text-xs text-zinc-400 uppercase tracking-wider mb-3">Leaderboard</div>
      <div className="space-y-2">
        {ranking.map((i, idx) => (
          <button
            key={i.id}
            onClick={() => onSelect(i.id)}
            className={`w-full flex items-center gap-3 p-2 rounded transition ${
              activeId === i.id ? "bg-accent/20 ring-1 ring-accent" : "hover:bg-zinc-800/50"
            }`}
          >
            <span className="text-xl w-6">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</span>
            <span className="text-2xl">{i.emoji}</span>
            <span className="flex-1 text-left font-bold">{i.nombre}</span>
            <span className="text-accent2 font-bold">{i.xp} XP</span>
          </button>
        ))}
      </div>
    </div>
  );
}
