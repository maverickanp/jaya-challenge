import logger from '../../helper/logger'
import { Request, Response } from 'express'
import { Conversion, IReqConversion, IRespConversion } from '../models/conversion.models'
import { User } from '../models/user.model'
import { api } from './lib/exchange-rate.client'

class BusinessError extends Error {}

export class ConversionController {
  public index (req: Request, res: Response): void {
    try {
      Conversion.findAll<Conversion>({ })
        .then((conversions: Conversion[]) => res.json(conversions))
        .catch((err: Error) => res.status(500).json(err))
    } catch (error) {
      throw new Error(error)
    }
  }

  public byUser (req: Request, res: Response): void {
    try {
      const userId: string = req.params.id
      Conversion.findAll<Conversion>({
        where: {
          user: userId
        }
      })
        .then((conversions: Conversion[]) => res.json(conversions))
        .catch((err: Error) => res.status(500).json(err))
    } catch (error) {
      throw new Error(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const params: IReqConversion = req.body

    try {
      const userFound = await User.findOne<User>({
        where: {
          id: params.user
        }
      })

      if (userFound === null) {
        throw new BusinessError('User not found.')
      }

      const baseValue: number = params.baseValue

      if ((typeof baseValue !== 'number') || (baseValue <= 0)) {
        throw new BusinessError('input a positive value')
      }

      const baseCurrency: string = params.baseCurrency
      try {
        const rates = await api.getRates(baseCurrency)
        const targetCurrency: string = params.targetCurrency

        if (!(targetCurrency in rates.rates)) {
          throw new BusinessError(`target currency ${targetCurrency} does not exists`)
        }

        const targetValue = baseValue * rates.rates[targetCurrency]
        logger.info(targetValue)

        const data = {
          user: params.user,
          baseCurrency: baseCurrency,
          baseValue: baseValue,
          targetCurrency: params.targetCurrency,
          exchangeRate: rates.rates[targetCurrency]
        }

        const conversion = await Conversion.create<Conversion>(data)

        if (conversion != null) {
          const responseConversionData: IRespConversion = {
            id: conversion.id,
            ...data,
            targetValue: targetValue,
            time: conversion.createdAt
          }
          return res.status(201).json(responseConversionData)
        }
      } catch (error) {
        throw new BusinessError(error)
      }
    } catch (error) {
      if (error instanceof BusinessError) {
        return res.status(400).json({ err: error.message })
      } else if (error instanceof Error) {
        return res.status(500).json({ err: error.message })
      }
    }
  }
}
