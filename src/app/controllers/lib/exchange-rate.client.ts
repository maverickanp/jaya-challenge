import axios from 'axios'
import { config } from 'dotenv'

config()

const EXCHANGE_PUB_ENDPOINT = process.env.EXCHANGE_PUB_ENDPOINT

export interface RateResponse {
  date: Date
  base: string
  rates: {
    [rate: string]: number
  }
}

export class ExchangeRateClient {
  public async getRates (baseCurrency: string): Promise<RateResponse> {
    try {
      const response = await axios.get(EXCHANGE_PUB_ENDPOINT + `latest?base=${baseCurrency}`)
      return response.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }
}

export const api = new ExchangeRateClient()
