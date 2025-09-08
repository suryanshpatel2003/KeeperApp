const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Note = require('../models/Note');

// GET all notes for user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST create note
router.post('/', [ auth, [
  check('title', 'Title is required').notEmpty(),
  check('content', 'Content is required').notEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, content } = req.body;
  try {
    const newNote = new Note({ user: req.user.id, title, content });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT update
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  const updateFields = {};
  if (title) updateFields.title = title;
  if (content) updateFields.content = content;

  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    note = await Note.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Note not found' });
    res.status(500).send('Server error');
  }
});

// DELETE
// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const noteId = req.params.id;
    console.log("Delete request for note:", noteId, "by user:", req.user?.id);

    // Validate ObjectId first
    if (!noteId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: 'Invalid note ID format' });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    if (!note.user) {
      return res.status(400).json({ msg: 'Note has no owner (invalid data)' });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this note' });
    }

    await note.deleteOne();  
    return res.json({ msg: 'Note removed successfully' });

  } catch (err) {
    console.error("Delete error:", err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid note ID' });
    }
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
});



module.exports = router;
