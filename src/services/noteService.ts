import { injectable, inject } from "inversify";
import { PrismaClient } from '@prisma/client';
import { TYPES } from "../inversify/types";

export interface Logger {
    log(...data: any[]): void;
}

@injectable()
export class NoteService {
    constructor(
        @inject(TYPES.PrismaClient) private readonly connectionPool: PrismaClient,
        @inject(TYPES.Logger) private readonly logger: Logger
    ) {}

    async getAllNotes() {
        const result = await this.connectionPool.noteService.findMany();
        return result;        
    }

    async addNote (text: string) {
        try {
            const result = await this.connectionPool.noteService.create({
                data: {
                    content: text
                }
            });

            this.logger.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    async updateNote (id: string, text: string) {
        const results = await this.connectionPool.noteService.update({
            where: { id: +id },
            data: { content: text },
        });
    }

    async deleteNote (id: string) {
        await this.connectionPool.noteService.delete({
            where: { id: +id }
        });
    }
}
