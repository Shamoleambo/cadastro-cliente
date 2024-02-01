import type { ClientModel } from '../models/client-model'

export interface GetClients {
  getAllClients: (page: number) => Promise<ClientModel[]>
}
