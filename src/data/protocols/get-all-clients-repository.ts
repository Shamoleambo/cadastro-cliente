import type { ClientModel } from '../../domain/models/client-model'

export interface GetAllClientsRepository {
  get: () => Promise<ClientModel[]>
}
