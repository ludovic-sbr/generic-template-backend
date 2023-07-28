enum RoleNameEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UserFactory {
  user(username: string, email: string, password: string, roleId: number): User;
}

class _UserFactory implements UserFactory {
  user(username: string, email: string, password: string, roleId: number): User {
    return {
      username: username,
      email: email,
      password: password,
      roleId: roleId,
    };
  }
}

export const UserFactory: UserFactory = new _UserFactory();
