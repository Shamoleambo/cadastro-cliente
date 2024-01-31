import type { ClientModel } from '../models/client-model'

export interface AddClientModel {
  name: string
  cpf: string
  birthDate: string
}

export interface AddClient {
  addClient: (client: AddClientModel) => Promise<ClientModel>
}
