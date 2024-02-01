import type { ClientModel } from '../models/client-model'

export interface GetClient {
  getClientByCpf: (cpf: string) => Promise<ClientModel>
}
