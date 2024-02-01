import type { ClientModel } from '../../domain/models/client-model'

export interface GetClientRepository {
  get: (cpf: string) => Promise<ClientModel>
}
