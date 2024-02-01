import type { ClientModel } from '../../../domain/models/client-model'
import type { GetClients } from '../../../domain/useCases/get-clients'
import type { GetAllClientsRepository } from '../../protocols/get-all-clients-repository'

export class DbGetAllClients implements GetClients {
  private readonly getAllClientsRepository: GetAllClientsRepository

  constructor (getAllClientsRepository: GetAllClientsRepository) {
    this.getAllClientsRepository = getAllClientsRepository
  }

  async getAllClients (page: number): Promise<ClientModel[]> {
    const clients = await this.getAllClientsRepository.getAll(page)
    return clients
  }
}
