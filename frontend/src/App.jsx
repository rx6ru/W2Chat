import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ThemePage from './pages/ThemePage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'
import {useThemeStore } from './store/useThemeStore'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  const {theme} = useThemeStore()
  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  
  console.log(onlineUsers)


  if(isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-20 animate-spin' />     
      </div>
    )
  }

  return (
    <div data-theme={theme}>

      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/theme' element={<ThemePage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App