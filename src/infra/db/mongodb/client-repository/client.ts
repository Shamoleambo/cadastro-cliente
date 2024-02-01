import type { AddClientRepository } from '../../../../data/protocols/add-client-repository'
import type { GetClientRepository } from '../../../../data/protocols/get-client-repository'
import type { ClientModel } from '../../../../domain/models/client-model'
import type { AddClientModel } from '../../../../domain/useCases/add-client'
import { MongoHelper } from '../helpers/mongo-helper'

export class ClientMongoRepository implements AddClientRepository, GetClientRepository {
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
}
