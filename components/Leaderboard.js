"use client";

import { getCompletedXP } from "@/lib/storage";

export default function Leaderboard({ state, interns, missions, activeId }) {
  const ranking = [...interns]
    .map((i) => ({ ...i, xp: getCompletedXP(state[i.id], missions) }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className="card p-5">
      <div className="text-xs text-zinc-400 uppercase tracking-wider mb-3">Leaderboard</div>
      <div className="space-y-2">
        {ranking.map((i, idx) => (
          <div
            key={i.id}
            className={`flex items-center gap-3 p-2 rounded ${
              activeId === i.id ? "bg-accent/20 ring-1 ring-accent" : ""
            }`}
          >
            <span className="text-xl w-6">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</span>
            <span className="text-2xl">{i.emoji}</span>
            <span className="flex-1 text-left font-bold">
              {i.nombre}
              {activeId === i.id && <span className="ml-2 text-xs text-accent">(vos)</span>}
            </span>
            <span className="text-accent2 font-bold">{i.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
