import { RequestHandler } from "express";
import { inject, injectable } from "inversify";
import { UserService, Logger } from "../services/users";
import { TYPES } from "../inversify/types";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Logger) private logger: Logger
  ) {}

  public createUser: RequestHandler = async (req, res, next) => {
    try {
      const { email, name } = req.body as { email: string; name?: string };
      const newUser = await this.userService.createUser(email, name);
      res.status(201).json({ message: "A new user was added", newUser });
    } catch (error) {
      this.logger.log(error);
      res.status(500).json({ message: "Failed to create a new user" });
    }
  };

  public fetchAllUsers: RequestHandler = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ message: "A list of all users", users });
    } catch (error) {
      this.logger.log(error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };

  public getUserById: RequestHandler = async (req, res, next) => {
    const id = (req.params as { id: string }).id;
    try {
      const user = await this.userService.getUserById(+id);
      res.status(200).json({ message: "Found the requested user", user: user });
    } catch (error) {
      this.logger.log(error);
      res.status(500).json({ message: `Failed to find user with id: ${id}` });
    }
  };
}
