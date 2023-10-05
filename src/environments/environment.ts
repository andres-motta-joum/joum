import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const environment = {
  firebase: {
    projectId: 'joum-b86f6',
    appId: '1:708154280662:web:d90e98e2855361888a5777',
    databaseURL: 'https://joum-b86f6-default-rtdb.firebaseio.com',
    storageBucket: 'joum-b86f6.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBndfuQhEY6BDKvU6IyYp_VRS_vX-sqDYM',
    authDomain: 'joum-b86f6.firebaseapp.com',
    messagingSenderId: '708154280662',
    measurementId: 'G-P9DJ0YX0Y2',
  },
  production: false
};
const firebaseConfig = {
  projectId: 'joum-b86f6',
    appId: '1:708154280662:web:d90e98e2855361888a5777',
    databaseURL: 'https://joum-b86f6-default-rtdb.firebaseio.com',
    storageBucket: 'joum-b86f6.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBndfuQhEY6BDKvU6IyYp_VRS_vX-sqDYM',
    authDomain: 'joum-b86f6.firebaseapp.com',
    messagingSenderId: '708154280662',
    measurementId: 'G-P9DJ0YX0Y2',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);