import type { ClientModel } from '../../../domain/models/client-model'
import type { AddClient, AddClientModel } from '../../../domain/useCases/add-client'
import type { AddClientRepository } from '../../protocols/add-client-repository'

export class DbAddClient implements AddClient {
  private readonly addClientRepository: AddClientRepository

  constructor (addClientRepository: AddClientRepository) {
    this.addClientRepository = addClientRepository
  }

  async addClient (clientData: AddClientModel): Promise<ClientModel> {
    const client = await this.addClientRepository.add(clientData)
    return client
  }
}
