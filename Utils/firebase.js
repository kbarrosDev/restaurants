import firebase from 'firebase/app'
//import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAe5IZlKpKn1k6ahxrk8j65_cB3c04EDcg", 
    authDomain: "restaurants-26bee.firebaseapp.com",
    projectId: "restaurants-26bee",
    storageBucket: "restaurants-26bee.appspot.com",
    messagingSenderId: "676046426767",
    appId: "1:676046426767:web:6a26453a12d6e6e193d6fa"
  };
  
  
  // Initialize Firebase
  
  export const firebaseApp = firebase.initializeApp(firebaseConfig);