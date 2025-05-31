// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// For example, getFirestore from "firebase/firestore" or getAuth from "firebase/auth"

// Your web app's Firebase configuration
// IMPORTANT: Replace this with your actual Firebase project configuration!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional: For Google Analytics
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

// Example: Export Firestore instance if you were using it
// import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);

// Example: Export Auth instance if you were using it
// import { getAuth } from "firebase/auth";
// export const auth = getAuth(app);

export { app as firebaseApp };

// After setting up your Firebase project in the Firebase console (https://console.firebase.google.com/):
// 1. Go to Project settings > General.
// 2. Under "Your apps", click the "Web" icon (</>) if you haven't registered a web app yet, or select your existing web app.
// 3. Find the "SDK setup and configuration" section and select "Config".
// 4. Copy the firebaseConfig object and paste it above, replacing the placeholder values.
// 5. Ensure you have installed the necessary Firebase SDKs (e.g., `npm install firebase`).
// 6. Add your GOOGLE_API_KEY to the .env file at the root of your project for Genkit AI features.
//    Example .env file content:
//    GOOGLE_API_KEY=your_google_api_key_here
