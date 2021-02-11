import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgxteP3rxBkJNpqLwVtiLe59m4Mgm8nC8",
    authDomain: "whatsappcloneweb-df1ff.firebaseapp.com",
    projectId: "whatsappcloneweb-df1ff",
    storageBucket: "whatsappcloneweb-df1ff.appspot.com",
    messagingSenderId: "87870925880",
    appId: "1:87870925880:web:0b396d99e2fba73545cacd",
    measurementId: "G-41BB4KW74E"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;