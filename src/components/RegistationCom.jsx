import React, { useState, useEffect } from "react";
import "../All CSS files/RegistationCss.css";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { registrationRequest } from "../API/API";
import { toast } from "react-toastify";



const RegistrationCom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // when page change reload the page
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  

  

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
  const newErrors = {};
  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    // Validate first name
    if (!formData.firstname) {
      newErrors.firstname = "Firstname is required";
    }

    // Validate last name
    if (!formData.lastname) {
      newErrors.lastname = "Lastname is required";
    }

    // Validate email
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
      newErrors.password = "Password must only contain letters and numbers";
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 50) {
      newErrors.password = "Password must be less than 50 characters";
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    validateForm(); // Validate form on submission

    // Check if there are any validation errors
    if (Object.keys(errors).length === 0) {
      const photo = "https://example.com/profile_pic.jpg";

      registrationRequest(
        formData.firstname,
        formData.lastname,
        formData.email,
        formData.password,
        photo
      )
        .then((result) => {
          if (result === true) {
            navigate("/login");

            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            });

          } else if (result === false) {
            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            });

            // Handle registration failure (e.g., email already exists)
            toast.error("Email already exists");
          }
        })

        .catch((error) => {
          // Handle error from API request
          console.error("Registration failed:", error);
          toast.error(
            "Registration failed due to a server error. Please try again."
          );
        });

      
    }
  };

  // Function to prevent copying password fields
  const handleCopy = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-5 py-16">
        <h1 className="text-3xl font-bold text-white font-poppins">
          Welcome to Our App
        </h1>
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <p className="message text-yellow-500 font-poppins font-bold text-[15px]">
            Signup now and get full access to our app.
          </p>

          <div className="flex">
            <label>
              <input
                className="input"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <span>Firstname</span>
              {errors.firstname && (
                <span className="text-red-500 error">{errors.firstname}</span>
              )}
            </label>

            <label>
              <input
                className="input"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              <span>Lastname</span>
              {errors.lastname && (
                <span className="text-red-500 error">{errors.lastname}</span>
              )}
            </label>
          </div>

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
              onCopy={handleCopy}
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

          <label>
            <input
              className="input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onCopy={handleCopy}
            />
            <span>Confirm Password</span>
            {errors.confirmPassword && (
              <span className="text-red-500 error">
                {errors.confirmPassword}
              </span>
            )}
          </label>

          <button className="submit" type="submit">
            Submit
          </button>

          <p className="signin">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-bold text-[15px]">
              SignIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationCom;
