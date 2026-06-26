const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const { setupGlobalDOM, clearDOM, loadScript } = require('./helpers');

beforeEach(() => {
    setupGlobalDOM();
    loadScript();
});

afterEach(() => {
    clearDOM();
});

describe('Sistema de Favoritos', () => {

    test('toggleFavorite añade un animal a favoritos', () => {
        const favs = toggleFavorite('leon');
        assert.ok(favs.includes('leon'));
    });

    test('toggleFavorite elimina un animal de favoritos si ya existe', () => {
        toggleFavorite('leon');
        const favs = toggleFavorite('leon');
        assert.ok(!favs.includes('leon'));
    });

    test('isFavorite devuelve true después de añadir', () => {
        toggleFavorite('delfin');
        assert.strictEqual(isFavorite('delfin'), true);
    });

    test('isFavorite devuelve false para un animal no favorito', () => {
        assert.strictEqual(isFavorite('oso'), false);
    });

    test('getFavorites devuelve un array vacío inicialmente', () => {
        assert.deepStrictEqual(getFavorites(), []);
    });

    test('los favoritos persisten en localStorage', () => {
        toggleFavorite('leon');
        toggleFavorite('delfin');
        const stored = JSON.parse(localStorage.getItem('animalia_favorites'));
        assert.ok(stored.includes('leon'));
        assert.ok(stored.includes('delfin'));
    });

    test('updateFavButtons marca el botón como activo para favoritos', () => {
        toggleFavorite('leon');
        const btn = document.querySelector('.fav-btn[data-animal="leon"]');
        assert.ok(btn.classList.contains('active'));
        assert.strictEqual(btn.textContent, '♥');
    });

    test('toggleFavorite devuelve el array actualizado', () => {
        const r1 = toggleFavorite('leon');
        assert.strictEqual(r1.length, 1);
        const r2 = toggleFavorite('delfin');
        assert.strictEqual(r2.length, 2);
        const r3 = toggleFavorite('leon');
        assert.strictEqual(r3.length, 1);
    });

});
