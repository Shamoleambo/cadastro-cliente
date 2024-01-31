import request from 'supertest'
import app from './app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Router', () => {
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

  test('should return a client on success', async () => {
    await request(app).post('/api/register')
      .send({
        name: 'any_name',
        cpf: '12345678901',
        birthDate: '01/01/1994'
      })
      .expect(201)
  })
})
