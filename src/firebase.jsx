import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3zXNi8yd4LV2UgXJRuijBT47SG4j2BT8",
  authDomain: "app-arenados-lucho.firebaseapp.com",
  projectId: "app-arenados-lucho",
  storageBucket: "app-arenados-lucho.appspot.com",
  messagingSenderId: "289429928721",
  appId: "1:289429928721:web:b0d7fb6bba9d1a4837aab0"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
