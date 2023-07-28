import express from 'express';
import { AuthToken } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

export interface AuthController {
  login(req: express.Request, res: express.Response): Promise<void>;
}

class _AuthController implements AuthController {
  public async login(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const authToken: AuthToken = await AuthService.authenticate(password, username, email);

      res.status(200).json(authToken);
    } catch (err) {
      res.status(401).json({ error: err as Error });
    }
  }
}

export const AuthController: AuthController = new _AuthController();
