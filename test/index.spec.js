import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  getAuth,
} from 'firebase/auth';

import {
  //getFirestore,
  //collection,
  //addDoc,
  //getDocs,
  // getDoc,
  //setDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import {
  criarUsuario,
  autenticarUsuario,
  logarGoogle,
  redefinirSenha,
  deletarPost,
  curtir,
  descurtir,
  editarPost
} from '../src/firebase/firebase';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
}));

import { mockAuth } from '../src/mocks/export';


// função de autenticar usuário
describe('autenticarUsuario', () => {
  it('deve ser uma função', () => {
    expect(typeof autenticarUsuario).toBe('function')
  });
  it('autentica dados do login e libera a página do feed ', async () => {
    signInWithEmailAndPassword.mockResolvedValue();
    await autenticarUsuario('teste@teste.com', '123456');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

// função de criar usuário

describe('criarUsuario', () => {
  it('a função deve criar uma conta de usuário utilizando o seu nome, nome do seu cão, email e senha', async () => {

    getAuth.mockReturnValueOnce(mockAuth);
    createUserWithEmailAndPassword.mockResolvedValueOnce();

    const email = 'teste@teste.com';
    const password = '12345678';
    const nomeTutor = 'teste';
    const nomeCao = 'luigi'
    await criarUsuario(nomeTutor, nomeCao, email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword.jest.fn()).toHaveBeenCalledWith(mockAuth, email, password);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockAuth.currentUser, {
      displayName: nomeTutor,
    });
  });
});

// describe('criarUsuario', () => {
//   it('deve criar um usuário', () => {
//     createUserWithEmailAndPassword.mockResolvedValue({
//       user: {},
//     });
//     criarUsuario('teste@teste.com', 'teste123');
//     expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
//   });
// });

// logar com o google
describe('logarGoogle', () => {
  it('a função deve logar usuário com a sua conta google', () => {
    signInWithPopup.mockResolvedValue();
    logarGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});


// redefinir senha
describe('redefinirSenha', () => {
  it('a função deve logar usuário com a sua conta google', () => {
    sendPasswordResetEmail.mockResolvedValue();
    redefinirSenha();
    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
  });
});


// botão de deletar
describe('deletarPost', () => {
  it('deve ser uma função', () => {
    expect(typeof deletarPost).toBe('function');
  });
  it('a função deve deletar uma publicação a partir do id do usuário', () => {
    const mockPostRef = {};
    const mockPostColecao = {
      posts: {
        postId: '1234',
      },
    };
    
    doc.mockReturnValueOnce(mockPostRef);
    deleteDoc.mockResolvedValueOnce(mockPostRef);

    deletarPost(mockPostColecao.posts.postId);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', mockPostColecao.posts.postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockPostRef);
  });
});

//botão de curtir
describe('curtir', () => {
  it('deve ser uma função', () => {
    expect(typeof curtir).toBe('function');
  });
  it('a função deve adicionar uma curtida no post', () => {
    curtir('testIdPost', 'testUserName');
    expect(arrayUnion).toHaveBeenCalledTimes(1);
    expect(arrayUnion).toHaveBeenCalledWith('testUserName');
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(undefined, { 'likes': undefined });
  });
});


//descurtir 
describe('descurtir', () => {
  it('deve ser uma função', () => {
    expect(typeof descurtir).toBe('function');
  });
  it('a função deve remover a curtida de um post', () => {
    descurtir('testIdPost', 'testUserName');
    expect(arrayRemove).toHaveBeenCalledTimes(1);
    expect(arrayRemove).toHaveBeenCalledWith('testUserName');
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(undefined, { 'likes': undefined });
  });
});


// editar
describe('editarPost', () => {
  it('deve ser uma função', () => {
    expect(typeof editarPost).toBe('function');
  });
  it('a função deve editar uma publicação', () => {
    const userId = 'id do usuario';
    const postParaSerEditado = 'texto a ser editado';
    const dataPostagem = '21/03/2023';
    updateDoc.mockResolvedValue();
    editarPost(userId, postParaSerEditado);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', userId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(undefined, {
      texto: postParaSerEditado,
      data: dataPostagem,
    });
  });
});








//sair










