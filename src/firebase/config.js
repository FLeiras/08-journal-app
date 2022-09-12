// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCIPoos7O-Ov2Ljy0Q6BB1bdKokBmzbrHA',
  authDomain: 'react-curso-90f7c.firebaseapp.com',
  projectId: 'react-curso-90f7c',
  storageBucket: 'react-curso-90f7c.appspot.com',
  messagingSenderId: '763082254365',
  appId: '1:763082254365:web:fb64721feb6f219fe37ef4',
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireBaseApp);
export const FirebaseDB = getFirestore(FireBaseApp);
