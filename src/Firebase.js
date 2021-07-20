// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCkib2foOxQr7nuhESRbCUvdIsl9Jhsl2I",
  authDomain: "whatsapp-clone-e93bb.firebaseapp.com",
  projectId: "whatsapp-clone-e93bb",
  storageBucket: "whatsapp-clone-e93bb.appspot.com",
  messagingSenderId: "492200524550",
  appId: "1:492200524550:web:44ffe9a8245c269d5bbc87",
  measurementId: "G-C2NFHPT60D"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;
