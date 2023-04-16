import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';

import {
  newPost,
  editPost,
  likePost,
  unlikePost,
  deletePost,
} from '../src/firebase/firestore';

jest.mock('firebase/firestore');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('newPost', () => {
  it('must create a post and save it in the collection', async () => {
    addDoc.mockResolvedValueOnce();
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);

    const dataPostagem = 'xx/xx/xxxx';
    const postagem = 'text';
    const username = 'usernameTest';
    const userId = 'usernametest';
    const like = 0;
    const posts = {
      userName: username,
      data: dataPostagem,
      post: postagem,
      idUser: userId,
      likes: like,
    };
    await newPost(postagem, dataPostagem, username, userId);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, posts);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
});

describe('editPost', () => {
  it('must edit a post', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const postId = 'idPost';
    const textArea = 'conteudoPost';
    const updatedPost = {
      post: textArea,
    };
    await editPost(postId, textArea);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
  });
});

describe('likePost', () => {
  it('must count the amount of likes', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockUnion = 'union';
    arrayUnion.mockReturnValueOnce(mockUnion);

    const postId = 'id-post';
    const username = 'username';
    const updatedPost = {
      likesUsers: mockUnion,
    };
    await likePost(postId, username);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
    expect(arrayUnion).toHaveBeenCalledTimes(1);
    expect(arrayUnion).toHaveBeenCalledWith(username);
  });
});

describe('unlikePost', () => {
  it('must de-count the amount of likes', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockUnion = 'union';
    arrayRemove.mockReturnValueOnce(mockUnion);
    const postId = 'id-post';
    const username = 'username';
    const updatedPost = {
      likesUsers: mockUnion,
    };
    await unlikePost(postId, username);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
    expect(arrayRemove).toHaveBeenCalledTimes(1);
    expect(arrayRemove).toHaveBeenCalledWith(username);
  });
});

describe(' deletePost', () => {
  it('must delete a post', async () => {
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    deleteDoc.mockResolvedValueOnce();
    const postId = 'id-post';
    await deletePost(postId);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
  });
});
