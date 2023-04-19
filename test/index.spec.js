import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import {
  criarCadastro,
  obterUsuaria,
  loginComGoogle,
  observador,
  fazerLogin,
  sair,
  criarPostagem,
  editandoPostagem,
  excluindoPostagem,
} from '../src/firebase/firebase';
// import { app } from '../src/firebase/firebase.config';

// mocks para o firebase
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

// limpar teste anteriores
describe('firebase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // para criar cadastro
  it('deve criar um cadastro', async () => {
    const email = 'teste@teste.com';
    const senha = '123456';
    const nomeUsuaria = 'Usuária';

    const autenticacao = {};
    const usuaria = {};

    getAuth.mockReturnValue(autenticacao);
    createUserWithEmailAndPassword.mockReturnValue(usuaria);

    await criarCadastro(email, senha, nomeUsuaria);

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, senha);
    expect(updateProfile).toHaveBeenCalledWith(autenticacao, { displayName: nomeUsuaria });
  });
  // Obter usuária logada
  test('obterUsuaria retorna os dados da usuária autenticada', async () => {
    const autenticacao = {
      currentUser: {
        uid: '123',
        displayName: 'Teste',
        email: 'teste@teste.com',
      },
    };
    getAuth.mockReturnValue(autenticacao);

    const usuaria = await obterUsuaria(getAuth);

    expect(usuaria.uid).toBe('123');
    expect(usuaria.displayName).toBe('Teste');
    expect(usuaria.email).toBe('teste@teste.com');
    expect(usuaria.nomeUsuaria).toBe('Teste');
  });
  // login com o gogole
  describe('loginComGoogle', () => {
    it('deve logar usúaria com o email do google e autenticar', async () => {
      signInWithPopup.mockReturnValueOnce();
      GoogleAuthProvider.mockReturnValueOnce();
      await loginComGoogle();
      expect(signInWithPopup).toHaveBeenCalledTimes(1);
      expect(signInWithPopup).toHaveBeenCalledWith(undefined, {});
    });
  });
  // função observador
  describe('observar movimentação da usuária', () => {
    it('usuário deve logar e deslogar', () => {
      const callback = jest.fn();
      observador(callback);
      expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
      expect(onAuthStateChanged).toHaveBeenCalledWith(undefined, callback);
    });
  });
  // Fazer login
  describe('fazerLogin', () => {
    it('usuária deve conseguir logar com email e senha previamente cadastrado', async () => {
      const email = 'teste@teste.com';
      const senha = '123456';
      const autenticacao = {
        currentUser: {},
      };
      getAuth.mockReturnValue(autenticacao);
      signInWithEmailAndPassword.mockReturnValueOnce();

      await fazerLogin(email, senha);
      expect(getAuth).toHaveBeenCalledTimes(1);
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(autenticacao, email, senha);
    });
  });
  // Deslogar
  describe('sair', () => {
    it('deve deslogar a usuária', async () => {
      signOut.mockReturnValue();
      await sair();
      expect(signOut).toHaveBeenCalledTimes(1);
      expect(signOut).toHaveBeenCalledWith(undefined);
    });
  });
  // Criar postagem
  describe('criar post e guardar na coleção', () => {
    it('deve criar postagem com os dados fornecidos', async () => {
      const mockCollection = 'collection';
      collection.mockReturnValueOnce(mockCollection);
      const texto = 'Esse é meu post';
      const data = new Date().toLocaleString();
      const postagem = {
        id: '1234r',
        idUsuaria: getAuth().currentUser.uid,
        nomeUsuaria: getAuth().currentUser.displayName,
        texto,
        likes: [],
        data,
      };
      addDoc.mockResolvedValueOnce({ id: '1234r' });
      await criarPostagem(texto);

      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(addDoc).toHaveBeenCalledWith(mockCollection, postagem);
      expect(collection).toHaveBeenCalledTimes(1);
      await expect(collection).toHaveBeenCalledWith(undefined, 'postagens');
    });
  });
  describe('editandoPostagem', () => {
    it('deve ser uma função', () => {
      expect(typeof editandoPostagem).toBe('function');
    });
    it('a usuária deve conseguir editar uma publicação', () => {
      const idUsuario = 'id do usuario';
      const postagemEditado = 'texto a ser editado';
      updateDoc.mockResolvedValue();
      editandoPostagem(idUsuario, postagemEditado);
      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenLastCalledWith(undefined, 'postagens', idUsuario);
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenLastCalledWith(undefined, {
        texto: postagemEditado,
      });
    });
  });
  describe('excluindoPostagem', () => {
    it('deve ser uma função', () => {
      expect(typeof excluindoPostagem).toBe('function');
    });
    it('a função deve excluir uma pulicação própria', () => {
      const mockpostRef = {};
      const mockPostColecao = {
        postagens: {
          idDoPost: {},
        },
      };
      doc.mockReturnValueOnce(mockpostRef);
      deleteDoc.mockResolvedValueOnce(mockpostRef);
      excluindoPostagem(mockPostColecao.postagens.idDoPost);

      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(undefined, 'postagens', mockPostColecao.postagens.idDoPost);
      expect(deleteDoc).toHaveBeenCalledTimes(1);
      expect(deleteDoc).toHaveBeenCalledWith(mockpostRef);
    });
  });
});
