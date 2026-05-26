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

## Auto-sync con GitHub

Si configurás `GITHUB_TOKEN` en variables de entorno (Vercel → Settings → Environment Variables), el botón "Sincronizar con GitHub" del dashboard:

1. Llama a `/api/sync?intern=<id>`
2. El server consulta GitHub Search API por PRs mergeados del username del pasante
3. Matchea el `matchCode` de cada misión contra el título y body del PR
4. Marca como completadas las que matchearon (con link al PR)

**Convención de PR**: el título o body del PR debe contener el código de la misión como palabra completa.

Ejemplos válidos:
- `feat(m1): saludo dinamico funcionando`
- `feat: implementar M3 lista de tareas`
- `fix(boss2): corregir layout de pokedex`

El token necesita scope `public_repo` (o `repo` si los repos son privados).

## Próximas mejoras

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
