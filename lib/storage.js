// Persistencia en localStorage. Estructura:
// {
//   [internId]: {
//     completed: { [missionId]: { date, prUrl, source: 'manual' | 'github' } },
//     streak: { lastDate, count },
//     lastSync: ISOString
//   }
// }

const KEY = "pasaporte-state-v1";
const ACTIVE_KEY = "pasaporte-active-v1";

export function loadState() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveState(state) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadActiveIntern() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_KEY);
}

export function saveActiveIntern(id) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(ACTIVE_KEY, id);
  else localStorage.removeItem(ACTIVE_KEY);
}

export function markCompleted(state, internId, missionId, opts = {}) {
  const next = { ...state };
  next[internId] = next[internId] || { completed: {}, streak: { lastDate: null, count: 0 } };
  next[internId].completed = {
    ...next[internId].completed,
    [missionId]: {
      date: opts.date || new Date().toISOString(),
      prUrl: opts.prUrl || "",
      source: opts.source || "manual",
    },
  };
  next[internId].streak = bumpStreak(next[internId].streak);
  return next;
}

export function unmarkCompleted(state, internId, missionId) {
  const next = { ...state };
  if (!next[internId]) return next;
  const { [missionId]: _, ...rest } = next[internId].completed || {};
  next[internId].completed = rest;
  return next;
}

export function applySyncedCompletions(state, internId, completions) {
  let next = { ...state };
  next[internId] = next[internId] || { completed: {}, streak: { lastDate: null, count: 0 } };
  const newOnes = [];
  for (const [missionId, data] of Object.entries(completions)) {
    if (next[internId].completed[missionId]) continue;
    next = markCompleted(next, internId, missionId, {
      date: data.mergedAt,
      prUrl: data.prUrl,
      source: "github",
    });
    newOnes.push(missionId);
  }
  next[internId].lastSync = new Date().toISOString();
  return { state: next, newOnes };
}

function bumpStreak(streak) {
  const today = new Date().toISOString().slice(0, 10);
  if (streak.lastDate === today) return streak;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const count = streak.lastDate === yesterday ? streak.count + 1 : 1;
  return { lastDate: today, count };
}

export function getCompletedXP(internState, missions) {
  if (!internState) return 0;
  return Object.keys(internState.completed || {}).reduce((sum, id) => {
    const m = missions.find((x) => x.id === id);
    return sum + (m?.xp || 0);
  }, 0);
}

export function isUnlocked(missionId, internState, missions) {
  const m = missions.find((x) => x.id === missionId);
  if (!m || m.unlocks === null) return true;
  return Boolean(internState?.completed?.[m.unlocks]);
}
