import type { Express } from 'express'
import { Router } from 'express'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  router.post('/register', (req, res) => {
    res.statusCode = 201
    res.json({ ok: 'ok' })
  })
}
