import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDzWG7aHrkViM9jT1Ew-DeaZLu4vOEh7Iw",
    authDomain: "formato-pedidos-gpa.firebaseapp.com",
    databaseURL: "https://formato-pedidos-gpa.firebaseio.com",
    projectId: "formato-pedidos-gpa",
    storageBucket: "formato-pedidos-gpa.appspot.com",
    messagingSenderId: "390038235571",
    appId: "1:390038235571:web:0a0971e1e8a0f3309c83c6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export {
    db,
    firebase
}