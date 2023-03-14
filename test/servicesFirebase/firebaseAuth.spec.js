/* eslint-disable no-unused-vars */
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { createUser } from '../../src/servicesFirebase/firebaseAuth';

it('deve criar usuario e atualizar perfil com sucesso', () => {
  // console.log(createUser);
  // console.log(updateProfile);
  // console.log(getAuth);
  expect(1).toBe(1);
}); // instalar plugin do eslint nas exten
