import { RegisterController } from './register'

describe('RegisterController', () => {
  test('should return 400 if an invalid name is provided', () => {
    const sut = new RegisterController()
    const httpRequest = {
      name: 'invalid_name',
      cpf: '999.999.999-00',
      birthDate: '01/01/1994'
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Invalid Name'))
  })
})
