import React, { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import MainLayOut from "../layout/MainLayOut";

import ForgotPassCom from "../components/ForgotPassCom";

const ForgotPassPage = () => {
  return (
    <div>
      <ForgotPassCom />
    </div>
  );
};

export default ForgotPassPage;
