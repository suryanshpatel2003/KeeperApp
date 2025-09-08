import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const shapes = [
  { top: "10%", left: "5%", size: 60, color: "rgba(255,255,255,0.15)" },
  { top: "30%", left: "80%", size: 100, color: "rgba(255,255,255,0.1)" },
  { top: "70%", left: "20%", size: 80, color: "rgba(255,255,255,0.12)" },
  { top: "50%", left: "50%", size: 120, color: "rgba(255,255,255,0.08)" },
]

export default function Home() {
  return (
    <div className="position-relative overflow-hidden">

      {/* Floating Shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="position-absolute rounded-circle"
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
          }}
          animate={{ y: ["0%", "20%", "0%"], x: ["0%", "10%", "0%"] }}
          transition={{ duration: 8 + i, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}

      {/* Hero / Banner */}
      <section className="text-white text-center py-5" 
        style={{ background: "linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="display-4 fw-bold">Your Personal Notes, Organized</h1>
          <p className="lead mt-3">Create, manage, and track all your notes in one secure place.</p>
          <Link to="/notes" className="btn btn-light btn-lg rounded-pill mt-3">
            <i className="fa fa-sticky-note me-2"></i> Go to Notes
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Features</h2>
          <div className="row g-4">
            {[
              { icon: "fa-sticky-note", title: "Manage Notes", text: "Create, edit, delete, and organize your notes effortlessly.", color: "text-success" },
              { icon: "fa-user-shield", title: "Secure Login", text: "JWT authentication ensures your notes stay private.", color: "text-primary" },
              { icon: "fa-mobile-alt", title: "Responsive Design", text: "Access your notes from any device.", color: "text-warning" },
              { icon: "fa-bolt", title: "Fast & Light", text: "Optimized for speed and performance.", color: "text-danger" },
            ].map((feature, i) => (
              <motion.div 
                className="col-md-6 col-lg-3 text-center"
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <i className={`fa ${feature.icon} fa-3x mb-3 ${feature.color}`}></i>
                <h5>{feature.title}</h5>
                <p>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <motion.img 
                src="https://plus.unsplash.com/premium_photo-1683417272601-dbbfed0ed718?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5vdGVzfGVufDB8fDB8fHww" 
                alt="About NotesApp" 
                width={"400px"}
                className="img-fluid rounded shadow"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="col-md-6">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="fw-bold mb-3">About NotesApp</h2>
                <p>NotesApp helps you stay organized with a secure, fast, and responsive notes management system. Focus on your ideas while we keep them safe and easy to access.</p>
                <Link to="/notes" className="btn btn-primary rounded-pill mt-3">
                  <i className="fa fa-sticky-note me-2"></i> Go to Notes
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-5 text-center text-white position-relative" style={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="fw-bold mb-3">Start Managing Your Notes Today!</h2>
          <p className="mb-4">Click below to access all your notes securely and efficiently.</p>
          <Link to="/notes" className="btn btn-light btn-lg rounded-pill">
            <i className="fa fa-sticky-note me-2"></i> Go to Notes
          </Link>
        </motion.div>
      </section>

    </div>
  )
}
