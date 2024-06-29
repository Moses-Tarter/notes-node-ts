import { RequestHandler } from "express";
import { inject, injectable } from 'inversify';
import { NoteService } from '../services/note';
import { TYPES } from '../inversify/types';

@injectable()
export class NoteController {
    constructor(
        @inject(TYPES.NoteService) private noteService: NoteService,
    ) {}

    public createNote: RequestHandler = async (req, res, next) => {
        try {
            const { text, userId } = req.body as { text: string, userId: number };
            const newNote = await this.noteService.addNote(+userId, text);
            res.status(201).json({ message: 'A new note was added', newNote });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create a new note' });
        }
    };

    public fetchAllNotes: RequestHandler = async (req, res, next) => {
        try {
            const notes = await this.noteService.getAllNotes();
            console.log(notes)
            res.status(200).json({ message: 'A list of all notes', notes });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch notes' });
        }
    };

    public updateNote: RequestHandler = async (req, res, next) => {
        const noteId = (req.params as { id: string }).id;
        const newText = (req.body as { text: string }).text;
        try {
            const updatedNote = await this.noteService.updateNote(noteId, newText);
            res.status(200).json({ message: `Note with id: ${noteId} was updated`, updatedNote });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Failed to update note with id: ${noteId}` });
        }
    };

    public deleteNote: RequestHandler = async (req, res, next) => {
        const noteId = (req.params as { id: string }).id;
        try {
            await this.noteService.deleteNote(noteId);
            res.status(200).json({ message: `Note with id: ${noteId} was deleted` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Failed to delete note with id: ${noteId}` });
        }
    };
}

