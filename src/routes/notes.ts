import { Router } from "express";

import { createNote, fetchAllnotes, updateNote, deleteNote } from '../controllers/notes';

const router = Router();

router.get('/', fetchAllnotes); // to retrieve all posts

router.post('/', createNote); // to add a note

router.patch('/:id', updateNote); // to modify a note

router.delete('/:id', deleteNote); // to delete a note


export default router;