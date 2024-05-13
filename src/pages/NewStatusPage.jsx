import React, { Suspense, lazy } from "react";

import Loader from "../components/Loader";
import MainLayOut from "../layout/MainLayOut";

const NewStatusCom = lazy(() => import("../components/NewStatusCom"));

const NewStatusPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <NewStatusCom />
      </MainLayOut>
    </Suspense>
  );
};

export default NewStatusPage;
