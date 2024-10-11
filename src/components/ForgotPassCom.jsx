import React, { useState } from "react";
import { toast } from "react-toastify";
import { verifyEmailRequest } from "../API/API";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassCom = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission
    if (!email) {
      toast.error("Email is required");
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
    } else {
      setLoader(true);
      verifyEmailRequest(email).then((result) => {
        if (result === true) {
          setLoader(false);

          setTimeout(() => {
            navigate("/OTPVarify");
          }, 3000);
        } else {
          setEmail("");
          setLoader(false);
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            {loader ? (
              <button
                type="submit"
                className="w-[150px] px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Sending...
              </button>
            ) : (
              <button
                type="submit"
                className="w-[150px] px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Send OTP
              </button>
            )}
          </div>
          <Link to="/login" className="text-blue-500 font-bold text-[15px]">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassCom;
