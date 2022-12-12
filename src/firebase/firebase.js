import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyAewEFypEtf4AE3ROJbo7lABrJLw2j9MF0',
  authDomain: 'primary-auto-repair.firebaseapp.com',
  projectId: 'primary-auto-repair',
  storageBucket: 'primary-auto-repair.appspot.com',
  messagingSenderId: '280587959381',
  appId: '1:280587959381:web:53aec0d53ce08ab79fe8dc',
});

//  Services Getter Functions
const db = getFirestore(app);

export {
  db,
  doc,
  getDocs,
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  setDoc
};
