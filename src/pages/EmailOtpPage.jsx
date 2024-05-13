import React, { Suspense, lazy } from "react";

import Loader from "../components/Loader";
import MainLayOut from "../layout/MainLayOut";

const EmailOtpCom = lazy(() => import("../components/EmailOtpCom"));
const EmailOtpPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <EmailOtpCom />
      </MainLayOut>
    </Suspense>
  );
};

export default EmailOtpPage;
