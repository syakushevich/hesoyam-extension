import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExtensionMenu from './overlay/ExtensionMenu.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExtensionMenu />
  </StrictMode>,
)
