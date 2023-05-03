import {
  addDoc,
  getFirestore,
/*  collection,
    getDocs,
    orderBy,
    query,
    deleteDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove, */
} from 'firebase/firestore';

import { getPost, newPost } from '../src/pages/firebase/firebasestore.js';

beforeEach(() => {
  jest.clearAllMocks();
});
// Cria um mock da função addDoc
jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  getFirestore: jest.fn(),
}));

describe('feed', () => {
  it('should be getPost is a function', () => {
    expect(typeof getPost).toBe('function');
  });

  it('create post with success', () => {
    addDoc.mockResolvedValue({ collection: jest.fn() });
    const mockFirestore = jest.fn();

    // Simula a chamada da função getFirestore retornando o mockFirestore
    getFirestore.mockImplementation(() => mockFirestore);
    const post = {
      username: 'lalalal', data: 'Tue May 02 2023 21:35:52 GMT-0300 (Horário Padrão de Brasília)', uid: 1234, like: [],
    };
    newPost('lalalal', 'Tue May 02 2023 21:35:52 GMT-0300 (Horário Padrão de Brasília)', 1234, []);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), post);
  });
});
