import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import Home from './pages/Home.jsx'
import Chat from "./pages/Chat.jsx"

// Css
import './index.css'
// import create from 'prompt-sync'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Home /> */}
    {/* <Chat /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
