import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebase = initializeApp(
{
  apiKey: "AIzaSyDdeXpZk37fbzRLB4reVtmhnXNVWVbI0XE",
  authDomain: "blog-893dd.firebaseapp.com",
  projectId: "blog-893dd",
  storageBucket: "blog-893dd.appspot.com",
  messagingSenderId: "57757338807",
  appId: "1:57757338807:web:3dc6034ff0cb4cc88d1132",
  measurementId: "G-29Q71XY2ZK"
});

export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
export const firestorage = getStorage(firebase);

