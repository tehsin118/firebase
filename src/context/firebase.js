import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtYsxnfjeCFCoKWgtqkTYjsr8_nvgS5Qo",
  authDomain: "fir-11025.firebaseapp.com",
  projectId: "fir-11025",
  storageBucket: "fir-11025.appspot.com",
  messagingSenderId: "952557530368",
  appId: "1:952557530368:web:7095feca4fade69b47d7e5",
  databaseURL: "https://fir-11025-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const registerWithEmailAndPassword = async (
    email,
    password,
    confirmPassword
  ) => {
    try {
      if (!email || !password || !confirmPassword) {
        toast.warn("Please enter all fields");
        return null; // or some appropriate value indicating failure
      } else if (password !== confirmPassword) {
        toast.warn("Password does not match");
        return false;
      } else {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userInfo.user;
        console.log("User", user);
        return user; // or some other value indicating success
      }
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This Email is already Registered");
      }
      return null; // or some appropriate value indicating failure
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
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
        console.log("Local storage updated");
        console.log("Login successful with email/password");
        console.log("user Logged", userData);
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

  return (
    <FirebaseContext.Provider
      value={{ registerWithEmailAndPassword, loginWithEmailAndPassword }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
