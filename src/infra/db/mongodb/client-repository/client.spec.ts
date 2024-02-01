import { MongoHelper } from '../helpers/mongo-helper'
import { ClientMongoRepository } from './client'

describe('Client Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const clientCollection = MongoHelper.getCollection('clients')
    await clientCollection.deleteMany({})
  })

  test('should return a client on success addition', async () => {
    const sut = new ClientMongoRepository()
    const client = await sut.add({
      name: 'any_name',
      cpf: '12345678901',
      birthDate: '01/01/1994'
    })

    expect(client).toBeTruthy()
    expect(client.id).toBeTruthy()
    expect(client.name).toBe('any_name')
    expect(client.cpf).toBe('12345678901')
    expect(client.birthDate).toBe('01/01/1994')
  })

  test('should return a client when cpf is provided', async () => {
    const sut = new ClientMongoRepository()
    await sut.add({
      name: 'any_name',
      cpf: '11111111111',
      birthDate: '01/01/1994'
    })
    const client = await sut.get('11111111111')

    expect(client).toBeTruthy()
    expect(client.id).toBeTruthy()
    expect(client.name).toBe('any_name')
    expect(client.cpf).toBe('11111111111')
    expect(client.birthDate).toBe('01/01/1994')
  })

  test('should return all clients', async () => {
    const sut = new ClientMongoRepository()
    await sut.add({
      name: 'any_name',
      cpf: '11111111111',
      birthDate: '01/01/1994'
    })
    const clients = await sut.getAll()

    expect(clients).toBeTruthy()
    expect(clients.length).toBe(1)
  })
})
