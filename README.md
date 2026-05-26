# 🎮 Pasantes Dashboard

Dashboard gamificado del pasaporte de pasantes. Cards de misiones, XP bar animada con evolución de avatar, leaderboard live, racha diaria, confetti al completar, modal con detalle.

## Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- canvas-confetti
- localStorage para persistencia (sin backend)

## Correr local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Configurar pasantes

Editar `data/interns.js`:

```js
export const interns = [
  { id: "juan", nombre: "Juan", github: "juanperez", color: "#7c3aed", emoji: "🦊" },
  { id: "maria", nombre: "María", github: "mariag", color: "#22d3ee", emoji: "🦉" },
];
```

## Mecánicas

- **Misiones bloqueadas**: cada misión requiere completar la anterior. Las bloqueadas se ven grises con 🔒.
- **XP + evolución**: avatar evoluciona cada cierto XP (Huevo → Bebé → Junior → Cazador → Maestro → Leyenda).
- **Confetti**: al completar misión normal, lluvia normal. En boss o evolución de tier, lluvia grande.
- **Streak**: cuenta días consecutivos completando al menos 1 misión.
- **Leaderboard**: compara los pasantes, click cambia el pasaporte activo.
- **Persistencia**: todo en `localStorage`, key `pasaporte-state-v1`. Para resetear: DevTools → Application → Local Storage → borrar.

## Deploy a Vercel

```bash
npx vercel
```

O importar el repo en [vercel.com/new](https://vercel.com/new).

## Próximas mejoras (issues abiertos)

- [ ] Auto-detección de PR mergeado vía GitHub API (token en env)
- [ ] Bot de Discord que avise misión completada
- [ ] Página `/historia` con timeline cronológico
- [ ] Export del pasaporte como PNG/PDF para CV
- [ ] Modo "comparar" lado a lado entre los 2 pasantes
- [ ] Sonidos opcionales (level up, badge ganado)

## Estructura

```
app/
├── layout.js          # shell + globals
├── page.js            # dashboard principal
└── globals.css        # Tailwind + custom
components/
├── XPBar.js           # barra + avatar + tier
├── MissionCard.js     # card individual con bloqueo
├── Leaderboard.js     # ranking entre pasantes
├── StreakCounter.js   # racha diaria
└── MissionModal.js    # detalle al click
data/
├── missions.js        # las 21 misiones + tiers
└── interns.js         # config de pasantes
lib/
└── storage.js         # localStorage helpers
```
