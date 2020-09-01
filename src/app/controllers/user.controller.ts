import { Request, Response } from 'express'
import { User, IUser } from '../models/user.model'

export class UserController {
  public index (req: Request, res: Response): void {
    User.findAll<User>({})
      .then((users: User[]) => res.json(users))
      .catch((err: Error) => res.status(500).json(err))
  }

  public create (req: Request): Response {
    const params: IUser = req.body

    User.create<User>(params)
      .then((user: User) => res.status(201).json(user))
      .catch((err: Error) => res.status(500).json(err))
  }
}
