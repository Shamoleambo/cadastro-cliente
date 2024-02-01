import { MissingParamError } from '../../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import type { Controller } from '../../protocols/controller-protocol'
import type { HttpRequest, HttpResponse } from '../../protocols/http-protocol'

export class GetSingleClient implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const cpf = httpRequest.body.cpf
    if (!cpf) return badRequest(new MissingParamError('cpf'))
  }
}
