import {
  auth,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';

import {
  db,
  getPosts,
  newPost,
  getPost,
  editPost,
  likePost,
  deletePost,
} from '../src/firebase/firestore';

jest.mock('firebase/firestore');
jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getPosts', () => {
  it('must get a list of posts', async () => {
    const mockPost1 = {
      id: 'idPost1',
      text: 'conteudoPost1',
      publishDate: new Date(),
    };
    const mockPost2 = {
      id: 'idPost2',
      text: 'conteudoPost2',
      publishDate: new Date(),
    };
    const mockPostCollection = {
      forEach: (callback) => {
        callback(mockPost1);
        callback(mockPost2);
      },
    };
    const mockQuerySnapshot = {
      data: jest.fn(() => mockPostCollection),
    };
    getDocs.mockResolvedValue(mockQuerySnapshot);
    const expectedArrayPosts = [{ id: 'idPost1', ...mockPost1 }, { id: 'idPost2', ...mockPost2 }];
    const result = await getPosts();
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(getDocs).toHaveBeenCalledWith(
      query(collection(db, 'posts'), orderBy('publishDate', 'desc')),
    );
    expect(result).toEqual(expectedArrayPosts);
  });
});

describe('newPost', () => {
  it('must create a post and save it in the collection', async () => {
    addDoc.mockResolvedValueOnce();
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);

    const postText = 'text';
    const posts = {
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
    expect(collection).toHaveBeenCalledWith(db, 'posts');
  });
});

describe('getPost', () => {
  it('must get a post', async () => {
    const mockPost = {
      text: 'conteudoPost',
      publishDate: new Date(),
    };
    const mockQuerySnapshot = {
      data: jest.fn(() => mockPost),
      id: 'idPost',
    };
    getDoc.mockResolvedValue(mockQuerySnapshot);
    const postId = 'idPost';
    const expectedPost = {
      id: 'idPost',
      ...mockPost,
    };
    const result = await getPost(postId);
    expect(getDoc).toHaveBeenCalledTimes(1);
    expect(getDoc).toHaveBeenCalledWith(doc(db, 'posts', postId));
    expect(result).toEqual(expectedPost);
  });
});

describe('editPost', () => {
  it('must edit a post', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const postId = 'idPost';
    const textEdit = 'conteudoPost';
    const updatedPost = {
      text: textEdit,
    };
    await editPost(postId, textEdit);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
  });
});

describe('likePost', () => {
  it('must add the username to the list of likes', async () => {
    // criando valores falsos para a função likePost
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockUnion = 'union';
    arrayUnion.mockReturnValueOnce(mockUnion);

    // criando valores de entrada:
    const postId = 'id-post'; // ID de post fictício
    const updatedPost = {
      like: mockUnion,
    };
    await likePost(postId);

    expect(doc).toHaveBeenCalledTimes(1); // verifica se a função foi chamada exatamente uma vez
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId); // verifica se foi chamada com os parâmetros esperados.
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
  });

  it('must remove the username from the list of likes if the user has already liked the post', async () => {
    // criando valores falsos para a função likePost
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockRemove = 'remove';
    arrayRemove.mockReturnValueOnce(mockRemove);

    // criando valores de entrada:
    const postId = 'id-post'; // ID de post fictício
    const post = {
      like: [auth.currentUser.uid],
    };
    const updatedPost = {
      like: mockRemove,
    };
    getPost.mockResolvedValueOnce(post);

    await likePost(postId);

    expect(getPost).toHaveBeenCalledTimes(1); // verifica se a função foi chamada exatamente uma vez
    expect(getPost).toHaveBeenCalledWith(postId); // verifica se foi chamada os parâmetros esperados
    expect(doc).toHaveBeenCalledTimes(2); // verifica se a função foi chamada exatamente duas vezes
    expect(doc).toHaveBeenNthCalledWith(1, db, 'posts', postId); // verifica se foi chamada com os parâmetros esperados.
    expect(doc).toHaveBeenNthCalledWith(2, db, 'posts', postId); // verifica se foi chamada com os parâmetros esperados.
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);

    const updatedLikeList = await likePost(postId);
    expect(updatedLikeList).toEqual([]);
  });
});

// describe('likePost', () => {
//   it('must add the username to the list of likes', async () => {
//     updateDoc.mockResolvedValue(); // criando valores falsos para a função likePost
//     const mockDoc = 'doc';
//     doc.mockReturnValueOnce(mockDoc);
//     const mockUnion = 'union';
//     arrayUnion.mockReturnValueOnce(mockUnion);

//     // criando valores de entrada:
//     const postId = 'id-post'; // ID de post fictício
//     const updatedPost = {
//       like: mockUnion,
//     };
//     await likePost(postId);
//     expect(doc).toHaveBeenCalledTimes(1); // verifica se a função foi chamada exatamente uma vez
// eslint-disable-next-line max-len
//     expect(doc).toHaveBeenCalledWith(db, 'posts', postId); // verifica se foi chamada com os parâmetros esperados.
//     expect(updateDoc).toHaveBeenCalledTimes(1);
//     expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
//   });
// });

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
