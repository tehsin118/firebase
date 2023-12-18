// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtYsxnfjeCFCoKWgtqkTYjsr8_nvgS5Qo",
  authDomain: "fir-11025.firebaseapp.com",
  projectId: "fir-11025",
  storageBucket: "fir-11025.appspot.com",
  messagingSenderId: "952557530368",
  appId: "1:952557530368:web:7095feca4fade69b47d7e5",
  databaseURL: "https://fir-11025-default-rtdb.firebaseio.com/",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create new user (Register)
// if password and confirm password don't match.
export const registerWithEmailAndPassword = async (
  email,
  password,
  confirmPassword
) => {
  try {
    if (!email || !password || !confirmPassword) {
      toast.warn(" Please enter all fields");
    } else if (password !== confirmPassword) {
      toast.warn(" Password does not match");
      return false;
    } else {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userInfo.user;
      console.log("users", user);
    }
  } catch (error) {
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      toast.error("This Email is already Registered");
    }
    return false;
  }
};

export const getUser = async () => {
  const user = auth.currentUser;
  if (user !== null) {
    const email = user.email;
    const uid = user.getIdToken;
  }
};
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) {
      toast.warn(" Please enter all fields");
    } else {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
      };
      localStorage.setItem("signIn", JSON.stringify(userData));
      return true;
    }
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      toast.error("Invalid Email or Password");
    } else if (error.code === "auth/user-not-found") {
      toast.error("User not found");
    } else {
      console.log(error);
      return false;
    }
  }
};

export default { app, auth };
