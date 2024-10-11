import { useState } from "react";
import { toast } from "react-toastify";
import VerificationInput from "react-verification-input";
import { otpVerifyRequest } from "../API/API";
import { getEmail } from "../helper/SessionHelper";
import { useNavigate } from "react-router-dom";
const OTPVarifyCom = () => {
  const [OTP, setOTP] = useState("");

  const navigator = useNavigate();

  const handelOTPSubmit = (e) => {
    e.preventDefault();

    if (OTP.length == 6) {
      const status = 0;
      otpVerifyRequest(getEmail(), OTP, status)
        .then((result) => {
          if (result === true) {
            setTimeout(() => {
              navigator("/newPassword");
            }, 2000);
          } else {
            setOTP("");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setOTP("");
        });
    } else {
      toast.error("Please Enter 6 Digit OTP");
      setOTP("");
      navigator("/OTPVarify");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-grey-100">
      <div className="w-full max-w-md p-8 bg-green-100 rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">
          OTP Varification
        </h2>

        <form>
          <div className="flex items-center justify-center mb-4">
            <VerificationInput
              onChange={(e) => {
                setOTP(e);
              }}
              value={OTP}
              validChars="0-9"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handelOTPSubmit}
              type="submit"
              className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVarifyCom;
