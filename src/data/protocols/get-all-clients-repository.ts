import type { ClientModel } from '../../domain/models/client-model'

export interface GetAllClientsRepository {
  getAll: (page: number) => Promise<ClientModel[]>
}
