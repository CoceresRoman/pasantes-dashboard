"use client";

import Icon from "./Icon";

export default function StreakCounter({ streak }) {
  const count = streak?.count || 0;
  const active = count > 0;
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={active ? "text-orange-400" : "text-sky-300"}>
        <Icon name={active ? "Flame" : "Snowflake"} size={44} strokeWidth={1.6} />
      </div>
      <div>
        <div className="text-xs text-zinc-400 uppercase tracking-wider">Racha</div>
        <div className="text-3xl font-bold">{count} <span className="text-sm text-zinc-400">días</span></div>
      </div>
    </div>
  );
}
