import { MissingParamError } from '../../../errors/missing-param-error'
import { badRequest, invalidCpf, serverError } from '../../helpers/http-helper'
import type { GetClient } from '../../../domain/useCases/get-client'
import type { Controller } from '../../protocols/controller-protocol'
import type { CpfValidator } from '../../protocols/cpf-validator'
import type { HttpRequest, HttpResponse } from '../../protocols/http-protocol'
import type { CpfFormatter } from '../../protocols/cpf-formatter'

export class GetSingleClient implements Controller {
  private readonly cpfValidator: CpfValidator
  private readonly getClient: GetClient
  private readonly cpfFormatter: CpfFormatter

  constructor (cpfValidator: CpfValidator, getClient: GetClient, cpfFormatter: CpfFormatter) {
    this.cpfValidator = cpfValidator
    this.getClient = getClient
    this.cpfFormatter = cpfFormatter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cpf = httpRequest.body.cpf
      console.log(cpf)
      if (!cpf) return badRequest(new MissingParamError('cpf'))

      const isValid = this.cpfValidator.checkValidity(cpf)
      if (!isValid) return invalidCpf()

      const formattedCpf = this.cpfFormatter.format(cpf)

      const client = await this.getClient.getClientByCpf(formattedCpf)
      return {
        statusCode: 200,
        body: client
      }
    } catch (error) {
      return serverError()
    }
  }
}
