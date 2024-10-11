import React, { useState, useEffect } from "react";
import "../All CSS files/LoginCSS.css";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { loginRequest } from "../API/API";
import { toast } from "react-toastify";

const LoginCom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // when page change reload the page
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [errors, setErrors] = useState({});

  // Function to toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle input changes and perform real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to validate the form data
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    // Validate email
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
  };

  // Perform validation in real-time whenever the form data changes
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      // Form is valid; perform submission actions here (e.g., API call)
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});

      loginRequest(formData.email, formData.password)
        .then((result) => {
          if (result.error === "User not found") {
            toast.error("User not found");
          } else if (result.error === "Wrong Password") {
            toast.error("Wrong Password");
          } else if (result === true) {
            toast.success("Login successful");

            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error("Login failed");
        });
    }
  };

  return (
    <div className="flex items-center justify-center gap-5 py-16">
      <h1 className="text-3xl font-bold text-white font-poppins">
        Welcome Back
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Login</p>
        <p className="message text-yellow-500 font-poppins font-bold text-[15px]">
          Enter your credentials to access your account.
        </p>

        <label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span>Email</span>
          {errors.email && (
            <span className="text-red-500 error">{errors.email}</span>
          )}
        </label>

        <label className="">
          <input
            className="relative input"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span>Password</span>
          {showPassword ? (
            <FaEye
              onClick={togglePassword}
              className="absolute cursor-pointer top-[50%] right-2 -translate-y-1/2"
            />
          ) : (
            <FaEyeSlash
              onClick={togglePassword}
              className="absolute cursor-pointer top-[50%] right-2 -translate-y-1/2"
            />
          )}
          {errors.password && (
            <span className="text-red-500 error">{errors.password}</span>
          )}
        </label>

        <button className="submit" type="submit">
          Login
        </button>

        <p className="signup">
          <div>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-bold text-[15px]"
            >
              SignUp
            </Link>
          </div>
          <div>
            <Link
              to="/forgotPassword"
              className="text-blue-500 font-bold text-[15px]"
            >
              Forgot Password
            </Link>
          </div>
        </p>
      </form>
    </div>
  );
};

export default LoginCom;
