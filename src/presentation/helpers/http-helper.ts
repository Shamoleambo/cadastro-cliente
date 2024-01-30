import type { HttpResponse } from '../protocols/http-protocol'

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
