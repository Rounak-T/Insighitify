import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import { store } from './Redux/Store';
import { Provider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./Routes/App";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Dashboard from "./Routes/Dashboard";
import FAQs from "./Routes/FAQs";
import About from "./Routes/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users/login",
        element: <Login />,
      },
      {
        path: "/users/register",
        element: <Register />,
      },
      {
        path: "/faqs",
        element: <FAQs />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
            <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
