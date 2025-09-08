import React, { useState, useEffect } from 'react'
import API from '../../api'
import { toast } from 'react-toastify'

export default function NoteForm({ currentNote, clearCurrent, onSave }) {
  const [note, setNote] = useState({ title: '', content: '' })

  useEffect(() => {
    if (currentNote) setNote({ title: currentNote.title, content: currentNote.content })
    else setNote({ title: '', content: '' })
  }, [currentNote])

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!note.title.trim() || !note.content.trim()) return toast.error('Title and content are required')
    try {
      if (currentNote) {
        const res = await API.put(`/notes/${currentNote._id}`, note)
        toast.success('Note updated')
        onSave(res.data)
      } else {
        const res = await API.post('/notes', note)
        toast.success('Note created')
        onSave(res.data)
        setNote({ title: '', content: '' })
      }
    } catch {
      toast.error('Error saving note')
    }
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{currentNote ? 'Edit Note' : 'New Note'}</h5>
        <form onSubmit={submit}>
          <input name="title" value={note.title} onChange={onChange} className="form-control mb-2" placeholder="Title" />
          <textarea name="content" value={note.content} onChange={onChange} className="form-control mb-2" rows="4" placeholder="Content"></textarea>
          <button className="btn btn-success me-2">{currentNote ? 'Update' : 'Create'}</button>
          {currentNote && <button type="button" className="btn btn-secondary" onClick={clearCurrent}>Cancel</button>}
        </form>
      </div>
    </div>
  )
}
