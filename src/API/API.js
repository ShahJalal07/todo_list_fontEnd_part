import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8000/api/v1";

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
