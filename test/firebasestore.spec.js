import { expect, jest } from '@jest/globals';
import {
  addDoc,
  getDocs,
  /* orderBy,
    query,
    deleteDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove, */
} from 'firebase/firestore';
import moment from 'moment';

import {
  getPost, newPost, editPost, deletePost,
} from '../src/pages/firebase/firebasestore.js';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('firebase/firestore');

describe('feed', () => {
  it('should be getPost is a function', () => {
    expect(typeof getPost).toBe('function');
  });

  it('should be newPost is a function', () => {
    expect(typeof newPost).toBe('function');
  });

  it('should be editPost is a function', () => {
    expect(typeof editPost).toBe('function');
  });

  it('should be deletePost is a function', () => {
    expect(typeof deletePost).toBe('function');
  });

  it('create post with success', () => {
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
    expect(addDoc).toHaveBeenCalledWith(undefined, post);
  });

  it('GetPosts with success', async () => {
    const momentMock = moment().add(1, 'day'); // pegando uma data/hora qualquer
    const mockPosts = [
      {
        id: '1',
        data: () => ({
          username: 'Fulano',
          date: momentMock,
          uid: 1234,
          text: 'lalalala',
          like: [],
        }),
      },
      {
        id: '2',
        data: () => ({
          username: 'Fulano 2',
          date: momentMock,
          uid: 1234,
          text: 'lalalala',
          like: [],
        }),
      },
    ];

    // Simula a chamada da função getDocs retornando o mockPosts
    getDocs.mockResolvedValue({
      collection: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ forEach: jest.fn() })),
      })),
      forEach: jest.fn((callback) => {
        mockPosts.forEach((snapshot) => callback(snapshot));
      }),
      query: jest.fn(),
    });

    const postList = await getPost();

    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(getDocs).toHaveBeenCalled();

    // Testando o retorno do getPost()
    expect(postList).toEqual([
      {
        id: '1', // dado retornado do teste
        username: 'Fulano',
        date: momentMock.toDate().toLocaleDateString(), // mesmo do getPosts n firebasestore.js
        hour: momentMock.toDate().toLocaleTimeString(), // mesmo do getPosts n firebasestore.js
        uid: 1234,
        text: 'lalalala',
        like: [],
      },
      {
        id: '2',
        username: 'Fulano 2',
        date: momentMock.toDate().toLocaleDateString(),
        hour: momentMock.toDate().toLocaleTimeString(),
        uid: 1234,
        text: 'lalalala',
        like: [],
      },
    ]);
  });
});
