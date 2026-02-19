import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.tsx'
import AuthProvider from './auth/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>,
)
