import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyAlxFyl0HUeNT325LtEIuFx9zHrTz7BseI",
  authDomain: "book-santa-fa89e.firebaseapp.com",
  databaseURL: "https://book-santa-fa89e.firebaseio.com",
  projectId: "book-santa-fa89e",
  storageBucket: "book-santa-fa89e.appspot.com",
  messagingSenderId: "32508887705",
  appId: "1:32508887705:web:d29807c23ad0fcfef22e08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();