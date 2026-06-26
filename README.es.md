[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md)

# 🐾 Wildpedia — Enciclopedia de Animales

Explorador visual del reino animal con buscador, filtros, favoritos y modo oscuro.  
Proyecto frontend **vanilla** (sin frameworks, sin build tools).

## ✨ Características

| Funcionalidad | Detalle |
|---|---|
| 🔍 **Buscador en tiempo real** | Filtra 16 animales por nombre mientras escribes |
| 🏷️ **Filtros por categoría** | Mamíferos, Aves, Reptiles, Acuáticos + Favoritos |
| ❤️ **Favoritos persistentes** | Guarda en localStorage, sección dedicada |
| 🌙 **Modo oscuro** | Persiste en localStorage |
| 🌐 **Idioma ES/EN** | Traducción completa, persiste en localStorage |
| 🎲 **Animal aleatorio** | Modal sorpresa con un clic |
| 📱 **Responsive** | 3 breakpoints: desktop, tablet, móvil |
| 🎬 **Animaciones** | Fade-in con IntersectionObserver, contadores animados |

## 🚀 Vista previa

Abrir directo en el navegador:

```sh
explorer.exe index.html        # Windows (WSL)
open index.html                # macOS
xdg-open index.html            # Linux
```

O con servidor local:

```sh
npx serve .
```

## 🗂️ Estructura

```
├── index.html       # HTML semántico con data-i18n
├── styles.css       # CSS variables, modo oscuro, responsive
├── script.js        # Lógica: buscador, filtros, favoritos, i18n, modal
├── tests/           # Tests con Node test runner + linkedom
│   ├── helpers.js   # DOM setup (linkedom), mocks
│   ├── i18n.test.js
│   ├── favorites.test.js
│   ├── search.test.js
│   └── theme.test.js
├── package.json
└── AGENTS.md        # Instrucciones para OpenCode
```

## 🧠 Lo que demuestra

- **Manipulación del DOM** — creación dinámica de modales, clonado de nodos
- **Eventos** — delegación, propagación, formularios en tiempo real
- **APIs del navegador** — `localStorage`, `IntersectionObserver`, `requestAnimationFrame`
- **CSS moderno** — variables, `backdrop-filter`, `object-fit`, transiciones
- **Patrón i18n** — objeto de traducciones con fallback
- **UX** — feedback visual (toast), estados vacíos, persistencia de preferencias

## 📦 Stack

`HTML5` · `CSS3` · `JavaScript (ES6+)` · Tests: `node --test` + `linkedom`

```sh
npm test             # 21 tests en 4 suites
```

## 📄 Licencia

MIT
