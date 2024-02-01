import type { ClientModel } from '../../../domain/models/client-model'
import type { GetClient } from '../../../domain/useCases/get-client'
import type { GetClientRepository } from '../../protocols/get-client-repository'

export class DbGetClient implements GetClient {
  private readonly getClientRepository: GetClientRepository

  constructor (getClientRepository: GetClientRepository) {
    this.getClientRepository = getClientRepository
  }

  async getClientByCpf (cpf: string): Promise<ClientModel> {
    const client = await this.getClientRepository.get(cpf)
    return client
  }
}
