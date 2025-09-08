import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return toast.error('Fill email and password')
    try {
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      toast.success('Login successful')
      navigate('/notes')
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || 'Login failed'
      toast.error(msg)
    }
  }

  return (
    <div 
      className="d-flex align-items-center justify-content-center vh-100" 
      style={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" }}
    >
      <motion.div
        className="card shadow-lg p-4 rounded-4"
        style={{ width: "100%", maxWidth: "420px", background: "#fff" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h3 
          className="text-center mb-4 fw-bold text-primary"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fa fa-user-circle me-2"></i> Login
        </motion.h3>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="fa fa-envelope"></i></span>
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={onChange} 
                className="form-control" 
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="fa fa-lock"></i></span>
              <input 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={onChange} 
                className="form-control" 
                placeholder="Enter your password"
              />
            </div>
          </div>

          <motion.button
            className="btn btn-primary w-100 rounded-pill fw-bold py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <i className="fa fa-sign-in-alt me-2"></i> Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center mt-3 text-muted">
          Don’t have an account? <a href="/register" className="text-decoration-none fw-bold">Register</a>
        </p>
      </motion.div>
    </div>
  )
}
