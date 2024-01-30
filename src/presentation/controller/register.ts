import type { HttpRequest, HttpResponse } from '../protocols/http-protocol'
import type { CpfValidator } from '../protocols/cpf-validator'
import type { AddClient } from '../../domain/useCases/add-client'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, invalidCpf } from '../helpers/http-helper'
import { ServerError } from '../../errors/server-error'

export class RegisterController {
  private readonly cpfValidator
  private readonly addClient

  constructor (cpfValidator: CpfValidator, addClient: AddClient) {
    this.cpfValidator = cpfValidator
    this.addClient = addClient
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredParams = ['name', 'cpf', 'birthDate']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      const { name, cpf, birthDate } = httpRequest.body
      const isValid = this.cpfValidator.checkValidity(cpf)
      if (!isValid) return invalidCpf()

      this.addClient({ name, cpf, birthDate })
    } catch (error) {
      return { statusCode: 500, body: new ServerError() }
    }
  }
}
