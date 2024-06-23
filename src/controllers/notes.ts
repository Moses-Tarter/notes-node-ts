import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client';

import { NoteService } from '../models/note';

const prisma = new PrismaClient();
const noteService = new NoteService(prisma, console)

export const createNote: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    noteService.addNote(text)
    res.status(201).json({message: 'A new note was added', newNote: text});
};

export const fetchAllnotes: RequestHandler = async (req, res, next) => {
    const notes = await noteService.getAllNotes();
    res.status(200).json({message: 'A list off all notes', notes: notes});
}

export const updateNote: RequestHandler = (req, res, next) => {
    const noteId = (req.params as {id: string}).id;
    const newText = (req.body as {text: string}).text;
    noteService.updateNote(noteId, newText);
    res.status(200).json({message: `Note with id: ${noteId} was updated`, UpdatedText: newText});
}

export const deleteNote: RequestHandler = (req, res, next) => {
    const noteId = (req.params as {id: string}).id;
    noteService.deleteNote(noteId);
    res.status(200).json({message: `Note with id: ${noteId} was deleted`});
}



