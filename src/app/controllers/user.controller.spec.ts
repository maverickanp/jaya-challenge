import app from '../../app'
import { Request } from 'supertest'

describe('GET / - a simple api endpoint', () => {
  it('Hello API Request', async () => {
    // const result = await app.get('/')
    const result = await new Request(app.get(''))

    expect(result.body).toEqual(200)
  })
})
