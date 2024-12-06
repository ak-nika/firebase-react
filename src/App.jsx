import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const EditForm = lazy(() => import("./components/EditForm"));
const Home = lazy(() => import("./components/Home"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
