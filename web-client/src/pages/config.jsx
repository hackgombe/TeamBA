import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";
import SingleProduct from "./products";
import AllProductPage from "./products/All";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  { path: "/products", element: <AllProductPage /> },
  {
    path: "/products/:id",
    element: <SingleProduct />,
  },
]);

export default router;
