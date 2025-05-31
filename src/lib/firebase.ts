
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need analytics

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: Replace with your actual Firebase project configuration!
const firebaseConfig = {
  apiKey: "AIzaSyBdwE237VZUsRZmBFhS6XYZBMT3wnIr97Y", // REPLACE WITH YOURS
  authDomain: "const-connect.firebaseapp.com", // REPLACE WITH YOURS
  projectId: "const-connect", // REPLACE WITH YOURS
  storageBucket: "const-connect.firebasestorage.app", // REPLACE WITH YOURS
  messagingSenderId: "246672840111", // REPLACE WITH YOURS
  appId: "1:246672840111:web:0b3c50485f7bb55b4b0b5a", // REPLACE WITH YOURS
  measurementId: "G-HLPZY2D1DS" // REPLACE WITH YOURS (Optional)
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// const analytics = getAnalytics(app); // Uncomment if you need analytics and have configured it

const db = getFirestore(app);

export { app, db };
