import type { Controller } from '../../presentation/protocols/controller-protocol'
import type { HttpRequest } from '../../presentation/protocols/http-protocol'
import type { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: { ...req.body },
      pageQuery: +req.query.p || 0
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
