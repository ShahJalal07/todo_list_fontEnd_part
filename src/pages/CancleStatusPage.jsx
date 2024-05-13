import React, { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import MainLayOut from "../layout/MainLayOut";

const CancleStatusCom = lazy(() => import("../components/CancleStatusCom"));

const CancleStatusPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <CancleStatusCom />
      </MainLayOut>
    </Suspense>
  );
};

export default CancleStatusPage;
