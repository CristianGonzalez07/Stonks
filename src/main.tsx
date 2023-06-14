import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
