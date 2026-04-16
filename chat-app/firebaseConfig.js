import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import { API_KEY ,AUTH_DOMAIN,PROJECT_ID , STORAGE_BUCKET , MESSAGING_SENDER_ID , APP_ID,MEASUREMENT_ID } from "@env";

// You can then use them in your code
const firebaseConfig = {
 apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Only initialize if no app exists yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Use initializeAuth with persistence, but catch if already initialized
let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(createAsyncStorage("app"))
  });
} catch (e) {
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");