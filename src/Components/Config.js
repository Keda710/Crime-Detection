import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCMEkMcAyH9GhfJipRmd7p_8d1_NnFLECM",
  authDomain: "crime-91178.firebaseapp.com",
  projectId: "crime-91178",
  storageBucket: "crime-91178.appspot.com",
  messagingSenderId: "514081062150",
  appId: "1:514081062150:web:edb61fb5a4c49fae917287",
  measurementId: "G-VNRFBD9LK5"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider();
const analytics = getAnalytics(app);
export {auth,provider};