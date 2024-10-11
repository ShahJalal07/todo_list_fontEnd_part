import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../All CSS files/NewPassCSS.css";
import { resetPasswordRequest } from "../API/API";
import { getEmail, getOTP } from "../helper/SessionHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewPasswordCom() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleCopy = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    if (!password) {
      setError("Password is required");
    } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setError("Password must only contain letters and numbers");
    } else if (!/[a-zA-Z]/.test(password)) {
      setError("Password must contain at least one letter");
    } else if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
    } else if (password.length > 50) {
      setError("Password must be less than 50 characters");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      resetPasswordRequest(getEmail(), getOTP(), password)
        .then((result) => {
          if (result === true) {
            // toast.success("Password reset successful!");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
            localStorage.clear(getEmail(), getOTP());
          } else {
            setPassword("");
            setConfirmPassword("");
            setError("Failed to reset password, please try again.");
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "An error occurred");
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-[300px] px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <label>New Password:</label>
        <div className="relative mb-[20px] w-[100%]">
          <input
            className="rounded-sm outline outline-1 outline-blue-500"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            onCopy={handleCopy}
            required
          />

          <div className="absolute top-[50%] right-[5%] translate-y-[-50%]">
            <span onClick={togglePasswordVisibility} className="">
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <label>Confirm Password:</label>
        <div className="relative mb-[20px] w-[100%]">
          <input
            className="rounded-sm outline outline-1 outline-blue-500"
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onCopy={handleCopy}
            required
          />
          <div className="absolute top-[50%] right-[5%] translate-y-[-50%]">
            <span onClick={toggleConfirmPasswordVisibility} className="">
              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPasswordCom;
