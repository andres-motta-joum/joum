// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBndfuQhEY6BDKvU6IyYp_VRS_vX-sqDYM",
    authDomain: "joum-b86f6.firebaseapp.com",
    projectId: "joum-b86f6",
    storageBucket: "joum-b86f6.appspot.com",
    messagingSenderId: "708154280662",
    appId: "1:708154280662:web:d90e98e2855361888a5777",
    measurementId: "G-P9DJ0YX0Y2"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);