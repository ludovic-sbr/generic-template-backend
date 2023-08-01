import { Response } from 'express';
import { UserService } from '../services/user.service';
import { User, UserDTO } from '../models';
import { CausalError } from '../../common/errors/causal.error';
import { CustomRequest } from '../../common/entities/customRequest';

export interface UserController {
  register(req: CustomRequest, res: Response): Promise<void>;
  update(req: CustomRequest, res: Response): Promise<void>;
  delete(req: CustomRequest, res: Response): Promise<void>;
}

class _UserController implements UserController {
  public async register(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const input: UserDTO = {
        email: email,
        password: password,
        roleId: 1,
      };

      const createdUser: User = await UserService.create(input);

      res.status(200).json(createdUser);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }

  public async update(req: CustomRequest, res: Response): Promise<void> {
    res.status(200);
  }

  public async delete(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedUser: User = await UserService.deleteById(Number(id));

      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }
}

export const UserController: UserController = new _UserController();
