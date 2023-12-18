import React, { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
// import { registerWithEmailAndPassword } from "../../firebase";
import { useFirebase } from "../../context/firebase";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const firebase = useFirebase();
  console.log("firebase", firebase);

  const navigate = useNavigate();
  const [togglePass, setTogglePass] = useState(false);
  const [loading, setLoading] = useState(false);
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
    if (!formData.email) {
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warn("Invalid email format");
    } else if (!formData.password) {
      toast.warn("Password is required");
    } else if (!formData.confirmPassword) {
      toast.warn("Confirm password is required");
    } else if (formData.password !== formData.confirmPassword) {
      toast.warn("Password does not match");
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const result = await firebase.registerWithEmailAndPassword(
          formData.email,
          formData.password,
          formData.confirmPassword
        );
        if (result !== null) {
          setFormData(initialFormData);
          setLoading(false);
          navigate("/login");
        }
        setLoading(false);
      } catch (error) {
        toast.error("error");
        setLoading(true);
      }
    }
  };

  const handleTogglePass = () => {
    setTogglePass(!togglePass);
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
            type={togglePass ? " text" : "password"}
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Icon
            icon={togglePass ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            color="black"
            width="24"
            height="24"
            className="ico"
          />
        </div>
        <div className="input-wrapper mt-4">
          <input
            type={togglePass ? " text" : "password"}
            placeholder="Enter your confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <Icon
            icon={togglePass ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            color="black"
            width="24"
            height="24"
            className="ico"
            onClick={handleTogglePass}
          />
        </div>
        <div className="input-wrapper mt-4 ">
          <button
            className="bg-primary text-white btn-primary"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
