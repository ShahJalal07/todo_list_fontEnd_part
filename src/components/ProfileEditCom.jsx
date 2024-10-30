import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  changePassword,
  profileNameChange,
  profilePictureChange,
  profileView,
} from "../API/API";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getUserDetails, logOut } from "../helper/SessionHelper";

const ProfileEditCom = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [previewPicture, setPreviewPicture] = useState();

  // Fetch profile from Redux statec
  const profile = useSelector((state) => state.profile.profile);

  const userEmail = getUserDetails().email;

  // Set profile data when profile is available from the Redux store
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      // Keep the email as read-only
    }
  }, [profile.firstName, profile.lastName, profile.email]);

  // Fetch profile data on component mount (if needed from API)
  useEffect(() => {
    profileView(); // Make sure to await this if it's an async operation
  }, []);

  // Handle profile form submission
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [OldpasswordVisible, setOldPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handelOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!OldpasswordVisible);
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

  const handlePassChange = (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Validate that all required variables exist
    if (!oldPassword) {
      setError("Old password is required.");
      return;
    }

    if (!password) {
      setError("New password is required.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    // Validate new password length
    if (password.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (password.length > 50) {
      setError("New password must be less than 50 characters.");
      return;
    }

    // Validate new password contains only letters and numbers
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setError("Password must only contain letters and numbers.");
      return;
    }

    // Validate new password contains at least one letter
    if (!/[a-zA-Z]/.test(password)) {
      setError("Password must contain at least one letter.");
      return;
    }

    // Validate new password contains at least one number
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    // Validate new password is different from old password
    if (password === oldPassword) {
      setError("New password must be different from the old password.");
      return;
    }

    // Validate confirm password matches new password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // If everything is valid, proceed with changing the password
    changePassword(userEmail, oldPassword, password)
      .then((result) => {
        if (result === true) {
          toast.success("Password changed successfully.");

          // Clear the form inputs
          setPassword("");
          setConfirmPassword("");
          setOldPassword("");

          // Optionally log out the user
          setTimeout(() => {
            logOut();
          }, 2000);
        } else {
          toast.error("Failed to change password.");
        }
      })
      .catch((error) => {
        setError("Error changing password. Please try again.");
        console.error(error); // Log error for debugging
      });
  };

  const handelEditProfileName = (e) => {
    e.preventDefault();

    const validation = (firstName, lastName, userEmail) => {
      if (firstName === "") {
        toast.error("First name is required");
        return false;
      }
      if (lastName === "") {
        toast.error("Last name is required");
        return false;
      }
      // if (email === "") {
      //   toast.error("Email is required");
      //   return false;
      // }
      return true;
    };

    if (validation(firstName, lastName)) {
      profileNameChange(userEmail, firstName, lastName);

      window.location.reload("/profileEdit");

      // Proceed with form submission logic, e.g., API call to save data
    }
  };

  // Handle profile picture selection

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  const handleProfilePictureChange =  (e) => {
    const file = e.target.files[0];
    convertToBase64(file)
    .then((result) => {
      setPreviewPicture(result);
    });
    // setPreviewPicture(URL.createObjectURL(file));
  };

  const handleProfilePictureSubmit = (e) => {
    e.preventDefault();
    profilePictureChange(userEmail, previewPicture);
    window.location.reload("/profileEdit");
  };

  return (
    <div>
      <img
        src={previewPicture ? previewPicture : profile.photo}
        className="object-cover w-24 h-24 overflow-hidden rounded-full"
        alt=""
      />
      <h1>Edit Picture</h1>
      <form
        onSubmit={handleProfilePictureSubmit}
        className="w-[300px] px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        action=""
      >
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          onChange={handleProfilePictureChange}
          value={profilePicture}
        />
        <button type="submit">Submit</button>
      </form>

      <h1>Edit Password</h1>
      <form
        className="w-[300px] px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        onSubmit={handlePassChange}
      >
        <label>Old Password:</label>
        <div className="relative mb-[20px] w-[100%]">
          <input
            className="rounded-sm outline outline-1 outline-blue-500"
            type={OldpasswordVisible ? "text" : "password"}
            value={oldPassword}
            onChange={handelOldPasswordChange}
            onCopy={handleCopy}
          />

          <div className="absolute top-[50%] right-[5%] translate-y-[-50%]">
            <span onClick={toggleOldPasswordVisibility} className="">
              {OldpasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <label>New Password:</label>
        <div className="relative mb-[20px] w-[100%]">
          <input
            className="rounded-sm outline outline-1 outline-blue-500"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            onCopy={handleCopy}
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

      <h1>Edit Profile</h1>
      <form action="" onSubmit={handelEditProfileName}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        {/* <label htmlFor="email">Email (read-only)</label>
        <input
          type="text"
          id="email"
          value={email}
          readOnly
        /> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileEditCom;
