import bcrypt from 'bcrypt';
import { BusinessError } from '../../common/errors/business.error';
import { User, UserDTO } from '../models';
import Role from '../models/role.model';

export interface UserService {
  create(userDTO: UserDTO): Promise<User>;
  deleteById(id: number): Promise<User>;
}

class _UserService implements UserService {
  private emailRegex = RegExp(
    '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
  );

  /**
   * Creates a new user.
   *
   * @param user
   */
  public async create(userDTO: UserDTO): Promise<User> {
    this.validateEmail(userDTO.email, this.emailRegex);

    const existingUser = await User.findOne({
      where: {
        email: userDTO.email,
      },
    });

    if (existingUser) throw new BusinessError('User already exists.');

    const cryptedPassword = await bcrypt.hash(userDTO.password, 10);

    const role = await Role.findByPk(userDTO.roleId);

    if (!role) throw new BusinessError(`Role id '${userDTO.roleId}' does not exists.`);

    const createdUser = await User.create({
      email: userDTO.email,
      password: cryptedPassword,
      roleId: role.id,
    });

    return createdUser;
  }

  /**
   * Deletes a specific user by id.
   *
   * @param id
   */
  public async deleteById(id: number): Promise<User> {
    const user = await User.findByPk(id);

    if (!user) throw new BusinessError('User does not exists.');

    await user.destroy();

    return user;
  }

  private validateEmail(email: string, regex: RegExp): boolean {
    if (!regex.test(email)) throw new BusinessError('Invalid email format.');
    return true;
  }
}

export const UserService: UserService = new _UserService();
