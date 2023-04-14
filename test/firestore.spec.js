import {
  collection,
  addDoc,
} from 'firebase/firestore';

import {
  userData, newPost,

} from '../src/servicesFirebase/fireStore';

jest.mock('firebase/firestore');

// acessar dados e conta do usuário//

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
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
});
