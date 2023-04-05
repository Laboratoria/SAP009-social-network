/* eslint-disable no-use-before-define */
import {
  getDocs, collection, addDoc, updateDoc, doc, deleteDoc,getDoc, query, where
} from 'firebase/firestore';

import { db } from './firestore.js';

import { auth } from '../firebase/auth';

export const createNewPost = async (title, textPost) => {
  const post = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    title,
    textPost,
    dateTime: new Date().toLocaleTimeString([], {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }),
    updateDateTime: '',
    likes: [],
    timestamp: new Date().getTime(),
  };

  const docReference = await addDoc(collection(db, 'posts'), post);
  post.id = docReference.id;
  return getAllUsersPosts();
};

export const updatePost = async (title, textPost, postId) => {
  await updateDoc(doc(db, 'posts', postId), {
    title,
    textPost,
    updateDateTime: new Date().toLocaleTimeString([], {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }),
    timestamp: new Date().getTime(),
  });
  return getAllUsersPosts();
};

export const deletePost = async (postId) => {
  const docReference = doc(db, 'posts', postId);
  await deleteDoc(docReference);
};

export const getLoggedUserAllPosts = async () => {
  const postsCollection = await getDocs(collection(db, 'posts'));
  const posts = [];
  postsCollection.forEach((post) => {
    const data = post.data();
    if (data.uid === auth.currentUser.uid) {
      data.id = post.id;
      posts.push(data);
    }
  });
  return posts;
};

export const getAllUsersPosts = async () => {
  const allPostsCollection = await getDocs(collection(db, 'posts'));
  const allPosts = [];
  allPostsCollection.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    allPosts.push(data);
  });
  return allPosts;
};

export const getLoggedUserLikes = async () => {
  const userDocReference = doc(db, 'users', auth.currentUser.uid);
  const userDocSnapshot = await getDoc(userDocReference);
  const userLikes = userDocSnapshot.data().likes || [];
  
 
  const allPostsCollection = await getDocs(collection(db, 'posts'));
  const allPosts = allPostsCollection.docs.map(post => {
    const postData = post.data();
    postData.id = post.id;
    return postData;
  });
  
  const likedPosts = allPosts.filter(post => userLikes.includes(post.id));
  
  console.log(likedPosts);

  return likedPosts;
  
};

export const likePosts = async (post, userId) => {
  const postDocReference = doc(db, 'posts', post.id);
  const getPostDoc = await getDoc(postDocReference);
  const likes = getPostDoc.data().likes || [];
  let newLikes;
  if (likes.includes(userId)) {
    newLikes = likes.filter((id) => id !== userId);
  } else {
    newLikes = [...likes, userId];
  }
  await updateDoc(postDocReference, { likes: newLikes });

  const userDocReference = doc(db, 'users', userId);
  const getUserDoc = await getDoc(userDocReference);
  const userLikes = getUserDoc.data().likes || [];
  let userNewLikes;
  if (userLikes.includes(post.id)) {
    userNewLikes = userLikes.filter((id) => id !== post.id);
  } else {
    userNewLikes = [...userLikes, post.id];
  }
  await updateDoc(userDocReference, { likes: userNewLikes });
  
  const updatedPosts = await getAllUsersPosts();
  return updatedPosts;
};



