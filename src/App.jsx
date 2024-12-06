import { Suspense, lazy } from "react";
import Form from "./components/Form";
import Loader from "./components/Loader";

const Images = lazy(() => import("./components/Images"));

export default function App() {
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
}
