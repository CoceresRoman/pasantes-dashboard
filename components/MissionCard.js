"use client";

import { dificultadColor, dificultadIcon } from "@/data/missions";
import Icon from "./Icon";

export default function MissionCard({ mission, completed, unlocked, syncedPrUrl, onToggle, onClick }) {
  const lockedClass = !unlocked && !completed ? "locked" : "";
  const completedClass = completed ? "ring-2 ring-emerald-400" : "";

  return (
    <div
      className={`card p-4 ${lockedClass} ${completedClass} cursor-pointer relative`}
      onClick={() => unlocked && onClick(mission)}
    >
      {completed && (
        <div className="absolute top-2 right-2 text-emerald-400">
          <Icon name="CheckCircle2" size={22} />
        </div>
      )}
      {!unlocked && !completed && (
        <div className="absolute top-2 right-2 text-zinc-500">
          <Icon name="Lock" size={18} />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="text-accent2 mt-1">
          <Icon name={mission.icon} size={32} strokeWidth={1.6} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-zinc-400 uppercase tracking-wider">{mission.code}</div>
          <div className="font-bold text-base mb-1 truncate">{mission.titulo}</div>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className={`px-2 py-0.5 rounded border flex items-center gap-1 ${dificultadColor[mission.dificultad]}`}>
              <Icon name={dificultadIcon[mission.dificultad]} size={12} />
              {mission.dificultad}
            </span>
            {mission.xp > 0 && <span className="text-accent2 font-bold">+{mission.xp} XP</span>}
          </div>
        </div>
      </div>

      {syncedPrUrl && (
        <a
          href={syncedPrUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-300 hover:text-emerald-200"
        >
          <Icon name="GitPullRequest" size={12} /> ver PR
        </a>
      )}

      {unlocked && !syncedPrUrl && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(mission);
          }}
          className={`mt-3 w-full text-xs py-1.5 rounded transition flex items-center justify-center gap-1 ${
            completed
              ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-300"
              : "bg-accent hover:bg-violet-500 text-white"
          }`}
        >
          <Icon name={completed ? "RotateCcw" : "Check"} size={14} />
          {completed ? "Pendiente" : "Completada"}
        </button>
      )}
    </div>
  );
}
