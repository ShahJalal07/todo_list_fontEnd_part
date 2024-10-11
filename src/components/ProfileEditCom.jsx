import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileNameChange, profileView } from "../API/API";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfileEditCom = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  // Fetch profile from Redux state
  const profile = useSelector((state) => state.profile.profile);

  // Set profile data when profile is available from the Redux store
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email); // Keep the email as read-only
    }
  }, [profile]);

  // Fetch profile data on component mount (if needed from API)
  useEffect(() => {
    profileView(); // Make sure to await this if it's an async operation
  }, []);

  // Handle profile form submission

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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

    // Validate old password is not empty
    if (!oldPassword) {
      setError("Old password is required.");
      return;
    }

    // Validate new password length
    if (password.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    // Validate new password complexity (example: at least 1 number, 1 uppercase letter, 1 special character)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must include uppercase, lowercase, number, and special character."
      );
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

    // If everything is valid, clear the error and proceed

    if (password !== oldPassword && password === confirmPassword) {
      profileNameChange(email, firstName, lastName)
        .then((result) => {
          if (result === true) {
            toast.success("Password changed successfully");
          } else {
            toast.error("Error changing password");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const editFromSubmit = (e) => {
    e.preventDefault();

    const validation = (firstName, lastName, email) => {
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
      profileNameChange(email, firstName, lastName);

      window.location.reload("/profileEdit");

      // Proceed with form submission logic, e.g., API call to save data
    }
  };

  // Handle profile picture selection
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div>
      <img src="" className="w-24 h-24 rounded-full" alt="" />
      <h1>Edit Profile</h1>
      <form action="">
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          onChange={handleProfilePictureChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h1>Edit Password</h1>
      <form
        className="w-[300px] px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <label>Old Password:</label>
        <div className="relative mb-[20px] w-[100%]">
          <input
            className="rounded-sm outline outline-1 outline-blue-500"
            type={passwordVisible ? "text" : "password"}
            value={oldPassword}
            onChange={handelOldPasswordChange}
            onCopy={handleCopy}
            
          />

          <div className="absolute top-[50%] right-[5%] translate-y-[-50%]">
            <span onClick={togglePasswordVisibility} className="">
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
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
      <form action="" onSubmit={editFromSubmit}>
        {/* <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          onChange={handleProfilePictureChange}
        /> */}

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
