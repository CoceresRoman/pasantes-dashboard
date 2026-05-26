// Tutorial paso a paso por misión. Cada step puede tener `body`, `code`, `tip`.
// `promptIA`: ejemplo de prompt que podrian darle a AI (v0/Claude/Cursor) para que no copien a ciegas.
// `recursos`: links externos utiles.

export const tutorials = {
  t0a: {
    intro: "Tu primer deploy. Pasás de 'tengo un archivo HTML' a 'tengo una URL que cualquiera abre'.",
    steps: [
      {
        title: "1. Crear cuenta de Vercel",
        body: "Andá a vercel.com → 'Sign Up' → 'Continue with GitHub'. Aceptá permisos. No uses email/password.",
      },
      {
        title: "2. Crear repo en GitHub",
        body: "github.com/new → nombre `mi-primera-deploy` → Public ✅ → 'Add a README' ✅ → Create repository.",
      },
      {
        title: "3. Crear index.html desde la web",
        body: "En el repo → 'Add file' → 'Create new file' → nombre `index.html`.",
        code: `<!DOCTYPE html>
<html>
  <head><title>Mi primera deploy</title></head>
  <body><h1>Hola Vercel 👋</h1></body>
</html>`,
        tip: "Commit message: `feat: agregar landing inicial` — directo a main esta vez.",
      },
      {
        title: "4. Importar a Vercel",
        body: "Vercel Dashboard → 'Add New' → 'Project' → elegí el repo → 'Deploy' (no toques nada más).",
      },
      {
        title: "5. Probar redeploy automático",
        body: "Editá index.html desde GitHub, cambiá el texto, commiteá. Volvé a Vercel: vas a ver un build nuevo. Refrescá la URL → cambió solo.",
      },
      {
        title: "6. Probar preview deployments",
        body: "Creá branch `cambio-color`, agregá un `<style>body{background:lightblue}</style>`, abrí PR. Vercel comenta el PR con preview URL. Mergeá → producción cambia.",
        tip: "Esto es magia. Cada PR tiene su URL temporal para probar sin afectar producción.",
      },
    ],
    promptIA: "No usa AI. Es manual a propósito.",
    recursos: [
      { title: "Docs de Vercel (Getting Started)", url: "https://vercel.com/docs/getting-started-with-vercel" },
    ],
  },

  t0b: {
    intro: "Aprender a escribir mensajes de commit que se entiendan en 6 meses, no solo hoy.",
    steps: [
      { title: "1. Leer cheatsheet", body: "Leé entero `docs/conventional-commits.md` del repo del pasaporte. Especial atención a la sección 'Convención para el Dashboard'." },
      { title: "2. Identificar tipos", body: "Pedile al game master el repo `commits-practica`. Cloná. Hay 5 cambios sin commitear: identificá cuál es feat, fix, style, refactor, docs." },
      { title: "3. Hacer 5 commits separados", body: "Uno por cambio. Mensaje correcto. No agrupes." },
      { title: "4. Verificar log", code: "git log --oneline", body: "Debe verse limpio, cada línea descriptiva." },
      { title: "5. Mini-quiz", body: "Hacé el quiz de 10 mensajes en `misiones/tutorial-0B-conventional-commits.md`. Mostrale las respuestas al game master." },
    ],
    promptIA: "No usa AI. La idea es interiorizar la convención.",
    recursos: [
      { title: "Conventional Commits spec", url: "https://www.conventionalcommits.org/es/v1.0.0/" },
    ],
  },

  m1: {
    intro: "Tu primera misión. Input + botón + saludo dinámico. Vas a tocar las 3 patas del browser.",
    steps: [
      { title: "1. Repo nuevo + branch", code: "git checkout -b m1-saludo", body: "Creá repo nuevo en GitHub o reutilizá uno. Branch dedicado para la misión." },
      { title: "2. Estructura HTML mínima", body: "Un input, un button, un div vacío para el resultado.", code: `<input id="nombre" placeholder="Tu nombre" />
<button id="saludar">Saludar</button>
<div id="resultado"></div>` },
      { title: "3. JS para escuchar el click", body: "Agarrar los elementos y agregar listener.", code: `const input = document.querySelector('#nombre');
const btn = document.querySelector('#saludar');
const out = document.querySelector('#resultado');

btn.addEventListener('click', () => {
  if (input.value === '') {
    out.textContent = 'Por favor escribí tu nombre';
    return;
  }
  out.textContent = 'Hola, ' + input.value + '!';
});` },
      { title: "4. CSS básico", body: "No dejes Times New Roman por defecto. Centrá, agregá padding, color." },
      { title: "5. Deploy a Vercel", body: "Pusheá branch → abrí PR a main → mergeá → Vercel deploya solo." },
      { title: "6. PR con título correcto", body: "Título: `feat(m1): saludo dinamico funcionando`. En description: explicá addEventListener, input.value vs textContent, por qué el saludo no persiste al refrescar." },
    ],
    promptIA: "Buen prompt: 'Necesito una página HTML con un input para nombre, un botón, y un div donde aparezca \"Hola {nombre}\" al hacer click. Explicame línea por línea qué hace cada parte del JavaScript.' Mal prompt: 'hacé la misión M1 del pasaporte'.",
    recursos: [
      { title: "MDN addEventListener", url: "https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener" },
    ],
  },

  m2: {
    intro: "Form con 3 inputs, math básica, manejo de errores. Es donde 'else' deja de ser teoría.",
    steps: [
      { title: "1. Branch nuevo", code: "git checkout -b m2-propina" },
      { title: "2. HTML del formulario", body: "Inputs numéricos: monto, personas, propina (default 10). Botón calcular. Div resultado." },
      { title: "3. Lectura y parseo", body: "`parseFloat(input.value)` para convertir. Sin esto, `'10' + '5'` te devuelve `'105'` (string)." },
      { title: "4. Validaciones", body: "Si monto ≤ 0 o personas < 1 → mostrar mensaje, no calcular.", code: `if (monto <= 0 || personas < 1) {
  resultado.textContent = 'Datos invalidos';
  return;
}` },
      { title: "5. Math + render", body: "Calcular total, propina, por persona. `.toFixed(2)` para mostrar 2 decimales." },
      { title: "6. Deploy + PR", body: "Mergeá. Título: `feat(m2): calculadora de propina con validacion`." },
    ],
    promptIA: "'Tengo un form de calculadora de propina. ¿Cómo valido que los números sean positivos antes de calcular? Mostrame ejemplos de qué pasa con parseFloat cuando el input está vacío.'",
    recursos: [
      { title: "MDN parseFloat", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/parseFloat" },
    ],
  },

  m3: {
    intro: "Todo list clásica. Tu primer encuentro real con arrays y el patrón 'render desde data'.",
    steps: [
      { title: "1. Branch", code: "git checkout -b m3-todo" },
      { title: "2. Estado en memoria", body: "Un array global de tareas.", code: "let tareas = []; // cada tarea: { texto, completada }" },
      { title: "3. Función render()", body: "Limpia el contenedor y lo vuelve a dibujar leyendo del array. Llamala cada vez que cambies el array.", code: `function render() {
  lista.innerHTML = '';
  for (const t of tareas) {
    const li = document.createElement('li');
    li.textContent = t.texto;
    if (t.completada) li.style.textDecoration = 'line-through';
    lista.appendChild(li);
  }
}` },
      { title: "4. Agregar tarea", body: "Push al array + llamar render(). Limpiar input. Validar que no esté vacío." },
      { title: "5. Borrar y completar", body: "Botón borrar: `tareas = tareas.filter(t => t !== tareaABorrar)`. Toggle completada: `t.completada = !t.completada`." },
      { title: "6. Contador", body: "`tareas.filter(t => t.completada).length`. Mostrarlo abajo." },
      { title: "7. PR", body: "Título: `feat(m3): lista de tareas con borrar y completar`." },
    ],
    promptIA: "'¿Por qué render() limpia todo el contenedor y lo vuelve a dibujar en lugar de solo agregar el item nuevo? ¿No es ineficiente?' (spoiler: React hace esto mismo, vas a entender por qué)",
    recursos: [
      { title: "MDN Array methods", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array" },
    ],
  },

  boss1: {
    intro: "Boss del Acto 1. Combinás todo: arrays, eventos, CSS posicionamiento, canvas. Tu primer entregable 'pulido'.",
    steps: [
      { title: "1. Branch", code: "git checkout -b boss1-memes" },
      { title: "2. Estructura", body: "Input URL imagen + 2 inputs (top/bottom) + preview area + botón descargar." },
      { title: "3. Imagen + texto encima", body: "`<img src=...>` con `position: relative` en wrapper, textos con `position: absolute`. CSS para texto blanco con borde negro.", code: `text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
color: white;
font-family: Impact, sans-serif;` },
      { title: "4. Update en vivo", body: "Listener `input` (NO `change`) para actualizar mientras tipean.", code: `inputTop.addEventListener('input', e => textoTop.textContent = e.target.value);` },
      { title: "5. Plantillas precargadas", body: "Array de `{nombre, url}`, .map para botones, click setea la URL en el input." },
      { title: "6. Botón descargar", body: "Opción simple: `html2canvas` (lib) o nativa con canvas. Para html2canvas: `npm install html2canvas` o CDN." },
      { title: "7. Mobile-first", body: "Probar en celular real. Si no anda, ajustar media queries." },
      { title: "8. Deploy + PR", body: "Título: `feat(boss1): generador de memes con descarga y plantillas`." },
    ],
    promptIA: "'¿Cuál es la diferencia entre los eventos `input` y `change` en HTML? Necesito que un texto se actualice mientras el usuario tipea, no cuando termina.'",
    recursos: [
      { title: "html2canvas", url: "https://html2canvas.hertzen.com/" },
    ],
  },

  m4: {
    intro: "Bienvenido a Next.js. Hasta ahora HTML suelto, ahora un framework de verdad.",
    steps: [
      { title: "1. Crear proyecto", code: "npx create-next-app@latest mi-app", body: "Aceptá defaults excepto: TypeScript (a tu gusto), App Router → Yes, Tailwind → Yes recomendado." },
      { title: "2. Correr local", code: "cd mi-app && npm run dev", body: "Abrir localhost:3000. Vas a ver la home default." },
      { title: "3. Branch + repo en GitHub", body: "Pusheá a un repo nuevo `m4-hola-next`." },
      { title: "4. Editar home", body: "`app/page.js` → reemplazá todo por tu propio contenido. Saludo + tu nombre." },
      { title: "5. Crear /about", body: "Carpeta nueva `app/about/`, archivo `page.js`. La URL `/about` ya existe.", code: `export default function About() {
  return <h1>Sobre mi</h1>;
}` },
      { title: "6. Componente Header", body: "Carpeta `components/Header.js`. Usá `next/link`.", code: `import Link from 'next/link';
export default function Header() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}` },
      { title: "7. Usar Header en layout", body: "`app/layout.js` → importar Header → ponerlo arriba de `{children}`." },
      { title: "8. Deploy + PR", body: "Vercel detecta Next.js solo. Título PR: `feat(m4): hola next con about y header`." },
    ],
    promptIA: "'Explicame qué diferencia hay entre `<a href>` y `<Link>` de Next. ¿Por qué Link es mejor para navegación interna?'",
    recursos: [
      { title: "Next.js docs (App Router)", url: "https://nextjs.org/docs/app" },
    ],
  },

  m5: {
    intro: "Tu primer useState. THE hook de React. Acá empiezan a hacer click muchas cosas.",
    steps: [
      { title: "1. Branch", code: "git checkout -b m5-counter" },
      { title: "2. Componente Counter", body: "Archivo `components/Counter.js` con `'use client'` arriba (es interactivo).", code: `'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}` },
      { title: "3. Reset + límite máximo", body: "Otro useState para `max`. Input numérico que lo setea. Botón reset = `setCount(0)`." },
      { title: "4. Deshabilitar botones", code: `<button disabled={count === 0}>-</button>
<button disabled={count >= max}>+</button>`, body: "Cuando llega al límite o al mínimo." },
      { title: "5. Mensaje al límite", body: "Si `count === max`: mostrar 'Llegaste al límite' arriba." },
      { title: "6. Sumar de a 10", body: "Botón extra. Cuidado de no pasarse del max: `setCount(Math.min(count + 10, max))`." },
      { title: "7. PR", body: "Título: `feat(m5): contador con limite y reset`." },
    ],
    promptIA: "'¿Cuándo conviene usar `setCount(c => c + 1)` en lugar de `setCount(count + 1)` en React? Dame un ejemplo donde el segundo falla.'",
    recursos: [
      { title: "React useState docs", url: "https://es.react.dev/reference/react/useState" },
    ],
  },

  m6: {
    intro: "Primera vez que tu app habla con Internet. Async + loading + errores: combo del mundo real.",
    steps: [
      { title: "1. Branch", code: "git checkout -b m6-pokemon" },
      { title: "2. Componente con 3 estados", code: `const [pokemon, setPokemon] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);` },
      { title: "3. Input + botón buscar", body: "Input controlado con su propio useState. Botón dispara `buscar()`." },
      { title: "4. Función buscar (async)", code: `async function buscar() {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${nombre.toLowerCase()}\`);
    if (!res.ok) throw new Error('No encontrado');
    const data = await res.json();
    setPokemon(data);
  } catch (e) {
    setError(e.message);
    setPokemon(null);
  } finally {
    setLoading(false);
  }
}` },
      { title: "5. Render condicional", body: "Si loading → 'Cargando...'. Si error → mostrar mensaje. Si pokemon → mostrar imagen, tipos, stats." },
      { title: "6. Datos a mostrar", body: "`pokemon.sprites.front_default`, `pokemon.types.map(t => t.type.name)`, `pokemon.stats` (array de {base_stat, stat:{name}})." },
      { title: "7. PR", body: "Título: `feat(m6): fetch pokemon con loading y errores`." },
    ],
    promptIA: "'Tengo un fetch a una API. ¿Por qué necesito 3 estados (data, loading, error) y no solo uno? ¿Qué pasa si la API tarda 10 segundos en responder?'",
    recursos: [
      { title: "PokeAPI", url: "https://pokeapi.co/" },
      { title: "MDN Fetch", url: "https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch" },
    ],
  },

  m7: {
    intro: "Patrón que vas a usar mil veces. Input arriba que filtra lista abajo. Sin querer aprendés 'lifting state'.",
    steps: [
      { title: "1. Branch", code: "git checkout -b m7-filter" },
      { title: "2. Data hardcoded", body: "Array de ≥20 objetos `{titulo, año, genero}` en un archivo `data/peliculas.js` (o lo que elijas)." },
      { title: "3. Componente padre con estado", code: `const [query, setQuery] = useState('');
const [genero, setGenero] = useState('todos');` },
      { title: "4. Componente <SearchBar />", body: "Recibe `query` y `setQuery` como props. NO tiene su propio useState para query.", code: `function SearchBar({ query, setQuery }) {
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}` },
      { title: "5. Componente <List />", body: "Recibe el array filtrado como prop. Hace .map para renderizar." },
      { title: "6. Filtrado en el padre", code: `const filtradas = peliculas.filter(p =>
  p.titulo.toLowerCase().includes(query.toLowerCase()) &&
  (genero === 'todos' || p.genero === genero)
);` },
      { title: "7. Dropdown género + contador", body: "Mostrar '5 resultados' o 'No se encontró nada'." },
      { title: "8. PR", body: "Título: `feat(m7): lista filtrable con busqueda y genero`." },
    ],
    promptIA: "'¿Por qué el estado de la búsqueda vive en el componente padre y no en SearchBar? ¿Qué es lifting state up en React?'",
    recursos: [
      { title: "React: Sharing State Between Components", url: "https://es.react.dev/learn/sharing-state-between-components" },
    ],
  },

  boss2: {
    intro: "Boss del Acto 2. Junta M6 + M7 en una app que se parece a algo de producción. Routing dinámico, fetch encadenado, grid responsive.",
    steps: [
      { title: "1. Branch", code: "git checkout -b boss2-pokedex" },
      { title: "2. Home con fetch inicial", body: "Al cargar, fetch a `https://pokeapi.co/api/v2/pokemon?limit=151`. Devuelve array con name y url." },
      { title: "3. Grid responsive", body: "Tailwind: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`. Cada card es un Link." },
      { title: "4. Sprite + número", body: "El ID se saca de la url o del index. Sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`." },
      { title: "5. Búsqueda + filtro tipo", body: "useState query, useState tipo. Filter del array antes de renderizar. Pero para tipo necesitas fetch a `/api/v2/type/{tipo}` o filtrar por data del detalle." },
      { title: "6. Página detalle", body: "Crear `app/pokemon/[id]/page.js`. Recibe `params.id`. Hace fetch a `/api/v2/pokemon/{id}` para detalle completo." },
      { title: "7. Stats con barras", code: `<div style={{width: \`\${stat.base_stat / 2}%\`, background: 'cyan'}} />`, body: "Una barra por stat." },
      { title: "8. Colores de tipo", body: "Objeto map `{fire: '#F08030', water: '#6890F0', ...}`. Aplicar al badge de tipo." },
      { title: "9. Loading + Volver", body: "Loading state en ambas páginas. Link Volver en detalle." },
      { title: "10. Deploy + PR", body: "Título: `feat(boss2): mini pokedex con busqueda filtro y detalle`." },
    ],
    promptIA: "'En Next.js App Router, ¿cómo creo una ruta dinámica `/pokemon/[id]` y leo el id en el componente? ¿Cómo hago fetch del lado del servidor vs cliente?'",
    recursos: [
      { title: "Next.js dynamic routes", url: "https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes" },
    ],
  },

  m8: {
    intro: "Cambio de chip: leer código ajeno y arreglarlo. 70% del trabajo real es esto.",
    steps: [
      { title: "1. Recibir repo", body: "Game master te asigna repo `bug-hunt-{tu-nombre}`. Cloná local." },
      { title: "2. Correr primero", body: "`npm install && npm run dev`. Probá la app antes de leer código. ¿Qué hace? ¿Qué se ve raro?" },
      { title: "3. Reproducir cada bug", body: "Si no podés reproducir, no es bug. Anotá pasos exactos para reproducir cada uno." },
      { title: "4. Un branch por bug", code: "git checkout -b fix/bug-1-resultado-incorrecto", body: "Nunca agrupes bugs distintos." },
      { title: "5. Cambio mínimo", body: "Solo lo necesario para arreglar el bug. NO refactorees al pasar. NO arregles otros bugs en el mismo PR." },
      { title: "6. Conventional commit", body: "Mensaje: `fix(scope): descripcion del fix`. Ejemplo: `fix(carrito): corregir calculo de total cuando hay descuentos`." },
      { title: "7. PR con reproducción", body: "Description: pasos para reproducir, qué esperabas vs qué pasaba, por qué tu cambio lo arregla." },
      { title: "8. Repetir x5", body: "5 bugs = 5 PRs. Mergealos uno por vez." },
    ],
    promptIA: "Acá NO uses AI para encontrar bugs. Es ejercicio de leer código. Sí podés usarla después para validar tu fix: 'Este código tenía un bug donde X. Lo cambié así Y. ¿Mi fix es correcto? ¿Hay edge cases que no consideré?'",
    recursos: [
      { title: "git blame docs", url: "https://git-scm.com/docs/git-blame" },
    ],
  },

  m9: {
    intro: "Te toca ser reviewer. Más difícil de lo que parece. Dar feedback útil sin ser pesado es habilidad de senior.",
    steps: [
      { title: "1. Cada uno hace su PR", body: "Tomá tu Boss 2 (Pokédex). Branch nuevo con una mejora chica (feature, estilo, lo que sea). PR a main." },
      { title: "2. Review del otro pasante", body: "El otro abre tu PR en GitHub → 'Files changed' → lee el diff." },
      { title: "3. Dejar comentarios en líneas específicas", body: "Click en el `+` al lado del número de línea para comentar inline. Mínimo 3 comentarios." },
      { title: "4. Mezclar tipos de comentarios", body: "Al menos 1 pregunta ('¿por qué hiciste esto así?'), 1 sugerencia ('¿probaste con .map en lugar de for?')." },
      { title: "5. Evitar comentarios genéricos", body: "❌ 'está mal'. ✅ 'Este componente tiene 3 responsabilidades, ¿lo dividirías?'. ❌ 'no me gusta'. ✅ '¿Qué pasa si la API devuelve array vacío acá?'." },
      { title: "6. Autor responde", body: "Cada comentario se responde: con cambio (push commit nuevo al branch) o con explicación de por qué no." },
      { title: "7. Aprobar y mergear", body: "Una vez resueltos, reviewer da 'Approve'. Autor mergea. Mismo flow para el segundo PR." },
      { title: "8. Reflexión", body: "En el PR mergeado, agregar sección 'Lecciones aprendidas': qué comentario te hizo cambiar de opinión, qué te costó como reviewer." },
    ],
    promptIA: "'Estoy haciendo code review en un PR. ¿Qué tipo de cosas debería buscar primero? ¿Cómo doy feedback constructivo sin sonar agresivo?'",
    recursos: [
      { title: "Google: How to Write Code Review Comments", url: "https://google.github.io/eng-practices/review/reviewer/comments.html" },
    ],
  },

  m10: {
    intro: "Refactor = cambiar cómo está escrito sin cambiar lo que hace. Suena fácil. No lo es. Regla #1: si cambió comportamiento, ya no es refactor.",
    steps: [
      { title: "1. Branch del M7", code: "git checkout -b m10-refactor", body: "Trabajás sobre el código de M7 (lista filtrable)." },
      { title: "2. Snapshot del comportamiento actual", body: "Antes de tocar: probá la app y grabá un video/screenshots de cómo se ve y se comporta. Vas a usarlo para comparar después." },
      { title: "3. Extraer 2 componentes", body: "Ejemplo: `<ListItem />` para cada fila, `<FilterDropdown />` para el dropdown. Mover el JSX a archivos propios.", code: "// components/ListItem.js\nexport default function ListItem({ item }) {\n  return <li>{item.titulo} ({item.año})</li>;\n}" },
      { title: "4. Extraer función pura", body: "Mover lógica de filtrado a su propio archivo.", code: `// utils/filterList.js
export function filterList(list, query, genero) {
  return list.filter(p =>
    p.titulo.toLowerCase().includes(query.toLowerCase()) &&
    (genero === 'todos' || p.genero === genero)
  );
}` },
      { title: "5. Renombrar variables", body: "3 variables a nombres mejores: `data` → `peliculas`, `item` → `pelicula`, `x` → algo descriptivo." },
      { title: "6. Verificar idéntico", body: "Comparar contra el snapshot inicial. Si cambió algo visual o de comportamiento, romper. Volver atrás." },
      { title: "7. Commits granulares", body: "Cada extracción/rename es 1 commit. Todos empiezan con `refactor:`." },
      { title: "8. PR con Antes/Después", body: "Título: `refactor(m7): extraer componentes y funcion de filtrado`. Mostrar snippet antes y después en description." },
    ],
    promptIA: "'Quiero refactorizar este componente sin cambiar su comportamiento. ¿Cuál es el orden recomendado de cambios para minimizar riesgo de romper algo?'",
    recursos: [
      { title: "Martin Fowler: Refactoring", url: "https://refactoring.com/" },
    ],
  },

  m11: {
    intro: "Tu app propia arranca acá. Antes de codear, pensar y mockear. Si arrancás a codear sin esto, te perdés a la mitad.",
    steps: [
      { title: "1. Brainstorm de ideas", body: "Lista de 5 ideas chicas. Validá con game master cuál es realista para 4 sesiones." },
      { title: "2. README inicial", body: "Repo nuevo `mi-app-{tu-nombre}`. README con: nombre app, párrafo descripción, lista 3-6 features, stack (Next.js + Tailwind + lo que decidas)." },
      { title: "3. Restricciones a cumplir", body: "Al menos 1 form de entrada + al menos 1 vista de datos. SIN backend en M11-M13 (localStorage solo)." },
      { title: "4. Mockup de 2 pantallas mínimo", body: "Opciones: v0.dev (prompts → UI), Figma (drag&drop), o lápiz + foto. Las 3 son válidas." },
      { title: "5. Subir mockups al repo", body: "Carpeta `mockups/` con las imágenes." },
      { title: "6. PR", body: "Título: `docs(m11): diseño inicial de la app`. En description: por qué elegiste la idea, para quién la harías, qué te asusta más." },
    ],
    promptIA: "'Quiero hacer una app de [tu idea] en Next.js. ¿Cuáles son las 3-5 pantallas mínimas que necesito? ¿Qué features puedo dejar para v2?'",
    recursos: [
      { title: "v0.dev (Vercel)", url: "https://v0.dev" },
      { title: "Figma free", url: "https://figma.com" },
    ],
  },

  m12: {
    intro: "El esqueleto. Layout, header, footer, landing, rutas placeholder. Sin features todavía.",
    steps: [
      { title: "1. Crear Next app", code: "npx create-next-app@latest mi-app --tailwind", body: "Defaults + Tailwind. App Router yes." },
      { title: "2. Layout global", body: "`app/layout.js` con `<Header />` y `<Footer />` reutilizables.", code: `export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}` },
      { title: "3. Header con navegación", body: "Links a cada pantalla del mockup usando `next/link`." },
      { title: "4. Landing en /", body: "`app/page.js`: Hero (título + subtítulo + CTA) + 3 cards de features." },
      { title: "5. Placeholders de otras rutas", body: "Cada pantalla del mockup tiene su carpeta y page.js con `<h1>Próximamente</h1>`. Importante para que los links no rompan." },
      { title: "6. Responsive", body: "Probá en celular (DevTools mobile mode). Tailwind clases `md:`, `lg:` para breakpoints." },
      { title: "7. Tipografía", body: "Importá 1 fuente de Google Fonts (ej: Inter) y usala en `layout.js`." },
      { title: "8. Deploy + PR", body: "Título: `feat(m12): setup inicial con layout y landing`." },
    ],
    promptIA: "'¿Cómo importo una fuente de Google Fonts en Next.js App Router de la forma recomendada? ¿Y cómo la uso en Tailwind?'",
    recursos: [
      { title: "Next.js fonts", url: "https://nextjs.org/docs/app/building-your-application/optimizing/fonts" },
    ],
  },

  m13: {
    intro: "La feature core. Lo que hace que tu app sirva. Todo lo demás es accesorio. Si esto no anda, no tenés app.",
    steps: [
      { title: "1. Branch", code: "git checkout -b m13-feature-core" },
      { title: "2. Definir el feature en 1 oración", body: "'El usuario puede X'. Si no podés decirlo en una oración, todavía no lo entendiste lo suficiente." },
      { title: "3. Dibujar flujo en papel", body: "Usuario hace X → app responde Y → se ve Z. Sin esto, te perdés." },
      { title: "4. Empezar feo", body: "La primera versión que ande es mejor que la versión perfecta que no existe. Sin estilos al principio, foco en lógica." },
      { title: "5. Mínimo 2 componentes nuevos", body: "Dividí el feature en piezas. Cada componente hace una cosa." },
      { title: "6. Estados que necesitás", body: "useState para la data del feature. useEffect si necesitás cargar algo al montar." },
      { title: "7. Manejo de casos borde", body: "Estado vacío (sin data todavía), error, loading. Sin esto, la app rompe el primer día." },
      { title: "8. Pulir estilos", body: "Una vez que anda, hacerlo lindo. NO antes. Tailwind para velocidad." },
      { title: "9. Deploy + PR", body: "Título: `feat(m13): implementar feature core de [nombre app]`. Description con: cuál es el feature, qué fue lo más difícil, qué quedó feo." },
    ],
    promptIA: "'Estoy haciendo [feature]. Acá está el código. ¿Qué edge cases me estoy perdiendo? ¿Qué validaciones agregarías?' (NO le pidas que escriba el feature entero, pedile review de lo que ya hiciste)",
    recursos: [],
  },

  m14: {
    intro: "Si refrescás, se pierde todo. Esta misión arregla eso. localStorage para arrancar, Supabase bonus si llegás.",
    steps: [
      { title: "1. Branch", code: "git checkout -b m14-persistencia" },
      { title: "2. Función de guardar", code: `function saveToStorage(data) {
  if (typeof window === 'undefined') return; // OJO: SSR
  localStorage.setItem('mi-app', JSON.stringify(data));
}` },
      { title: "3. Función de cargar", code: `function loadFromStorage() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('mi-app');
  return raw ? JSON.parse(raw) : null;
}` },
      { title: "4. Cargar en useEffect", body: "`useEffect(() => { setData(loadFromStorage() || defaultData); }, [])`. El array vacío hace que corra solo al montar." },
      { title: "5. Guardar al cambiar", body: "Otro useEffect: `useEffect(() => { saveToStorage(data); }, [data]);`. Cada vez que cambia `data`, se guarda." },
      { title: "6. Botón Borrar todo", body: "`localStorage.removeItem('mi-app')` + reset del state." },
      { title: "7. Probar persistencia", body: "Cargá data → cerrá pestaña → abrí de nuevo → debería estar." },
      { title: "8. BONUS Supabase (+50 XP)", body: "Crear cuenta supabase.com → proyecto → tabla → copiar URL y anon key a `.env.local` → `npm install @supabase/supabase-js` → reemplazar funciones de storage por queries a Supabase." },
      { title: "9. PR", body: "Título: `feat(m14): persistencia con localStorage`. Si hiciste Supabase: `feat(m14): persistencia con supabase`." },
    ],
    promptIA: "'¿Por qué localStorage no funciona en server-side rendering de Next.js? ¿Cómo evito el error de hidratación?'",
    recursos: [
      { title: "Supabase docs", url: "https://supabase.com/docs" },
    ],
  },

  boss3: {
    intro: "Boss del Acto 4. Deploy estable, README pro, demo al equipo. La diferencia entre 'proyecto de la escuela' y 'proyecto de portfolio'.",
    steps: [
      { title: "1. Limpiar el código", body: "Borrar todos los console.log, alerts, comentarios de debug, código muerto. Buscar 'TODO' y resolver o borrar." },
      { title: "2. Build limpio", code: "npm run build", body: "Si tira warnings, arregla. Si tira errors, no podés deployar." },
      { title: "3. Verificar producción", body: "Abrir URL Vercel en navegador incógnito (sin cache). Probar TODO el flow principal. En desktop y mobile." },
      { title: "4. README pro", body: "Estructura: título + descripción 1 línea + badges (shields.io) + screenshot/GIF + Features + Stack + Cómo correr local + Cómo se hizo + Link demo." },
      { title: "5. GIF de la app andando", body: "Usá ScreenToGif (Windows), LICEcap (Mac/Win) o Kap (Mac). 5-10 segundos del feature principal." },
      { title: "6. Slides o solo la app", body: "Para la demo: o slides cortos (5 max) o directo la app. Practicá la demo 1 vez solo antes." },
      { title: "7. Demo de 5 min al equipo", body: "Estructura: mostrar flujo principal en vivo (3 min) → 1 cosa que aprendiste (1 min) → 1 cosa que no funcionó como esperabas (1 min) → preguntas." },
      { title: "8. PR final", body: "Título: `feat(boss3): readme pro y deploy estable`. Link producción en description, lo que más te enorgullece, qué cambiarías en v2." },
    ],
    promptIA: "'Acá está mi README. ¿Qué falta para que sea profesional? ¿Qué secciones agregarías? ¿Qué le sacarías?'",
    recursos: [
      { title: "shields.io (badges)", url: "https://shields.io/" },
      { title: "Awesome README", url: "https://github.com/matiassingers/awesome-readme" },
    ],
  },

  m15: {
    intro: "Boss final. Primera contribución a un repo real de la empresa. Va a producción. Tu nombre queda en el commit log para siempre.",
    steps: [
      { title: "1. Recibir issue asignada", body: "Game master te asigna issue en repo real. Issue chica, segura, pero real." },
      { title: "2. Leer el repo", body: "README, CONTRIBUTING.md si hay, estructura general. Convenciones de branch naming. Convención de commits si difiere." },
      { title: "3. Clarificar el issue", body: "Si tenés CUALQUIER duda, preguntá ANTES de empezar. Mejor 10 min de pregunta que 5 horas en el camino equivocado." },
      { title: "4. Setup local", body: "Cloná, instalá, corré, reproducí el issue. Si no podés correrlo local, pedí ayuda." },
      { title: "5. Branch siguiendo convención", body: "Si el repo usa `fix/123-descripcion`, vos igual. Si usa `bugfix-123`, vos igual. Imitá lo que ya está." },
      { title: "6. Cambio mínimo", body: "Solo lo necesario para cerrar el issue. NO refactor de paso. NO 'aprovechar para mejorar X'. Scope creep = rechazo." },
      { title: "7. PR usando template del repo", body: "Si hay template, llenarlo entero. Si no, mencionar: issue que cierra (`Closes #123`), qué cambia, cómo probaste, screenshots." },
      { title: "8. CI debe pasar", body: "Si hay tests, deben pasar todos. Si rompiste algo, arreglar antes de pedir review." },
      { title: "9. Review", body: "Pedí review al senior responsable. Agradecé cada comentario. No te ofendas. Cambios o explicación de por qué no, igual que M9." },
      { title: "10. Merge y verificar producción", body: "Después del merge, chequear que no rompió nada en prod. Si rompió, hablar YA, no esperar." },
      { title: "11. Reflexión post-merge", body: "Agregá `docs/m15-reflexion.md` en tu pasaporte: cómo se sintió ver el PR mergeado a main, diferencias con PRs de juguete, qué te enseñó el review." },
    ],
    promptIA: "'Voy a hacer mi primera contribución a un repo grande. ¿Qué cosas debería revisar del repo antes de empezar a codear?'",
    recursos: [],
  },

  m16: {
    intro: "Última misión. Blog post: 'qué aprendí en 3 meses'. Para vos, para tu CV, para futuros pasantes.",
    steps: [
      { title: "1. Branch en el pasaporte", code: "git checkout -b m16-blog" },
      { title: "2. Estructura sugerida", body: "Cómo llegaste → qué te imaginabas vs qué fue → 3 cosas técnicas aprendidas → 3 cosas no técnicas → historia de algo que te trabó y cómo lo resolviste → qué harías distinto → hacia dónde vas." },
      { title: "3. Específico, no genérico", body: "❌ 'aprendí React'. ✅ 'el día que entendí useState fue cuando me di cuenta que count = count + 1 no funciona pero setCount(count + 1) sí'." },
      { title: "4. 800-2000 palabras", body: "Si te quedan menos de 800, falta detalle. Agregá ejemplos concretos. Si te pasás de 2000, sobra adorno." },
      { title: "5. Al menos 1 imagen", body: "Screenshot, GIF, foto. Lo que sea. Texto puro cansa." },
      { title: "6. Al menos 2 links a misiones", body: "Linkear a tus PRs o repos del pasaporte." },
      { title: "7. Sin clichés", body: "Prohibido: 'salí de mi zona de confort', 'el cielo es el límite', 'di lo mejor de mí'." },
      { title: "8. Probar con alguien no técnico", body: "Mostrale a un amigo/familiar que no programa. Si no entendió X, reescribí X." },
      { title: "9. Publicar", body: "Mínimo en `blog/que-aprendi.md` del pasaporte. Bonus: subir a dev.to, medium, o tu propio sitio." },
      { title: "10. PR final", body: "Título: `docs(m16): blog post final`. En description: link al post, frase del post que más te gusta, qué le mejorarías al next pasante." },
    ],
    promptIA: "'Acá está el draft de mi blog post sobre la pasantía. ¿Qué partes son genéricas y debería hacer más específicas con ejemplos concretos? ¿Hay clichés que debería sacar?'",
    recursos: [
      { title: "dev.to", url: "https://dev.to" },
    ],
  },
};
