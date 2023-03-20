import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  createUserWithEmail, signIn, loginGoogle, logOut,
} from '../../src/firebase/auth';

jest.mock('firebase/auth');

jest.clearAllMocks();

// Teste função de cadastro
describe('createUserWithEmail', () => {
  it('should create a new user', async () => {
    const UserCredential = {
      user: {},
    };
    // Define um objeto mockUserCredential vazio que será usado como valor de
    // retorno simulado da função createUserWithEmailAndPassword
    createUserWithEmailAndPassword.mockResolvedValue(UserCredential);
    // A função createUserWithEmailAndPassword é configurada para retornar o objeto
    // mockUserCredential quando for chamada com os parâmetros apropriados. Isso é feito
    // usando a função mockResolvedValue fornecida por uma biblioteca de simulação de teste.

    // O mockResolvedValue é uma função que permite simular um valor de retorno para uma função
    // assíncrona que retorna uma Promise. Nesse teste, a função createUserWithEmailAndPassword
    // retorna uma Promise que resolve em um objeto que contém as informações do usuário criado.
    // Para simular a execução bem-sucedida dessa Promise, é utilizado o mockResolvedValue para
    // definir um valor simulado de retorno que será retornado pela função
    // createUserWithEmailAndPassword quando ela for chamada no teste. O valor simulado de retorno
    // é um objeto mockUserCredential que contém um objeto vazio user, simulando o resultado da
    // criação bem-sucedida de um usuário. Ao definir esse valor simulado de retorno, o teste pode
    // validar se a função createUserWithEmailAndPassword está retornando o resultado esperado
    // e se a função está funcionando corretamente.

    await createUserWithEmail('teste@teste.com', 'teste123');
    // O teste chama a função createUserWithEmail com um email e senha de exemplo e aguarda
    // a conclusão da função.

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, 'teste@teste.com', 'teste123');
  // O teste verifica se a função createUserWithEmailAndPassword
  // foi chamada exatamente uma vez com os parâmetros esperados.
  // O valor undefined é usado para indicar que não há um usuário autenticado no momento da
  // chamada à função. Essa é uma forma de testar a criação de um novo usuário, passando valores
  // para os argumentos email e password sem a necessidade de fornecer um objeto válido que
  // represente um usuário autenticado.
  });
});

// Teste função de login
describe('signIn', () => {
  it('should login with an email and password', async () => {
    await signIn('email@teste.com', '123456');

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, 'email@teste.com', '123456');
  });
});

// Teste login com o Google
describe('loginGoogle', () => {
  it('should login with a Google account', async () => {
    signInWithPopup.mockResolvedValue();
    await loginGoogle();

    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(undefined, {});
  });
});

// Função para saber se a pessoa fez logout
describe('logOut', () => {
  it('should show if the user is logged out', async () => {
    signOut.mockResolvedValue();
    await logOut();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(undefined);
  });
});

/*
// Teste função de cadastro
describe('createUserWithEmail', () => {
  it('should create a new user', () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {},
    });
    createUserWithEmail('teste@teste.com', 'teste123');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

// Teste função de login
describe('signIn', () => {
  it('should login with an email and password', () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: {},
      password: {},
    });
    signIn('email@teste.com', '123456');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
}); */
