import type { ClientModel } from '../../../domain/models/client-model'
import type { GetClientRepository } from '../../protocols/get-client-repository'
import { DbGetClient } from './db-get-client'

const makeSut = (): DbGetClient => {
  class GetClientRepositoryStub implements GetClientRepository {
    async get (cpf: string): Promise<ClientModel> {
      const fakeClient = {
        id: 'valid_id',
        name: 'any_name',
        cpf: '111.111.111-11',
        birthDate: '01/01/1994'
      }

      return fakeClient
    }
  }

  const getClientRepository = new GetClientRepositoryStub()
  const sut = new DbGetClient(getClientRepository)
  return sut
}

describe('DbGetClient Usecase', () => {
  test('should return a client on success', async () => {
    const sut = makeSut()
    const cpf = '111.111.111-11'
    const client = await sut.getClientByCpf(cpf)

    expect(client).toEqual({
      id: 'valid_id',
      name: 'any_name',
      cpf: '111.111.111-11',
      birthDate: '01/01/1994'
    })
  })
})
