import React, { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import MainLayOut from "../layout/MainLayOut";

const ForgotPassCom = lazy(() => import("../components/ForgotPassCom"));

const ForgotPassPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <ForgotPassCom />
      </MainLayOut>
    </Suspense>
  );
};

export default ForgotPassPage;
