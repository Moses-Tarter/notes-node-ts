import { RequestHandler } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { NoteService } from "../services/noteService";

@injectable()
export class NoteController {
    constructor(
        @inject(TYPES.NoteService) private noteService: NoteService
    ) {}

    public createNote: RequestHandler = (req, res, next) => {
        const text = (req.body as { text: string }).text;
        this.noteService.addNote(text);
        res.status(201).json({ message: 'A new note was added', newNote: text });
    };

    public fetchAllNotes: RequestHandler = async (req, res, next) => {
        const notes = await this.noteService.getAllNotes();
        res.status(200).json({ message: 'A list of all notes', notes: notes });
    };

    public updateNote: RequestHandler = (req, res, next) => {
        const noteId = (req.params as { id: string }).id;
        const newText = (req.body as { text: string }).text;
        this.noteService.updateNote(noteId, newText);
        res.status(200).json({ message: `Note with id: ${noteId} was updated`, UpdatedText: newText });
    };

    public deleteNote: RequestHandler = (req, res, next) => {
        const noteId = (req.params as { id: string }).id;
        this.noteService.deleteNote(noteId);
        res.status(200).json({ message: `Note with id: ${noteId} was deleted` });
    };
}
