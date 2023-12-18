import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from "../../firebase";
import { toast } from "react-toastify";
const Login = () => {
  const [togglePass, setTogglePass] = useState(false);
  const navigate = useNavigate();
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

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginSuccess = await loginWithEmailAndPassword(
        formData.email,
        formData.password
      );
      if (loginSuccess) {
        setFormData(initialFormData);
        navigate("/");
        setLoading(false);
        toast.success("Login Successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogglePass = () => {
    setTogglePass(!togglePass);
  };
  return (
    <div>
      <div className="login-wrapper pt-5 v-center h-center flex-column">
        <h1>Login</h1>
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
            onClick={handleTogglePass}
          />
        </div>
        <div className="input-wrapper mt-4 ">
          <button
            className="bg-primary text-white btn-primary"
            onClick={loginUser}
          >
            {loading ? "Loading" : "Login"}
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
