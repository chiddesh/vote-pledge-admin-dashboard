import React from 'react'
import './App.css'
import AdminLayout from './Layout/AdminLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Reports from './Pages/Reports'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />} >
            <Route index element={<Home />} />
            <Route path='reports' element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App