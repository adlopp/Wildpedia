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

describe('Internacionalización (i18n)', () => {

    test('t() devuelve el valor correcto para una clave existente', () => {
        assert.strictEqual(t('nav.inicio'), 'Inicio');
        setLang('en');
        assert.strictEqual(t('nav.inicio'), 'Home');
    });

    test('t() devuelve la clave si no encuentra traducción', () => {
        assert.strictEqual(t('clave.inexistente'), 'clave.inexistente');
    });

    test('cambiar idioma actualiza el placeholder del buscador', () => {
        const input = document.getElementById('searchInput');
        assert.ok(input.placeholder.includes('Buscar'));
        setLang('en');
        assert.ok(input.placeholder.includes('Search'));
    });

    test('cambiar idioma persiste en localStorage', () => {
        setLang('en');
        assert.strictEqual(localStorage.getItem('animalia_lang'), 'en');
        setLang('es');
        assert.strictEqual(localStorage.getItem('animalia_lang'), 'es');
    });

});
