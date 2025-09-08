import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api'; // Axios instance with VITE_API_URL
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Update form fields
  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || form.password.length < 6) {
      return toast.error('Please fill all fields correctly (password min 6)');
    }

    try {
      // Updated to match backend route
      const res = await API.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Registered successfully');
      navigate('/notes'); // Redirect after successful registration
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      toast.error(msg);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
      }}
    >
      <motion.div
        className="card shadow-lg p-4 rounded-4"
        style={{ width: '100%', maxWidth: '450px', background: '#fff' }}
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Title */}
        <motion.h3
          className="text-center mb-4 fw-bold text-primary"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fa fa-user-plus me-2"></i> Register
        </motion.h3>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa fa-user"></i>
              </span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa fa-envelope"></i>
              </span>
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
              <span className="input-group-text bg-light">
                <i className="fa fa-lock"></i>
              </span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                className="form-control"
                placeholder="Enter a password (min 6 chars)"
              />
            </div>
          </div>

          <motion.button
            className="btn btn-success w-100 rounded-pill fw-bold py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <i className="fa fa-check-circle me-2"></i> Register
          </motion.button>
        </form>

        {/* Footer with React Router Link */}
        <p className="text-center mt-3 text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none fw-bold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}