import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <motion.nav 
      className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        
        {/* Brand Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
            <i className="fa fa-sticky-note me-2"></i> Keeper App
          </Link>
        </motion.div>

        {/* Toggler for mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <motion.li 
                  className="nav-item"
                  whileHover={{ scale: 1.1 }}
                >
                  <Link to="/notes" className="nav-link nav-animate">
                    <i className="fa fa-book me-1"></i> My Notes
                  </Link>
                </motion.li>
                <motion.li 
                  className="nav-item ms-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <button 
                    className="btn btn-outline-light rounded-pill px-3 py-1 logout-btn"
                    onClick={logout}
                  >
                    <i className="fa fa-sign-out-alt me-1"></i> Logout
                  </button>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li className="nav-item" whileHover={{ scale: 1.1 }}>
                  <Link to="/login" className="nav-link nav-animate">
                    <i className="fa fa-sign-in-alt me-1"></i> Login
                  </Link>
                </motion.li>
                <motion.li className="nav-item" whileHover={{ scale: 1.1 }}>
                  <Link to="/register" className="nav-link nav-animate">
                    <i className="fa fa-user-plus me-1"></i> Register
                  </Link>
                </motion.li>
              </>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  )
}
