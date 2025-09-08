import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Layout/Navbar'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotesList from './components/Notes/NotesList'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'

export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesList />
              </ProtectedRoute>
            }
          />
          {/* Optional: add a 404 page route here */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </>
  )
}
