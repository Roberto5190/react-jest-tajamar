import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Iniciar MSW si estás en desarrollo
if (import.meta.env.MODE === 'development') {
  (async () => {
    const { worker } = await import('./mocks/browser');
    console.log('✅ MSW iniciado');
    await worker.start();
  })();
}


createRoot(document.getElementById('root')).render(


  <StrictMode>
    <App />
  </StrictMode>,
)
