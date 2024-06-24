import { Router } from "express";
import { container } from "../inversify/inversify.config";
import { TYPES } from "../inversify/types";
import { NoteController } from "../controllers/notes";

const router = Router();
const noteController = container.get<NoteController>(TYPES.NoteController);

router.get('/', noteController.fetchAllNotes); // to retrieve all posts
router.post('/', noteController.createNote); // to add a note
router.patch('/:id', noteController.updateNote); // to modify a note
router.delete('/:id', noteController.deleteNote); // to delete a note

export default router;
