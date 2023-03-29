import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
} from 'firebase/auth';

import {
  createUser,
  valuesLogin,
} from '../src/servicesFirebase/firebaseAuth';

// função de criar usuário//

describe('criarUsuario', () => {
  it('a função deve criar uma conta do usuário utilizando o email e senha', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce();
    const email = 'teste@teste.com';
    const senha = '12345678';
    await createUser(email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, senha);
  });
});
