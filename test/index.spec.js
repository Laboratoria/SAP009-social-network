import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  // getFirestore,
  collection,
  addDoc,
  getDocs,
  // getDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  // getDocs,
  db,
} from 'firebase/firestore';

import {
  autenticarUsuario,
  criarUsuario,
  logarGoogle,
  redefinirSenha,
  criarPost,
  obterPosts,
  // obterNomeUsuario,
  verificaUsuarioLogado,
  deletarPost,
  editarPost,
  curtir,
  descurtir,
  sair,
} from '../src/firebase/firebase';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: '5555',
      displayName: 'Usuário de teste',
    },
  })),
  GoogleAuthProvider: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
  setDoc: jest.fn(),
  signOut: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  db: jest.fn(),
}));

describe('firebase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // função de autenticarUsuario
  describe('autenticarUsuario', () => {
    it('deve ser uma função', () => {
      expect(typeof autenticarUsuario).toBe('function');
    });
    it('autentica dados do login e libera a página do feed ', async () => {
      signInWithEmailAndPassword.mockResolvedValue();
      await autenticarUsuario('teste@teste.com', '123456');
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });

  // função de criar usuário

  describe('criarUsuario', () => {
    it('a função deve criar uma conta de usuário utilizando o seu nome, email e senha', async () => {
      createUserWithEmailAndPassword.mockResolvedValueOnce();

      const email = 'teste@teste.com';
      const senha = '12345678';
      const nomeTutor = 'João';
      const nomeCao = 'Luigi';
      await criarUsuario(email, senha, nomeTutor, nomeCao);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, senha);
      expect(updateProfile).toHaveBeenCalledTimes(1);
      expect(updateProfile).toHaveBeenCalledWith(getAuth().currentUser, { displayName: nomeTutor });
    });
  });

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

  // criarPost

  it('deve criar um post e guardar na coleção', async () => {
    addDoc.mockResolvedValueOnce({ id: '1234' });
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);

    const texto = 'postagem teste';
    const dataPostagem = new Date(Date.now()).toLocaleDateString();

    const post = {
      author: getAuth().currentUser.uid,
      data: dataPostagem,
      nomeTutor: getAuth().currentUser.displayName,
      texto,
      likes: [],
      id: '1234',
    };

    await criarPost(texto);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, post);
    expect(collection).toHaveBeenCalledTimes(1);
    await expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
  // obter post
  describe('obterPosts', () => {
    it('deve retornar um array de posts', async () => {
      getDocs.mockResolvedValue([
        {
          id: 'PwGTKDq5TzR072lIieVOUCEtwcP2',
          data: () => ({ texto: 'Post 1' }),
        },
        {
          id: 'Ii0jdAZ99BUQIpW9sCRNKavigUR2',
          data: () => ({ texto: 'Post 2' }),
        },
      ]);
      const posts = await obterPosts();
      expect(posts).toEqual([
        { id: 'PwGTKDq5TzR072lIieVOUCEtwcP2', texto: 'Post 1' },
        { id: 'Ii0jdAZ99BUQIpW9sCRNKavigUR2', texto: 'Post 2' },
      ]);
      expect(getDocs).toHaveBeenCalledWith(collection(db, 'posts'));
    });
  });

  // obterNomeUsuario

  // verificaUsuarioLogado
  describe('verificarUsuarioLogado', () => {
    it('deve redirecionar para o feed se o usuário estiver logado', () => {
      onAuthStateChanged.mockResolvedValue();
      verificaUsuarioLogado();
      expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
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

  // editar
  describe('editarPost', () => {
    it('deve ser uma função', () => {
      expect(typeof editarPost).toBe('function');
    });
    it('a função deve editar uma publicação', () => {
      const userId = 'id do usuario';
      const postParaSerEditado = 'texto a ser editado';
      const dataPostagem = new Date(Date.now()).toLocaleDateString();
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

  // botão de curtir
  describe('curtir', () => {
    it('deve ser uma função', () => {
      expect(typeof curtir).toBe('function');
    });
    it('a função deve adicionar uma curtida no post', () => {
      curtir('testIdPost', 'testUserName');
      expect(arrayUnion).toHaveBeenCalledTimes(1);
      expect(arrayUnion).toHaveBeenCalledWith('testUserName');
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(undefined, { likes: undefined });
    });
  });

  // descurtir
  describe('descurtir', () => {
    it('deve ser uma função', () => {
      expect(typeof descurtir).toBe('function');
    });
    it('a função deve remover a curtida de um post', () => {
      descurtir('testIdPost', 'testUserName');
      expect(arrayRemove).toHaveBeenCalledTimes(1);
      expect(arrayRemove).toHaveBeenCalledWith('testUserName');
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(undefined, { likes: undefined });
    });
  });

  // sair

  describe('sair', () => {
    it(' a função deve deslogar o usuario', () => {
      signOut.mockResolvedValue({
        user: {},
      });
      sair();
      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });
  // redirecionarPagina
});
