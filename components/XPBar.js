"use client";

import { getTier, nextTier } from "@/data/missions";
import Icon from "./Icon";

export default function XPBar({ xp, totalXP }) {
  const tier = getTier(xp);
  const next = nextTier(xp);
  const pct = Math.min(100, (xp / totalXP) * 100);
  const tierPct = next ? Math.min(100, ((xp - tier.min) / (next.min - tier.min)) * 100) : 100;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="text-accent2 animate-bounce-slow">
            <Icon name={tier.icon} size={40} strokeWidth={1.6} />
          </div>
          <div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Nivel</div>
            <div className="text-lg font-bold">{tier.label}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-400 uppercase tracking-wider">XP</div>
          <div className="text-2xl font-bold text-accent2">{xp}<span className="text-zinc-500 text-sm"> / {totalXP}</span></div>
        </div>
      </div>

      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div className="xp-bar-fill h-full rounded-full" style={{ width: `${pct}%` }} />
      </div>

      {next ? (
        <div className="mt-2 text-xs text-zinc-400 flex justify-between items-center">
          <span className="flex items-center gap-1">
            Próximo: <Icon name={next.icon} size={14} /> {next.label}
          </span>
          <span>{next.min - xp} XP para evolucionar ({Math.round(tierPct)}%)</span>
        </div>
      ) : (
        <div className="mt-2 text-xs text-gold">¡Nivel máximo alcanzado!</div>
      )}
    </div>
  );
}
