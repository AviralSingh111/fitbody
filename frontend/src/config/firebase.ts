import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAylFE5SsOE0UBRPf0X3wOH9tYCfbgTKzI",
  authDomain: "fitbody-d3170.firebaseapp.com",
  projectId: "fitbody-d3170",
  storageBucket: "fitbody-d3170.firebasestorage.app",
  messagingSenderId: "992632428303",
  appId: "1:992632428303:web:2d6e15a44ee60de868d07a",
  measurementId: "G-40PJD13DJ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
