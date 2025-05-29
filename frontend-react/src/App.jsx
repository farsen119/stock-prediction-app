import { useState } from 'react'
import './assets/css/style.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './components/AuthProvider'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRout from './PrivateRout'
import PublicRout from './PublicRout'



function App() {
  const [count, setCount] = useState(0)

  return (
      <>

    <AuthProvider>
      <BrowserRouter >
      <Header />
        <Routes>
          <Route path='/' element={ <Main />} />
          <Route path='/register' element={<PublicRout>
            <Register />
          </PublicRout>} />
          <Route path='/login' element={<PublicRout>
            <Login />
          </PublicRout>} />
          <Route path='/dashboard' element={<PrivateRout>
            <Dashboard />
          </PrivateRout>} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </AuthProvider>

   
    
      
    </>
  )
}

export default App
