import { Role, User, UserFactory } from '../models/user.model';
import prisma from '../../database';
import bcrypt from 'bcrypt';
import { BusinessError } from '../../common/errors/business.error';

export interface UserService {
  create(user: User): Promise<User>;
  deleteById(id: number): Promise<User>;
}

class _UserService implements UserService {
  private emailRegex: string =
    '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])';

  /**
   * Creates a new user.
   *
   * @param user
   */
  public async create(user: User): Promise<User> {
    this.validateEmail(user.email, this.emailRegex);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) throw new BusinessError('User already exists.');

    const cryptedPassword = await bcrypt.hash(user.password, 10);

    const role: Role | null = await prisma.role.findUnique({
      where: {
        id: user.roleId,
      },
    });

    if (!role) throw new BusinessError(`Role id '${user.roleId}' does not exists.`);

    const data: User = UserFactory.user(user.username, user.email, cryptedPassword, role.id);

    const newUser = await prisma.user.create({
      data: data,
    });

    return newUser;
  }

  /**
   * Deletes a specific user by id.
   *
   * @param id
   */
  public async deleteById(id: number): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) throw new BusinessError('User does not exists.');

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deletedUser;
  }

  private validateEmail(email: string, regex: string): boolean {
    if (!email.match(regex)) throw new BusinessError('Invalid email format.');
    return true;
  }
}

export const UserService: UserService = new _UserService();
