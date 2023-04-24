import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
} from 'firebase/firestore';
import { newPost, getUserData } from '../src/firebase/firestore.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('newPost', () => {
  it('should create a new post and add it to the collection in the database', async () => {
    const mockAuth = {
      currentUser: {
        displayName: 'test',
        uid: '62442',
      },
    };
    const mockAddDoc = 'addDoc';
    const mockCollection = 'collection';
    const textPost = 'hey there, test!';

    getAuth.mockReturnValueOnce(mockAuth);
    addDoc.mockReturnValueOnce(mockAddDoc);
    collection.mockReturnValueOnce(mockCollection);

    const mockPost = {
      userId: mockAuth.currentUser.uid,
      username: mockAuth.currentUser.displayName,
      post: textPost,
      likes: [],
    };
    await newPost(textPost);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, expect.objectContaining(mockPost));
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
});

describe('getUserData', () => {
  it('should return the users data', () => {
    const mockAuth = {
      currentUser: {
        uid: 12345,
      },
    };
    getAuth.mockReturnValueOnce(mockAuth);

    expect(typeof getUserData).toBe('function');
    expect(getUserData).toHaveBeenCalledTimes(1);
    expect(getUserData).toHaveReturnedWith('test');
  });
});
