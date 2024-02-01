import type { ClientModel } from '../../domain/models/client-model'

export interface GetAllClientsRepository {
  getAll: () => Promise<ClientModel[]>
}
