// Import the functions you need from the SDKs you need
import Constants from 'expo-constants';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

type Extra = {
  API_KEY: string;
  AUTH_DOMAIN: string;
  DATABASE_URL: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MESSAGING_SENDER_ID: string;
  APP_ID: string;
  MEASUREMENT_ID: string;
};

const extra = Constants.expoConfig?.extra as Extra;

const firebaseConfig = {
  apiKey: extra.API_KEY,
  authDomain: extra.AUTH_DOMAIN,
  databaseURL: extra.DATABASE_URL,
  projectId: extra.PROJECT_ID,
  storageBucket: extra.STORAGE_BUCKET,
  messagingSenderId: extra.MESSAGING_SENDER_ID,
  appId: extra.APP_ID,
  measurementId: extra.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);