import firebase from "firebase"


var firebaseConfig = {
    apiKey: "AIzaSyAw6K0KZNwiUkeHh56UHm4BLGU7sfp2V4g",
    authDomain: "podcast-95176.firebaseapp.com",
    projectId: "podcast-95176",
    storageBucket: "podcast-95176.appspot.com",
    messagingSenderId: "82548964279",
    appId: "1:82548964279:web:9b12ec2bf66e9e2f810632",
    measurementId: "G-RCJ3BPMBGZ"
  };
  // Initialize Firebase
const fire=firebase.initializeApp(firebaseConfig);
export default fire