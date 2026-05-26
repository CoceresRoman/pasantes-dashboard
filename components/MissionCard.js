"use client";

import { dificultadColor } from "@/data/missions";

export default function MissionCard({ mission, completed, unlocked, onToggle, onClick }) {
  const lockedClass = !unlocked && !completed ? "locked" : "";
  const completedClass = completed ? "ring-2 ring-emerald-400" : "";

  return (
    <div
      className={`card p-4 ${lockedClass} ${completedClass} cursor-pointer relative`}
      onClick={() => unlocked && onClick(mission)}
    >
      {completed && (
        <div className="absolute top-2 right-2 text-emerald-400 text-2xl">✓</div>
      )}
      {!unlocked && !completed && (
        <div className="absolute top-2 right-2 text-zinc-500 text-xl">🔒</div>
      )}

      <div className="flex items-start gap-3">
        <div className="text-4xl">{mission.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-zinc-400 uppercase tracking-wider">{mission.code}</div>
          <div className="font-bold text-base mb-1 truncate">{mission.titulo}</div>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className={`px-2 py-0.5 rounded border ${dificultadColor[mission.dificultad]}`}>
              {mission.dificultad}
            </span>
            {mission.xp > 0 && <span className="text-accent2 font-bold">+{mission.xp} XP</span>}
            <span>{mission.badge}</span>
          </div>
        </div>
      </div>

      {unlocked && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(mission);
          }}
          className={`mt-3 w-full text-xs py-1.5 rounded transition ${
            completed
              ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-300"
              : "bg-accent hover:bg-violet-500 text-white"
          }`}
        >
          {completed ? "Marcar como pendiente" : "Marcar completada"}
        </button>
      )}
    </div>
  );
}
