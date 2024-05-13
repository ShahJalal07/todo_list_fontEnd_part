import React, { Suspense, lazy } from "react";

import MainLayOut from "../layout/MainLayOut";
import Loader from "../components/Loader";
const ProgressStatusCom = lazy(() => import("../components/ProgressStatusCom"));
const ProgressStatusPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <ProgressStatusCom />
      </MainLayOut>
    </Suspense>
  );
};

export default ProgressStatusPage;
