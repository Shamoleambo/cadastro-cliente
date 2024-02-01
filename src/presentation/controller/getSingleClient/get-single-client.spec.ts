import { GetSingleClient } from './get-single-client'
import { MissingParamError } from '../../../errors/missing-param-error'

describe('GetSingleClient', () => {
  test('should return 400 if no CPF is provided', async () => {
    const sut = new GetSingleClient()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
  })
})
