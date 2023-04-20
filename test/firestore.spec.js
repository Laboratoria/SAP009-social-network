import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { getUsername, newPost } from '../src/firebase/firestore';

jest.mock('firebase/auth');

describe('newPost', () => {
  it('should create a new post and add it to the collection in the database', async () => {
    const mockAuth = {
      currentUser: {
        displayName: 'test',
        uid: '62442',
      },
    };
    getAuth.mockReturnValueOnce(mockAuth);
    addDoc.mockResolvedValueOnce();
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);

    const textPost = 'hey  there, test!';

    await newPost(textPost);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, textPost);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
});

describe('getUsername', () => {
  it('should return the username of the logged user', () => {
    const mockAuth = {
      currentUser: {
        displayName: 'test',
      },
    };
    getAuth.mockReturnValueOnce(mockAuth);

    expect(typeof getUsername).toBe('function');
    expect(getUsername).toHaveBeenCalledTimes(1);
    expect(getUsername).toHaveReturnedWith('test');
  });
});
