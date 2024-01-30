import type { ClientModel } from '../models/client-model'

export interface AddClientModel {
  name: string
  cpf: string
  birthDate: string
}

export interface AddClient {
  add: (client: AddClientModel) => Promise<ClientModel>
}
