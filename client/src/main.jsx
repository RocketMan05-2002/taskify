import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContext, AuthProvider } from '../context/AuthContext.jsx'
import { BrowserRouter } from 'react-router'
import { ClipProvider } from '../context/ClipContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ClipProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClipProvider>
    </AuthProvider>
  </StrictMode>,
)
