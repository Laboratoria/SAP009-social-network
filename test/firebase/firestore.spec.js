import {
  addDoc, getDocs, query, collection, orderBy, updateDoc, deleteDoc, arrayRemove, arrayUnion, db,
} from 'firebase/firestore';
import {
  createPost, accessPost, editPost, deletePost, likePost, deslikePost,
} from '../../src/firebase/firestore';
import { getAppAuth } from '../../src/firebase/auth';

jest.mock('firebase/firestore');
jest.mock('../../src/firebase/auth');

const mockAppAuth = {
  currentUser: {
    displayName: 'Fulano',
    uid: 'uid1234',
  },
};
getAppAuth.mockReturnValue(mockAppAuth);

describe('createPost', () => {
  it('should create a new post', async () => {
    addDoc.mockResolvedValue();
    const anime = 'Naruto';
    const episodes = '500';
    const description = 'Anime muito bom! Fez parte da minha infância';
    const post = {
      name: mockAppAuth.currentUser.displayName,
      author: mockAppAuth.currentUser.uid,
      anime,
      episodes,
      description,
      createdAt: new Date(),
      likes: [],
      whoLiked: [],
    };
    await createPost(anime, episodes, description);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(undefined, post);
  });
});

describe('accessPost', () => {
  it('deve retornar um array de posts', async () => {
    getDocs.mockResolvedValue([
      {
        id: 'yYpyRY7xerL7UP422cAq',
        data: () => ({
          anime: 'Spy x Family', episodes: '26', description: 'teste', createdAt: new Date(2023, 3, 30),
        }),
      },
      {
        id: 'g7d9EEwypbQK9ohDf6A9zflF5Zg2',
        data: () => ({
          anime: 'Sailor Moon', episodes: '300', description: 'teste', createdAt: new Date(2023, 3, 31),
        }),
      },
    ]);
    const posts = await accessPost();
    expect(posts).toEqual([
      {
        id: 'yYpyRY7xerL7UP422cAq', anime: 'Spy x Family', episodes: '26', description: 'teste', createdAt: new Date(2023, 3, 30),
      },
      {
        id: 'g7d9EEwypbQK9ohDf6A9zflF5Zg2', anime: 'Sailor Moon', episodes: '300', description: 'teste', createdAt: new Date(2023, 3, 31),
      },
    ]);
    expect(getDocs).toHaveBeenCalledWith(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
  });
});

describe('editPost', () => {
  it('should edit a post', async () => {
    editPost();
    expect(updateDoc).toHaveBeenCalledTimes(1);
  });
});

describe('deletePost', () => {
  it('should delete a post', async () => {
    deletePost();
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});

describe('likePost', () => {
  it('should like a single post', async () => {
    likePost();
    expect(arrayUnion).toHaveBeenCalledTimes(1);
  });
});

describe('deslikePost', () => {
  it('should deslike a single post', async () => {
    deslikePost();
    expect(arrayRemove).toHaveBeenCalledTimes(1);
  });
});
