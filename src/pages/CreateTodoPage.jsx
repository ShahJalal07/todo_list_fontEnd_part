import { Suspense, lazy } from "react";
import MainLayOut from "../layout/MainLayOut";
import Loader from "../components/Loader";

const CreateTodoCom = lazy(() => import("../components/CreateTodoCom"));
const CreateTodoPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <MainLayOut>
          <CreateTodoCom />
        </MainLayOut>
      </Suspense>
    </div>
  );
};

export default CreateTodoPage;
