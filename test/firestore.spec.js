import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from 'firebase/firestore';

import {
  userData, newPost, deletarPost, postsNaTela, likePost, editPost,
} from '../src/servicesFirebase/fireStore';

jest.mock('firebase/firestore');

// acessar dados e conta do usuário//
beforeEach(() => {
  jest.clearAllMocks();
});

describe('teste userData', () => {
  it('deve acessar os dados do usuário e guardar na coleção', async () => {
    addDoc.mockResolvedValueOnce();
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);
    const nome = 'nome';
    const email = 'email';
    const uid = 'uid';
    const users = {
      displayName: nome,
      email,
      uid,
    };
    await userData(nome, email, uid);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, users);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'users');
  });
});

// criar post//
describe('Função newPost', () => {
  it('deve criar um post e guardar na coleção', async () => {
    addDoc.mockRestore();
    addDoc.mockResolvedValueOnce();
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);

    const dataPostagem = 'xx/xx/xxxx';
    const post = 'texto';
    const username = 'usernameTeste';
    const id = 'usernameteste';
    const likesArray = [];
    const posts = {
      date: dataPostagem,
      idUser: id,
      textArea: post,
      userName: username,
      likes: likesArray,
    };
    await newPost(dataPostagem, id, post, username);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, posts);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'post');
  });
});

// função deletar post //

describe('Função delete', () => {
  it('Deve deletar um post', async () => {
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    deleteDoc.mockResolvedValueOnce();
    const postId = 'id-post';
    await deletarPost(postId);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'post', postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
  });
});

// printar posts na tela //
describe('function postsNaTela', () => {
  it('deve acessar a publicacao criada e retornar um array', async () => {
    const mockOrderBy = 'order';
    orderBy.mockReturnValueOnce(mockOrderBy);
    const mockQuery = 'query';
    query.mockReturnValueOnce(mockQuery);
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);
    getDoc.mockResolvedValueOnce([
      {
        postId: '1',
        data: () => ({ textArea: 'Primeiro post' }),
      },
      {
        postId: '2',
        data: () => ({ textArea: 'Segundo Post' }),
      },
      {
        postId: '3',
        data: () => ({ textArea: 'Terceiro Post' }),
      },
    ]);
    const acessarPost = await postsNaTela();
    expect(acessarPost).toEqual([
      { postId: '1', textArea: 'Primeiro post' },
      { postId: '2', textArea: 'Segundo Post' },
      { postId: '3', textArea: 'Terceiro Post' },
    ]);
    expect(orderBy).toHaveBeenCalledTimes(1);
    expect(orderBy).toHaveBeenCalledWith('date', 'desc');
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'post');
    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith(mockCollection, mockOrderBy);
    expect(getDoc).toHaveBeenCalledTimes(1);
    expect(getDoc).toHaveBeenCalledWith(mockQuery);
  });
});

// contagem de likes //
describe('Função contagem de likes', () => {
  it('deve contabilizar a quantidade de curtidas', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockUnion = 'union';
    arrayUnion.mockReturnValueOnce(mockUnion);
    const postId = 'id-post';
    const idUser = 'id';
    const updatedPost = {
      likes: mockUnion,
    };
    await likePost(postId, idUser);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'post', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
    expect(arrayUnion).toHaveBeenCalledTimes(1);
    expect(arrayUnion).toHaveBeenCalledWith(idUser);
  });
});

// função deslike //
describe('Função contagem de deslikes', () => {
  it('Deve descontabilizar a quantidade de curtidas', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const mockUnion = 'union';
    arrayRemove.mockReturnValueOnce(mockUnion);
    const postId = 'id-post';
    const idUser = 'id';
    const updatedPost = {
      likes: mockUnion,
    };
    await likePost(postId, idUser);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'post', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
    expect(arrayRemove).toHaveBeenCalledTimes(1);
    expect(arrayRemove).toHaveBeenCalledWith(idUser);
  });
});

// função editar post //
describe('Função editPost', () => {
  it('Deve editar uma publicação', async () => {
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
    expect(doc).toHaveBeenCalledWith(undefined, 'post', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
  });
});
