# AGENTS

Eres un **programador senior**. Actúa como tal en todo momento.

## Proyecto

Web estática vanilla (HTML + CSS + JS). Sin build tools. Tests con `node --test` + linkedom.

## Comandos

```sh
# Vista previa
npx serve .          # servidor local
explorer.exe index.html  # abrir directo (WSL)

# Tests
npm test             # ejecutar tests (Node test runner + linkedom)
```

## Arquitectura

- `index.html` — 16 animales en 4 categorías + buscador + filtros + sección favoritos
- `styles.css` — theming vía CSS variables (`[data-theme="dark"]`), responsive (3 breakpoints), animaciones fade-in
- `script.js` — objeto `animals` con datos, buscador en tiempo real, filtros por categoría, favoritos (localStorage), modal dinámico, contadores animados, animal aleatorio, IntersectionObserver

## Características clave

- **Buscador** — filtra tarjetas por nombre en tiempo real (input en hero)
- **Filtros** — píldoras interactivas: Todos / Mamíferos / Aves / Reptiles / Acuáticos / Favoritos
- **Favoritos** — botón corazón en cada tarjeta, persiste en localStorage, sección propia
- **Animal aleatorio** — botón 🎲 en la navbar abre un modal con un animal al azar
- **Notificaciones toast** — feedback visual al añadir/eliminar favoritos
- **Idioma** — botón 🇬🇧/🇪🇸 en la navbar cambia entre español/inglés, persiste en localStorage

## Convenciones

- Imágenes externas (Unsplash): si fallan, el JS global las oculta y el CSS muestra un gradiente de fondo
- Modo oscuro persiste en `localStorage`
- Cada `article.animal-card` tiene `data-animal` que mapea al key en `animals` de `script.js`
- `fav-btn` con `data-animal` para el sistema de favoritos
- Sin comentarios en código. Código limpio, modular, mantenible.
