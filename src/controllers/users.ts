import { RequestHandler } from "express";
import { inject, injectable } from 'inversify';
import { UserService } from '../services/users';
import { TYPES } from '../inversify/types';

@injectable()
export class UserController {
    constructor(
        @inject(TYPES.UserService) private userService: UserService
    ) {}

    public createUser: RequestHandler = async (req, res, next) => {
        try {
            const { email, name } = req.body as { email: string, name?: string };
            const newUser = await this.userService.createUser(email, name);
            res.status(201).json({ message: 'A new user was added', newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create a new user' });
        }
    };

    public fetchAllUsers: RequestHandler = async (req, res, next) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ message: 'A list of all users', users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    };
}
