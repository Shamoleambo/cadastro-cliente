import type { HttpResponse } from '../protocols/http-protocol'
import { ServerError } from '../../errors/server-error'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const invalidCpf = (): HttpResponse => {
  return {
    statusCode: 422,
    body: new Error('Invalid CPF')
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
