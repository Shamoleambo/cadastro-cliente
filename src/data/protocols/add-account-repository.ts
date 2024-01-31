import type { ClientModel } from '../../domain/models/client-model'
import type { AddClientModel } from '../../domain/useCases/add-client'

export interface AddClientRepository {
  add: (addClient: AddClientModel) => Promise<ClientModel>
}
