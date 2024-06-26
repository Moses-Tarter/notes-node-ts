import { Router } from "express";
import { container } from "../inversify/inversify.config";
import { TYPES } from "../inversify/types";
import { NoteController } from "../controllers/notes"; 
import { UserController } from "../controllers/users";

const router = Router();
const noteController = container.get<NoteController>(TYPES.NoteController);
const userController = container.get<UserController>(TYPES.UserController)

router.get('/users/:id', userController.getUserById); // to retrieve a user by id
router.get('/users', userController.fetchAllUsers); // to retrieve all users
router.post('/users', userController.createUser); // to add a user

router.get('/', noteController.fetchAllNotes); // to retrieve all posts
router.get('/:id', noteController.fetchNotesByUserId); // to retrieve all notes by user id
router.post('/', noteController.createNote); // to add a note
router.patch('/:id', noteController.updateNote); // to modify a note
router.delete('/:id', noteController.deleteNote); // to delete a note


export default router;
