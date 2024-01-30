import type { CpfValidator } from '../protocols/cpf-validator'
import { RegisterController } from './register'
import { MissingParamError } from '../../errors/missing-param-error'

interface SutTypes {
  sut: RegisterController
  cpfValidatorStub: CpfValidator
}

const makeSut = (): SutTypes => {
  class CpfValidatorStub implements CpfValidator {
    checkValidity (cpf: string): boolean {
      return true
    }
  }

  const cpfValidatorStub = new CpfValidatorStub()
  const sut = new RegisterController(cpfValidatorStub)
  return { sut, cpfValidatorStub }
}

describe('RegisterController', () => {
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: '999.999.999-00',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 no CPF is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
  })

  test('should return 400 if no birthDate is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        cpf: '999.999.999-00'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('birthDate'))
  })

  test('should return 422 if an invalid CPF is provided', () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'checkValidity').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'valid_name',
        cpf: '000.000.000-00',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(422)
    expect(httpResponse.body).toEqual(new Error('Invalid CPF'))
  })

  test('should call checkValidity with correct param', () => {
    const { sut, cpfValidatorStub } = makeSut()
    const checkValiditySpy = jest.spyOn(cpfValidatorStub, 'checkValidity')

    const httpRequest = {
      body: {
        name: 'any_name',
        cpf: '999.999.999-99',
        birthDate: '01/01/1994'
      }
    }
    sut.handle(httpRequest)
    expect(checkValiditySpy).toHaveBeenCalledWith(httpRequest.body.cpf)
  })
})
