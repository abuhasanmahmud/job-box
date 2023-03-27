import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBd6fB9rxiVVVUKCEA6u1Gpyp0K95bbDhc",
  authDomain: "job-box-6f21f.firebaseapp.com",
  projectId: "job-box-6f21f",
  storageBucket: "job-box-6f21f.appspot.com",
  messagingSenderId: "574727115799",
  appId: "1:574727115799:web:ad87a789b2407b0c35b852",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
