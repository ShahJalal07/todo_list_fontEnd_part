import "./App.css";
import RegistationPage from "./pages/RegistationPage";
import LogingPage from "./pages/LogingPage";
import HomePage from "./pages/HomePage";
import MainLayOut from "./layout/MainLayOut";
import { Navigate, Route, Routes } from "react-router-dom";
import NewTodoPage from "./pages/NewTodoPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import ProgressStatusPage from "./pages/ProgressStatusPage";
import CompletedStatusPage from "./pages/CompletedStatusPage";
import CancleStatusPage from "./pages/CancleStatusPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import ProfileViewPage from "./pages/ProfileViewPage";
import OTPVarifyPage from "./pages/OTP VarifyPage";
import Page404 from "./pages/Page404";
import NewStatusPage from "./pages/NewStatusPage";
import EmailOtpPage from "./pages/EmailOtpPage";
import Loader from "./components/Loader";
import RegistrationForm from "./components/Reg";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthToken, getEmail, getOTP } from "./helper/SessionHelper";
import ProfileEditPage from "./pages/ProfileEditPage";

// server api link start
// https://todolist-fs99.onrender.com/
// server api link end

const App = () => {
  const isAuthenticated = getAuthToken();

  if (getAuthToken()) {
    return (
      <div>
        <Routes>
          {/*without login not entry start */}

          <Route path="/" element={<HomePage />} />
          <Route path="/createTodo" element={<CreateTodoPage />} />
          <Route path="/newTodo" element={<NewTodoPage />} />
          <Route path="/progressTodo" element={<ProgressStatusPage />} />
          <Route path="/completedTodo" element={<CompletedStatusPage />} />
          <Route path="/cancleTodo" element={<CancleStatusPage />} />
          <Route path="/newStatus" element={<NewStatusPage />} />
          <Route path="/profileDetails" element={<ProfileViewPage />} />
          <Route path="/updateProfile" element="{}" />
          <Route path="/emalVarify" element={<EmailOtpPage />} />
          <Route path="/profileEdit" element={<ProfileEditPage />} />

          {/*without login not entry end */}

          {getEmail() ? (
            <Route path="/newPassword" element={<NewPasswordPage />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}

          {/* in Login can not rech those route */}
          <Route path="/login" element={<Navigate to="/"></Navigate>}></Route>
          <Route
            path="/register"
            element={<Navigate to="/"></Navigate>}
          ></Route>
          <Route
            path="/forgotPassword"
            element={<Navigate to="/"></Navigate>}
          ></Route>
          <Route
            path="/newPassword"
            element={<Navigate to="/"></Navigate>}
          ></Route>
          <Route
            path="/OTPVarify"
            element={<Navigate to="/"></Navigate>}
          ></Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          {/* free route start */}

          <Route path="/login" element={<LogingPage />} />
          <Route path="/register" element={<RegistationPage />} />
          <Route path="/forgotPassword" element={<ForgotPassPage />} />

          {getEmail() ? (
            <Route path="/newPassword" element={<NewPasswordPage />} />
          ) : (
            <Route path="/login" element={<LogingPage />} />
          )}

          <Route path="/OTPVarify" element={<OTPVarifyPage />} />
          {/* free route end */}

          {/* without login not rech those route */}
          <Route
            path="/"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/createTodo"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/newTodo"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/progressTodo"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/completedTodo"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/cancleTodo"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/newStatus"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/profileDetails"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/updateProfile"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/emalVarify"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>
          <Route
            path="/profileEdit"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    );
  }
};

export default App;
