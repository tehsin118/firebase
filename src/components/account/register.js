import React, { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { app, auth } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { registerWithEmailAndPassword } from "../../firebase";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const initialFormData = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const newErrors = {};

    // if (!formData.username) {
    //   newErrors.username = "Username is required";
    // }
    if (!formData.email) {
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warn("Invalid email format");
    } else if (!formData.password) {
      toast.warn("Password is required");
    } else if (!formData.confirmPassword) {
      toast.warn("Confirm password is required");
    } else if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match");
    }

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      registerWithEmailAndPassword(
        // formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      setFormData(initialFormData);
      navigate("/login");
    } else {
      toast.error("eerrorr");
      // Form is invalid, do not submit and display errors
    }
  };
  return (
    <div>
      <div className="login-wrapper pt-5 v-center h-center flex-column">
        <h1>Register</h1>
        <div className="input-wrapper mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-wrapper mt-4">
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
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
        <div className="input-wrapper mt-4">
          <input
            type="password"
            placeholder="Enter your confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
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
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
