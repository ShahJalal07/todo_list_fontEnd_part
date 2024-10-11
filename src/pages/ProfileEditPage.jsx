import React, { Suspense, lazy } from "react";

import Loader from "../components/Loader";
import MainLayOut from "../layout/MainLayOut";

const ProfileEditCom = lazy(() => import("../components/ProfileEditCom"));

const ProfileEditPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <ProfileEditCom />
      </MainLayOut>
    </Suspense>
  );
};

export default ProfileEditPage;
