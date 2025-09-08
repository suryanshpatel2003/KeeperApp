import React, { useEffect, useState } from 'react'
import API from '../../api'
import NoteForm from './NoteForm'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

export default function NotesList() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentNote, setCurrentNote] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const fetchNotes = async () => {
    try {
      const res = await API.get('/notes')
      setNotes(res.data)
    } catch {
      toast.error('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchNotes() }, [])

  const onSave = (savedNote) => {
    setNotes(prev => {
      const found = prev.find(n => n._id === savedNote._id)
      if (found) return prev.map(n => n._id === savedNote._id ? savedNote : n)
      return [savedNote, ...prev]
    })
    setCurrentNote(null)
    setShowModal(false)
  }

  const deleteNote = async (id) => {
    if (!window.confirm('Delete this note?')) return
    try {
      await API.delete(`/notes/${id}`)
      setNotes(prev => prev.filter(n => n._id !== id))
      toast.success('Note deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          <i className="fa fa-sticky-note text-primary me-2"></i>Your Notes
        </h3>
        <button 
          className="btn btn-success rounded-pill px-3 shadow-sm"
          onClick={() => { setCurrentNote(null); setShowModal(true) }}
        >
          <i className="fa fa-plus me-2"></i> New Note
        </button>
      </div>

      {/* Notes Grid */}
      <div className="row">
        <AnimatePresence>
          {notes.length === 0 && (
            <motion.p 
              className="text-muted text-center"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
            >
              No notes yet. Click <b>New Note</b> to create one!
            </motion.p>
          )}
          {notes.map(note => (
            <motion.div 
              key={note._id} 
              className="col-12 col-lg-6 mb-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card h-100 shadow-sm border-0 hover-shadow rounded-3">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center">
                    <i className="fa fa-book-open text-primary me-2"></i>
                    {note.title}
                  </h5>
                  <p className="card-text">{note.content}</p>
                  <small className="text-muted">
                    <i className="fa fa-clock me-1"></i>
                    {new Date(note.updatedAt).toLocaleString()}
                  </small>
                  <div className="mt-3 d-flex justify-content-end">
                    <button 
                      className="btn btn-sm btn-outline-primary me-2 rounded-pill"
                      onClick={() => { setCurrentNote(note); setShowModal(true) }}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => deleteNote(note._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bootstrap Modal with Animation */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <motion.div 
                className="modal-content rounded-4 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">
                    {currentNote ? (
                      <><i className="fa fa-edit text-primary me-2"></i>Edit Note</>
                    ) : (
                      <><i className="fa fa-plus text-success me-2"></i>New Note</>
                    )}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <NoteForm 
                    currentNote={currentNote} 
                    clearCurrent={() => setCurrentNote(null)} 
                    onSave={onSave} 
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
