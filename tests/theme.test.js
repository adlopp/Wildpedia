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

describe('Modo Oscuro', () => {

    test('el tema por defecto es claro', () => {
        assert.strictEqual(document.documentElement.getAttribute('data-theme'), null);
    });

    test('hacer clic en themeToggle activa el modo oscuro', () => {
        document.getElementById('themeToggle').click();

        assert.strictEqual(document.documentElement.getAttribute('data-theme'), 'dark');
    });

    test('hacer clic dos veces vuelve al modo claro', () => {
        document.getElementById('themeToggle').click();
        document.getElementById('themeToggle').click();

        assert.strictEqual(document.documentElement.getAttribute('data-theme'), 'light');
    });

    test('el modo oscuro persiste en localStorage', () => {
        document.getElementById('themeToggle').click();
        assert.strictEqual(localStorage.getItem('theme'), 'dark');

        document.getElementById('themeToggle').click();
        assert.strictEqual(localStorage.getItem('theme'), 'light');
    });

});
