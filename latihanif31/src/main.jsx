import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@css/styles.css"
// import QuotePage from './pages/quotes/Quote'
// import CreatQuote from './pages/quotes/CreateQuote'
import { RouterProvider } from "react-router";
import router from "./routes/router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-amber-50'>
        <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
