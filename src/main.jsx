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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/login",
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Home /> */}
    {/* <Chat /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
