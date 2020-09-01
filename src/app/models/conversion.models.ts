import { Model, DataTypes } from 'sequelize'
import { database } from '../../config/database'
import logger from '../../helper/logger'

export class Conversion extends Model {
  public id!: number
  public user!: string
  public baseCurrency!: string
  public baseValue!: number
  public targetCurrency!: string
  public targetValue!: number
  public exchangeRate!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Conversion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    baseCurrency: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    baseValue: {
      type: new DataTypes.DOUBLE(),
      allowNull: false
    },
    targetCurrency: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    exchangeRate: {
      type: new DataTypes.DOUBLE(),
      allowNull: false
    }
  },
  {
    tableName: 'conversions',
    sequelize: database
  }
)

Conversion.sync({ force: true })
  .then(() => logger.info('Conversion table created'))
  .then(null, err => logger.error('err: ', err))

export interface IReqConversion {
  user: string
  baseCurrency: string
  baseValue: number
  targetCurrency: string
}

export interface IRespConversion extends IReqConversion{
  id: number
  targetValue: number
  exchangeRate: number
  time: Date
}
