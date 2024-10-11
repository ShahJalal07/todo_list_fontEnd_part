import React, { Suspense, lazy } from "react";

import Loader from "../components/Loader";

const NewPasswordCom = lazy(() => import("../components/NewPasswordCom"));
const NewPasswordPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <NewPasswordCom />
    </Suspense>
  );
};

export default NewPasswordPage;
