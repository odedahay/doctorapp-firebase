
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAaCU7JeX67wuwrkO1EeS0xCw-jixoWRjU",
    authDomain: "doctorapp-lite.firebaseapp.com",
    projectId: "doctorapp-lite",
    storageBucket: "doctorapp-lite.firebasestorage.app",
    messagingSenderId: "317525248935",
    appId: "1:317525248935:web:901b0248d9cc867a74c482",
    measurementId: "G-57Y9MLYYG8"
};


const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app)

export default firestoreDatabase;