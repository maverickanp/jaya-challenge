import { Sequelize } from 'sequelize'

export const database = new Sequelize({
  database: 'jaya_challenge',
  dialect: 'sqlite',
  storage: ':memory:'
})
