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

  test('should return a client for registration on success', async () => {
    await request(app).post('/api/register')
      .send({
        name: 'any_name',
        cpf: '11111111111',
        birthDate: '01/01/1994'
      })
      .expect(201)
  })

  test('should get a client by cpf on success', async () => {
    await request(app).post('/api/register')
      .send({
        name: 'any_name',
        cpf: '11111111111',
        birthDate: '01/01/1994'
      })

    await request(app).get('/api/client')
      .send({
        cpf: '11111111111'
      })
      .expect(200)
  })
})
