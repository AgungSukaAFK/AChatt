import React from 'react'
import ReactDOM from 'react-dom/client'

// Pages
// import Home from './pages/Home.jsx'
import Chat from "./pages/Chat.jsx"

// Css
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Home /> */}
    <Chat />
  </React.StrictMode>,
)
