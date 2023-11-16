import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
]);

export default router;
