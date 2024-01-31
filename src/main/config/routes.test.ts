import request from 'supertest'
import app from './app'

describe('Router', () => {
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
