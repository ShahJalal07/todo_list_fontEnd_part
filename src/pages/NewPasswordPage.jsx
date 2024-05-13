import React, { Suspense, lazy } from "react";

import Loader from "../components/Loader";
import MainLayOut from "../layout/MainLayOut";

const NewPasswordCom = lazy(() => import("../components/NewPasswordCom"));
const NewPasswordPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <NewPasswordCom />
      </MainLayOut>
    </Suspense>
  );
};

export default NewPasswordPage;
