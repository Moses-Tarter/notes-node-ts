import { RequestHandler } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { NoteService, Logger } from "../services/noteService";

@injectable()
export class NoteController {
  constructor(
    @inject(TYPES.NoteService) private noteService: NoteService,
    @inject(TYPES.Logger) private logger: Logger
  ) {}

  public createNote: RequestHandler = (req, res, next) => {
    try {
      const text = (req.body as { text: string }).text;
      this.noteService.addNote(text);
      res.status(201).json({ message: "A new note was added", newNote: text });
    } catch (e) {
      this.logger.log(e);
      res.status(500).json({ message: `Failed to create note` });
    }
  };

  public fetchAllNotes: RequestHandler = async (req, res, next) => {
    try {
      const notes = await this.noteService.getAllNotes();
      res.status(200).json({ message: "A list of all notes", notes: notes });
    } catch (e) {
      this.logger.log(e);
      res.status(500).json({ message: `Failed to retrieve notes` });
    }
  };

  public updateNote: RequestHandler = (req, res, next) => {
    const noteId = (req.params as { id: string }).id;
    const newText = (req.body as { text: string }).text;
    try {
      this.noteService.updateNote(noteId, newText);
      res
        .status(200)
        .json({
          message: `Note with id: ${noteId} was updated`,
          UpdatedText: newText,
        });
    } catch (e) {
      this.logger.log(e);
      res
        .status(500)
        .json({ message: `Failed to update note with id: ${noteId}` });
    }
  };

  public deleteNote: RequestHandler = (req, res, next) => {
    const noteId = (req.params as { id: string }).id;
    try {
      this.noteService.deleteNote(noteId);
      res.status(200).json({ message: `Note with id: ${noteId} was deleted` });
    } catch (e) {
      this.logger.log(e);
      res
        .status(500)
        .json({ message: `Failed to delete note with id: ${noteId}` });
    }
  };
}
