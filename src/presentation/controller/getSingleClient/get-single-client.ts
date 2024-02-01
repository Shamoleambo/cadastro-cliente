import { MissingParamError } from '../../../errors/missing-param-error'
import { badRequest, invalidCpf, serverError } from '../../helpers/http-helper'
import type { GetClient } from '../../../domain/useCases/get-client'
import type { Controller } from '../../protocols/controller-protocol'
import type { CpfValidator } from '../../protocols/cpf-validator'
import type { HttpRequest, HttpResponse } from '../../protocols/http-protocol'

export class GetSingleClient implements Controller {
  private readonly cpfValidator: CpfValidator
  private readonly getClient: GetClient

  constructor (cpfValidator: CpfValidator, getClient: GetClient) {
    this.cpfValidator = cpfValidator
    this.getClient = getClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cpf = httpRequest.body.cpf
      if (!cpf) return badRequest(new MissingParamError('cpf'))

      const isValid = this.cpfValidator.checkValidity(cpf)
      if (!isValid) return invalidCpf()

      const client = await this.getClient.getClient()
      return {
        statusCode: 200,
        body: client
      }
    } catch (error) {
      return serverError()
    }
  }
}
