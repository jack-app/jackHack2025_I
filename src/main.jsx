import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode basename={import.meta.env.DEV ? "/" : "/jackHack2025_I/"}>
    <App />
  </StrictMode>,
)
