import mongoose from 'mongoose'
import Note from '../models/noteModel.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc    Create Note
// @route   POST /api/v1/notes/
// @access  Public
export const createNote = async (req, res) => {
  const { title, body } = req.body
  if (!body) {
    throw new ErrorResponse('Please provide all values', 400)
  }

  const note = await Note.create(req.body)

  res.status(201).json({ note })
}

// @desc    Get All Notes
// @route   GET /api/v1/notes/
// @access  Public
export const getAllNotes = async (req, res) => {
  const notes = await Note.find({})
  res.status(200).json({
    totalNotes: notes.length,
    notes,
  })
}
