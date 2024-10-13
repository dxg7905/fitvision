// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ0ROToTPfwdfSxsV60_-_4hJ7cdK4uyg",
  authDomain: "fitvision-8126c.firebaseapp.com",
  projectId: "fitvision-8126c",
  storageBucket: "fitvision-8126c.appspot.com",
  messagingSenderId: "398075483749",
  appId: "1:398075483749:web:8685f7f499bfabcfc8d88c",
  measurementId: "G-9CP1FKVD04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth }; // Export auth for use in your application