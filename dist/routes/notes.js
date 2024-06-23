"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_1 = require("../controllers/notes");
const router = (0, express_1.Router)();
router.get('/', notes_1.fetchAllnotes); // to retrieve all posts
router.post('/', notes_1.createNote); // to add a note
router.patch('/:id', notes_1.updateNote); // to modify a note
router.delete('/:id', notes_1.deleteNote); // to delete a note
exports.default = router;
