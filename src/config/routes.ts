import { UserController } from '../app/controllers/user.controller'
import { ConversionController } from '../app/controllers/conversion.controller'
import express from 'express'

export class Routes {
  public userController: UserController = new UserController()
  public conversionController: ConversionController = new ConversionController()

  public routes (app: express.Application): void {
    app.route('/user').post(this.userController.create)
    app.route('/users').get(this.userController.index)

    app.route('/conversion').post(this.conversionController.create)
    app.route('/conversions').get(this.conversionController.index)
    app.route('/conversions/:id').get(this.conversionController.byUser)

    app.use((req, res) => res.status(404).json({ err: 'Invalid service' }))
  }
}
