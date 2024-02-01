import { GetSingleClient } from './get-single-client'
import { MissingParamError } from '../../../errors/missing-param-error'
import type { CpfValidator } from '../../protocols/cpf-validator'

interface SutTypes {
  sut: GetSingleClient
  cpfValidatorStub: CpfValidator
}

const makeSut = (): SutTypes => {
  class CpfValidatorStub implements CpfValidator {
    checkValidity (cpf: string): boolean {
      return true
    }
  }

  const cpfValidatorStub = new CpfValidatorStub()
  const sut = new GetSingleClient(cpfValidatorStub)
  return { sut, cpfValidatorStub }
}

describe('GetSingleClient', () => {
  test('should return 400 if no CPF is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
  })

  test('should return 400 if an invalid CPF is provided', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'checkValidity').mockImplementationOnce((cpf: string) => false)

    const httpRequest = {
      body: {
        cpf: '11111111110'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(422)
    expect(httpResponse.body).toEqual(new Error('Invalid CPF'))
  })
})
