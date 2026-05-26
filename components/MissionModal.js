"use client";

export default function MissionModal({ mission, onClose }) {
  if (!mission) return null;
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
          <span className="text-6xl">{mission.emoji}</span>
          <div className="flex-1">
            <div className="text-xs text-zinc-400 uppercase">{mission.code} · {mission.acto}</div>
            <h2 className="text-2xl font-bold">{mission.titulo}</h2>
            <div className="mt-1 text-sm">
              <span className="text-accent2 font-bold">+{mission.xp} XP</span>
              <span className="ml-2">{mission.badge}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        <p className="text-zinc-300 text-sm mb-4">
          El briefing completo está en el repo del pasaporte:
        </p>
        <code className="block bg-zinc-900 p-3 rounded text-xs text-emerald-300 break-all">
          misiones/{mission.code.toLowerCase().replace(/[. ]/g, "")}-*.md
        </code>

        <div className="mt-5 text-xs text-zinc-400">
          Cuando termines y mergees el PR, volvé acá y marcá la misión como completada.
        </div>
      </div>
    </div>
  );
}
