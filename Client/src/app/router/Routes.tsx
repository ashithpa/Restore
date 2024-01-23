import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import Notfound from "../errors/NotFound";
import BasketPage from "../../features/basket/basketPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        element: <RequireAuth></RequireAuth>,
        children: [
          { path: "checkout", element: <CheckoutWrapper></CheckoutWrapper> },
          { path: "orders", element: <Orders></Orders> },
        ],
      },
      { path: "catalog", element: <Catalog></Catalog> },
      { path: "catalog/:id", element: <ProductDetails></ProductDetails> },
      { path: "about", element: <AboutPage></AboutPage> },
      { path: "contact", element: <ContactPage></ContactPage> },
      { path: "server-error", element: <ServerError></ServerError> },
      { path: "not-found", element: <Notfound></Notfound> },
      { path: "basket", element: <BasketPage></BasketPage> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      { path: "*", element: <Navigate replace to="/not-found"></Navigate> },
      //   { path: "*", element: <Navigate replace to="/not-found"></Navigate> },
    ],
  },
]);
