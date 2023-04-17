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
  db,
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

    const postText = 'text'; // Usar o nome correto do parâmetro
    const posts = { // Usar as propriedades corretas da coleção "posts"
      userId: 'userIdTest',
      userName: 'userNameTest',
      text: postText,
      publishDate: new Date().toLocaleDateString('pt-BR'),
      like: [],
    };
    await newPost(postText);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, posts);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(db, 'posts'); // Usar o objeto "db" corretamente
  });
});

describe('editPost', () => {
  it('must edit a post', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const postId = 'idPost';
    const textEdit = 'conteudoPost'; // Usar o nome correto do parâmetro
    const updatedPost = {
      text: textEdit, // Usar a propriedade correta a ser atualizada
    };
    await editPost(postId, textEdit);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId); // Usar o objeto "db" corretamente
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
  });
});

describe('likePost', () => {
  it('must add the username to the list of likes', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockUnion = 'union';
    arrayUnion.mockReturnValueOnce(mockUnion);

    const postId = 'id-post';
    const updatedPost = {
      likes: mockUnion,
    };
    await likePost(postId);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
  });
});

describe('unlikePost', () => {
  it('must remove the username from the list of likes', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockRemove = 'remove';
    arrayRemove.mockReturnValueOnce(mockRemove);
    const postId = 'id-post';
    const updatedPost = {
      likes: mockRemove,
    };
    await unlikePost(postId);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
  });
});

describe('deletePost', () => {
  it('must delete the specified post', async () => {
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    deleteDoc.mockResolvedValueOnce();
    const postId = 'id-post';
    await deletePost(postId);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
  });
});
