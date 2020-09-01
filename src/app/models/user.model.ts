import { Model, DataTypes } from 'sequelize'
import { database } from '../../config/database'
import logger from '../../helper/logger'

export class User extends Model {
  public id!: number
  public name!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize: database
  }
)

User.sync({ force: true })
  .then(() => logger.info('User table created'))
  .then(null, err => logger.error('err: ', err))

export interface IUser {
  name: string
}
