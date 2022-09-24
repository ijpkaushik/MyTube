import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAo1C1UN-YjaocK7t0ODlVOnX0oOKSHdZo",
    authDomain: "ijpkaushik-mytube.firebaseapp.com",
    projectId: "ijpkaushik-mytube",
    storageBucket: "ijpkaushik-mytube.appspot.com",
    messagingSenderId: "716891781010",
    appId: "1:716891781010:web:dc8175bf33a57a7744334b",
    measurementId: "G-V0JJWMW4P1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;