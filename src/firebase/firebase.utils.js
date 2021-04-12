import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA0iZig-6Y9ht_KjNwCquIwt0qsQnFgVbI',
  authDomain: 'clothing-ecommerce-a2953.firebaseapp.com',
  projectId: 'clothing-ecommerce-a2953',
  storageBucket: 'clothing-ecommerce-a2953.appspot.com',
  messagingSenderId: '363828234588',
  appId: '1:363828234588:web:d9046d672d322280141999',
  measurementId: 'G-VNV838V9X0',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
