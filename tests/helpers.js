const { parseHTML } = require('linkedom');
const vm = require('vm');
const fs = require('fs');
const path = require('path');

let cleanupFns = [];
let scriptLoaded = false;

function setupGlobalDOM(html) {
    const dom = parseHTML(html || `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><title>Wildpedia</title></head>
        <body>
            <nav class="navbar">
                <div class="nav-container">
                    <a href="#" class="nav-logo">🐾 Wildpedia</a>
                    <ul class="nav-menu">
                        <li><a href="#inicio" data-i18n="nav.inicio">Inicio</a></li>
                        <li><a href="#mamiferos" data-i18n="nav.mamiferos">Mamíferos</a></li>
                    </ul>
                    <div class="nav-actions">
                        <button class="lang-toggle" id="langToggle" aria-label="Switch language">🇬🇧</button>
                        <button class="random-btn" id="randomBtn">🎲</button>
                        <button class="auth-btn" id="authBtn">👤</button>
                        <button class="theme-toggle" id="themeToggle">🌙</button>
                        <button class="menu-toggle" id="menuToggle">☰</button>
                    </div>
                </div>
            </nav>

            <div class="search-container">
                <input type="text" id="searchInput" data-i18n="search.placeholder" placeholder="Buscar animal por nombre…">
                <ul class="search-suggestions" id="searchSuggestions"></ul>
            </div>

            <div class="filter-bar">
                <button class="filter-pill active" data-filter="all" data-i18n="filter.all">Todos</button>
                <button class="filter-pill" data-filter="mamiferos" data-i18n="filter.mamiferos">🐘 Mamíferos</button>
            </div>

            <div class="search-empty" id="searchEmpty"></div>

            <section id="mamiferos" class="category-section" data-category="mamiferos">
                <h2 data-i18n="section.mamiferos.title">🐘 Mamíferos</h2>
                <p class="category-desc" data-i18n="section.mamiferos.desc">Animales vertebrados...</p>
                <div class="card-grid">
                    <article class="animal-card" data-animal="leon">
                        <button class="fav-btn" data-animal="leon" aria-label="Añadir a favoritos">♡</button>
                        <div class="card-image"><img src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=300&fit=crop" alt="León" loading="lazy"></div>
                        <div class="card-body">
                            <h3 data-i18n="animal.leon.name">León</h3>
                            <p class="scientific">Panthera leo</p>
                            <p data-i18n="animal.leon.desc">Conocido como el rey de la selva...</p>
                            <ul class="card-details">
                                <li><strong data-i18n="detail.habitat">Hábitat:</strong> <span data-i18n="animal.leon.habitat">Sabana africana</span></li>
                                <li><strong data-i18n="detail.dieta">Dieta:</strong> <span data-i18n="animal.leon.dieta">Carnívoro</span></li>
                                <li><strong data-i18n="detail.vida">Esperanza de vida:</strong> <span data-i18n="animal.leon.vida">10-14 años</span></li>
                            </ul>
                        </div>
                    </article>
                    <article class="animal-card" data-animal="delfin">
                        <button class="fav-btn" data-animal="delfin" aria-label="Añadir a favoritos">♡</button>
                        <div class="card-image"><img src="https://images.unsplash.com/photo-1570488344392-d00cc0fea93c?w=400&h=300&fit=crop" alt="Delfín" loading="lazy"></div>
                        <div class="card-body">
                            <h3 data-i18n="animal.delfin.name">Delfín</h3>
                            <p class="scientific">Delphinus delphis</p>
                            <p data-i18n="animal.delfin.desc">Mamífero marino...</p>
                            <ul class="card-details">
                                <li><strong data-i18n="detail.habitat">Hábitat:</strong> <span data-i18n="animal.delfin.habitat">Océanos</span></li>
                                <li><strong data-i18n="detail.dieta">Dieta:</strong> <span data-i18n="animal.delfin.dieta">Carnívoro</span></li>
                                <li><strong data-i18n="detail.vida">Esperanza de vida:</strong> <span data-i18n="animal.delfin.vida">20-30 años</span></li>
                            </ul>
                        </div>
                    </article>
                </div>
            </section>

            <section id="favorites-section" class="category-section" data-category="favorites">
                <h2 data-i18n="section.favoritos.title">❤️ Tus Favoritos</h2>
                <p class="category-desc" data-i18n="section.favoritos.desc">Los animales que has marcado como favoritos.</p>
                <div class="card-grid" id="favoritesGrid"></div>
                <div class="empty-favs" id="emptyFavs">
                    <p data-i18n="section.favoritos.empty">No tienes favoritos aún.</p>
                </div>
            </section>

            <div class="modal" id="animalModal">
                <div class="modal-content">
                    <button class="modal-close" id="modalClose">&times;</button>
                    <div id="modalBody"></div>
                </div>
            </div>

            <div class="modal" id="authModal">
                <div class="modal-content">
                    <button class="modal-close" id="authModalClose">&times;</button>
                    <div id="authModalBody"></div>
                </div>
            </div>

            <div class="toast" id="toast"></div>

            <div class="wiki-fact" id="wikiFact">
                <div class="wiki-fact-body" id="wikiFactBody"></div>
                <button class="wiki-fact-btn" id="wikiFactBtn">🎲 Nuevo dato</button>
            </div>
        </body>
        </html>
    `);

    const { document, window, customElements, HTMLElement, Event, CustomEvent } = dom;

    global.window = window;
    global.document = document;
    global.customElements = customElements;
    global.HTMLElement = HTMLElement;
    global.Event = Event;
    global.CustomEvent = CustomEvent;

    global.requestAnimationFrame = (fn) => setTimeout(fn, 16);
    global.cancelAnimationFrame = (id) => clearTimeout(id);

    global.IntersectionObserver = class {
        constructor(callback) { this.callback = callback; this.elements = new Set(); }
        observe(el) { this.elements.add(el); }
        unobserve(el) { this.elements.delete(el); }
        disconnect() { this.elements.clear(); }
    };

    global.localStorage = (() => {
        let store = {};
        return {
            getItem: (k) => store[k] ?? null,
            setItem: (k, v) => { store[k] = String(v); },
            removeItem: (k) => { delete store[k]; },
            clear: () => { store = {}; },
            get length() { return Object.keys(store).length; },
            key: (i) => Object.keys(store)[i] ?? null,
        };
    })();

    global.fetch = async () => {
        return {
            ok: true,
            json: async () => ({
                title: 'Test Animal',
                extract: 'Test extract about an animal species.'
            })
        };
    };

    global.setTimeout = setTimeout;
    global.clearTimeout = clearTimeout;
    global.confirm = () => true;

    cleanupFns.push(() => {
        delete global.window;
        delete global.document;
        delete global.customElements;
        delete global.HTMLElement;
        delete global.Event;
        delete global.CustomEvent;
        delete global.requestAnimationFrame;
        delete global.cancelAnimationFrame;
        delete global.IntersectionObserver;
        delete global.localStorage;
        delete global.fetch;
    });

    return dom;
}

function clearDOM() {
    cleanupFns.forEach(fn => fn());
    cleanupFns = [];
}

function loadScript() {
    const scriptPath = path.resolve(__dirname, '..', 'script.js');
    const code = fs.readFileSync(scriptPath, 'utf8');
    (0, eval)(code);
}

module.exports = { setupGlobalDOM, clearDOM, loadScript };
