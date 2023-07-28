import { AuthenticationError } from '../../common/errors/authentication.error';
import { BusinessError } from '../../common/errors/business.error';
import prisma from '../../database';
import { AuthToken } from '../models/auth.model';
import bcrypt from 'bcrypt';
import { TokenService } from './token.service';

export interface AuthService {
  authenticate(password: string, username?: string, email?: string): Promise<AuthToken>;
}

class _AuthService implements AuthService {
  /**
   * Authenticates a user.
   *
   * @param password
   * @param username
   * @param email
   */
  public async authenticate(password: string, username?: string, email?: string): Promise<AuthToken> {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (!existingUser) throw new BusinessError('Incorrect login or password');

    await this.checkPassword(password, existingUser.password);

    const authToken: AuthToken = TokenService.generate(existingUser);

    return authToken;
  }

  private async checkPassword(entry: string, userPassword: string): Promise<boolean> {
    const test: boolean = await bcrypt.compare(entry, userPassword);

    if (!test) throw new AuthenticationError('Incorrect password');

    return true;
  }
}

export const AuthService: AuthService = new _AuthService();
