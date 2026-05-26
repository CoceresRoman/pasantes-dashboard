"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { missions, dificultadColor, dificultadIcon } from "@/data/missions";
import { tutorials } from "@/data/tutorials";
import Icon from "@/components/Icon";

export default function TutorialDetail() {
  const params = useParams();
  const mission = missions.find((m) => m.id === params.id);
  const tutorial = tutorials[params.id];

  if (!mission || !tutorial) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Tutorial no encontrado</h1>
        <Link href="/tutoriales" className="text-accent2 underline">
          Volver a tutoriales
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/tutoriales"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent2"
      >
        <Icon name="ArrowLeft" size={16} /> Tutoriales
      </Link>

      <header className="card p-6">
        <div className="flex items-start gap-4">
          <div className="text-accent2">
            <Icon name={mission.icon} size={56} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-zinc-400 uppercase tracking-wider">
              {mission.code} · {mission.acto}
            </div>
            <h1 className="text-3xl font-bold">{mission.titulo}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm flex-wrap">
              {mission.xp > 0 && (
                <span className="text-accent2 font-bold">+{mission.xp} XP</span>
              )}
              <span className={`px-2 py-0.5 rounded border flex items-center gap-1 text-xs ${dificultadColor[mission.dificultad]}`}>
                <Icon name={dificultadIcon[mission.dificultad]} size={12} />
                {mission.dificultad}
              </span>
              <span className="text-zinc-500 text-xs flex items-center gap-1">
                <Icon name="GitPullRequest" size={12} />
                Código PR: <code className="bg-zinc-800 px-1 rounded">{mission.matchCode}</code>
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-zinc-300 italic">{tutorial.intro}</p>
      </header>

      <section>
        <h2 className="text-xl font-bold mb-4 text-accent2 flex items-center gap-2">
          <Icon name="ListOrdered" size={20} /> Pasos
        </h2>
        <ol className="space-y-4">
          {tutorial.steps.map((step, idx) => (
            <li key={idx} className="card p-5">
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              {step.body && (
                <p className="text-zinc-300 text-sm mb-3 whitespace-pre-line">{step.body}</p>
              )}
              {step.code && (
                <pre className="bg-zinc-900 p-3 rounded text-xs text-emerald-300 overflow-x-auto mb-3">
                  <code>{step.code}</code>
                </pre>
              )}
              {step.tip && (
                <div className="flex items-start gap-2 text-xs bg-amber-500/10 border border-amber-500/30 rounded p-2 text-amber-200">
                  <Icon name="Lightbulb" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{step.tip}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      {tutorial.promptIA && (
        <section className="card p-5 border-violet-500/40">
          <h3 className="font-bold text-base mb-2 text-accent flex items-center gap-2">
            <Icon name="Sparkles" size={18} /> Cómo usar AI acá
          </h3>
          <p className="text-sm text-zinc-300 whitespace-pre-line">{tutorial.promptIA}</p>
        </section>
      )}

      {tutorial.recursos?.length > 0 && (
        <section className="card p-5">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            <Icon name="Link" size={18} /> Recursos
          </h3>
          <ul className="space-y-1">
            {tutorial.recursos.map((r, idx) => (
              <li key={idx}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent2 hover:underline text-sm flex items-center gap-1"
                >
                  <Icon name="ExternalLink" size={12} />
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card p-5 bg-emerald-500/5 border-emerald-500/30">
        <h3 className="font-bold text-base mb-2 flex items-center gap-2 text-emerald-300">
          <Icon name="CheckCircle2" size={18} /> Antes de mergear
        </h3>
        <ul className="text-sm text-zinc-300 space-y-1">
          <li className="flex items-center gap-2"><Icon name="Check" size={14} className="text-emerald-400" /> El título o body del PR contiene <code className="bg-zinc-800 px-1 rounded">{mission.matchCode}</code></li>
          <li className="flex items-center gap-2"><Icon name="Check" size={14} className="text-emerald-400" /> Conventional commits en cada commit del branch</li>
          <li className="flex items-center gap-2"><Icon name="Check" size={14} className="text-emerald-400" /> Probaste el caso feliz y al menos 1 edge case</li>
          <li className="flex items-center gap-2"><Icon name="Check" size={14} className="text-emerald-400" /> Si usaste AI, entendés todo lo que copiaste</li>
        </ul>
      </section>
    </div>
  );
}
