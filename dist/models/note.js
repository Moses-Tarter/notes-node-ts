"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const database_1 = __importDefault(require("../utils/database"));
class Note {
    id;
    text;
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
    static getAllNotes = async () => {
        const [results] = await (await database_1.default).query('SELECT * FROM note');
        return results;
    };
    static addNote = async (text) => {
        const [results, fields] = await (await database_1.default).query('INSERT INTO note(text) values(?)', [text]);
        console.log(results, fields);
    };
    static updateNote = async (id, text) => {
        const [results] = await (await database_1.default).query('UPDATE note SET text=? WHERE id=?', [text, id]);
    };
    static deleteNote = async (id) => {
        await (await database_1.default).query('DELETE FROM note WHERE id=?', [id]);
    };
}
exports.Note = Note;
