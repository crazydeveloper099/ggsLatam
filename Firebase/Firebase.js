import firebase from 'firebase';
import 'firebase/messaging';
const config={
    apiKey: "AIzaSyDgWeTlLT4qMGOtop75NPTyz8ZX4woD8hc",
    authDomain: "retosgamer-328be.firebaseapp.com",
    databaseURL: "https://retosgamer-328be.firebaseio.com",
    projectId: "retosgamer-328be",
    storageBucket: "retosgamer-328be.appspot.com",
    messagingSenderId: "935537268417",
    appId: "1:935537268417:web:69f145053c591119fce640",
    measurementId: "G-0XR8CZH0JP"
}


if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }else {
    firebase.app(); 
 }

 

export default firebase;