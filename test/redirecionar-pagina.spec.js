// import { redirecionarPagina } from '../src/redirecionar-pagina';

// const jsdom = require('jsdom');

// const { JSDOM } = jsdom;
// const dom = new JSDOM('<!doctype html><html><body></body></html>');

// global.window = dom.window;
// global.document = dom.window.document;

// describe('redirecionarPagina', () => {
//   it('deve redirecionar para a página correta', () => {
//     const mockWindow = Object.create(window);
//     Object.defineProperty(mockWindow, 'location', {
//       value: {
//         hash: '',
//       },
//       writable: true,
//     });
//     Object.defineProperty(mockWindow, 'dispatchEvent', {
//       value: jest.fn(),
//       writable: true,
//     });
//     global.window = mockWindow;

//     redirecionarPagina('#/pagina');

//     expect(window.location.hash).toEqual('#/pagina');
//     expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
//   });
// });
