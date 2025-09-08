import React, { useState, useEffect } from 'react'
import API from '../../api'
import { toast } from 'react-toastify'

export default function NoteForm({ currentNote, clearCurrent, onSave }) {
  const [note, setNote] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false) // ✅ track button state

  useEffect(() => {
    if (currentNote) {
      setNote({ title: currentNote.title, content: currentNote.content })
    } else {
      setNote({ title: '', content: '' })
    }
  }, [currentNote])

  const onChange = (e) =>
    setNote({ ...note, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!note.title.trim() || !note.content.trim()) {
      return toast.error('Title and content are required')
    }
    setLoading(true) // ✅ disable button
    try {
      if (currentNote) {
        const res = await API.put(`/api/notes/${currentNote._id}`, note)
        toast.success('Note updated')
        onSave(res.data)
      } else {
        const res = await API.post('/api/notes', note)
        toast.success('Note created')
        onSave(res.data)
        setNote({ title: '', content: '' })
      }
    } catch (err) {
      console.error(err)
      toast.error('Error saving note')
    } finally {
      setLoading(false) // ✅ re-enable button
    }
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{currentNote ? 'Edit Note' : 'New Note'}</h5>
        <form onSubmit={submit}>
          <input
            name="title"
            value={note.title}
            onChange={onChange}
            className="form-control mb-2"
            placeholder="Title"
          />
          <textarea
            name="content"
            value={note.content}
            onChange={onChange}
            className="form-control mb-2"
            rows="4"
            placeholder="Content"
          />
          <button
            className="btn btn-success me-2"
            disabled={loading} // ✅ disable while saving
          >
            {loading ? (
              <span>
                <i className="fa fa-spinner fa-spin me-2"></i> Saving...
              </span>
            ) : (
              currentNote ? 'Update' : 'Create'
            )}
          </button>
          {currentNote && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearCurrent}
              disabled={loading} // disable cancel too while saving
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
