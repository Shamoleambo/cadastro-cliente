import { MongoHelper } from '../helpers/mongo-helper'
import { ClientMongoRepository } from './client'

describe('Client Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return a client on success', async () => {
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
})
