import type { GetClients } from '../../../domain/useCases/get-clients'
import type { Controller } from '../../protocols/controller-protocol'
import type { HttpResponse } from '../../protocols/http-protocol'
import { serverError } from '../../helpers/http-helper'

export class GetAllClients implements Controller {
  private readonly getClients: GetClients

  constructor (getClient: GetClients) {
    this.getClients = getClient
  }

  async handle (): Promise<HttpResponse> {
    try {
      const clients = await this.getClients.getAllClients()
      return {
        statusCode: 200,
        body: clients
      }
    } catch (error) {
      return serverError()
    }
  }
}
