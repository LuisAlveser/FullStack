import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from "./components/Login.jsx"
import TelaPrincipal from "./components/TelaPrincipal.jsx"
import Board from './components/Board.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter> 
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/TelaPrincipal" element={<TelaPrincipal />} />
         <Route path="/Board" element={<Board />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
