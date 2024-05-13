import React, { Suspense, lazy } from "react";
import MainLayOut from "../layout/MainLayOut";
import Loader from "../components/Loader";
const NewTodoCom = lazy(() => import("../components/NewTodoCom"));

const NewTodoPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <NewTodoCom />
      </MainLayOut>
    </Suspense>
  );
};

export default NewTodoPage;
