import express from 'express';
import { UserService } from '../services/user.service';
import { User, UserFactory } from '../models/user.model';

export interface UserController {
  register(req: express.Request, res: express.Response): Promise<void>;
  update(req: express.Request, res: express.Response): Promise<void>;
  delete(req: express.Request, res: express.Response): Promise<void>;
}

class _UserController implements UserController {
  public async register(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const input: User = UserFactory.user(username, email, password, 1);

      const createdUser: User = await UserService.create(input);

      res.status(200).json(createdUser);
    } catch (err) {
      res.status(400).json({ error: err as Error });
    }
  }

  public async update(req: express.Request, res: express.Response): Promise<void> {
    res.status(200);
  }

  public async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedUser: User = await UserService.deleteById(Number(id));

      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(400).json({ error: err as Error });
    }
  }
}

export const UserController: UserController = new _UserController();
