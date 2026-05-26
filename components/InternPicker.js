"use client";

export default function InternPicker({ interns, onPick }) {
  return (
    <div className="fixed inset-0 bg-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">¿Quién sos?</h1>
          <p className="text-zinc-400">Elegí tu pasaporte. Tu progreso queda guardado en este browser.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {interns.map((i) => (
            <button
              key={i.id}
              onClick={() => onPick(i.id)}
              className="card p-8 hover:scale-105 transition group"
              style={{ borderColor: i.color }}
            >
              <div className="text-7xl mb-3 group-hover:animate-bounce-slow">{i.emoji}</div>
              <div className="text-2xl font-bold" style={{ color: i.color }}>{i.nombre}</div>
              <div className="text-xs text-zinc-500 mt-2">Soy yo →</div>
            </button>
          ))}
        </div>

        <p className="text-xs text-zinc-600">
          Si te equivocaste, podés cambiar después desde el header.
        </p>
      </div>
    </div>
  );
}
