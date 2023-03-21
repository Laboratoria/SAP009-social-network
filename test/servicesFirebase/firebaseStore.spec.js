import { addDoc, collection, getDocs } from 'firebase/firestore';
import { newPost, userData, accessPost } from '../../src/servicesFirebase/firebaseStore';

jest.mock('firebase/firestore');

it('deve acessar os dados do usuário e guardar na coleção', async () => {
  // userData
  addDoc.mockResolvedValueOnce();
  const mockCollection = 'collection';
  collection.mockReturnValueOnce(mockCollection);
  const name = 'nome';
  const lastname = 'sobrenome';
  const infosAdd = {
    nome: name,
    sobrenome: lastname,
  };
  await userData(name, lastname);

  expect(addDoc).toHaveBeenCalledTimes(1);
  expect(addDoc).toHaveBeenCalledWith(mockCollection, infosAdd);
  expect(collection).toHaveBeenCalledTimes(1);
  expect(collection).toHaveBeenCalledWith(undefined, 'infos-add');
});

it('deve criar um post e guardar na coleção', async () => {
  // newPost
  addDoc.mockResolvedValueOnce();
  const mockCollection = 'collection';
  collection.mockReturnValueOnce(mockCollection);
  const dataPostagem = 'xx/xx/xxxx';
  const postagem = 'texto';
  const username = 'usernameTeste';
  const posts = {
    userName: username,
    data: dataPostagem,
    post: postagem,
    // idUser: 'wxyzUser',
  };
  await newPost(postagem, dataPostagem, username);

  expect(addDoc).toHaveBeenCalledTimes(1);
  expect(addDoc).toHaveBeenCalledWith(mockCollection, posts);
  expect(collection).toHaveBeenCalledTimes(1);
  expect(collection).toHaveBeenCalledWith(undefined, 'posts');
});

it('deve acessar a publicação criada', async () => {
  // accessPost
  getDocs.mockResolvedValueOnce();
  const mockCollection = ['1', '2', '3'];
  collection.mockReturnValueOnce(mockCollection);
  // const querySnapshot = mockCollection;
  // const data;
  // const messages = [];
  await accessPost();

  expect(getDocs).toHaveBeenCalledTimes(1);
  expect(getDocs).toHaveBeenCalledWith(mockCollection);
  expect(collection).toHaveBeenCalledTimes(1);
  expect(collection).toHaveBeenCalledWith(undefined, 'posts');
});
