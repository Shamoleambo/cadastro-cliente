import type { ClientModel } from '../models/client-model'

export interface GetClients {
  getAllClients: () => Promise<ClientModel[]>
}
