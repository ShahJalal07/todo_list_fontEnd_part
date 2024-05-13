import React, { Suspense, lazy } from "react";

import MainLayOut from "../layout/MainLayOut";
import Loader from "../components/Loader";
const CompletedStatusCom = lazy(() =>
  import("../components/CompletedStatusCom")
);

const CompletedStatusPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <CompletedStatusCom />
      </MainLayOut>
    </Suspense>
  );
};

export default CompletedStatusPage;
