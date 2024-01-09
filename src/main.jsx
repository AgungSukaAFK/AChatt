import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Css
import "./index.css";

// Pages
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ChatBeta from "./pages/ChatBeta.jsx";
import PlaygroundPage from "./pages/PlaygroundPage.jsx";
import NoLogin from "./pages/NoLogin.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/beta",
    element: <ChatBeta />,
  },
  {
    path: "/nologin",
    element: <NoLogin />,
  },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },
  {
    path: "/playground",
    element: <PlaygroundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
