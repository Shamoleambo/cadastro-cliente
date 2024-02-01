import type { ClientModel } from '../../../domain/models/client-model'
import type { GetAllClientsRepository } from '../../protocols/get-all-clients-repository'
import { DbGetAllClients } from './db-get-clients'

const makeSut = (): DbGetAllClients => {
  class GetAllClientsRepositoryStub implements GetAllClientsRepository {
    async getAll (): Promise<ClientModel[]> {
      const fakeClients = [{
        id: 'valid_id',
        name: 'any_name',
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }]

      return fakeClients
    }
  }

  const getAllClientsRepository = new GetAllClientsRepositoryStub()
  const sut = new DbGetAllClients(getAllClientsRepository)
  return sut
}

describe('DbGetAllClients Usecase', () => {
  test('should return all clients on success', async () => {
    const sut = makeSut()
    const client = await sut.getAllClients()

    expect(client).toEqual([{
      id: 'valid_id',
      name: 'any_name',
      cpf: '111.111.111-11',
      birthDate: '01/01/1994'
    }])
  })
})
