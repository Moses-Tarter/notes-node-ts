import { injectable, inject } from "inversify";
import { Note, PrismaClient } from "@prisma/client";
import { TYPES } from "../inversify/types";

// where should this be located? currently found here and in users.ts
export interface Logger {
  log(...data: any[]): void;
}

@injectable()
export class NoteService {
  constructor(
    @inject(TYPES.PrismaClient) private readonly connectionPool: PrismaClient,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {}

  async getAllNotes(): Promise<
    {
      id: number;
      content: string;
      userId: number;
    }[]
  > {
    try {
      const result = await this.connectionPool.note.findMany();
      this.logger.log(result);
      return result;
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to retrieve...");
    }
  }

  async getNotesByUserId(userId: number): Promise<
    {
      id: number;
      content: string;
      userId: number;
    }[]
  > {
    try {
      const result = await this.connectionPool.note.findMany({
        where: { userId: userId },
      });
      this.logger.log(result);
      return result;
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to retrieve...");
    }
  }

  async addNote(id: number, text: string): Promise<Note> {
    try {
      const result = await this.connectionPool.note.create({
        data: {
          userId: id,
          content: text,
        },
      });

      this.logger.log(result);
      return result;
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to add the new note...");
    }
  }

  async updateNote(id: string, text: string): Promise<Note> {
    try {
      const results = await this.connectionPool.note.update({
        where: { id: +id },
        data: { content: text },
      });

      this.logger.log(results);
      return results;
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to update...");
    }
  }

  async deleteNote(id: string): Promise<Note> {
    try {
      const results = await this.connectionPool.note.delete({
        where: { id: +id },
      });

      this.logger.log(results);
      return results;
    } catch (e) {
      this.logger.log(e);
      throw new Error("failed to delete...");
    }
  }
}
