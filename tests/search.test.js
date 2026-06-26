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

describe('Buscador y Filtros', () => {

    test('applyFilter con "all" muestra todas las tarjetas', () => {
        document.querySelector('.filter-pill[data-filter="all"]').classList.add('active');
        applyFilter();
        const hidden = document.querySelectorAll('.animal-card.hidden');
        assert.strictEqual(hidden.length, 0);
    });

    test('applyFilter con "mamiferos" oculta tarjetas de otras categorías', () => {
        document.querySelector('.filter-pill[data-filter="all"]').classList.remove('active');
        document.querySelector('.filter-pill[data-filter="mamiferos"]').classList.add('active');
        applyFilter();

        const visible = document.querySelectorAll('.animal-card:not(.hidden)');
        assert.strictEqual(visible.length, 2);
        assert.strictEqual(visible[0].dataset.animal, 'leon');
        assert.strictEqual(visible[1].dataset.animal, 'delfin');
    });

    test('escribir en el buscador oculta tarjetas que no coinciden', () => {
        const input = document.getElementById('searchInput');
        input.value = 'delf';
        input.dispatchEvent(new Event('input'));

        const visible = document.querySelectorAll('.animal-card:not(.hidden)');
        assert.strictEqual(visible.length, 1);
        assert.strictEqual(visible[0].dataset.animal, 'delfin');
    });

    test('limpiar el buscador muestra todas las tarjetas', () => {
        const input = document.getElementById('searchInput');
        input.value = 'xyz';
        input.dispatchEvent(new Event('input'));

        const hidden = document.querySelectorAll('.animal-card.hidden');
        assert.strictEqual(hidden.length, 2);

        input.value = '';
        input.dispatchEvent(new Event('input'));

        const hiddenAfter = document.querySelectorAll('.animal-card.hidden');
        assert.strictEqual(hiddenAfter.length, 0);
    });

    test('la búsqueda es case-insensitive', () => {
        const input = document.getElementById('searchInput');
        input.value = 'DELF';
        input.dispatchEvent(new Event('input'));

        const visible = document.querySelectorAll('.animal-card:not(.hidden)');
        assert.strictEqual(visible.length, 1);
        assert.strictEqual(visible[0].dataset.animal, 'delfin');
    });

});
