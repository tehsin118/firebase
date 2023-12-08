import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { app, auth } from "../../firebase";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const loginUser = () => {
    if (email === "" || password === "") {
      toast.warn(" fill all fields");
    } else {
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          toast.success("Registration successful!");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/email-already-in-use") {
            toast.error("This Email is already Registered");
          }
          //   toast.error("Registration failed. Please try again.");
        });
    }
  };
  return (
    <div>
      <div className="login-wrapper pt-5 v-center h-center flex-column">
        <h1>Login</h1>
        <div className="input-wrapper mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-wrapper mt-4">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Icon
            icon="mdi:eye-outline"
            // icon="mdi:eye-off-outline"
            color="black"
            width="24"
            height="24"
            className="ico"
          />
        </div>
        <div className="input-wrapper mt-4 ">
          <button
            className="bg-primary text-white btn-primary"
            onClick={loginUser}
          >
            Login
          </button>
        </div>
        <p className="mt-3">
          don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
