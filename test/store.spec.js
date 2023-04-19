import {
  collection, addDoc, deleteDoc, orderBy, doc, getDocs, query, onSnapshot, getDoc, updateDoc,
} from 'firebase/firestore';
// getFirestore, getDoc  , arrayRemove, arrayUnion

// import { getAuth } from 'firebase/auth';
import { dadosUsuaria } from '../src/firebase/firebase-auth';
import {
  paraPostar, deletaPost, ordenaPosts, mostraPostAutomaticamente, editaPost,
  atualizaEdicao, curtirPost,
} from '../src/firebase/firebase-storage';

jest.mock('firebase/firestore');

jest.mock('../src/firebase/firebase-auth');

// console.log(dadosUsuaria);

const mockUsuaria = {
  userId: 'a1s2d3z4x5',
  userName: 'Usuária Nome Sobrenome',
  userEmail: 'email@email.com',
  dataPostagem: new Date().toLocaleString(),
  curtidas: [],
};

it('deve criar um post e guardar na coleção junto com o objeto usuarias', () => {
  dadosUsuaria.mockReturnValueOnce(mockUsuaria);
  addDoc.mockReturnValueOnce(); // isso é fazer um mock de cada função
  collection.mockReturnValueOnce();
  const descricao = 'texto';

  paraPostar(descricao);

  expect(addDoc).toHaveBeenCalledTimes(1);
  expect(addDoc).toHaveBeenCalledWith(undefined, { descricao, ...mockUsuaria });

  expect(collection).toHaveBeenCalledTimes(1);
  expect(collection).toHaveBeenCalledWith(undefined, 'postagens');
});

it('deveria deletar o post', () => {
  const colecao = 'colecao';
  deleteDoc.mockResolvedValueOnce(colecao);
  doc.mockReturnValueOnce();

  deletaPost('1a2b3c');

  expect(deleteDoc).toHaveBeenCalledTimes(1);
  expect(deleteDoc).toHaveBeenCalledWith(undefined);
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'postagens', '1a2b3c');
});

it('deveria ordenar os posts pela data', async () => {
  orderBy.mockResolvedValueOnce();
  query.mockResolvedValue();
  getDocs.mockResolvedValue();

  ordenaPosts();

  expect(orderBy).toHaveBeenCalledTimes(1);
  expect(orderBy).toHaveBeenCalledWith('dataPostagem', 'desc');

  expect(query).toHaveBeenCalledTimes(1);
  // await expect(query).toHaveBeenCalledWith(undefined, { });

  expect(getDocs).toHaveBeenCalledTimes(1);
  expect(getDocs).toHaveBeenCalledWith({});
});

it('deveria mostrar posts assim que são realizados', () => {
  onSnapshot.mockReturnValueOnce();

  mostraPostAutomaticamente('novoPost');

  expect(onSnapshot).toHaveBeenCalledTimes(1);
  expect(onSnapshot).toHaveBeenCalledWith(undefined, 'novoPost');
});

it('deveria editar post criado pela usuária', () => {
  getDoc.mockReturnValueOnce();
  doc.mockReturnValueOnce();
  doc.mockClear();

  editaPost('1a2b3c');

  expect(getDoc).toHaveBeenCalledTimes(1);
  expect(getDoc).toHaveBeenCalledWith(undefined);
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'postagens', '1a2b3c');
});

it('deveria atualizar post editado', async () => {
  updateDoc.mockResolvedValueOnce();
  doc.mockResolvedValueOnce();
  doc.mockClear();

  atualizaEdicao('1a2b3c', 'texto');

  expect(updateDoc).toHaveBeenCalledTimes(1);
  // await expect(updateDoc).toHaveBeenCalledWith({ }, 'texto');
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'postagens', '1a2b3c');
});

it('deveria curtir o post', () => {
  updateDoc.mockClear();
  doc.mockClear();
  updateDoc.mockResolvedValueOnce({ });
  doc.mockReturnValueOnce();

  curtirPost('1a2b3c', mockUsuaria.curtidas);

  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'postagens', '1a2b3c');
  expect(updateDoc).toHaveBeenCalledTimes(1);
  // expect(updateDoc).toHaveBeenCalledWith(undefined, { curtidas: undefined });
});
