import axios from "axios";
import { toast } from "react-toastify";
import {
  getAuthToken,
  logOut,
  setAuthToken,
  setEmail,
  setOTPstore,
  setUserDetails,
} from "../helper/SessionHelper";
import { store } from "../redux/store/store";
import { setProfileDetails } from "../redux/slices/profileSlice";

const baseURL = "http://localhost:8000/api/v1";

const token = { headers: { token: getAuthToken() } };

// registration request start
export async function registrationRequest(
  firstName,
  lastName,
  email,
  password,
  ProfilePic
) {
  const url = `${baseURL}/registation`;

  const body = {
    firstName,
    lastName,
    email,
    password,
    ProfilePic,
  };

  return await axios
    .post(url, body)

    .then((response) => {
      const data = response.data;
      if (response.status === 200 && data.status === "success") {
        toast.success("Registration successful");
        return true;
      } else {
        if (data.status === "fail") {
          if (data.data === 1) {
            toast.error("Email already exists");
          }
        } else {
          toast.error("Unexpected server response");
        }
        return false;
      }
    })

    .catch((error) => {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
      return false;
    });
}
// registration request end

// login request start
export function loginRequest(email, password) {
  const url = `${baseURL}/login`;

  const requestBody = {
    email,
    password,
  };

  return axios
    .post(url, requestBody)

    .then((response) => {
      if (response.status === 200) {
        if (response.data.data === "User not found") {
          return { error: "User not found" };
        } else if (response.data.data === "Wrong Password") {
          return { error: "Wrong Password" };
        } else {
          setAuthToken(response.data.token);
          setUserDetails(response.data.data);
          return true;
        }
      } else {
        return false;
      }
    })

    .catch((error) => {
      return false;
    });
}
// login request end

// email verify start
export function verifyEmailRequest(email) {
  const url = `${baseURL}/email-verify/${email}`;
  return axios.get(url).then((response) => {
    if (response.status === 200) {
      if (response.data.status === "fail") {
        toast.error("User Not Found");
        return false;
      } else {
        toast.success("OTP Send");
        setEmail(email);
        return true;
      }
    } else {
      toast.error("Something is Error");
    }
  });
}
// email verify end

// otp verify start
export function otpVerifyRequest(email, otp, status) {
  const url = `${baseURL}/otp-verify/${email}/${otp}/${status}`;
  return axios.get(url).then((response) => {
    if (response.status === 200) {
      if (response.data.status === "fail") {
        toast.error("Invalid OTP");
        return false;
      } else {
        toast.success("OTP Verified");
        setOTPstore(otp);
        return true;
      }
    } else {
      toast.error("Something is Error");
    }
  });
}
// otp verify end

// reset password start
export function resetPasswordRequest(email, otp, newPassword) {
  const url = `${baseURL}/reset-password`;

  const postBody = {
    email: email,
    otp: otp,
    newPassword: newPassword,
  };

  return axios.post(url, postBody).then((response) => {
    if (response.status === 200) {
      if (response.data.status === "fail") {
        toast.error("Invalid OTP");
        return false;
      } else {
        toast.success("Password Changed");
        return true;
      }
    } else {
      toast.error("Something is Error");
    }
  });
}
// reset password end

export function profileView() {
  const url = `${baseURL}/profile-view`;
  return axios
    .get(url, token)
    .then((response) => {
      if (response.status === 200) {
        store.dispatch(setProfileDetails(response.data.data));
        setUserDetails(response.data.data);
        return true;
      } else {
        toast.error("Something is Error");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized request");
        logOut();
      } else {
        toast.error(`Error: ${error.message}`);
      }
    });
}

export function profileNameChange(email, firstName, lastName) {
  const url = `${baseURL}/profileNameChange`;
  const body = {
    email: email,
    firstName: firstName,
    lastName: lastName,
  };
  return axios
    .post(url, body, token)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.status === "fail") {
          toast.error("Failed to Update");
          return false;
        } else {
          toast.success("Profile Updated");
          return true;
        }
      } else {
        toast.error("Something is Error");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized request");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    });
}

export function changePassword(email, oldPassword, newPassword) {
  const url = `${baseURL}/changePassword`;
  const body = {
    email: email,
    password: oldPassword,
    newPassword: newPassword,
  };

  return axios
    .post(url, body)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.status === "fail") {
          toast.error("Failed to Update Password");
          return false;
        } else {
          toast.success("Password Updated Successfully");
          return true;
        }
      } else {
        toast.error("An unexpected error occurred");
        return false; // Added return here
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized request");
      } else {
        toast.error(`Error: ${error.message}`);
      }
      return false; // Added return here
    });
}

export function profilePictureChange(email, profilePic) {
  const url = `${baseURL}/profilePictureChange`;
  const body = {
    email: email,
    ProfilePic: profilePic,
  };
  return axios
    .post(url, body)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.status === "fail") {
          toast.error("Failed to Update");
          return false;
        } else {
          toast.success("Profile Updated");
          setUserDetails(response.data.data);
          return true;
        }
      } else {
        toast.error("Something is Error");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized request");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    });
}
