import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app.css'  // Update this import to point to your CSS file with Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)