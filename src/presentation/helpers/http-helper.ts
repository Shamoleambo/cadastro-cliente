import type { HttpResponse } from '../protocols/http-protocol'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
