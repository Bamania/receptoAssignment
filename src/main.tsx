import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import StoreProvider from './redux/storeprovider.tsx'
import { persistor } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <StoreProvider>
       <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </StoreProvider>
  </StrictMode>,
)
