import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/bodoni-moda/opsz-italic.css'
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
