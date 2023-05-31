
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAxbOWIsnzPVarx8RNDDjl4vroQW0egYsk",
    authDomain: "ska-capgemini.firebaseapp.com",
    projectId: "ska-capgemini",
    storageBucket: "ska-capgemini.appspot.com",
    messagingSenderId: "371363879475",
    appId: "1:371363879475:web:945de94cddc19bb7626146",
    measurementId: "G-SK2KCC91WP"
  };
  
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export  {
    storage, firebase as default
  }
