"use client";

import Link from "next/link";
import { missions, dificultadColor, dificultadIcon } from "@/data/missions";
import { tutorials } from "@/data/tutorials";
import Icon from "@/components/Icon";

export default function TutorialesPage() {
  const byActo = {};
  for (const m of missions) {
    if (!tutorials[m.id]) continue;
    byActo[m.acto] = byActo[m.acto] || [];
    byActo[m.acto].push(m);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Icon name="BookOpen" size={32} className="text-accent" /> Tutoriales
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Guía paso a paso de cada misión. Si te trabás, esto es el primer lugar para mirar.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-zinc-400 hover:text-accent2"
        >
          <Icon name="ArrowLeft" size={16} /> Dashboard
        </Link>
      </header>

      <div className="space-y-8">
        {Object.entries(byActo).map(([acto, ms]) => (
          <section key={acto}>
            <h2 className="text-xl font-bold mb-3 text-accent2">{acto}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ms.map((m) => {
                const t = tutorials[m.id];
                return (
                  <Link
                    key={m.id}
                    href={`/tutoriales/${m.id}`}
                    className="card p-4 block"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-accent2 mt-1">
                        <Icon name={m.icon} size={28} strokeWidth={1.6} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-zinc-400 uppercase tracking-wider">{m.code}</div>
                        <div className="font-bold text-base truncate">{m.titulo}</div>
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className={`px-2 py-0.5 rounded border flex items-center gap-1 ${dificultadColor[m.dificultad]}`}>
                            <Icon name={dificultadIcon[m.dificultad]} size={12} />
                            {m.dificultad}
                          </span>
                          <span className="text-zinc-500">{t.steps.length} pasos</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
