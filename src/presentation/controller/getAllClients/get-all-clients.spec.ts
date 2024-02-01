import type { ClientModel } from '../../../domain/models/client-model'
import type { GetClients } from '../../../domain/useCases/get-clients'
import { ServerError } from '../../../errors/server-error'
import { GetAllClients } from './get-all-clients'

interface SutTypes {
  sut: GetAllClients
  getClients: GetClients
}

const makeSut = (): SutTypes => {
  class GetClientsStub implements GetClients {
    async getAllClients (): Promise<ClientModel[]> {
      return [{ id: 'valid_id', name: 'valid_name', cpf: '111.111.111-11', birthDate: '01/01/1994' }]
    }
  }
  const getClients = new GetClientsStub()
  const sut = new GetAllClients(getClients)
  return { sut, getClients }
}

describe('GetAllClients', () => {
  test('should return 500 if GetClients throws', async () => {
    const { sut, getClients } = makeSut()
    const httpRequest = { pageQuery: 0 }

    jest.spyOn(getClients, 'getAllClients').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new ServerError()) })
    })

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 200 in success case', async () => {
    const { sut } = makeSut()
    const httpRequest = { pageQuery: 0 }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)

    expect(httpResponse.body).toEqual([{ id: 'valid_id', name: 'valid_name', cpf: '111.111.111-11', birthDate: '01/01/1994' }])
  })
})
