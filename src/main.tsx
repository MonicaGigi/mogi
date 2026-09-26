import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AccountProvider } from './account/AccountProvider.tsx'
import { ShopProvider } from './shop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShopProvider>
      <AccountProvider>
        <App />
      </AccountProvider>
    </ShopProvider>
  </StrictMode>,
)
