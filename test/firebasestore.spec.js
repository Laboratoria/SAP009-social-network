import { jest } from '@jest/globals';
import {
  addDoc,
  collection,
  /*
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

jest.mock('firebase/firestore');

describe('feed', () => {
  it('should be getPost is a function', () => {
    expect(typeof getPost).toBe('function');
  });

  it('create post with success', () => {
    // Simula a chamada da função collection retornando o mockCollection
    collection.mockImplementation(() => jest.fn());

    addDoc.mockResolvedValue({ collection: jest.fn() });

    const post = {
      username: 'Fulano',
      date: 'Tue May 02 2023 21:35:52 GMT-0300 (Horário Padrão de Brasília)',
      uid: 1234,
      text: 'lalalala',
      like: [],
    };
    newPost('lalalala', 'Tue May 02 2023 21:35:52 GMT-0300 (Horário Padrão de Brasília)', 'Fulano', 1234);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), post);
  });
});
