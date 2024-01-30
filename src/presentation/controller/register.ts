import type { HttpRequest, HttpResponse } from '../protocols/http-protocol'
import type { CpfValidator } from '../protocols/cpf-validator'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, invalidCpf } from '../helpers/http-helper'

export class RegisterController {
  private readonly cpfValidator

  constructor (cpfValidator: CpfValidator) {
    this.cpfValidator = cpfValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ['name', 'cpf', 'birthDate']
    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }

    const { cpf } = httpRequest.body
    const isValid = this.cpfValidator.checkValidity(cpf)
    if (!isValid) return invalidCpf()
  }
}
