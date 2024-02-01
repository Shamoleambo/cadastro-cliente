import type { ClientModel } from '../../../domain/models/client-model'
import type { AddClientModel } from '../../../domain/useCases/add-client'
import type { AddClientRepository } from '../../protocols/add-client-repository'
import { DbAddClient } from './db-add-client'

const makeSut = (): DbAddClient => {
  class AddClientRepositoryStub implements AddClientRepository {
    async add (addClient: AddClientModel): Promise<ClientModel> {
      const fakeClient = {
        id: 'valid_id',
        name: 'any_name',
        cpf: '12345678901',
        birthDate: '01/01/1994'
      }

      return await new Promise((resolve) => { resolve(fakeClient) })
    }
  }

  const addClientRepository = new AddClientRepositoryStub()
  const sut = new DbAddClient(addClientRepository)
  return sut
}

describe('DbAddClient Usecase', () => {
  test('should return a client on success', async () => {
    const sut = makeSut()
    const clientData = {
      name: 'any_name',
      cpf: '12345678901',
      birthDate: '01/01/1994'
    }
    const client = await sut.addClient(clientData)

    expect(client).toEqual({
      id: 'valid_id',
      name: 'any_name',
      cpf: '12345678901',
      birthDate: '01/01/1994'
    })
  })
})
