import { Suspense, lazy } from "react";
import Loader from "./Loader";
import Form from "./Form";

const Images = lazy(() => import("./Images"));

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4">
        Firebase with React
      </h1>
      <Form />

      <Suspense fallback={<Loader />}>
        <Images />
      </Suspense>
    </>
  );
};

export default Home;
