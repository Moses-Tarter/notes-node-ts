"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.fetchAllnotes = exports.createNote = void 0;
const note_1 = require("../models/note");
const createNote = (req, res, next) => {
    const text = req.body.text;
    note_1.Note.addNote(text);
    res.status(201).json({ message: 'A new note was added', newNote: text });
};
exports.createNote = createNote;
const fetchAllnotes = async (req, res, next) => {
    const notes = await note_1.Note.getAllNotes();
    res.status(200).json({ message: 'A list off all notes', notes: notes });
};
exports.fetchAllnotes = fetchAllnotes;
const updateNote = (req, res, next) => {
    const noteId = req.params.id;
    const newText = req.body.text;
    note_1.Note.updateNote(noteId, newText);
    res.status(200).json({ message: `Note with id: ${noteId} was updated`, UpdatedText: newText });
};
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => {
    const noteId = req.params.id;
    note_1.Note.deleteNote(noteId);
    res.status(200).json({ message: `Note with id: ${noteId} was deleted` });
};
exports.deleteNote = deleteNote;
