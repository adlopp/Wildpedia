[English](README.md) | [Español](README.es.md)

# 🐾 Wildpedia — Animal Encyclopedia

Visual explorer of the animal kingdom with search, filters, favorites, and dark mode.  
**Vanilla** frontend project (no frameworks, no build tools).

## ✨ Features

| Feature | Detail |
|---|---|
| 🔍 **Real-time search** | Filters 16 animals by name as you type |
| 🏷️ **Category filters** | Mammals, Birds, Reptiles, Aquatic + Favorites |
| ❤️ **Persistent favorites** | Saved in localStorage, dedicated section |
| 🌙 **Dark mode** | Persists in localStorage |
| 🌐 **ES/EN language** | Full translation, persists in localStorage |
| 🎲 **Random animal** | Surprise modal with one click |
| 📱 **Responsive** | 3 breakpoints: desktop, tablet, mobile |
| 🎬 **Animations** | Fade-in with IntersectionObserver, animated counters |

## 🚀 Preview

Open directly in the browser:

```sh
explorer.exe index.html        # Windows (WSL)
open index.html                # macOS
xdg-open index.html            # Linux
```

Or with a local server:

```sh
npx serve .
```

Or with Docker:

```sh
docker build -t wildpedia .
docker run -p 8080:80 wildpedia
# Open http://localhost:8080
```

## 🗂️ Structure

```
├── index.html       # Semantic HTML with data-i18n
├── styles.css       # CSS variables, dark mode, responsive
├── script.js        # Logic: search, filters, favorites, i18n, modal
├── tests/           # Tests with Node test runner + linkedom
│   ├── helpers.js   # DOM setup (linkedom), mocks
│   ├── i18n.test.js
│   ├── favorites.test.js
│   ├── search.test.js
│   └── theme.test.js
├── package.json
└── AGENTS.md        # Instructions for OpenCode
```

## 🧠 What it demonstrates

- **DOM manipulation** — dynamic modals, node cloning
- **Events** — delegation, propagation, real-time form input
- **Browser APIs** — `localStorage`, `IntersectionObserver`, `requestAnimationFrame`
- **Modern CSS** — variables, `backdrop-filter`, `object-fit`, transitions
- **i18n pattern** — translation object with fallback
- **UX** — visual feedback (toast), empty states, preference persistence

## 📦 Stack

`HTML5` · `CSS3` · `JavaScript (ES6+)` · Tests: `node --test` + `linkedom`

```sh
npm test             # 21 tests in 4 suites
```

> **Windows (PowerShell):** run `wsl npm test`.  
> **WSL / macOS / Linux:** run `npm test` directly.

## 📄 License

MIT
