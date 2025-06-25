import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { LoginForm } from "./pages/LoginForm.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import CreateCampaign from "./pages/createCampaign.jsx";
import MyCampaigns from "./pages/MyCampaigns.jsx";
import MyDonations from "./pages/MyDonations.JSX";
import PrivateRoute from "./protected/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/createCampaign",
        element: <PrivateRoute><CreateCampaign /></PrivateRoute>,
      },
      {
        path: "/myCampaigns",
        element: <PrivateRoute><MyCampaigns /></PrivateRoute>,
      },
      {
        path: "/myDonations",
        element: <PrivateRoute><MyDonations /></PrivateRoute>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
