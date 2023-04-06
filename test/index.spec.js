import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { cadastrar } from '../src/lib/api.js';

jest.mock('firebase/auth');

describe('cadastrar', () => {
  it('deve cadastrar os usuários a partir do e-mail e senha', async () => {
    const mockUserCredential = {
      user: {},
    };
    createUserWithEmailAndPassword.mockResolvedValueOnce(mockUserCredential);
    updateProfile.mockResolvedValueOnce();
    const email = 'usuarioteste@123.com';
    const senha = 'senha123';
    await cadastrar('usuarioteste', email, senha);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});
