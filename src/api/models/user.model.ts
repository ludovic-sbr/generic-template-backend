import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';
import Role from './role.model';

@DefaultScope(() => ({
  include: [{ model: Role, attributes: Object.keys(Role.getAttributes()), include: [] }],
}))
@Table({ tableName: 'users' })
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ForeignKey(() => Role)
  @Column
  declare roleId: number;

  @BelongsTo(() => Role)
  declare role: Role;
}

export interface UserDTO {
  email: string;
  password: string;
  roleId: number;
}
