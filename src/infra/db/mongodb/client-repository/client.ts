import type { AddClientRepository } from '../../../../data/protocols/add-client-repository'
import type { GetAllClientsRepository } from '../../../../data/protocols/get-all-clients-repository'
import type { GetClientRepository } from '../../../../data/protocols/get-client-repository'
import type { ClientModel } from '../../../../domain/models/client-model'
import type { AddClientModel } from '../../../../domain/useCases/add-client'
import { MongoHelper } from '../helpers/mongo-helper'

export class ClientMongoRepository implements AddClientRepository, GetClientRepository, GetAllClientsRepository {
  async add (clientData: AddClientModel): Promise<ClientModel> {
    const clientCollection = MongoHelper.getCollection('clients')
    const result = await clientCollection.insertOne(clientData)
    const clientId = result.insertedId

    const { _id, name, cpf, birthDate } = await clientCollection.findOne({ _id: clientId })
    const client = { id: _id.toString(), name, cpf, birthDate }
    return client
  }

  async get (cpf: string): Promise<ClientModel> {
    const clientCollection = MongoHelper.getCollection('clients')

    const { _id, name, birthDate } = await clientCollection.findOne({ cpf })
    const client = { id: _id.toString(), name, cpf, birthDate }
    return client
  }

  async getAll (page: number): Promise<ClientModel[]> {
    const clientCollection = MongoHelper.getCollection('clients')
    const CLIENTS_PER_PAGE = 3

    const clientsFromDb = await clientCollection
      .find({})
      .skip(page * CLIENTS_PER_PAGE)
      .limit(3)
      .toArray()
    const clients = clientsFromDb.map(client => {
      const { _id, name, cpf, birthDate } = client
      const newClient = { id: _id.toString(), name, cpf, birthDate }
      return newClient
    })
    return clients
  }
}
