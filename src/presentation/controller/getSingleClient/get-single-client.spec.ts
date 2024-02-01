import { GetSingleClient } from './get-single-client'
import { MissingParamError } from '../../../errors/missing-param-error'
import { ServerError } from '../../../errors/server-error'
import type { CpfValidator } from '../../protocols/cpf-validator'
import type { ClientModel } from '../../../domain/models/client-model'
import type { GetClient } from '../../../domain/useCases/get-client'

const makeGetClientStub = (): GetClient => {
  class GetClientStub implements GetClient {
    async getClient (): Promise<ClientModel> {
      const fakeClient = {
        id: 'valid_id',
        name: 'any_name',
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }
      return fakeClient
    }
  }

  return new GetClientStub()
}

const makeCpfValidatorStub = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    checkValidity (cpf: string): boolean {
      return true
    }
  }

  return new CpfValidatorStub()
}
interface SutTypes {
  sut: GetSingleClient
  cpfValidatorStub: CpfValidator
  getClientStub: GetClient
}

const makeSut = (): SutTypes => {
  const getClientStub = makeGetClientStub()
  const cpfValidatorStub = makeCpfValidatorStub()
  const sut = new GetSingleClient(cpfValidatorStub, getClientStub)
  return { sut, cpfValidatorStub, getClientStub }
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
    jest.spyOn(cpfValidatorStub, 'checkValidity').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        cpf: '11111111110'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(422)
    expect(httpResponse.body).toEqual(new Error('Invalid CPF'))
  })

  test('should return 500 if GetClient throws', async () => {
    const { sut, getClientStub } = makeSut()
    jest.spyOn(getClientStub, 'getClient').mockRejectedValueOnce(new ServerError())

    const httpRequest = {
      body: {
        cpf: '111.111.111-11'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
