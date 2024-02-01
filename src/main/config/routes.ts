import type { Express } from 'express'
import { Router } from 'express'
import { makeRegisterController } from '../factories/register'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeGetSingleClientController } from '../factories/get-single-client'
import { makeGetAllClientsController } from '../factories/get-all-clients'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  router.post('/register', adaptRoute(makeRegisterController()))
  router.get('/client', adaptRoute(makeGetSingleClientController()))
  router.get('/clients', adaptRoute(makeGetAllClientsController()))
}
