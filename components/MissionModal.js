"use client";

import Link from "next/link";
import Icon from "./Icon";
import { dificultadIcon } from "@/data/missions";
import { tutorials } from "@/data/tutorials";

export default function MissionModal({ mission, onClose }) {
  if (!mission) return null;
  const hasTutorial = Boolean(tutorials[mission.id]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="card p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="text-accent2">
            <Icon name={mission.icon} size={56} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-zinc-400 uppercase">{mission.code} · {mission.acto}</div>
            <h2 className="text-2xl font-bold">{mission.titulo}</h2>
            <div className="mt-1 text-sm flex items-center gap-3">
              <span className="text-accent2 font-bold">+{mission.xp} XP</span>
              <span className="text-zinc-400 flex items-center gap-1">
                <Icon name={dificultadIcon[mission.dificultad]} size={14} />
                {mission.dificultad}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <Icon name="X" size={24} />
          </button>
        </div>

        {hasTutorial && (
          <Link
            href={`/tutoriales/${mission.id}`}
            className="block mb-4 p-3 rounded bg-accent/20 hover:bg-accent/30 border border-accent/40 transition"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-accent2">
                <Icon name="BookOpen" size={16} />
                Ver tutorial paso a paso
              </span>
              <Icon name="ArrowRight" size={16} className="text-accent2" />
            </div>
          </Link>
        )}

        <p className="text-zinc-300 text-sm mb-4">
          Briefing completo en el repo del pasaporte:
        </p>
        <code className="block bg-zinc-900 p-3 rounded text-xs text-emerald-300 break-all">
          misiones/{mission.code.toLowerCase().replace(/[. ]/g, "")}-*.md
        </code>

        <div className="mt-5 text-xs text-zinc-400 space-y-2">
          <p>
            Para que el dashboard la detecte, el título o body del PR debe contener{" "}
            <code className="bg-zinc-800 px-1 rounded">{mission.matchCode}</code>.
          </p>
          <p>
            Ejemplo:{" "}
            <code className="bg-zinc-800 px-1 rounded">
              feat({mission.matchCode.toLowerCase()}): {mission.titulo.toLowerCase()}
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
