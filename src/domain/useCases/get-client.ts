import type { ClientModel } from '../models/client-model'

export interface GetClient {
  getClient: () => Promise<ClientModel>
}
