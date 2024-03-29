import type { CpfValidator } from '../../protocols/cpf-validator'
import type { AddClient, AddClientModel } from '../../../domain/useCases/add-client'
import type { ClientModel } from '../../../domain/models/client-model'
import type { CpfFormatter } from '../../protocols/cpf-formatter'
import { RegisterController } from './register'
import { MissingParamError } from '../../../errors/missing-param-error'
import { ServerError } from '../../../errors/server-error'

const makeCpfFormatterStub = (): CpfFormatter => {
  class CpfFormatterStub implements CpfFormatter {
    format (cpf: string): string {
      return '11111111111'
    }
  }

  return new CpfFormatterStub()
}

const makeAddClientStub = (): AddClient => {
  class AddClientStub implements AddClient {
    async addClient (client: AddClientModel): Promise<ClientModel> {
      const fakeClient = {
        id: 'fake_id',
        name: 'fake_name',
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }

      return fakeClient
    }
  }

  return new AddClientStub()
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
  sut: RegisterController
  cpfValidatorStub: CpfValidator
  addClientStub: AddClient
}

const makeSut = (): SutTypes => {
  const cpfFormatter = makeCpfFormatterStub()
  const addClientStub = makeAddClientStub()
  const cpfValidatorStub = makeCpfValidatorStub()
  const sut = new RegisterController(cpfValidatorStub, addClientStub, cpfFormatter)
  return { sut, cpfValidatorStub, addClientStub }
}

describe('RegisterController', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ message: new MissingParamError('name').message })
  })

  test('should return 400 no CPF is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ message: new MissingParamError('cpf').message })
  })

  test('should return 400 if no birthDate is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        cpf: '111.111.111-11'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ message: new MissingParamError('birthDate').message })
  })

  test('should return 422 if an invalid CPF is provided', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'checkValidity').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'valid_name',
        cpf: '111.111.111-10',
        birthDate: '01/01/1994'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(422)
    expect(httpResponse.body).toEqual({ message: 'Invalid CPF' })
  })

  test('should call checkValidity with correct param', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    const checkValiditySpy = jest.spyOn(cpfValidatorStub, 'checkValidity')

    const httpRequest = {
      body: {
        name: 'any_name',
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }
    }
    await sut.handle(httpRequest)
    expect(checkValiditySpy).toHaveBeenCalledWith(httpRequest.body.cpf)
  })

  test('should return 500 if AddClient throws', async () => {
    const { sut, addClientStub } = makeSut()
    jest.spyOn(addClientStub, 'addClient').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error('Database Error')) })
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 201 if client is registered', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'fake_id',
      name: 'fake_name',
      cpf: '111.111.111-11',
      birthDate: '01/01/1994'
    })
  })
})
