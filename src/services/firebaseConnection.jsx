import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDksHFMZvi__zQmDdeaeHiNUfVdaemONbQ",
    authDomain: "servicedesk-80c16.firebaseapp.com",
    projectId: "servicedesk-80c16",
    storageBucket: "servicedesk-80c16.appspot.com",
    messagingSenderId: "1035905245527",
    appId: "1:1035905245527:web:db69dde9f7e8c850491e12",
    measurementId: "G-4GNSH20127"
};


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
