import firebase from 'firebase/compat';
import "firebase/compat/auth";
require('firebase/compat/firestore')
const firebaseConfig = {
    apiKey: "AIzaSyAC1XLQGwPEHLEVDaEcCj4ZjqYMa6SPGog",
    authDomain: "instashare-7eb98.firebaseapp.com",
    databaseURL: "https://instashare-7eb98-default-rtdb.firebaseio.com",
    projectId: "instashare-7eb98",
    storageBucket: "instashare-7eb98.appspot.com",
    messagingSenderId: "444459973156",
    appId: "1:444459973156:web:2b7fdda7aad4e1effb36b1",
    measurementId: "G-DDJZEH0ETM"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
const auth = firebase.auth();
export default auth;