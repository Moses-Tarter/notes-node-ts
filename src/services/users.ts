import { PrismaClient, User } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';

interface Logger {
    log(...data: any[]): void;
}

@injectable()
export class UserService {
    constructor(
        @inject(TYPES.PrismaClient) private readonly prisma: PrismaClient,
        @inject(TYPES.Logger) private readonly logger: Logger
    ) {}

    async createUser(email: string, name?: string): Promise<User> {
        try {
            const user = await this.prisma.user.create({
                data: { email, name }
            });
            this.logger.log('User created:', user);
            return user;
        } catch (error) {
            this.logger.log('Error creating user:', error);
            throw error;
        }
    }

    async getUserById(userId: number): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { id: userId }
            });
        } catch (error) {
            this.logger.log('Error fetching user:', error);
            throw error;
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            this.logger.log('Error fetching users:', error);
            throw error;
        }
    }
}
