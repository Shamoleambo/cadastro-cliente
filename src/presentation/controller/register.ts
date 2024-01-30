import type { HttpRequest, HttpResponse } from '../protocols/http-protocol'

export class RegisterController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('Invalid Name')
    }
  }
}
