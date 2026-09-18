import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './demo/App.tsx'
import './styles/index.scss'
import './i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
