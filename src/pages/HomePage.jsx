import React, { Suspense, lazy } from "react";
import MainLayOut from "../layout/MainLayOut";
import Loader from "../components/Loader";
const HomeCom = lazy(() => import("../components/HomeCom"));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <MainLayOut>
          <HomeCom />
        </MainLayOut>
      </Suspense>
    </div>
  );
};

export default HomePage;
