"use client";

import { getCompletedXP } from "@/lib/storage";
import Icon from "./Icon";

const RANK_ICONS = ["Crown", "Medal", "Award"];

export default function Leaderboard({ state, interns, missions, activeId }) {
  const ranking = [...interns]
    .map((i) => ({ ...i, xp: getCompletedXP(state[i.id], missions) }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className="card p-5">
      <div className="text-xs text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Icon name="Trophy" size={14} /> Leaderboard
      </div>
      <div className="space-y-2">
        {ranking.map((i, idx) => (
          <div
            key={i.id}
            className={`flex items-center gap-3 p-2 rounded ${
              activeId === i.id ? "bg-accent/20 ring-1 ring-accent" : ""
            }`}
          >
            <span className="w-6 text-gold">
              <Icon name={RANK_ICONS[idx] || "Circle"} size={20} />
            </span>
            <span style={{ color: i.color }}>
              <Icon name={i.icon} size={24} strokeWidth={1.8} />
            </span>
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
