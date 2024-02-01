import type { HttpRequest, HttpResponse } from '../../protocols/http-protocol'
import type { CpfValidator } from '../../protocols/cpf-validator'
import type { AddClient } from '../../../domain/useCases/add-client'
import type { Controller } from '../../protocols/controller-protocol'
import type { CpfFormatter } from '../../utils/cpf-formatter'
import { MissingParamError } from '../../../errors/missing-param-error'
import { badRequest, invalidCpf, serverError } from '../../helpers/http-helper'

export class RegisterController implements Controller {
  private readonly cpfValidator: CpfValidator
  private readonly addClient: AddClient
  private readonly cpfFormatter: CpfFormatter

  constructor (cpfValidator: CpfValidator, addClient: AddClient, cpfFormatter: CpfFormatter) {
    this.cpfValidator = cpfValidator
    this.addClient = addClient
    this.cpfFormatter = cpfFormatter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const formattedCpf = this.cpfFormatter.format(cpf)
      const clientCreated = await this.addClient.addClient({ name, cpf: formattedCpf, birthDate })
      return {
        statusCode: 201,
        body: clientCreated
      }
    } catch (error) {
      return serverError()
    }
  }
}
