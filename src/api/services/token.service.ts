import { AuthFactory, AuthToken } from '../models/auth.model';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '../../common/config/main';

export interface TokenService {
  generate(user: User): AuthToken;
}

class _TokenService implements TokenService {
  /**
   * Generates a new token for a specific user.
   *
   * @param user
   */
  public generate(user: User): AuthToken {
    const expirationDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));

    const authToken: string = jwt.sign(
      {
        user_email: user.email,
      },
      config.jwtSecret,
      { subject: user.username, expiresIn: '1d', issuer: config.apiName, algorithm: 'HS256' },
    );

    const auth: AuthToken = AuthFactory.token(authToken, expirationDate);

    return auth;
  }
}

export const TokenService: TokenService = new _TokenService();
