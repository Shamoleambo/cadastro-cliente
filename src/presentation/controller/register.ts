import type { HttpRequest, HttpResponse } from '../protocols/http-protocol'
import { MissingParamError } from '../../errors/missing-param-error'

export class RegisterController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ['name', 'cpf', 'birthDate']
    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return {
          statusCode: 400,
          body: new MissingParamError(param)
        }
      }
    }
  }
}
