
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfTKU1y6obHDPBFpkrOYbg7E3v6wEXwrQ",
  authDomain: "fir-tutorial-fe31d.firebaseapp.com",
  projectId: "fir-tutorial-fe31d",
  storageBucket: "fir-tutorial-fe31d.appspot.com",
  messagingSenderId: "384650749604",
  appId: "1:384650749604:web:9b877a0907d0e04e01e831"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);



