import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const  firebaseConfig = {
    apiKey: "AIzaSyAt0xZ74WOw4wpxXvZC14_ua8fJXxcMObg",
    authDomain: "shoppinglist-7cfbc.firebaseapp.com",
    projectId: "shoppinglist-7cfbc",
    storageBucket: "shoppinglist-7cfbc.appspot.com",
    messagingSenderId: "968558247557",
    appId: "1:968558247557:web:f81865a27d24652f5df3ec"
  };
  // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);

 const auth = fire.auth()
 const db =fire.firestore()

 export{auth,db}