import {
  collection,
  addDoc,
} from 'firebase/firestore';

import {
  userData,

} from '../src/servicesFirebase/fireStore';

jest.mock('firebase/firestore');

/*acessar dados e conta do usuário*/

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
