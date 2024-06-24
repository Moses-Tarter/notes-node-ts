import { Container } from "inversify";
import { TYPES } from "./types";
import { PrismaClient } from '@prisma/client';
import { NoteService, Logger } from "../services/noteService";
import { NoteController } from "../controllers/notes";

const container = new Container();

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
container.bind<NoteService>(TYPES.NoteService).to(NoteService);
container.bind<NoteController>(TYPES.NoteController).to(NoteController);
container.bind<Logger>(TYPES.Logger).toConstantValue(console);

export { container };
