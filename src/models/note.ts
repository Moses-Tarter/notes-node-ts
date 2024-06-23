import { PrismaClient } from '@prisma/client';


interface Logger {
    log(...data: any[]): void;
}

export class NoteService {
    constructor(private readonly connectionPool: PrismaClient, private readonly logger: Logger) {}

    async getAllNotes() {
        const result = await this.connectionPool.noteService.findMany();
        return result        
    }

    async addNote (text: string) {
        try {
            const result = await this.connectionPool.noteService.create({
                data: {
                    content: text
                  }
            });

            this.logger.log(result);
        }
        catch (e) {
            console.log(e)
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
            where: {id: +id}
        });
    }

}