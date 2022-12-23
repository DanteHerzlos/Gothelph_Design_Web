import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "gothelph-design.firebaseapp.com",
  projectId: "gothelph-design",
  storageBucket: "gothelph-design.appspot.com",
  messagingSenderId: "388954105150",
  appId: "1:388954105150:web:c7c5e4e0677259d370386f",
};

const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);