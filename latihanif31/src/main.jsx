import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@css/styles.css"
import QuotePage from './pages/quotes/Quote'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-blue-500'>
        <QuotePage />
    </div>
  </StrictMode>,
)
