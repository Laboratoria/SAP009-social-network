// importamos la funcion que vamos a testear
import { signIn, createUser, logOut } from '../src/firebase/auth.js';
import {
  addPost, deletePost, editPost, printPost,
} from '../src/firebase/config.js';

it('should execute firebase login function', () => {
  const email = 'email@gmail.com';
  const password = 'password';
  signIn(email, password);
  expect(typeof signIn).toBe('function');
});

it('should execute firebase register function', () => {
  const email = 'email@gmail.com';
  const password = 'password';
  const confirmPassword = 'password';
  createUser(email, password, confirmPassword);
  expect(typeof createUser).toBe('function');
});

it('should execute firebase logout function', () => {
  const email = 'email@gmail.com';
  const password = 'password';
  logOut(email, password);
  expect(typeof logOut).toBe('function');
});

it('should execute firebase post function', () => {
  const date = '';
  const post = '';
  const username = '';
  addPost(date, post, username);
  expect(typeof addPost).toBe('function');
});

it('should execute firebase delete post function', () => {
  const postId = 'posts';
  deletePost(postId);
  expect(typeof deletePost).toBe('function');
});

it('should execute firebase edit post function', () => {
  const postId = 'posts';
  const newPostData = 'post: newPostData';
  editPost(postId, newPostData);
  expect(typeof editPost).toBe('function');
});

it('should execute firebase print post function', () => {
  const posts = 'posts';
  printPost(posts);
  expect(typeof printPost).toBe('function');
});
