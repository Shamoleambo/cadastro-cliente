import { RegisterController } from './register'

describe('RegisterController', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new RegisterController()
    const httpRequest = {
      body: {
        cpf: '999.999.999-00',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing Param: name'))
  })

  test('should return 400 no CPF is provided', () => {
    const sut = new RegisterController()
    const httpRequest = {
      body: {
        name: 'valid_name',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing Param: cpf'))
  })
})
