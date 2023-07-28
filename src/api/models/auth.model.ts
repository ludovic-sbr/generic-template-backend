export interface AuthToken {
  token: string;
  expires: Date;
}

export interface AuthFactory {
  token(token: string, expires: Date): AuthToken;
}

class _AuthFactory implements AuthFactory {
  token(authToken: string, expirationDate: Date): AuthToken {
    return {
      token: authToken,
      expires: expirationDate,
    };
  }
}

export const AuthFactory: AuthFactory = new _AuthFactory();
