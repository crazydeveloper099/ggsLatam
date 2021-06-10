import firebase from "firebase/app";
import "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyDgWeTlLT4qMGOtop75NPTyz8ZX4woD8hc",
  authDomain: "retosgamer-328be.firebaseapp.com",
  projectId: "retosgamer-328be",
  storageBucket: "retosgamer-328be.appspot.com",
  messagingSenderId: "935537268417",
  appId: "1:935537268417:web:69f145053c591119fce640"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}
let messaging ;

if (process.browser) {
    messaging = firebase.messaging();
}


// export default function getToken(setTokenFound){
//   return messaging.getToken({vapidKey: 'BF7QtuegTI-Waf-JX6Oo6J0ksTy8EJqT2qAIlb2LzD5OKZ66de4K-4izTo-5mupw14MZg7bYcxuN3Cht7XFxxhU'}).then((currentToken) => {
//     if (currentToken) {
//       console.log('current token for client: ', currentToken);
//       setTokenFound(true);
//       // Track the token -> client mapping, by sending to backend server
//       // show on the UI that permission is secured
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//       setTokenFound(false);
//       // shows on the UI that permission is required 
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // catch error while creating client token
// })
// }

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
// });