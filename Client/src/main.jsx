import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { StyledEngineProvider } from '@mui/material'

import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
    <GoogleOAuthProvider 
    clientId="1031042093894-v6r8270cp230aev8anq8ekbj8mk0r4sg.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
