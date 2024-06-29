import { injectable, inject } from "inversify";
import { PrismaClient } from "@prisma/client";
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
    try {
      const result = await this.connectionPool.note.findMany();
      this.logger.log(result);
      return result;
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to retrieve...");
    }
  }

  async addNote(id: number, text: string) {
    try {
      const result = await this.connectionPool.note.create({
        data: {
          userId: id,
          content: text,
        },
      });

      this.logger.log(result);
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to add the new note...");
    }
  }

  async updateNote(id: string, text: string) {
    try {
      const results = await this.connectionPool.note.update({
        where: { id: +id },
        data: { content: text },
      });

      this.logger.log(results);
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to update...");
    }
  }

  async deleteNote(id: string) {
    try {
      const results = await this.connectionPool.note.delete({
        where: { id: +id },
      });

      this.logger.log(results);
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to delete...");
    }
  }
}
