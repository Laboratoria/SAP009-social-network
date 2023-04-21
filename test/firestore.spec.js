import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { getUserData, newPost } from '../src/firebase/firestore';

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

    const textPost = 'hey there, test!';

    await newPost(textPost);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, textPost);
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
