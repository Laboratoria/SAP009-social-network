import { redirecionarPagina } from '../src/redirecionar-pagina';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

describe('redirecionarPagina', () => {
  it('deve redirecionar para a página correta', () => {
    redirecionarPagina('#pagina');
    expect(window.location.hash).toEqual('#pagina');
  });
});
