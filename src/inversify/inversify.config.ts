import { Container } from "inversify";
import { TYPES } from "./types";
import { PrismaClient } from '@prisma/client';
import { NoteService, Logger } from "../services/note";
import { NoteController } from "../controllers/notes";
import { UserService } from "../services/users";
import { UserController } from "../controllers/users";

const container = new Container();

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
container.bind<NoteService>(TYPES.NoteService).to(NoteService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<NoteController>(TYPES.NoteController).to(NoteController);
container.bind<Logger>(TYPES.Logger).toConstantValue(console);
container.bind<UserController>(TYPES.UserController).to(UserController);

export { container };
