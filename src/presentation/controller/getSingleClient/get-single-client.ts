import { MissingParamError } from '../../../errors/missing-param-error'
import { badRequest, invalidCpf } from '../../helpers/http-helper'
import type { Controller } from '../../protocols/controller-protocol'
import type { CpfValidator } from '../../protocols/cpf-validator'
import type { HttpRequest, HttpResponse } from '../../protocols/http-protocol'

export class GetSingleClient implements Controller {
  private readonly cpfValidator: CpfValidator

  constructor (cpfValidator: CpfValidator) {
    this.cpfValidator = cpfValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const cpf = httpRequest.body.cpf
    if (!cpf) return badRequest(new MissingParamError('cpf'))

    const isValid = this.cpfValidator.checkValidity(cpf)
    if (!isValid) return invalidCpf()
  }
}
