"use client";

import { useEffect, useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { missions, totalXP, getTier } from "@/data/missions";
import { interns } from "@/data/interns";
import { loadState, saveState, markCompleted, unmarkCompleted, getCompletedXP, isUnlocked } from "@/lib/storage";
import XPBar from "@/components/XPBar";
import MissionCard from "@/components/MissionCard";
import Leaderboard from "@/components/Leaderboard";
import StreakCounter from "@/components/StreakCounter";
import MissionModal from "@/components/MissionModal";

export default function Home() {
  const [state, setState] = useState({});
  const [activeId, setActiveId] = useState(interns[0].id);
  const [openMission, setOpenMission] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveState(state);
  }, [state, mounted]);

  const activeIntern = interns.find((i) => i.id === activeId);
  const activeState = state[activeId];
  const xp = getCompletedXP(activeState, missions);

  const byActo = useMemo(() => {
    const groups = {};
    for (const m of missions) {
      groups[m.acto] = groups[m.acto] || [];
      groups[m.acto].push(m);
    }
    return groups;
  }, []);

  function handleToggle(mission) {
    const wasCompleted = Boolean(activeState?.completed?.[mission.id]);
    const prevTier = getTier(xp);
    const next = wasCompleted
      ? unmarkCompleted(state, activeId, mission.id)
      : markCompleted(state, activeId, mission.id);
    setState(next);

    if (!wasCompleted) {
      const newXP = getCompletedXP(next[activeId], missions);
      const newTier = getTier(newXP);
      celebrate(mission.dificultad === "boss" || mission.dificultad === "bossfinal");
      if (newTier.min > prevTier.min) {
        setTimeout(() => celebrate(true), 600);
      }
    }
  }

  function celebrate(big) {
    confetti({
      particleCount: big ? 200 : 80,
      spread: big ? 100 : 70,
      origin: { y: 0.6 },
      colors: ["#7c3aed", "#22d3ee", "#fbbf24", "#34d399"],
    });
  }

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-accent">{activeIntern.emoji}</span> Pasaporte: {activeIntern.nombre}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {Object.keys(activeState?.completed || {}).length} / {missions.length} misiones completadas
          </p>
        </div>
        <div className="text-right text-xs text-zinc-500">
          v0.1 · datos en localStorage
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <XPBar xp={xp} totalXP={totalXP} />
        </div>
        <StreakCounter streak={activeState?.streak} />
      </div>

      <Leaderboard
        state={state}
        interns={interns}
        missions={missions}
        activeId={activeId}
        onSelect={setActiveId}
      />

      <div className="space-y-8">
        {Object.entries(byActo).map(([acto, ms]) => (
          <section key={acto}>
            <h2 className="text-xl font-bold mb-3 text-accent2">{acto}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ms.map((m) => (
                <MissionCard
                  key={m.id}
                  mission={m}
                  completed={Boolean(activeState?.completed?.[m.id])}
                  unlocked={isUnlocked(m.id, activeState, missions)}
                  onToggle={handleToggle}
                  onClick={setOpenMission}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <MissionModal mission={openMission} onClose={() => setOpenMission(null)} />

      <footer className="text-center text-xs text-zinc-600 pt-8">
        Hecho con Next.js · datos locales · ningún pasante fue lastimado
      </footer>
    </div>
  );
}
