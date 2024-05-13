import "./App.css";
import RegistationPage from "./pages/RegistationPage";
import LogingPage from "./pages/LogingPage";
import HomePage from "./pages/HomePage";
import MainLayOut from "./layout/MainLayOut";
import { Route, Routes } from "react-router-dom";
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

// server api link start
// https://todolist-fs99.onrender.com/
// server api link end

const App = () => {
  return (
    <div>
      
        <Routes>
          <Route path="/login" element={<LogingPage />} />
          <Route path="/register" element={<RegistationPage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/createTodo" element={<CreateTodoPage />} />
          <Route path="/newTodo" element={<NewTodoPage />} />
          <Route path="/progressTodo" element={<ProgressStatusPage />} />
          <Route path="/completedTodo" element={<CompletedStatusPage />} />
          <Route path="/cancleTodo" element={<CancleStatusPage />} />
          <Route path="/newStatus" element={<NewStatusPage />} />

          <Route path="/forgotPassword" element={<ForgotPassPage />} />
          <Route path="/profileDetails" element={<ProfileViewPage />} />
          <Route path="/CreateNewPassword" element={<NewPasswordPage />} />
          <Route path="/OTPVarify" element={<OTPVarifyPage />} />
          <Route path="/emalVarify" element={<EmailOtpPage />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      
    </div>
  );
};

export default App;
